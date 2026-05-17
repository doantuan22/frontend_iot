// Configuration
const CONFIG = {
    MQTT_WS_URL: 'wss://0cf84da2cc5b47ccb9613aee2edcc06b.s1.eu.hivemq.cloud:8884/mqtt',
    MQTT_USER: 'doantuan',
    MQTT_PASS: 'Tuan1234',
    MQTT_TOPIC_SENSORS: 'wokwi/sensors/#',
    BACKEND_URL: 'http://localhost:3001/api',
    SUPABASE_URL: 'https://ypddfcoesrtvjabyqqta.supabase.co',
    SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZGRmY29lc3J0dmphYnlxcXRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzMDMwODcsImV4cCI6MjA5Mzg3OTA4N30.K_muE0c9BaWsyTXHU4qJg1BnMN-qJP8Evam1_kIZss8'
};

// State
let mqttClient = null;
let dbClient = null;
let charts = { main: null, gas: null };
let lastChartUpdateTime = 0;

// Real-time Data Storage (Session-based)
const sessionData = {
    labels: [],
    temp: [],
    humi: [],
    gas: [],
    maxPoints: 40,
    stats: {
        tempSum: 0, tempCount: 0,
        humiSum: 0, humiCount: 0,
        gasSum: 0, gasCount: 0,
        fireAlarms: 0
    }
};

// --- NAVIGATION ---
function switchPage(pageId, event) {
    if (event) event.preventDefault();
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    const activeNav = Array.from(document.querySelectorAll('.nav-item')).find(item =>
        item.getAttribute('onclick') && item.getAttribute('onclick').includes(pageId)
    );
    if (activeNav) activeNav.classList.add('active');
    document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
    const activeView = document.getElementById(`${pageId}-view`);
    if (activeView) activeView.classList.add('active');
    const titles = { home: 'TRANG CHU', stats: 'THONG KE', history: 'LICH SU' };
    const titleEl = document.getElementById('page-title');
    if (titleEl) titleEl.innerText = titles[pageId] || 'DASHBOARD';
}

// --- INITIALIZATION ---
function initCharts() {
    const mainCanvas = document.getElementById('mainChart');
    const gasCanvas = document.getElementById('gasChart');
    if (!mainCanvas || !gasCanvas) return;

    charts.main = new Chart(mainCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                { label: 'Nhiet do (C)', data: [], borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', fill: true, tension: 0.3 },
                { label: 'Do am (%)', data: [], borderColor: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.1)', fill: true, tension: 0.3 }
            ]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { x: { grid: { display: false } } } }
    });

    charts.gas = new Chart(gasCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Nong do Gas (ppm)',
                data: [],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true,
                tension: 0.3
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { x: { grid: { display: false } } } }
    });
}

function resetSessionData() {
    console.log('Resetting session data...');
    sessionData.labels = [];
    sessionData.temp = [];
    sessionData.humi = [];
    sessionData.gas = [];
    sessionData.stats = { tempSum: 0, tempCount: 0, humiSum: 0, humiCount: 0, gasSum: 0, gasCount: 0, fireAlarms: 0 };
    lastChartUpdateTime = 0;
    updateStatsSummary();
    if (charts.main) {
        charts.main.data.labels = [];
        charts.main.data.datasets.forEach(d => d.data = []);
        charts.main.update();
    }
    if (charts.gas) {
        charts.gas.data.labels = [];
        charts.gas.data.datasets[0].data = [];
        charts.gas.update();
    }
}

// --- MQTT ---
function initMQTT() {
    const clientId = 'web_' + Math.random().toString(16).substr(2, 8);
    mqttClient = mqtt.connect(CONFIG.MQTT_WS_URL, {
        clientId,
        username: CONFIG.MQTT_USER,
        password: CONFIG.MQTT_PASS
    });
    mqttClient.on('connect', () => {
        updateMQTTStatus(true);
        mqttClient.subscribe(CONFIG.MQTT_TOPIC_SENSORS);
        resetSessionData();
    });
    mqttClient.on('message', (topic, msg) => handleMqttMessage(topic, msg.toString()));
    mqttClient.on('error', () => updateMQTTStatus(false));
    mqttClient.on('close', () => updateMQTTStatus(false));
}

