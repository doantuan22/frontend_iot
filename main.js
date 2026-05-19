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
let pendingImageAlertKey = '';
let imagesBootstrapped = false;
let databaseRows = [];
let statisticsLoading = false;
let lastStatisticsKey = '';

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

    if (pageId === 'database') {
        setText('page-title', 'Cơ sở dữ liệu');
        loadDatabaseRows();
        return;
    }

    if (pageId === 'stats') {
        loadStatistics();
    }

    if (pageId === 'history') {
        loadHistory();
    }

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
                { label: 'Nhiệt độ (°C)', data: [], borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', fill: true, tension: 0.3, spanGaps: true },
                { label: 'Độ ẩm (%)', data: [], borderColor: '#0ea5e9', backgroundColor: 'rgba(14, 165, 233, 0.1)', fill: true, tension: 0.3, spanGaps: true }
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
                tension: 0.3,
                spanGaps: true
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

function initStatisticsControls() {
    const rangeSelect = document.getElementById('time-range');
    const typeSelect = document.getElementById('data-type');

    if (rangeSelect) {
        const rangeOptions = [
            { value: 'today', label: 'Hôm nay' },
            { value: '7d', label: '7 ngày gần nhất' },
            { value: '30d', label: '30 ngày gần nhất' }
        ];
        Array.from(rangeSelect.options).forEach((option, index) => {
            option.value = rangeOptions[index]?.value || option.value;
            option.textContent = rangeOptions[index]?.label || option.textContent;
        });
        rangeSelect.value = 'today';
        rangeSelect.addEventListener('change', () => loadStatistics(true));
    }

    if (typeSelect) {
        const typeOptions = [
            { value: 'sensor', label: 'Thống kê cảm biến' },
            { value: 'stroke_event', label: 'Thống kê cảnh báo đột quỵ' }
        ];
        Array.from(typeSelect.options).forEach((option, index) => {
            option.value = typeOptions[index]?.value || option.value;
            option.textContent = typeOptions[index]?.label || option.textContent;
        });
        typeSelect.value = 'sensor';
        typeSelect.addEventListener('change', () => loadStatistics(true));
    }
}

function getStatisticsRange() {
    return document.getElementById('time-range')?.value || 'today';
}

function getStatisticsType() {
    return document.getElementById('data-type')?.value || 'sensor';
}

function formatStatNumber(value, digits = 1) {
    const number = Number(value);
    if (!Number.isFinite(number)) return '--';
    return Number.isInteger(number) ? String(number) : number.toFixed(digits);
}

function rangeLabel(range) {
    if (range === '7d') return '7 ngày gần nhất';
    if (range === '30d') return '30 ngày gần nhất';
    return 'hôm nay';
}

function setStatisticsMode(type) {
    const isStroke = type === 'stroke_event';
    document.getElementById('sensor-stats-summary')?.classList.toggle('hidden', isStroke);
    document.getElementById('sensor-stats-charts')?.classList.toggle('hidden', isStroke);
    document.getElementById('stroke-stats-panel')?.classList.toggle('hidden', !isStroke);
}

function chartMetricPoints(points, key) {
    return points
        .filter(point => Number.isFinite(Number(point[key])))
        .map(point => ({ x: point.label, y: Number(point[key]) }));
}

function renderSensorStatistics(data) {
    const summary = data.summary || {};
    const points = Array.isArray(data.points) ? data.points : [];
    const label = rangeLabel(data.range);

    setStatisticsMode('sensor');
    setText('stats-temp-val', `${formatStatNumber(summary.avgTemperature)} °C`);
    setText('stats-gas-val', `${formatStatNumber(summary.avgGas, 0)} ppm`);
    setText('stats-humi-val', `${formatStatNumber(summary.avgHumidity)} %`);
    setText('stats-fire-count', summary.alertCount || 0);
    setText('stats-temp-desc', `Dữ liệu ${label}`);
    setText('stats-gas-desc', `Dữ liệu ${label}`);
    setText('stats-humi-desc', `Dữ liệu ${label}`);
    setText('stats-fire-desc', `Cảnh báo trong ${label}`);

    if (!charts.main || !charts.gas) return;

    charts.main.data.labels = points.map(point => point.label);
    charts.main.data.datasets[0].data = chartMetricPoints(points, 'temperature');
    charts.main.data.datasets[1].data = chartMetricPoints(points, 'humidity');
    charts.main.update();

    charts.gas.data.labels = points.map(point => point.label);
    charts.gas.data.datasets[0].data = chartMetricPoints(points, 'gas');
    charts.gas.update();
}

function renderStrokeStatistics(data) {
    const summary = data.summary || {};
    const days = Array.isArray(data.days) ? data.days : [];
    const maxCount = Math.max(1, ...days.map(day => Number(day.count) || 0));

    setStatisticsMode('stroke_event');
    setText('stroke-total-val', summary.total || 0);
    setText('stroke-total-desc', `Theo số ảnh AI gửi về trong ${rangeLabel(data.range)}`);
    setText('stroke-max-val', summary.maxDay?.label || '--');
    setText('stroke-max-desc', `${summary.maxDay?.count || 0} sự kiện`);
    setText('stroke-average-val', formatStatNumber(summary.averagePerDay || 0, 1));

    const list = document.getElementById('stroke-frequency-list');
    if (!list) return;

    list.innerHTML = days.length ? days.map(day => {
        const count = Number(day.count) || 0;
        const width = Math.max(4, Math.round((count / maxCount) * 100));
        return `<div class="stroke-frequency-item">
            <div class="stroke-frequency-meta">
                <span>${escapeHtml(day.label)}</span>
                <strong>${count} ảnh</strong>
            </div>
            <div class="stroke-frequency-bar"><span style="width: ${width}%"></span></div>
        </div>`;
    }).join('') : '<div class="empty-state">Không có dữ liệu đột quỵ trong khoảng thời gian này.</div>';
}

async function loadStatistics(force = false) {
    const statsViewActive = document.getElementById('stats-view')?.classList.contains('active');
    if (!statsViewActive && !force) return;
    if (statisticsLoading) return;

    const type = getStatisticsType();
    const range = getStatisticsRange();
    const key = `${type}-${range}`;
    if (!force && key === lastStatisticsKey && Date.now() - lastChartUpdateTime < 10000) return;

    statisticsLoading = true;
    lastStatisticsKey = key;

    try {
        const params = new URLSearchParams({ type, range });
        const res = await fetch(`${CONFIG.BACKEND_URL}/statistics?${params}`, { cache: 'no-store' });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || 'Không tải được dữ liệu thống kê.');

        if (data.type === 'stroke_event') {
            renderStrokeStatistics(data);
        } else {
            renderSensorStatistics(data);
        }

        lastChartUpdateTime = Date.now();
    } catch (err) {
        showToast(err.message, 'error');
    } finally {
        statisticsLoading = false;
    }
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
            lastBackendSensorAt = latestSensor.updatedAt;
            loadStatistics();
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

function getDatabaseTable() {
    return document.getElementById('database-table')?.value || 'stroke_events';
}

function getDatabaseRange() {
    const startValue = document.getElementById('database-start')?.value;
    const endValue = document.getElementById('database-end')?.value;
    return {
        start: startValue ? `${startValue}:00` : '',
        end: endValue ? `${endValue}:59` : ''
    };
}

function formatDatabaseTime(value) {
    if (!value) return '--';
    const text = String(value);
    const date = new Date(/[zZ]|[+-]\d{2}:\d{2}$/.test(text) ? text : text.replace(' ', 'T'));
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleString('vi-VN');
}

function databaseColumnValue(row, keys) {
    for (const key of keys) {
        if (row[key] !== undefined && row[key] !== null && row[key] !== '') return row[key];
    }
    return '';
}

function inlineJsString(value) {
    const text = String(value ?? '')
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'");
    return `'${text}'`;
}

function renderDatabaseTable(table, rows) {
    const head = document.getElementById('database-table-head');
    const body = document.getElementById('database-table-body');
    if (!head || !body) return;

    if (table === 'sensor_data') {
        head.innerHTML = '<tr><th>ID</th><th>Cảm biến</th><th>Thông số</th><th>Cảnh báo</th><th>Thời gian</th><th>Thao tác</th></tr>';
        body.innerHTML = rows.length ? rows.map(row => {
            const metrics = [
                row.temperature !== null && row.temperature !== undefined ? `Nhiệt độ: ${escapeHtml(row.temperature)} °C` : '',
                row.humidity !== null && row.humidity !== undefined ? `Độ ẩm: ${escapeHtml(row.humidity)} %` : '',
                row.gas_value !== null && row.gas_value !== undefined ? `Gas: ${escapeHtml(row.gas_value)} ppm` : '',
                row.fire_detected ? 'Có lửa' : ''
            ].filter(Boolean).join('<br>');

            return `<tr>
                <td>${escapeHtml(row.id)}</td>
                <td>${escapeHtml(row.sensor_name || '--')}</td>
                <td>${metrics || '--'}</td>
                <td>${escapeHtml(row.warning || '--')}</td>
                <td>${escapeHtml(formatDatabaseTime(row.created_at))}</td>
                <td><button class="database-icon-btn danger" type="button" onclick="deleteDatabaseRow('${table}', ${inlineJsString(row.id)})" aria-label="Xóa"><i data-lucide="trash-2"></i></button></td>
            </tr>`;
        }).join('') : '<tr><td colspan="6">Không có dữ liệu phù hợp.</td></tr>';
        return;
    }

    head.innerHTML = '<tr><th>ID</th><th>Thời gian</th><th>Chi tiết</th><th>Hình ảnh</th><th>Thao tác</th></tr>';
    body.innerHTML = rows.length ? rows.map(row => {
        const time = databaseColumnValue(row, ['timestamp', 'created_at']);
        const imageUrl = getImageUrl(row);
        const detail = databaseColumnValue(row, ['event_type', 'label', 'description', 'warning', 'status']) || `Sự kiện #${row.id}`;

        return `<tr>
            <td>${escapeHtml(row.id)}</td>
            <td>${escapeHtml(formatDatabaseTime(time))}</td>
            <td>${escapeHtml(detail)}</td>
            <td>${imageUrl ? `<button class="btn-view-img" onclick="window.open('${escapeHtml(imageUrl)}', '_blank')" aria-label="Xem ảnh"><i data-lucide="image"></i></button>` : '--'}</td>
            <td><button class="database-icon-btn danger" type="button" onclick="deleteDatabaseRow('${table}', ${inlineJsString(row.id)})" aria-label="Xóa"><i data-lucide="trash-2"></i></button></td>
        </tr>`;
    }).join('') : '<tr><td colspan="5">Không có dữ liệu phù hợp.</td></tr>';
}

function handleDatabaseTableChange() {
    const table = getDatabaseTable();
    document.getElementById('database-bulk-delete')?.classList.toggle('hidden', table !== 'sensor_data');
    setText('database-summary-title', table === 'sensor_data' ? 'sensor_data' : 'Stroke_event');
    setText('database-summary-note', table === 'sensor_data'
        ? 'Có thể xóa hàng loạt sensor_data theo khoảng thời gian đã chọn.'
        : 'Xóa Stroke_event sẽ cố gắng xóa ảnh trong Storage bucket surveillance-images trước.');
    loadDatabaseRows();
}

async function loadDatabaseRows() {
    const body = document.getElementById('database-table-body');
    if (!body) return;

    const table = getDatabaseTable();
    const { start, end } = getDatabaseRange();
    const params = new URLSearchParams({ limit: '100' });
    if (start) params.set('start', start);
    if (end) params.set('end', end);

    body.innerHTML = '<tr><td colspan="6">Đang tải dữ liệu...</td></tr>';

    try {
        const res = await fetch(`${CONFIG.BACKEND_URL}/database/${table}?${params}`, { cache: 'no-store' });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || 'Không tải được dữ liệu database.');

        databaseRows = data.rows || [];
        renderDatabaseTable(table, databaseRows);
        setText('database-summary-count', `${data.count || databaseRows.length} dòng`);
        document.getElementById('database-bulk-delete')?.classList.toggle('hidden', table !== 'sensor_data');
        if (window.lucide) lucide.createIcons();
    } catch (err) {
        body.innerHTML = `<tr><td colspan="6">${escapeHtml(err.message)}</td></tr>`;
        setText('database-summary-count', '0 dòng');
        showToast(err.message, 'error');
    }
}

