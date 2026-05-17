const CONFIG = {
    BACKEND_URL: 'http://localhost:3001/api',
    SUPABASE_URL: 'https://ypddfcoesrtvjabyqqta.supabase.co',
    SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZGRmY29lc3J0dmphYnlxcXRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzMDMwODcsImV4cCI6MjA5Mzg3OTA4N30.K_muE0c9BaWsyTXHU4qJg1BnMN-qJP8Evam1_kIZss8'
};

const INACTIVE_ALERT_VALUES = new Set(['0', 'false', 'no', 'none', 'ok', 'safe', 'normal', 'off']);
const ACTIVE_ALERT_VALUES = new Set(['1', 'true', 'yes', 'danger', 'alert', 'warning', 'fire', 'gas', 'temp', 'temperature', 'humidity']);

let dbClient = null;
let charts = { main: null, gas: null };
let lastChartUpdateTime = 0;
let lastBackendSensorAt = '';
let lastToastKey = '';
let lastImageKey = '';
let imagesBootstrapped = false;

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

function switchPage(pageId, event) {
    if (event) event.preventDefault();
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    const activeNav = Array.from(document.querySelectorAll('.nav-item')).find(item =>
        item.getAttribute('onclick') && item.getAttribute('onclick').includes(pageId)
    );
    if (activeNav) activeNav.classList.add('active');

    document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
    document.getElementById(`${pageId}-view`)?.classList.add('active');

    const titles = { home: 'Trang chủ', stats: 'Thống kê', history: 'Lịch sử' };
    setText('page-title', titles[pageId] || 'Bảng điều khiển');
}

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
                { label: 'Độ ẩm (%)', data: [], borderColor: '#0ea5e9', backgroundColor: 'rgba(14, 165, 233, 0.1)', fill: true, tension: 0.3 }
            ]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { x: { grid: { display: false } } } }
    });

    charts.gas = new Chart(gasCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Nồng độ gas (ppm)',
                data: [],
                borderColor: '#d97706',
                backgroundColor: 'rgba(217, 119, 6, 0.12)',
                fill: true,
                tension: 0.3
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { x: { grid: { display: false } } } }
    });
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerText = value;
}

function firstDefined(...values) {
    return values.find(value => value !== undefined && value !== null);
}

function numericValue(value) {
    if (value === undefined || value === null || value === '') return undefined;
    const number = Number(value);
    return Number.isFinite(number) ? number : undefined;
}

function normalizeSensorData(data = {}) {
    const raw = data.raw && typeof data.raw === 'object' ? data.raw : {};
    return {
        temp: numericValue(firstDefined(raw.temp, raw.temperature, data.temp, data.temperature, data.t)),
        humi: numericValue(firstDefined(raw.humi, raw.humidity, raw.hum, data.humi, data.humidity, data.hum, data.h)),
        gas: numericValue(firstDefined(raw.gas, raw.gasValue, raw.gas_value, data.gas, data.gasValue, data.gas_value)),
        fire: firstDefined(raw.fire, raw.flame, raw.isFire, data.fire, data.flame, data.isFire),
        alert: firstDefined(raw.alert, raw.warning, raw.alarm, data.alert, data.warning, data.alarm),
        thresholds: {
            temp: numericValue(firstDefined(raw.th_temp, raw.temp_threshold, raw.tempThreshold, data.th_temp, data.temp_threshold, data.tempThreshold, data.thresholds?.temperature)),
            humi: numericValue(firstDefined(raw.th_humidity, raw.th_hum, raw.humidity_threshold, raw.humidityThreshold, data.th_humidity, data.th_hum, data.humidity_threshold, data.humidityThreshold, data.thresholds?.humidity)),
            gas: numericValue(firstDefined(raw.th_gas, raw.gas_threshold, raw.gasThreshold, data.th_gas, data.gas_threshold, data.gasThreshold, data.thresholds?.gas))
        }
    };
}

function hasAlertValue(value) {
    return value !== undefined && value !== null && String(value).trim() !== '';
}

function alertText(value) {
    return String(value || '').trim().toLowerCase();
}

function isInactiveAlertValue(value) {
    return hasAlertValue(value) && INACTIVE_ALERT_VALUES.has(alertText(value));
}