function updateMQTTStatus(online) {
    const dot = document.getElementById('mqtt-dot');
    const status = document.getElementById('mqtt-status');
    if (dot) dot.classList.toggle('online', online);
    if (status) status.innerText = online ? 'TRUC TUYEN' : 'NGOAI TUYEN';
}

function firstDefined(...values) {
    return values.find(value => value !== undefined && value !== null);
}

function numericValue(value) {
    if (value === undefined || value === null || value === '') return undefined;
    const number = Number(value);
    return Number.isFinite(number) ? number : undefined;
}

function normalizeSensorData(data) {
    return {
        temp: numericValue(firstDefined(data.temp, data.temperature, data.t)),
        humi: numericValue(firstDefined(data.humi, data.humidity, data.hum, data.h)),
        gas: numericValue(firstDefined(data.gas, data.gasValue, data.gas_value)),
        fire: firstDefined(data.fire, data.flame, data.isFire)
    };
}

// --- DATA HANDLING ---
function handleMqttMessage(topic, payload) {
    const nowTs = Date.now();
    const nowTimeStr = new Date().toLocaleTimeString('vi-VN', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

    if (topic !== 'wokwi/sensors/data') return;

    try {
        const data = normalizeSensorData(JSON.parse(payload));

        if (data.temp !== undefined) {
            setText('temp-val', data.temp.toFixed(1));
            setText('temp-time', nowTimeStr);
            sessionData.stats.tempSum += data.temp;
            sessionData.stats.tempCount++;
        }

        if (data.gas !== undefined) {
            setText('gas-val', Math.round(data.gas));
            setText('gas-time', nowTimeStr);
            sessionData.stats.gasSum += data.gas;
            sessionData.stats.gasCount++;
        }

        if (data.fire !== undefined) {
            const isFire = data.fire === 1 || data.fire === true || data.fire === '1';
            const el = document.getElementById('fire-val');
            if (el) {
                el.innerText = isFire ? 'NGUY HIEM' : 'AN TOAN';
                el.style.color = isFire ? 'red' : 'green';
            }
            setText('fire-time', nowTimeStr);
            if (isFire) sessionData.stats.fireAlarms++;
        }

        if (data.humi !== undefined) {
            setText('humi-val', data.humi.toFixed(1));
            setText('humi-time', nowTimeStr);
            sessionData.stats.humiSum += data.humi;
            sessionData.stats.humiCount++;
        }

        updateStatsSummary();

        if (nowTs - lastChartUpdateTime >= 30000) {
            updateChartsData(nowTimeStr, data.temp, data.humi, data.gas);
            lastChartUpdateTime = nowTs;
        }
    } catch (e) {
        console.error('Parse Error', e);
    }
}

function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.innerText = val;
}

function updateStatsSummary() {
    if (sessionData.stats.tempCount > 0) setText('stats-temp-val', (sessionData.stats.tempSum / sessionData.stats.tempCount).toFixed(1) + ' C');
    if (sessionData.stats.gasCount > 0) setText('stats-gas-val', Math.round(sessionData.stats.gasSum / sessionData.stats.gasCount) + ' ppm');
    if (sessionData.stats.humiCount > 0) setText('stats-humi-val', (sessionData.stats.humiSum / sessionData.stats.humiCount).toFixed(1) + ' %');
    setText('stats-fire-count', sessionData.stats.fireAlarms);
}

function updateChartsData(time, temp, humi, gas) {
    if (!charts.main || !charts.gas) return;
    sessionData.labels.push(time);
    sessionData.temp.push(temp !== undefined ? temp : (sessionData.temp.slice(-1)[0] || 0));
    sessionData.humi.push(humi !== undefined ? humi : (sessionData.humi.slice(-1)[0] || 0));
    sessionData.gas.push(gas !== undefined ? gas : (sessionData.gas.slice(-1)[0] || 0));

    if (sessionData.labels.length > sessionData.maxPoints) {
        [sessionData.labels, sessionData.temp, sessionData.humi, sessionData.gas].forEach(a => a.shift());
    }

    charts.main.data.labels = sessionData.labels;
    charts.main.data.datasets[0].data = sessionData.temp;
    charts.main.data.datasets[1].data = sessionData.humi;
    charts.main.update('none');

    charts.gas.data.labels = sessionData.labels;
    charts.gas.data.datasets[0].data = sessionData.gas;
    charts.gas.update('none');
}