async function deleteDatabaseRow(table, id) {
    const rowId = String(id ?? '').trim();
    if (!rowId) {
        showToast('Không tìm thấy ID của dòng cần xóa.', 'error');
        return;
    }

    const message = table === 'stroke_events'
        ? 'Xóa dòng này và ảnh liên quan trong Storage nếu tìm thấy?'
        : 'Xóa dòng dữ liệu này?';
    if (!confirm(message)) return;

    try {
        const res = await fetch(`${CONFIG.BACKEND_URL}/database/${table}/${encodeURIComponent(rowId)}`, { method: 'DELETE' });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || 'Không xóa được dòng dữ liệu.');

        const storageText = data.storage?.deleted ? ` Đã xóa ảnh: ${data.storage.path}` : '';
        showToast(`Đã xóa ${data.deleted || 0} dòng.${storageText}`, 'success');
        loadDatabaseRows();
        if (table === 'stroke_events') loadImages('database-delete');
    } catch (err) {
        showToast(err.message, 'error');
    }
}

async function deleteSensorDataByTime() {
    const { start, end } = getDatabaseRange();
    if (!start && !end) {
        showToast('Cần chọn ít nhất một mốc thời gian để xóa sensor_data.', 'error');
        return;
    }

    if (!confirm('Xóa tất cả dòng sensor_data trong khoảng thời gian đã chọn?')) return;

    try {
        const res = await fetch(`${CONFIG.BACKEND_URL}/database/sensor_data`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ start, end })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || 'Không xóa được sensor_data.');

        showToast(`Đã xóa ${data.deleted || 0} dòng sensor_data.`, 'success');
        loadDatabaseRows();
    } catch (err) {
        showToast(err.message, 'error');
    }
}