function isActiveAlertValue(value) {
    if (!hasAlertValue(value)) return false;
    const text = alertText(value);
    return ACTIVE_ALERT_VALUES.has(text) || !INACTIVE_ALERT_VALUES.has(text);
}

function isTruthy(value) {
    return value === true || value === 1 || ACTIVE_ALERT_VALUES.has(alertText(value));
}

function isInactiveAlertMessage(message) {
    const text = alertText(message);
    return INACTIVE_ALERT_VALUES.has(text)
        || text.includes('cảnh báo: none')
        || text.includes('canh bao: none')
        || text.includes('alert: none')
        || text.includes('warning: none');
}

function getThreshold(type) {
    const ids = { temp: 'temp-limit-input', humi: 'humi-limit-input', gas: 'gas-limit-input' };
    const fallback = { temp: 50, humi: 60, gas: 1500 };
    const value = Number(document.getElementById(ids[type])?.value);
    return Number.isFinite(value) ? value : fallback[type];
}

function inferAlertType(message = '') {
    const text = alertText(message);
    if (text.includes('lửa') || text.includes('lua') || text.includes('cháy') || text.includes('chay') || text.includes('fire') || text.includes('flame')) return 'fire';
    if (text.includes('nhiệt') || text.includes('nhiet') || text.includes('temperature') || text.includes('temp') || text.includes('°c')) return 'temp';
    if (text.includes('ẩm') || text.includes('am') || text.includes('humidity') || text.includes('humi')) return 'humi';
    if (text.includes('gas') || text.includes('ppm')) return 'gas';
    return 'sensor';
}

function cardIdForType(type, sensorData, message = '') {
    const inferredType = type && type !== 'sensor' ? type : inferAlertType(message);
    if (inferredType === 'fire') return 'fire-card';
    if (inferredType === 'temp' || inferredType === 'temperature') return 'temp-card';
    if (inferredType === 'humi' || inferredType === 'humidity') return 'humi-card';
    if (inferredType === 'gas') return 'gas-card';

    const thresholds = {
        temp: sensorData.thresholds.temp ?? getThreshold('temp'),
        humi: sensorData.thresholds.humi ?? getThreshold('humi'),
        gas: sensorData.thresholds.gas ?? getThreshold('gas')
    };
    if (isTruthy(sensorData.fire)) return 'fire-card';
    if (sensorData.temp !== undefined && sensorData.temp >= thresholds.temp) return 'temp-card';
    if (sensorData.gas !== undefined && sensorData.gas >= thresholds.gas) return 'gas-card';
    if (sensorData.humi !== undefined && sensorData.humi >= thresholds.humi) return 'humi-card';
    return null;
}

function buildBackendIssues(latestAlert, sensorData) {
    const sourceIssues = Array.isArray(latestAlert?.issues) && latestAlert.issues.length > 0
        ? latestAlert.issues
        : [{ type: inferAlertType(latestAlert?.message), message: latestAlert?.message }];

    return sourceIssues
        .map(issue => {
            const message = typeof issue === 'string' ? issue : (issue.message || latestAlert?.message || '');
            const type = typeof issue === 'string' ? inferAlertType(issue) : (issue.type || inferAlertType(message));
            if (!message || isInactiveAlertMessage(message)) return null;
            return { type, cardId: cardIdForType(type, sensorData, message), message };
        })
        .filter(Boolean);
}