// --- CONTROLS ---
async function setThreshold(type) {
    const inputMap = {
        gas: 'gas-limit-input',
        temp: 'temp-limit-input',
        humi: 'humi-limit-input'
    };
    const deviceMap = {
        gas: 'gas_threshold',
        temp: 'temp_threshold',
        humi: 'humi_threshold'
    };

    const input = document.getElementById(inputMap[type]);
    if (!input) return;

    const value = Number(input.value);
    if (!Number.isFinite(value)) {
        showToast('Gia tri nguong khong hop le', 'error');
        return;
    }

    const button = input.closest('.input-with-btn')?.querySelector('button');
    const originalText = button ? button.innerText : '';
    if (button) {
        button.disabled = true;
        button.innerText = 'DANG GUI...';
    }

    try {
        const res = await fetch(CONFIG.BACKEND_URL + '/control', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ device: deviceMap[type], value })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || 'Khong gui duoc lenh MQTT');
        showToast(`Da gui nguong ${type}: ${value}`, 'success');
    } catch (err) {
        console.error('Set threshold error:', err);
        showToast(err.message || 'Khong gui duoc lenh dieu khien', 'error');
    } finally {
        if (button) {
            button.disabled = false;
            button.innerText = originalText;
        }
    }
}

function showToast(message, type = 'success') {
    const container = document.getElementById('alert-container');
    if (!container) {
        alert(message);
        return;
    }

    const toast = document.createElement('div');
    toast.className = 'alert-toast';
    toast.style.borderLeftColor = type === 'success' ? '#22c55e' : '#ef4444';
    toast.innerHTML = `<div class="alert-content"><b>${type === 'success' ? 'Thanh cong' : 'Loi'}</b><span>${message}</span></div>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// --- OTHERS ---
async function checkCloudStatus() {
    try {
        const res = await fetch(CONFIG.BACKEND_URL + '/health');
        const data = await res.json();
        const online = data.status === 'online';
        const dot = document.getElementById('cloud-dot');
        const txt = document.getElementById('cloud-status');
        if (dot) dot.classList.toggle('online', online);
        if (txt) txt.innerText = online ? 'TRUC TUYEN' : 'NGOAI TUYEN';
    } catch (e) {
        // ignore transient backend startup errors
    }
}

async function loadImages() {
    try {
        const res = await fetch(CONFIG.BACKEND_URL + '/images');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
            const latest = data[0];
            const latestUrl = latest.image_url || latest.url || latest.path;
            const img = document.getElementById('latest-img');
            const overlay = document.getElementById('overlay-img');
            if (img) img.src = latestUrl;
            if (overlay) overlay.src = latestUrl;
            const body = document.getElementById('history-table-body');
            if (body) {
                body.innerHTML = data.map(item => {
                    const url = item.image_url || item.url || item.path;
                    const time = new Date(item.timestamp || item.created_at).toLocaleString();
                    return `<tr><td>${time}</td><td>Camera</td><td>Su kien #${item.id}</td><td><button onclick="window.open('${url}', '_blank')">View</button></td></tr>`;
                }).join('');
            }
        }
    } catch (e) {
        console.error('Load images error:', e);
    }
}

function initSupabase() {
    if (typeof supabase === 'undefined') return;
    dbClient = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
    dbClient.channel('db').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'stroke_events' }, () => loadImages()).subscribe();
}

window.addEventListener('DOMContentLoaded', () => {
    initMQTT();
    initSupabase();
    initCharts();
    loadImages();
    checkCloudStatus();
    setInterval(checkCloudStatus, 5000);
});