function initHistoryControls() {
    document.getElementById('history-type')?.addEventListener('change', () => loadHistory());
    document.getElementById('history-range')?.addEventListener('change', () => loadHistory());
}

function getHistoryType() {
    return document.getElementById('history-type')?.value || 'sensor';
}

function getHistoryRange() {
    return document.getElementById('history-range')?.value || 'today';
}

function sensorMetricsText(row = {}) {
    return [
        row.temperature !== null && row.temperature !== undefined ? `Nhiệt độ: ${row.temperature} °C` : '',
        row.humidity !== null && row.humidity !== undefined ? `Độ ẩm: ${row.humidity} %` : '',
        row.gas_value !== null && row.gas_value !== undefined ? `Gas: ${row.gas_value} ppm` : '',
        row.fire_detected ? 'Phát hiện lửa' : ''
    ].filter(Boolean).join('<br>');
}

function renderHistoryTable(type, rows) {
    const body = document.getElementById('history-table-body');
    if (!body) return;

    if (type === 'images') {
        body.innerHTML = rows.length ? rows.map(item => {
            const url = getImageUrl(item);
            const time = new Date(item.timestamp || item.created_at).toLocaleString('vi-VN');
            const detail = databaseColumnValue(item, ['event_type', 'label', 'description', 'status']) || `Sự kiện #${item.id}`;
            return `<tr>
                <td>${escapeHtml(time)}</td>
                <td>Ảnh AI chụp</td>
                <td>${escapeHtml(detail)}</td>
                <td>${url ? `<button class="btn-view-img" onclick="window.open('${escapeHtml(url)}', '_blank')" aria-label="Xem ảnh"><i data-lucide="image"></i></button>` : '--'}</td>
            </tr>`;
        }).join('') : '<tr><td colspan="4">Không có ảnh AI trong khoảng thời gian này.</td></tr>';
    } else {
        body.innerHTML = rows.length ? rows.map(row => {
            const metrics = sensorMetricsText(row);
            const detail = [metrics, row.warning ? escapeHtml(row.warning) : ''].filter(Boolean).join('<br>');
            return `<tr>
                <td>${escapeHtml(formatDatabaseTime(row.created_at))}</td>
                <td>Cảnh báo cảm biến</td>
                <td>${detail || '--'}</td>
                <td>--</td>
            </tr>`;
        }).join('') : '<tr><td colspan="4">Không có cảnh báo cảm biến trong khoảng thời gian này.</td></tr>';
    }

    if (window.lucide) lucide.createIcons();
}