function buildAlertInfo(sensorData, latestAlert = null) {
    const issues = [];
    const thresholds = {
        temp: sensorData.thresholds.temp ?? getThreshold('temp'),
        humi: sensorData.thresholds.humi ?? getThreshold('humi'),
        gas: sensorData.thresholds.gas ?? getThreshold('gas')
    };

    if (isInactiveAlertValue(sensorData.alert) || isInactiveAlertMessage(latestAlert?.message)) {
        return { active: false, issues: [] };
    }

    if (latestAlert?.message || latestAlert?.issues?.length) {
        const backendIssues = buildBackendIssues(latestAlert, sensorData);
        return { active: backendIssues.length > 0, issues: backendIssues };
    }

    if (isTruthy(sensorData.fire)) issues.push({ type: 'fire', cardId: 'fire-card', message: 'Phát hiện lửa hoặc tín hiệu cháy từ cảm biến.' });
    if (sensorData.temp !== undefined && sensorData.temp >= thresholds.temp) issues.push({ type: 'temp', cardId: 'temp-card', message: `Nhiệt độ ${sensorData.temp.toFixed(1)}°C vượt ngưỡng ${thresholds.temp}°C.` });
    if (sensorData.gas !== undefined && sensorData.gas >= thresholds.gas) issues.push({ type: 'gas', cardId: 'gas-card', message: `Nồng độ gas ${Math.round(sensorData.gas)} ppm vượt ngưỡng ${Math.round(thresholds.gas)} ppm.` });
    if (sensorData.humi !== undefined && sensorData.humi >= thresholds.humi) issues.push({ type: 'humi', cardId: 'humi-card', message: `Độ ẩm ${sensorData.humi.toFixed(1)}% vượt ngưỡng ${thresholds.humi}%.` });
    if (isActiveAlertValue(sensorData.alert)) {
        const cardId = cardIdForType('sensor', sensorData, sensorData.alert);
        issues.push({ type: 'sensor', cardId, message: `Wokwi gửi cảnh báo: ${sensorData.alert}` });
    }

    return { active: issues.length > 0, issues };
}

function updateAlertUI(alertInfo, timeText = '') {
    document.querySelectorAll('.sensor-card').forEach(card => card.classList.remove('danger-glow'));
    const banner = document.getElementById('active-alert-banner');

    if (!alertInfo.active) {
        if (banner) banner.classList.add('hidden');
        lastToastKey = '';
        return;
    }

    alertInfo.issues.forEach(issue => {
        if (issue.cardId) document.getElementById(issue.cardId)?.classList.add('danger-glow');
    });

    const message = alertInfo.issues.map(issue => issue.message).join(' ');
    if (banner) {
        banner.classList.remove('hidden');
        setText('active-alert-title', 'Cảnh báo cảm biến');
        setText('active-alert-message', message);
        setText('active-alert-time', timeText);
    }

    const toastKey = `${message}-${timeText}`;
    if (toastKey !== lastToastKey) {
        showToast(message, 'warning');
        lastToastKey = toastKey;
    }
}

function updateSensorCards(data, timeText) {
    if (data.temp !== undefined) {
        setText('temp-val', data.temp.toFixed(1));
        setText('temp-time', `Cập nhật lúc ${timeText}`);
        sessionData.stats.tempSum += data.temp;
        sessionData.stats.tempCount++;
    }
    if (data.gas !== undefined) {
        setText('gas-val', Math.round(data.gas));
        setText('gas-time', `Cập nhật lúc ${timeText}`);
        sessionData.stats.gasSum += data.gas;
        sessionData.stats.gasCount++;
    }
    if (data.fire !== undefined) {
        const isFire = isTruthy(data.fire);
        const el = document.getElementById('fire-val');
        if (el) {
            el.innerText = isFire ? 'Nguy hiểm' : 'An toàn';
            el.style.color = isFire ? 'var(--danger)' : 'var(--success)';
        }
        setText('fire-time', `Cập nhật lúc ${timeText}`);
        if (isFire) sessionData.stats.fireAlarms++;
    }
    if (data.humi !== undefined) {
        setText('humi-val', data.humi.toFixed(1));
        setText('humi-time', `Cập nhật lúc ${timeText}`);
        sessionData.stats.humiSum += data.humi;
        sessionData.stats.humiCount++;
    }
}

function updateStatsSummary() {
    if (sessionData.stats.tempCount > 0) setText('stats-temp-val', (sessionData.stats.tempSum / sessionData.stats.tempCount).toFixed(1) + ' °C');
    if (sessionData.stats.gasCount > 0) setText('stats-gas-val', Math.round(sessionData.stats.gasSum / sessionData.stats.gasCount) + ' ppm');
    if (sessionData.stats.humiCount > 0) setText('stats-humi-val', (sessionData.stats.humiSum / sessionData.stats.humiCount).toFixed(1) + ' %');
    setText('stats-fire-count', sessionData.stats.fireAlarms);
}

