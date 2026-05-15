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
let lastChartUpdateTime = 0; // For 30s sampling logic

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
    const titles = { 'home': 'TRANG CHỦ', 'stats': 'THỐNG KÊ', 'history': 'LỊCH SỬ' };
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
                { label: 'Nhiệt độ (°C)', data: [], borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', fill: true, tension: 0.3 },
                { label: 'Độ ẩm (%)', data: [], borderColor: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.1)', fill: true, tension: 0.3 }
            ]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { x: { grid: { display: false } } } }
    });

    charts.gas = new Chart(gasCanvas.getContext('2d'), {
        type: 'line', // CHANGED TO LINE
        data: {
            labels: [],
            datasets: [{ 
                label: 'Nồng độ Gas (ppm)', 
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
    console.log('🔄 Resetting session data...');
    sessionData.labels = []; sessionData.temp = []; sessionData.humi = []; sessionData.gas = [];
    sessionData.stats = { tempSum: 0, tempCount: 0, humiSum: 0, humiCount: 0, gasSum: 0, gasCount: 0, fireAlarms: 0 };
    lastChartUpdateTime = 0;
    updateStatsSummary();
    if (charts.main) { charts.main.data.labels = []; charts.main.data.datasets.forEach(d => d.data = []); charts.main.update(); }
    if (charts.gas) { charts.gas.data.labels = []; charts.gas.data.datasets[0].data = []; charts.gas.update(); }
}

// --- MQTT ---
function initMQTT() {
    const clientId = 'web_' + Math.random().toString(16).substr(2, 8);
    mqttClient = mqtt.connect(CONFIG.MQTT_WS_URL, { clientId, username: CONFIG.MQTT_USER, password: CONFIG.MQTT_PASS });
    mqttClient.on('connect', () => { updateMQTTStatus(true); mqttClient.subscribe(CONFIG.MQTT_TOPIC_SENSORS); resetSessionData(); });
    mqttClient.on('message', (topic, msg) => handleMqttMessage(topic, msg.toString()));
    mqttClient.on('error', () => updateMQTTStatus(false));
    mqttClient.on('close', () => updateMQTTStatus(false));
}

function updateMQTTStatus(online) {
    const dot = document.getElementById('mqtt-dot');
    const status = document.getElementById('mqtt-status');
    if (dot) dot.classList.toggle('online', online);
    if (status) status.innerText = online ? 'TRỰC TUYẾN' : 'NGOẠI TUYẾN';
}

// --- DATA HANDLING ---
function handleMqttMessage(topic, payload) {
    const nowTs = Date.now();
    const nowTimeStr = new Date().toLocaleTimeString('vi-VN', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    if (topic === 'wokwi/sensors/data') {
        try {
            const data = JSON.parse(payload);
            
            // 1. Update REAL-TIME UI (Home & Summary)
            // Temperature
            const temp = data.temp !== undefined ? data.temp : data.temperature;
            if (temp !== undefined) {
                const val = parseFloat(temp);
                const el = document.getElementById('temp-val');
                if (el) el.innerText = val.toFixed(1);
                sessionData.stats.tempSum += val; sessionData.stats.tempCount++;
            }

            // Gas
            const gas = data.gas;
            if (gas !== undefined) {
                const val = parseInt(gas);
                const el = document.getElementById('gas-val');
                if (el) el.innerText = val;
                sessionData.stats.gasSum += val; sessionData.stats.gasCount++;
            }

            // Fire
            if (data.fire !== undefined) {
                const isFire = data.fire === 1;
                const el = document.getElementById('fire-val');
                if (el) { el.innerText = isFire ? "🔥 NGUY HIỂM" : "AN TOÀN"; el.style.color = isFire ? "red" : "green"; }
                if (isFire) sessionData.stats.fireAlarms++;
            }

            // Humidity
            const humi = data.humi !== undefined ? data.humi : (data.humidity !== undefined ? data.humidity : (data.hum !== undefined ? data.hum : data.h));
            if (humi !== undefined) {
                const val = parseFloat(humi);
                const el = document.getElementById('humi-val');
                if (el) el.innerText = val.toFixed(1);
                sessionData.stats.humiSum += val; sessionData.stats.humiCount++;
            }

            updateStatsSummary();

            // 2. Update CHARTS (Every 30 seconds)
            if (nowTs - lastChartUpdateTime >= 30000) {
                updateChartsData(nowTimeStr, temp, humi, gas);
                lastChartUpdateTime = nowTs;
            }

        } catch (e) { console.error('Parse Error', e); }
    }
}

function updateStatsSummary() {
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
    if (sessionData.stats.tempCount > 0) set('stats-temp-val', (sessionData.stats.tempSum / sessionData.stats.tempCount).toFixed(1) + '°C');
    if (sessionData.stats.gasCount > 0) set('stats-gas-val', Math.round(sessionData.stats.gasSum / sessionData.stats.gasCount) + ' ppm');
    if (sessionData.stats.humiCount > 0) set('stats-humi-val', (sessionData.stats.humiSum / sessionData.stats.humiCount).toFixed(1) + ' %');
    set('stats-fire-count', sessionData.stats.fireAlarms);
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

// --- OTHERS ---
async function checkCloudStatus() {
    try {
        const res = await fetch(CONFIG.BACKEND_URL + '/health');
        const data = await res.json();
        const online = data.status === 'online';
        const dot = document.getElementById('cloud-dot');
        const txt = document.getElementById('cloud-status');
        if (dot) dot.classList.toggle('online', online);
        if (txt) txt.innerText = online ? 'TRỰC TUYẾN' : 'NGOẠI TUYẾN';
    } catch (e) { /* ignore */ }
}

async function loadImages() {
    try {
        const res = await fetch(CONFIG.BACKEND_URL + '/images');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
            const l = data[0];
            const img = document.getElementById('latest-img');
            if (img) img.src = l.image_url || l.url || l.path;
            const body = document.getElementById('history-table-body');
            if (body) {
                body.innerHTML = data.map(img => `<tr><td>${new Date(img.created_at).toLocaleString()}</td><td>Camera</td><td>Sự kiện #${img.id}</td><td><button onclick="window.open('${img.image_url||img.url||img.path}', '_blank')">👁️</button></td></tr>`).join('');
            }
        }
    } catch (e) { }
}

function initSupabase() {
    if (typeof supabase === 'undefined') return;
    dbClient = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
    dbClient.channel('db').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'stroke_events' }, () => loadImages()).subscribe();
}

window.addEventListener('DOMContentLoaded', () => {
    initMQTT(); initSupabase(); initCharts(); loadImages(); checkCloudStatus(); setInterval(checkCloudStatus, 5000);
});