async function loadHistory() {
    const body = document.getElementById('history-table-body');
    if (!body) return;

    const type = getHistoryType();
    const range = getHistoryRange();
    body.innerHTML = '<tr><td colspan="4">Đang tải lịch sử...</td></tr>';

    try {
        const params = new URLSearchParams({ type, range, limit: '500' });
        const res = await fetch(`${CONFIG.BACKEND_URL}/history?${params}`, { cache: 'no-store' });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || 'Không tải được lịch sử.');

        const rows = data.rows || [];
        renderHistoryTable(type, rows);
        setText('total-records', `Tổng cộng: ${data.count ?? rows.length}`);
    } catch (err) {
        body.innerHTML = `<tr><td colspan="4">${escapeHtml(err.message)}</td></tr>`;
        setText('total-records', 'Tổng cộng: 0');
        showToast(err.message, 'error');
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

function setImageAlertState(active, key = '') {
    const streamCard = document.querySelector('.stream-card');
    const button = document.getElementById('ack-image-alert-btn');
    streamCard?.classList.toggle('new-image-alert', active);
    button?.classList.toggle('hidden', !active);
    pendingImageAlertKey = active ? key : '';
}

function acknowledgeImageAlert() {
    if (pendingImageAlertKey) {
        localStorage.setItem('acknowledgedImageKey', pendingImageAlertKey);
    }
    setImageAlertState(false);
}

function notifyNewImage(item) {
    const key = getImageKey(item);
    setImageAlertState(true, key);
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

        if (hasNewImage) {
            notifyNewImage(latest);
            if (getHistoryType() === 'images') loadHistory();
        }
        if (pendingImageAlertKey && latestKey === pendingImageAlertKey) setImageAlertState(true, pendingImageAlertKey);
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
    initStatisticsControls();
    initHistoryControls();
    loadImages();
    loadHistory();
    checkBackendStatus();
    setInterval(checkBackendStatus, 2000);
    setInterval(() => loadStatistics(), 15000);
    setInterval(() => loadImages('poll'), 2000);
});