function updateChartsData(time, temp, humi, gas) {
    if (!charts.main || !charts.gas) return;
    sessionData.labels.push(time);
    sessionData.temp.push(temp !== undefined ? temp : (sessionData.temp.at(-1) || 0));
    sessionData.humi.push(humi !== undefined ? humi : (sessionData.humi.at(-1) || 0));
    sessionData.gas.push(gas !== undefined ? gas : (sessionData.gas.at(-1) || 0));

    if (sessionData.labels.length > sessionData.maxPoints) {
        [sessionData.labels, sessionData.temp, sessionData.humi, sessionData.gas].forEach(item => item.shift());
    }

    charts.main.data.labels = sessionData.labels;
    charts.main.data.datasets[0].data = sessionData.temp;
    charts.main.data.datasets[1].data = sessionData.humi;
    charts.main.update('none');

    charts.gas.data.labels = sessionData.labels;
    charts.gas.data.datasets[0].data = sessionData.gas;
    charts.gas.update('none');
}

function updateConnectionBadges(health) {
    const mqttOnline = !!health.mqtt;
    const supabaseOnline = !!(health.supabaseStatus?.connected ?? health.supabase);
    const supabaseError = health.supabaseStatus?.error || '';

    document.getElementById('mqtt-dot')?.classList.toggle('online', mqttOnline);
    setText('mqtt-status', mqttOnline ? 'Đã kết nối' : 'Mất kết nối');

    const supabaseDot = document.getElementById('cloud-dot');
    const supabaseText = document.getElementById('cloud-status');
    supabaseDot?.classList.toggle('online', supabaseOnline);
    if (supabaseText) {
        supabaseText.innerText = supabaseOnline ? 'Đã kết nối' : 'Lỗi kết nối';
        supabaseText.title = supabaseError;
    }
}

async function checkBackendStatus() {
    try {
        const res = await fetch(CONFIG.BACKEND_URL + '/health', { cache: 'no-store' });
        const data = await res.json();
        updateConnectionBadges(data);

        const latestSensor = data.latestSensorData || {};
        const sensorData = normalizeSensorData(latestSensor);
        const updatedAt = latestSensor.updatedAt || data.latestAlert?.updatedAt || '';
        const timeText = updatedAt
            ? new Date(updatedAt).toLocaleTimeString('vi-VN', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
            : new Date().toLocaleTimeString('vi-VN', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

        if (latestSensor.updatedAt && latestSensor.updatedAt !== lastBackendSensorAt) {
            updateSensorCards(sensorData, timeText);
            updateStatsSummary();
            if (Date.now() - lastChartUpdateTime >= 30000) {
                updateChartsData(timeText, sensorData.temp, sensorData.humi, sensorData.gas);
                lastChartUpdateTime = Date.now();
            }
            lastBackendSensorAt = latestSensor.updatedAt;
        }

        updateAlertUI(buildAlertInfo(sensorData, data.latestAlert), timeText);
    } catch (e) {
        document.getElementById('mqtt-dot')?.classList.remove('online');
        document.getElementById('cloud-dot')?.classList.remove('online');
        setText('mqtt-status', 'Mất kết nối');
        setText('cloud-status', 'Không kiểm tra được');
    }
}

async function setThreshold(type) {
    const inputMap = { gas: 'gas-limit-input', temp: 'temp-limit-input', humi: 'humi-limit-input' };
    const deviceMap = { gas: 'gas_threshold', temp: 'temp_threshold', humi: 'humi_threshold' };
    const labels = { gas: 'gas', temp: 'nhiệt độ', humi: 'độ ẩm' };

    const input = document.getElementById(inputMap[type]);
    if (!input) return;

    const value = Number(input.value);
    if (!Number.isFinite(value)) {
        showToast('Giá trị ngưỡng không hợp lệ.', 'error');
        return;
    }

    const button = input.closest('.input-with-btn')?.querySelector('button');
    const originalText = button ? button.innerText : '';
    if (button) {
        button.disabled = true;
        button.innerText = 'Đang gửi...';
    }

    try {
        const res = await fetch(CONFIG.BACKEND_URL + '/control', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ device: deviceMap[type], value })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || 'Không gửi được lệnh MQTT.');
        showToast(`Đã gửi ngưỡng ${labels[type]}: ${value}`, 'success');
    } catch (err) {
        showToast(err.message || 'Không gửi được lệnh điều khiển.', 'error');
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
    const titleMap = { success: 'Thành công', error: 'Lỗi', warning: 'Cảnh báo', danger: 'Cảnh báo mới' };
    const icon = type === 'warning' || type === 'danger' ? 'triangle-alert' : type === 'error' ? 'circle-x' : 'circle-check';
    toast.className = `alert-toast ${type}`;
    toast.innerHTML = `<div class="alert-icon"><i data-lucide="${icon}"></i></div><div class="alert-content"><b>${titleMap[type] || 'Thông báo'}</b><span>${escapeHtml(message)}</span></div>`;
    container.appendChild(toast);
    if (window.lucide) lucide.createIcons();
    setTimeout(() => toast.remove(), type === 'warning' || type === 'danger' ? 6500 : 3200);
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[char]));
}

function getImageUrl(item = {}) {
    return item.image_url || item.url || item.path || '';
}

function getImageKey(item = {}) {
    return String(firstDefined(item.id, item.created_at, item.timestamp, getImageUrl(item), ''));
}

function cacheBustedUrl(url, key) {
    if (!url) return '';
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}v=${encodeURIComponent(key || Date.now())}`;
}

function notifyNewImage(item) {
    const streamCard = document.querySelector('.stream-card');
    streamCard?.classList.add('new-image-alert');
    setTimeout(() => streamCard?.classList.remove('new-image-alert'), 6000);

    const time = new Date(item.timestamp || item.created_at || Date.now()).toLocaleString('vi-VN');
    showToast(`AI đã phát hiện sự kiện và cập nhật ảnh mới lúc ${time}.`, 'danger');
}

async function loadImages(source = 'poll') {
    try {
        const res = await fetch(CONFIG.BACKEND_URL + '/images', { cache: 'no-store' });
        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) return;

        const latest = data[0];
        const latestKey = getImageKey(latest);
        const latestUrl = getImageUrl(latest);
        const hasNewImage = imagesBootstrapped && latestKey && latestKey !== lastImageKey;
        const img = document.getElementById('latest-img');
        const overlay = document.getElementById('overlay-img');
        const displayUrl = cacheBustedUrl(latestUrl, latestKey);
        if (img && latestUrl) img.src = displayUrl;
        if (overlay && latestUrl) overlay.src = displayUrl;

        const body = document.getElementById('history-table-body');
        if (body) {
            body.innerHTML = data.map(item => {
                const url = getImageUrl(item);
                const time = new Date(item.timestamp || item.created_at).toLocaleString('vi-VN');
                const rowClass = getImageKey(item) === latestKey && hasNewImage ? ' class="new-event-row"' : '';
                return `<tr${rowClass}><td>${escapeHtml(time)}</td><td>Camera</td><td>Sự kiện #${escapeHtml(item.id)}</td><td><button class="btn-view-img" onclick="window.open('${escapeHtml(url)}', '_blank')" aria-label="Xem ảnh"><i data-lucide="image"></i></button></td></tr>`;
            }).join('');
            setText('total-records', `Tổng cộng: ${data.length}`);
            if (window.lucide) lucide.createIcons();
        }

        if (hasNewImage) notifyNewImage(latest);
        lastImageKey = latestKey;
        imagesBootstrapped = true;
    } catch (e) {
        console.error('Lỗi tải hình ảnh:', e);
    }
}

function initSupabaseRealtime() {
    if (typeof supabase === 'undefined') return;
    dbClient = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
    dbClient
        .channel('stroke-events-realtime')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'stroke_events' }, () => loadImages('realtime'))
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'stroke_events' }, () => loadImages('realtime'))
        .subscribe();
}

window.addEventListener('DOMContentLoaded', () => {
    setText('mqtt-status', 'Đang kiểm tra');
    setText('cloud-status', 'Đang kiểm tra');
    initSupabaseRealtime();
    initCharts();
    loadImages();
    checkBackendStatus();
    setInterval(checkBackendStatus, 2000);
    setInterval(() => loadImages('poll'), 2000);
});
