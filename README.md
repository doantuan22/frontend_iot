# BÁO CÁO ĐỒ ÁN IOT
## HỆ THỐNG GIÁM SÁT AN TOÀN SÂN BAY BẰNG CAMERA AI VÀ CẢM BIẾN

---

# CHƯƠNG 1: TỔNG QUAN ĐỀ TÀI

## 1.1 Đặt vấn đề

Trong bối cảnh công nghệ phát triển nhanh chóng, việc ứng dụng IoT (Internet of Things) và AI (Artificial Intelligence) vào các hệ thống giám sát an toàn đang trở thành xu hướng tất yếu. Các vấn đề về an toàn trong môi trường sống và làm việc như cháy nổ, rò rỉ khí gas, nhiệt độ bất thường, cũng như các sự cố y tế đột ngột (đột quỵ, té ngã) và an ninh công cộng (hành lý bỏ lại, vũ khí nguy hiểm) đang đặt ra nhu cầu cấp thiết về một hệ thống giám sát tự động, thông minh và phản ứng nhanh.

Hệ thống truyền thống thường phụ thuộc vào sự giám sát thủ công, dẫn đến chậm trễ trong phát hiện và xử lý sự cố. Điều này có thể gây ra hậu quả nghiêm trọng về tính mạng và tài sản. Do đó, việc xây dựng một hệ thống giám sát tích hợp IoT và AI, có khả năng thu thập dữ liệu cảm biến thời gian thực, phân tích hình ảnh bằng AI, và cảnh báo tự động là vô cùng cần thiết.

## 1.2 Cơ sở nghiên cứu

Đề tài được xây dựng dựa trên các công nghệ và nền tảng hiện đại:

**Về phần cứng và cảm biến:**
- Vi điều khiển ESP32 với khả năng kết nối WiFi tích hợp
- Cảm biến DHT22 cho đo nhiệt độ và độ ẩm
- Cảm biến MQ-2 cho phát hiện khí gas
- Cảm biến Flame Sensor cho phát hiện lửa

**Về công nghệ AI:**
- YOLOv8 (You Only Look Once version 8) - mô hình deep learning tiên tiến cho object detection và pose estimation
- MediaPipe - framework của Google cho pose tracking
- ByteTrack - thuật toán tracking hiện đại cho theo dõi đối tượng

**Về truyền thông và lưu trữ:**
- MQTT (Message Queuing Telemetry Transport) - giao thức IoT nhẹ, phù hợp cho truyền dữ liệu cảm biến
- HiveMQ Cloud - MQTT broker đám mây với bảo mật TLS
- Supabase - nền tảng Backend-as-a-Service với PostgreSQL database và Storage

**Về công nghệ Web:**
- Node.js với Express.js cho backend API
- HTML5, CSS3, JavaScript (Vanilla) cho frontend
- Chart.js cho visualization dữ liệu

## 1.3 Lý do chọn đề tài

Đề tài được lựa chọn dựa trên các lý do sau:

1. **Tính thực tiễn cao**: Hệ thống giải quyết các vấn đề an toàn thực tế trong cuộc sống như cháy nổ, rò rỉ gas, đột quỵ, và an ninh công cộng.

2. **Tích hợp đa công nghệ**: Kết hợp IoT, AI, Cloud Computing và Web Development, tạo ra một hệ sinh thái công nghệ hoàn chỉnh.

3. **Khả năng mở rộng**: Kiến trúc hệ thống cho phép dễ dàng thêm các cảm biến mới, mô hình AI mới, và tính năng mới.

4. **Ứng dụng đa lĩnh vực**: Có thể triển khai trong gia đình, bệnh viện, sân bay, nhà ga, và các khu vực công cộng.

5. **Học hỏi công nghệ mới**: Cơ hội làm việc với các công nghệ tiên tiến như YOLOv8, MQTT, Supabase, và các thuật toán AI hiện đại.


## 1.4 Mục tiêu và phạm vi đề tài

### 1.4.1 Mục tiêu

**Mục tiêu tổng quát:**
Xây dựng hệ thống giám sát an toàn thông minh tích hợp IoT và AI, có khả năng thu thập dữ liệu cảm biến, phân tích hình ảnh, phát hiện sự cố tự động và cảnh báo kịp thời qua giao diện web.

**Mục tiêu cụ thể:**
1. Xây dựng firmware cho ESP32 để đọc dữ liệu từ các cảm biến (DHT22, MQ-2, Flame Sensor) và truyền qua MQTT
2. Phát triển hệ thống AI sử dụng YOLOv8 để phát hiện:
   - Đột quỵ và té ngã (3 loại: Sudden Fall, Abnormal Posture, Gradual Collapse)
   - Hành lý bỏ lại không có chủ
   - Vũ khí nguy hiểm
3. Xây dựng backend API với Node.js để xử lý dữ liệu MQTT và tích hợp Supabase
4. Phát triển giao diện web responsive với các chức năng:
   - Giám sát cảm biến thời gian thực
   - Hiển thị hình ảnh AI phát hiện
   - Thống kê và biểu đồ
   - Quản lý database
   - Lịch sử cảnh báo
5. Triển khai hệ thống lên cloud (Render.com) để truy cập từ xa

### 1.4.2 Phạm vi đề tài

**Phạm vi thực hiện:**
- Mô phỏng phần cứng trên Wokwi (không sử dụng phần cứng thật)
- Sử dụng webcam hoặc video file cho hệ thống AI
- Triển khai trên môi trường cloud miễn phí (HiveMQ Cloud, Supabase, Render.com)
- Giao diện web hỗ trợ desktop và mobile

**Giới hạn:**
- Chưa tối ưu hóa cho edge computing (chạy AI trên thiết bị nhúng)
- Chưa có cơ chế xử lý khi mất kết nối internet
- Độ chính xác AI phụ thuộc vào chất lượng camera và điều kiện ánh sáng
- Chưa có hệ thống thông báo qua SMS/Email

---

# CHƯƠNG 2: CƠ SỞ LÝ THUYẾT

## 2.1 Tổng quan về vi điều khiển ESP32

### 2.1.1 Giới thiệu ESP32

ESP32 là vi điều khiển 32-bit của Espressif Systems, được thiết kế cho các ứng dụng IoT với các đặc điểm nổi bật:

**Thông số kỹ thuật:**
- CPU: Dual-core Xtensa LX6, tốc độ lên đến 240 MHz
- RAM: 520 KB SRAM
- Flash: 4 MB (có thể mở rộng)
- WiFi: 802.11 b/g/n (2.4 GHz)
- Bluetooth: v4.2 BR/EDR và BLE
- GPIO: 34 pins có thể lập trình
- ADC: 18 kênh 12-bit
- Điện áp hoạt động: 3.3V

**Ưu điểm:**
- Tích hợp WiFi và Bluetooth, phù hợp cho IoT
- Giá thành thấp (khoảng 2-5 USD)
- Tiêu thụ điện năng thấp với các chế độ sleep
- Hỗ trợ nhiều giao thức: I2C, SPI, UART, PWM
- Cộng đồng phát triển lớn, nhiều thư viện hỗ trợ

### 2.1.2 Ứng dụng trong đề tài

Trong đề tài, ESP32 DevKit C V4 được sử dụng với các chức năng:
- Đọc dữ liệu từ DHT22 qua giao thức 1-Wire
- Đọc giá trị analog từ MQ-2 qua ADC (GPIO 34)
- Đọc tín hiệu digital từ Flame Sensor (GPIO 25)
- Hiển thị thông tin lên LCD 16x2 qua I2C (GPIO 21, 22)
- Kết nối WiFi và truyền dữ liệu qua MQTT

**Cấu hình trong code:**
```cpp
// Pins configuration
#define PIN_GAS_SENSOR    34
#define PIN_FLAME_SWITCH  25
#define PIN_FIRE_MANUAL   26
#define PIN_DHT22         15
#define DHT_TYPE          DHT22
```


## 2.2 Tổng quan về cảm biến DHT22

### 2.2.1 Đặc điểm kỹ thuật

DHT22 (AM2302) là cảm biến nhiệt độ và độ ẩm số với độ chính xác cao:

**Thông số kỹ thuật:**
- Dải đo nhiệt độ: -40°C đến +80°C
- Độ chính xác nhiệt độ: ±0.5°C
- Dải đo độ ẩm: 0-100% RH
- Độ chính xác độ ẩm: ±2% RH
- Thời gian đáp ứng: 2 giây
- Điện áp hoạt động: 3.3V - 5V
- Dòng tiêu thụ: 1-1.5 mA

**Nguyên lý hoạt động:**
- Sử dụng cảm biến điện dung để đo độ ẩm
- Sử dụng thermistor NTC để đo nhiệt độ
- Truyền dữ liệu qua giao thức 1-Wire (single-bus)
- Dữ liệu 40-bit: 16-bit độ ẩm + 16-bit nhiệt độ + 8-bit checksum

### 2.2.2 Ứng dụng trong đề tài

DHT22 được sử dụng để:
- Giám sát nhiệt độ môi trường
- Phát hiện nhiệt độ vượt ngưỡng (mặc định 50°C)
- Giám sát độ ẩm (mặc định ngưỡng 80%)
- Cảnh báo khi có nguy cơ cháy nổ do nhiệt độ cao

**Cấu hình ngưỡng:**
```cpp
int   THRESHOLD_GAS_PPM      = 2000;
float THRESHOLD_TEMP_C       = 50.0f;
float THRESHOLD_HUMIDITY     = 80.0f;
```

## 2.3 Tổng quan về cảm biến Flame Sensor

### 2.3.1 Đặc điểm kỹ thuật

Flame Sensor (cảm biến lửa) sử dụng photodiode hoặc phototransistor để phát hiện ánh sáng hồng ngoại từ ngọn lửa:

**Thông số kỹ thuật:**
- Dải phát hiện: 760nm - 1100nm (hồng ngoại)
- Khoảng cách phát hiện: 0.8m - 3m
- Góc phát hiện: ~60 độ
- Điện áp hoạt động: 3.3V - 5V
- Output: Digital (HIGH/LOW)

**Nguyên lý hoạt động:**
- Ngọn lửa phát ra bức xạ hồng ngoại
- Photodiode nhận bức xạ và tạo dòng điện
- Comparator so sánh với ngưỡng và xuất tín hiệu digital
- Output LOW khi phát hiện lửa, HIGH khi không có lửa

### 2.3.2 Ứng dụng trong đề tài

Flame Sensor được kết nối với GPIO 25 và GPIO 26 (nút nhấn thủ công):
```cpp
bool fire = (digitalRead(PIN_FLAME_SWITCH) == LOW) || 
            (digitalRead(PIN_FIRE_MANUAL) == LOW);
```

Khi phát hiện lửa:
- Hiển thị cảnh báo trên LCD
- Gửi alert qua MQTT
- Lưu vào database với trường `fire_detected = true`

## 2.4 Tổng quan về cảm biến khí Gas MQ-2

### 2.4.1 Đặc điểm kỹ thuật

MQ-2 là cảm biến khí gas đa năng, có thể phát hiện nhiều loại khí dễ cháy:

**Khí có thể phát hiện:**
- LPG (Liquefied Petroleum Gas)
- Propane
- Methane
- Hydrogen
- Alcohol
- Smoke

**Thông số kỹ thuật:**
- Dải phát hiện: 300 - 10,000 ppm
- Điện áp hoạt động: 5V
- Điện trở tải: 20kΩ
- Thời gian làm nóng: 20-48 giờ (lần đầu)
- Thời gian đáp ứng: < 10 giây
- Output: Analog (0-1023 với ADC 10-bit)

**Nguyên lý hoạt động:**
- Sử dụng lớp SnO2 (Tin Dioxide) làm vật liệu nhạy khí
- Khi tiếp xúc với khí, điện trở của SnO2 giảm
- Điện trở thay đổi tỷ lệ với nồng độ khí
- ADC đọc điện áp và chuyển thành giá trị số

### 2.4.2 Ứng dụng trong đề tài

Trong mô phỏng Wokwi, MQ-2 được thay thế bằng potentiometer (biến trở) để mô phỏng giá trị gas:
```cpp
g_gasPPM = analogRead(PIN_GAS_SENSOR);  // GPIO 34
```

Ngưỡng cảnh báo mặc định: **2000 ppm**

Khi vượt ngưỡng:
- Hiển thị cảnh báo trên LCD
- Gửi alert qua MQTT với message: "Gas X ppm vượt ngưỡng Y ppm"
- Lưu vào database với trường `gas_value`


## 2.5 Tổng quan về mô hình AI

### 2.5.1 YOLOv8 - You Only Look Once version 8

**Giới thiệu:**
YOLOv8 là phiên bản mới nhất (2023) của dòng mô hình YOLO, được phát triển bởi Ultralytics. Đây là mô hình state-of-the-art cho object detection và pose estimation.

**Đặc điểm nổi bật:**
- **Kiến trúc**: Backbone CSPDarknet + Neck FPN/PAN + Head Decoupled
- **Tốc độ**: 80-300 FPS trên GPU (tùy model size)
- **Độ chính xác**: mAP 50-95 từ 37.3% (nano) đến 53.9% (xlarge)
- **Variants**: n (nano), s (small), m (medium), l (large), x (xlarge)
- **Hỗ trợ**: Object Detection, Pose Estimation, Segmentation, Classification

**Các model được sử dụng trong đề tài:**

1. **yolov8n-pose.pt** (Pose Estimation)
   - Kích thước: ~6.4 MB
   - Phát hiện người và 17 keypoints COCO skeleton
   - Keypoints: nose, eyes, ears, shoulders, elbows, wrists, hips, knees, ankles
   - Sử dụng cho: Phát hiện đột quỵ, té ngã

2. **yolov8n.pt** (Object Detection)
   - Kích thước: ~6.2 MB
   - Phát hiện 80 classes COCO
   - Classes quan trọng: person (0), backpack (24), handbag (26), suitcase (28), knife (43)
   - Sử dụng cho: Phát hiện hành lý, vũ khí

**Tối ưu hóa:**
- **FP16 Half Precision**: Giảm 50% memory, tăng 2x tốc độ trên GPU
- **TensorRT Engine**: Tăng 3-5x tốc độ khi export sang .engine
- **Frame Skip**: Chạy inference mỗi 2-3 frames, cache kết quả
- **Input Size**: 640x640 (có thể giảm xuống 320x320 để tăng tốc độ)

### 2.5.2 ByteTrack - Multi-Object Tracking

**Giới thiệu:**
ByteTrack là thuật toán tracking hiện đại, được tích hợp sẵn trong YOLOv8.

**Nguyên lý hoạt động:**
1. **Detection**: YOLO phát hiện objects trong frame
2. **Association**: Matching objects giữa frame hiện tại và frame trước
3. **Kalman Filter**: Dự đoán vị trí object trong frame tiếp theo
4. **Track Management**: Tạo, cập nhật, xóa tracks

**Ưu điểm:**
- Track ID ổn định qua các frames
- Xử lý tốt occlusion (che khuất)
- Tốc độ nhanh, phù hợp real-time
- Không cần training thêm

**Cấu hình trong code:**
```python
results = self.model.track(
    frame,
    imgsz=640,
    conf=0.4,
    persist=True,              # Giữ state tracker
    tracker="bytetrack.yaml",  # Sử dụng ByteTrack
    verbose=False
)
```

### 2.5.3 Thuật toán phát hiện đột quỵ (Stroke Detection)

Hệ thống sử dụng **3 detectors** để phát hiện các triệu chứng đột quỵ:

**1. Sudden Fall Detector (Ngã đột ngột)**
- **Nguyên lý**: Tính velocity (vận tốc) của hip (hông) qua các frames
- **Công thức**: `velocity = Δy_hip / Δt`
- **Ngưỡng**: `max_velocity > 7% * frame_height`
- **Buffer**: 5 frames gần nhất
- **Confidence**: 0.92 (92%)

**2. Abnormal Posture Detector (Tư thế bất thường)**
- **Điều kiện 1**: Aspect ratio > 1.2 (người nằm ngang)
- **Điều kiện 2**: Chiều cao bbox < 45% frame height
- **Điều kiện 3**: Đầu/vai thấp hơn hông (margin 15%)
- **Điều kiện 4**: Xu hướng liên tục qua 3 frames
- **Sustained**: 6 frames liên tục (giảm false positive)
- **Confidence**: 0.87 (87%)

**3. Gradual Collapse Detector (Suy sụp từ từ)**
- **Theo dõi**: Aspect ratio tăng dần qua 12 frames
- **Velocity**: Trung bình > 2.5% frame height
- **Sustained**: 5 frames
- **Confidence**: 0.78 (78%)

**Cấu trúc dữ liệu:**
```python
@dataclass
class StrokeConfig:
    kpts_conf_min: float = 0.25        # Ngưỡng confidence keypoint
    min_valid_kpts: int = 5            # Số keypoint tối thiểu
    sudden_vel_ratio: float = 0.07     # 7% frame height
    aspect_ratio_min: float = 1.2      # Tỷ lệ ngang/dọc
    sustained_posture: int = 6         # Số frames liên tục
```

### 2.5.4 Thuật toán phát hiện hành lý bỏ lại

**Nguyên lý:**
1. **Object Detection**: Phát hiện backpack (24), handbag (26), suitcase (28)
2. **Owner Detection**: Tìm người trong bán kính 160px
3. **Timer**: Đếm thời gian không có chủ
4. **Alert**: Cảnh báo khi vượt 60 giây

**Cấu trúc BaggageState:**
```python
@dataclass
class BaggageState:
    track_id: int
    object_class: str
    bbox: list
    owner_gone_at: Optional[float]  # Timestamp chủ rời đi
    abandon_seconds: float          # Thời gian bỏ lại
```

**Xử lý edge cases:**
- **NMS (Non-Maximum Suppression)**: Loại bỏ box trùng lặp (IoU > 0.45)
- **Grace Period**: 3 giây trước khi xóa track
- **Cooldown**: 120 giây giữa các alert
- **Track Switching**: Kế thừa state khi tracker đổi ID

### 2.5.5 Thuật toán phát hiện vũ khí

**Chiến lược 2 giai đoạn:**
1. **Baseline**: Sử dụng COCO class 43 (knife)
2. **Fine-tuned**: Có thể thay bằng model custom từ Roboflow

**Bearer Detection (Người cầm vũ khí):**
- Tìm người gần nhất trong bán kính 130px
- Sử dụng center point của weapon bbox
- Alert ngay lập tức (không cần timer)

**Risk Level:**
- **High**: Phát hiện vũ khí thông thường
- **Critical**: Phát hiện trong restricted zone


## 2.6 Công nghệ truyền nhận dữ liệu MQTT

### 2.6.1 Giao thức MQTT

**MQTT (Message Queuing Telemetry Transport)** là giao thức messaging nhẹ, được thiết kế cho IoT:

**Đặc điểm:**
- **Kiến trúc**: Publish/Subscribe (không phải Request/Response)
- **Lightweight**: Header chỉ 2 bytes, phù hợp băng thông thấp
- **QoS Levels**: 0 (At most once), 1 (At least once), 2 (Exactly once)
- **Persistent Session**: Giữ kết nối khi client offline
- **Last Will**: Thông báo khi client mất kết nối đột ngột

**Thành phần:**
1. **Broker**: Server trung gian (HiveMQ Cloud)
2. **Publisher**: Client gửi dữ liệu (ESP32)
3. **Subscriber**: Client nhận dữ liệu (Backend Node.js)
4. **Topic**: Kênh truyền dữ liệu (VD: `wokwi/sensors/data`)

### 2.6.2 HiveMQ Cloud

**Cấu hình kết nối:**
```
Broker: 0cf84da2cc5b47ccb9613aee2edcc06b.s1.eu.hivemq.cloud
Port: 8883 (MQTTS - TLS/SSL)
Username: doantuan
Password: Tuan1234
```

**Topics được sử dụng:**
1. **wokwi/sensors/data** (Publish từ ESP32)
   - Dữ liệu cảm biến mỗi 2 giây
   - Format: JSON

2. **wokwi/sensors/commands** (Subscribe từ ESP32)
   - Lệnh điều khiển ngưỡng từ Web
   - Format: JSON

### 2.6.3 Định dạng dữ liệu

**Message từ ESP32 → Backend:**
```json
{
  "temp": 28.5,
  "humi": 65.2,
  "gas": 1500,
  "fire": 0,
  "alert": "NONE",
  "th_temp": 50.0,
  "th_humidity": 80.0,
  "th_gas": 2000
}
```

**Command từ Web → ESP32:**
```json
{
  "set_temp": 45.0,
  "set_gas": 1800,
  "set_humidity": 70.0
}
```

### 2.6.4 Xử lý dữ liệu MQTT trong Backend

**Kết nối MQTT Client:**
```javascript
const mqttOptions = {
    host: 'broker.hivemq.com',
    port: 8883,
    protocol: 'mqtts',
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    clientId: 'backend_' + Math.random().toString(16).slice(2, 10),
    keepalive: 60,
    reconnectPeriod: 3000
};

const mqttClient = mqtt.connect(mqttOptions);
```

**Subscribe và xử lý:**
```javascript
mqttClient.on('message', (topic, payload) => {
    const data = JSON.parse(payload.toString());
    const normalizedData = normalizeSensorPayload(data);
    
    // Cập nhật latestSensorData
    latestSensorData = { ...normalizedData, updatedAt: new Date().toISOString() };
    
    // Kiểm tra alert
    const alert = buildAlertFromPayload(topic, normalizedData, data);
    if (alert) {
        rememberAlert(alert);
        persistSensorAlertIfFirst(alert, normalizedData);
    }
});
```

## 2.7 Công nghệ Web và cơ sở dữ liệu

### 2.7.1 Backend - Node.js + Express.js

**Kiến trúc:**
- **Framework**: Express.js 5.2.1
- **MQTT Client**: mqtt 5.15.1
- **Database Client**: @supabase/supabase-js 2.105.4
- **CORS**: Cho phép cross-origin requests

**API Endpoints chính:**

1. **GET /api/health**
   - Trả về trạng thái MQTT, Supabase
   - Dữ liệu cảm biến mới nhất
   - Alert mới nhất

2. **POST /api/auth/login**
   - Đăng nhập với username/password
   - Trả về JWT token
   - Roles: admin, user

3. **GET /api/auth/me**
   - Xác thực token
   - Trả về thông tin user

4. **POST /api/control**
   - Gửi lệnh điều khiển qua MQTT
   - Cập nhật ngưỡng cảm biến

5. **GET /api/statistics**
   - Thống kê cảm biến theo range (today, 7d, 30d)
   - Thống kê AI events theo bảng

6. **GET /api/database/rows**
   - Lấy dữ liệu từ bảng (sensor_data, stroke_events, airport_events, baggage_tracks)
   - Hỗ trợ filter theo thời gian

7. **DELETE /api/database/rows/:id**
   - Xóa record theo ID
   - Xóa ảnh trên Storage (nếu có)

8. **GET /api/history**
   - Lịch sử cảnh báo cảm biến
   - Lịch sử ảnh AI

### 2.7.2 Frontend - HTML5 + Vanilla JavaScript

**Công nghệ:**
- **HTML5**: Semantic markup
- **CSS3**: Grid, Flexbox, Custom Properties
- **JavaScript**: ES6+, Fetch API, async/await
- **Chart.js**: Biểu đồ thời gian thực
- **Lucide Icons**: Icon library
- **Supabase Client**: Realtime subscriptions

**Tính năng chính:**

1. **Authentication**
   - Login form với validation
   - JWT token storage
   - Role-based UI (admin/user)

2. **Real-time Dashboard**
   - 4 sensor cards (temp, gas, fire, humidity)
   - Alert banner
   - Live image stream từ AI
   - Connection status badges

3. **Statistics Page**
   - Sensor statistics với Chart.js
   - AI events statistics
   - Time range filter (today, 7d, 30d)

4. **Database Manager** (Admin only)
   - Table selector (4 tables)
   - Time range filter
   - Delete operations
   - Pagination

5. **History Page**
   - Sensor alerts history
   - AI images history
   - Time range filter

### 2.7.3 Supabase - Backend-as-a-Service

**Cấu hình:**
```
URL: https://ypddfcoesrtvjabyqqta.supabase.co
Bucket: surveillance-images
```

**Database Schema:**

**1. sensor_data**
```sql
- id: UUID (PK)
- created_at: TIMESTAMPTZ
- sensor_name: TEXT (temperature, humidity, gas)
- temperature: FLOAT
- humidity: FLOAT
- gas_value: INTEGER
- fire_detected: BOOLEAN
- warning: TEXT
```

**2. stroke_events**
```sql
- id: UUID (PK)
- timestamp: TIMESTAMPTZ
- camera_id: TEXT
- confidence: FLOAT
- event_type: TEXT
- image_url: TEXT
```

**3. airport_events**
```sql
- id: UUID (PK)
- event_type: TEXT (abandoned_baggage, weapon_detected)
- camera_id: TEXT
- track_id: INTEGER
- object_class: TEXT
- confidence: FLOAT
- risk_level: TEXT
- zone_name: TEXT
- duration_sec: FLOAT
- image_url: TEXT
- metadata: JSONB
- resolved: BOOLEAN
- created_at: TIMESTAMPTZ
```

**4. baggage_tracks**
```sql
- track_id: INTEGER (PK)
- camera_id: TEXT
- object_class: TEXT
- first_seen_at: TIMESTAMPTZ
- last_seen_at: TIMESTAMPTZ
- has_owner: BOOLEAN
- owner_gone_at: TIMESTAMPTZ
- alerted: BOOLEAN
- bbox: JSONB
- updated_at: TIMESTAMPTZ
```

**Storage Structure:**
```
surveillance-images/
├── alerts/          # Stroke detection images
├── baggage/         # Abandoned baggage images
└── weapons/         # Weapon detection images
```

**Realtime Subscriptions:**
```javascript
const subscription = supabase
    .channel('ai_events')
    .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'stroke_events' },
        (payload) => handleNewAiEvent(payload.new)
    )
    .subscribe();
```


---

# CHƯƠNG 3: THIẾT KẾ HỆ THỐNG

## 3.1 Phân tích yêu cầu và sơ đồ khối kiến trúc hệ thống

### 3.1.1 Yêu cầu chức năng

**Yêu cầu về phần IoT (Firmware):**
- Đọc dữ liệu từ 3 loại cảm biến: DHT22, MQ-2, Flame Sensor
- Hiển thị thông tin lên LCD 16x2
- Kết nối WiFi và MQTT broker
- Gửi dữ liệu mỗi 2 giây
- Nhận lệnh điều khiển ngưỡng từ xa
- Cảnh báo nhấp nháy khi có nguy hiểm

**Yêu cầu về phần AI:**
- Phát hiện đột quỵ với 3 detectors (Sudden Fall, Abnormal Posture, Gradual Collapse)
- Phát hiện hành lý bỏ lại không có chủ (timeout 60s)
- Phát hiện vũ khí nguy hiểm
- Tracking ổn định với ByteTrack
- Chạy real-time trên webcam/video
- Upload ảnh alert lên cloud

**Yêu cầu về Backend:**
- Nhận dữ liệu MQTT từ ESP32
- Xử lý và normalize dữ liệu cảm biến
- Phát hiện alert tự động
- Lưu trữ vào Supabase
- Cung cấp REST API cho frontend
- Authentication với JWT
- Thống kê theo thời gian

**Yêu cầu về Frontend:**
- Giao diện responsive (desktop + mobile)
- Dashboard real-time
- Hiển thị ảnh AI mới nhất
- Biểu đồ thống kê
- Quản lý database (admin)
- Lịch sử cảnh báo
- Phân quyền user/admin

### 3.1.2 Sơ đồ khối kiến trúc tổng thể

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                            │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Web Browser (Chrome, Firefox, Safari, Edge)             │   │
│  │  - Dashboard (Sensor Cards, Charts, Alerts)              │   │
│  │  - Statistics (Sensor Stats, AI Stats)                   │   │
│  │  - Database Manager (Admin Only)                         │   │
│  │  - History (Sensor Alerts, AI Images)                    │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↕ HTTPS
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND API (Node.js)                         │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Express.js Server (Port 3001)                           │   │
│  │  - REST API Endpoints                                    │   │
│  │  - JWT Authentication                                    │   │
│  │  - MQTT Client (Subscribe)                               │   │
│  │  - Data Processing & Normalization                       │   │
│  │  - Alert Detection Logic                                 │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
         ↕ MQTTS (8883)                    ↕ HTTPS
┌──────────────────────────┐    ┌──────────────────────────────┐
│   MQTT BROKER            │    │   SUPABASE CLOUD             │
│   (HiveMQ Cloud)         │    │   - PostgreSQL Database      │
│   - Topic: sensors/data  │    │   - Storage (Images)         │
│   - Topic: sensors/cmds  │    │   - Realtime Subscriptions   │
└──────────────────────────┘    └──────────────────────────────┘
         ↕ MQTTS (8883)                    ↕ HTTPS
┌─────────────────────────────────────────────────────────────────┐
│                    IOT DEVICE (ESP32)                            │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Wokwi Simulation                                        │   │
│  │  - ESP32 DevKit C V4                                     │   │
│  │  - DHT22 (Temp & Humidity)                               │   │
│  │  - MQ-2 (Gas Sensor - Potentiometer)                     │   │
│  │  - Flame Sensor                                          │   │
│  │  - LCD 16x2 I2C                                          │   │
│  │  - Manual Fire Button                                    │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    AI SYSTEM (Python)                            │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Stroke Detection System                                 │   │
│  │  - YOLOv8-Pose (Person + 17 Keypoints)                   │   │
│  │  - YOLOv8 Object Detection (Baggage, Weapons)            │   │
│  │  - ByteTrack (Multi-Object Tracking)                     │   │
│  │  - StrokeRecognizerV2 (3 Detectors)                      │   │
│  │  - BaggageTracker (Abandoned Detection)                  │   │
│  │  - WeaponDetector (Threat Detection)                     │   │
│  │  - CustomTkinter GUI                                     │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              ↕ HTTPS                             │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Supabase Client (Upload Images & Events)                │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 3.1.3 Luồng dữ liệu

**Luồng 1: Sensor Data Flow**
```
ESP32 → MQTT Broker → Backend → Supabase → Frontend
  ↓                      ↓
 LCD                  Alert Logic
```

**Luồng 2: AI Detection Flow**
```
Camera → AI System → Supabase → Frontend
           ↓
      Local Storage
```

**Luồng 3: Control Flow**
```
Frontend → Backend → MQTT Broker → ESP32
```


## 3.2 Thiết kế cơ sở dữ liệu

### 3.2.1 Sơ đồ ERD (Entity Relationship Diagram)

```
┌─────────────────────────┐
│     sensor_data         │
├─────────────────────────┤
│ PK  id (UUID)           │
│     created_at          │
│     sensor_name         │
│     temperature         │
│     humidity            │
│     gas_value           │
│     fire_detected       │
│     warning             │
└─────────────────────────┘

┌─────────────────────────┐
│    stroke_events        │
├─────────────────────────┤
│ PK  id (UUID)           │
│     timestamp           │
│     camera_id           │
│     confidence          │
│     event_type          │
│     image_url           │
└─────────────────────────┘

┌─────────────────────────┐
│   airport_events        │
├─────────────────────────┤
│ PK  id (UUID)           │
│     event_type          │
│     camera_id           │
│     track_id            │
│     object_class        │
│     confidence          │
│     risk_level          │
│     zone_name           │
│     duration_sec        │
│     image_url           │
│     metadata (JSONB)    │
│     resolved            │
│     created_at          │
└─────────────────────────┘

┌─────────────────────────┐
│   baggage_tracks        │
├─────────────────────────┤
│ PK  track_id (INT)      │
│     camera_id           │
│     object_class        │
│     first_seen_at       │
│     last_seen_at        │
│     has_owner           │
│     owner_gone_at       │
│     alerted             │
│     bbox (JSONB)        │
│     updated_at          │
└─────────────────────────┘
```

### 3.2.2 Mô tả chi tiết các bảng

**Bảng sensor_data:**
- Lưu trữ dữ liệu cảm biến theo từng sensor riêng biệt
- Mỗi lần đọc tạo 3 records (temperature, humidity, gas)
- Tự động lưu mỗi 5 phút hoặc khi có alert
- Index: created_at, sensor_name

**Bảng stroke_events:**
- Lưu trữ sự kiện phát hiện đột quỵ/té ngã
- event_type: Sudden_Fall, Abnormal_Posture, Gradual_Collapse
- image_url: Link ảnh trên Storage (folder: alerts/)
- Index: timestamp, camera_id

**Bảng airport_events:**
- Lưu trữ sự kiện an ninh sân bay
- event_type: abandoned_baggage, weapon_detected
- risk_level: low, medium, high, critical
- metadata: Chứa bbox, bearer_id
- resolved: Đánh dấu đã xử lý
- Index: created_at, event_type, resolved

**Bảng baggage_tracks:**
- Lưu trữ trạng thái realtime của hành lý
- Upsert liên tục (mỗi 90 frames)
- has_owner: false khi chủ rời đi
- alerted: true khi đã gửi alert
- Auto-cleanup khi track biến mất

## 3.3 Thiết kế mô hình mô phỏng cảm biến trên Wokwi

### 3.3.1 Sơ đồ kết nối phần cứng

```
ESP32 DevKit C V4
├── GPIO 21 (SDA) ──────────→ LCD 16x2 I2C (SDA)
├── GPIO 22 (SCL) ──────────→ LCD 16x2 I2C (SCL)
├── 3V3 ────────────────────→ LCD VCC, DHT22 VCC, Sensors VCC
├── GND ────────────────────→ Common Ground
│
├── GPIO 15 ────────────────→ DHT22 Data Pin
│
├── GPIO 34 (ADC) ──────────→ Potentiometer (MQ-2 Simulation)
│
├── GPIO 25 ────────────────→ Flame Sensor Digital Out
├── GPIO 26 ────────────────→ Manual Fire Button
│
└── WiFi (Built-in) ────────→ Wokwi-GUEST Network
```

### 3.3.2 Cấu hình diagram.json

File `diagram.json` định nghĩa các components và connections:

**Components:**
- board-esp32-devkit-c-v4
- wokwi-lcd1602 (I2C address: 0x27)
- wokwi-potentiometer (label: "Gas Sensor MQ-2 Sim")
- wokwi-flame-sensor
- wokwi-dht22
- wokwi-pushbutton (label: "LỬA", color: red)

**Connections:**
- I2C bus: GPIO 21 (SDA), GPIO 22 (SCL)
- Power rails: 3V3, GND
- Analog input: GPIO 34
- Digital inputs: GPIO 15, 25, 26

### 3.3.3 Cấu hình wokwi.toml

```toml
[wokwi]
version = 1
firmware = ".pio/build/esp32dev/firmware.bin"
elf = ".pio/build/esp32dev/firmware.elf"
```

Chỉ định file firmware được build bởi PlatformIO.

## 3.4 Phát triển và Train mô hình AI

### 3.4.1 Mô hình YOLOv8-Pose

**Không cần training:**
- Sử dụng pre-trained model `yolov8n-pose.pt`
- Đã được train trên COCO dataset với 17 keypoints
- Độ chính xác đủ tốt cho phát hiện đột quỵ

**Keypoints COCO 17:**
```
0: nose          5: left_shoulder    11: left_hip
1: left_eye      6: right_shoulder   12: right_hip
2: right_eye     7: left_elbow       13: left_knee
3: left_ear      8: right_elbow      14: right_knee
4: right_ear     9: left_wrist       15: left_ankle
                10: right_wrist      16: right_ankle
```

### 3.4.2 Mô hình YOLOv8 Object Detection

**Sử dụng COCO classes:**
- Class 0: person
- Class 24: backpack
- Class 26: handbag
- Class 28: suitcase
- Class 43: knife

**Không cần training thêm** vì COCO dataset đã có các classes này.

**Tùy chọn mở rộng:**
- Fine-tune trên dataset custom từ Roboflow
- Thêm classes: gun, pistol, rifle, scissors
- Export sang TensorRT engine để tăng tốc độ

### 3.4.3 Thuật toán Stroke Detection

**Không phải ML model**, mà là **rule-based algorithm** sử dụng:
- Keypoint positions
- Velocity calculation
- Aspect ratio analysis
- Temporal consistency (sustained frames)

**Ưu điểm:**
- Không cần training data
- Không cần GPU mạnh
- Dễ điều chỉnh ngưỡng
- Giải thích được (explainable)

**Nhược điểm:**
- Phụ thuộc vào ngưỡng cứng
- Có thể false positive với tư thế ngồi/nằm bình thường

### 3.4.4 Thuật toán Abandoned Baggage Detection

**Nguyên lý hoạt động:**

Thuật toán phát hiện hành lý bỏ lại sử dụng **state machine** kết hợp với **proximity detection**:

**Bước 1: Object Detection**
```python
# Phát hiện hành lý bằng YOLOv8
BAGGAGE_CLASS_IDS = {
    24: 'backpack',
    26: 'handbag', 
    28: 'suitcase'
}

bags = object_detector.track(
    frame, 
    classes=[24, 26, 28],
    conf=0.22  # Ngưỡng confidence thấp để phát hiện tốt hơn
)
```

**Bước 2: Non-Maximum Suppression (NMS)**
```python
# Loại bỏ bounding box trùng lặp
def apply_nms(bags, iou_threshold=0.45):
    bags = sorted(bags, key=lambda x: x['conf'], reverse=True)
    keep_bags = []
    for bag in bags:
        overlap = False
        for kept in keep_bags:
            if calculate_iou(bag['bbox'], kept['bbox']) > iou_threshold:
                overlap = True
                break
        if not overlap:
            keep_bags.append(bag)
    return keep_bags
```

**Bước 3: Owner Detection**
```python
# Tìm người trong bán kính 160px
def find_owner(bag_center, persons, radius=160):
    for person in persons:
        person_center = get_bbox_center(person['bbox'])
        distance = euclidean_distance(bag_center, person_center)
        if distance <= radius:
            return person['track_id']
    return None
```

**Bước 4: State Management**
```python
@dataclass
class BaggageState:
    track_id: int
    object_class: str
    bbox: list
    owner_gone_at: Optional[float] = None  # Timestamp chủ rời đi
    last_alert_at: float = 0.0
    alerted: bool = False
    
    @property
    def abandon_seconds(self) -> float:
        if self.owner_gone_at is None:
            return 0.0
        return time.time() - self.owner_gone_at
    
    @property
    def is_suspicious(self, timeout=60.0) -> bool:
        return self.abandon_seconds >= timeout
```

**Bước 5: Alert Logic**
```python
def update(self, objects, persons):
    alerts = []
    for bag in objects:
        tid = bag['track_id']
        owner_id = find_owner(bag['bbox'], persons)
        
        if tid not in self._states:
            # Tạo state mới
            self._states[tid] = BaggageState(
                track_id=tid,
                object_class=bag['class_name'],
                bbox=bag['bbox']
            )
        
        state = self._states[tid]
        
        if owner_id is not None:
            # Có chủ → reset timer
            state.owner_gone_at = None
            state.alerted = False
        else:
            # Không có chủ
            if state.owner_gone_at is None:
                # Lần đầu mất chủ → bắt đầu đếm
                state.owner_gone_at = time.time()
            elif state.abandon_seconds >= 60.0 and not state.alerted:
                # Vượt timeout → alert
                alerts.append({
                    'event_type': 'abandoned_baggage',
                    'track_id': tid,
                    'object_class': state.object_class,
                    'duration_sec': state.abandon_seconds,
                    'bbox': state.bbox,
                    'risk_level': 'high'
                })
                state.alerted = True
    
    return alerts
```

**Xử lý Edge Cases:**

1. **Track Switching**: Khi ByteTrack đổi ID, kế thừa state cũ dựa trên IoU
```python
# Tìm state cũ có bbox trùng với bag mới
for old_tid, old_state in list(self._states.items()):
    if old_tid not in active_bag_ids:
        for bag in bags:
            if calculate_iou(old_state.bbox, bag['bbox']) > 0.45:
                # Kế thừa state
                old_state.track_id = bag['track_id']
                self._states[bag['track_id']] = old_state
                del self._states[old_tid]
                break
```

2. **Grace Period**: Đợi 3 giây trước khi xóa track biến mất
```python
if tid not in active_bag_ids:
    if time.time() - state.last_seen >= 3.0:
        del self._states[tid]
```

3. **Alert Cooldown**: 120 giây giữa các alert để tránh spam
```python
if time.time() - state.last_alert_at < 120.0:
    continue  # Skip alert
```

**Thông số cấu hình:**
- Owner radius: **160 pixels**
- Abandon timeout: **60 giây**
- Alert cooldown: **120 giây**
- Grace period: **3 giây**
- NMS IoU threshold: **0.45**
- Confidence threshold: **0.22**

### 3.4.5 Thuật toán Weapon Detection

**Nguyên lý hoạt động:**

Thuật toán phát hiện vũ khí sử dụng **2-stage approach**:

**Stage 1: Baseline Detection (COCO)**
```python
# Sử dụng COCO class 43 (knife)
COCO_WEAPON_CLASSES = {
    43: 'knife',
    76: 'scissors'  # Có thể nguy hiểm
}

weapons = object_detector.detect(
    frame,
    classes=[43, 76],
    conf=0.25  # Ngưỡng thấp để phát hiện tốt
)
```

**Stage 2: Fine-tuned Model (Optional)**
```python
# Có thể thay bằng model custom từ Roboflow
FINETUNE_WEAPON_CLASSES = {
    0: 'gun',
    1: 'knife',
    2: 'pistol',
    3: 'rifle',
    4: 'scissors'
}
```

**Bearer Detection (Người cầm vũ khí):**
```python
def find_bearer(weapon_center, persons, radius=130):
    """
    Tìm người gần nhất với vũ khí
    """
    min_distance = float('inf')
    bearer_id = None
    
    for person in persons:
        person_center = get_bbox_center(person['bbox'])
        distance = euclidean_distance(weapon_center, person_center)
        
        if distance < min_distance and distance <= radius:
            min_distance = distance
            bearer_id = person['track_id']
    
    return bearer_id
```

**Alert Logic:**
```python
def detect_frame(self, frame, persons, zone_name=None):
    alerts = []
    
    # 1. Detect weapons
    weapons = self.od.detect(
        frame,
        classes=self.weapon_class_ids,
        conf=self.conf
    )
    
    # 2. Process each weapon
    for weapon in weapons:
        bbox = weapon['bbox']
        cx = (bbox[0] + bbox[2]) / 2
        cy = (bbox[1] + bbox[3]) / 2
        
        # 3. Cooldown check (theo vị trí)
        loc_key = f"{weapon['class_name']}_{int(cx//50)}_{int(cy//50)}"
        if time.time() - self._last_alert.get(loc_key, 0) < 25.0:
            continue  # Skip nếu chưa đủ cooldown
        
        # 4. Find bearer
        bearer_id = find_bearer((cx, cy), persons, self.bearer_radius)
        
        # 5. Determine risk level
        risk = 'critical' if zone_name else 'high'
        
        # 6. Create alert
        self._last_alert[loc_key] = time.time()
        alerts.append({
            'event_type': 'weapon_detected',
            'track_id': bearer_id,
            'object_class': weapon['class_name'],
            'bbox': bbox,
            'confidence': weapon['conf'],
            'risk_level': risk,
            'zone_name': zone_name,
            'bearer_id': bearer_id
        })
    
    return alerts
```

**Risk Level Classification:**
```python
def determine_risk(zone_name, weapon_class):
    """
    Critical: Vũ khí trong restricted zone
    High: Vũ khí ở khu vực thông thường
    """
    if zone_name:  # Restricted zone (VD: Gate, Security Checkpoint)
        return 'critical'
    
    if weapon_class in ['gun', 'pistol', 'rifle']:
        return 'high'
    
    return 'medium'
```

**Cooldown Strategy:**
```python
# Cooldown theo cell lưới 50x50 pixels
loc_key = f"{class_name}_{int(cx//50)}_{int(cy//50)}"

# Tránh alert liên tục cho cùng vị trí
if time.time() - last_alert_time < 25.0:
    skip_alert()
```

**Thông số cấu hình:**
- Bearer radius: **130 pixels**
- Alert cooldown: **25 giây**
- Confidence threshold: **0.25**
- Grid cell size: **50x50 pixels**
- Risk levels: **medium, high, critical**

**So sánh với Baggage Detection:**

| Đặc điểm | Baggage Detection | Weapon Detection |
|----------|-------------------|------------------|
| **Timer** | 60 giây | Ngay lập tức |
| **State** | Stateful (BaggageState) | Stateless |
| **Proximity** | Owner (160px) | Bearer (130px) |
| **Cooldown** | 120 giây | 25 giây |
| **Risk** | High | High/Critical |
| **Classes** | 3 (backpack, handbag, suitcase) | 2-5 (knife, gun, etc.) |

**Ưu điểm:**
- Phát hiện nhanh, không cần đợi
- Xác định được người cầm vũ khí
- Phân biệt risk level theo zone
- Cooldown tránh spam alerts

**Nhược điểm:**
- COCO chỉ có knife, không có gun
- Cần fine-tune model cho độ chính xác cao hơn
- False positive với đồ vật giống vũ khí (điện thoại, bút, v.v.)


## 3.5 Thiết kế giải thuật và logic điều khiển

### 3.5.1 Logic điều khiển ESP32

**Vòng lặp chính (loop):**
```
1. Kiểm tra kết nối MQTT
   ├─ Nếu mất kết nối → reconnect()
   └─ Nếu đã kết nối → client.loop()

2. Mỗi 2 giây (lastUpdateTime):
   ├─ Đọc DHT22 → temp, humidity
   ├─ Đọc ADC GPIO 34 → gas_ppm
   ├─ Đọc GPIO 25, 26 → fire
   ├─ So sánh với ngưỡng → buildAlertList()
   └─ Gửi JSON qua MQTT → sendData()

3. Quản lý hiển thị LCD:
   ├─ Nếu alertCount == 0:
   │  └─ displayNormal() (temp, gas, humi)
   └─ Nếu alertCount > 0:
      ├─ Nhấp nháy 3 lần (500ms ON/OFF)
      ├─ displayAlert(activeAlerts[alertIndex])
      └─ Chuyển sang alert tiếp theo
```

**Hàm buildAlertList:**
```cpp
void buildAlertList(bool fire, bool gas, bool temp, bool humidity) {
    int count = 0;
    if (fire) activeAlerts[count++] = ALERT_FIRE;
    if (gas)  activeAlerts[count++] = ALERT_GAS;
    if (temp) activeAlerts[count++] = ALERT_TEMP;
    if (humidity) activeAlerts[count++] = ALERT_HUMIDITY;
    alertCount = count;
}
```

**Hàm sendData:**
```cpp
void sendData() {
    JsonDocument doc;
    doc["temp"] = g_tempC;
    doc["humi"] = g_humidity;
    doc["gas"] = g_gasPPM;
    doc["fire"] = (digitalRead(PIN_FLAME_SWITCH) == LOW) ? 1 : 0;
    doc["alert"] = (alertCount > 0) ? "DANGER" : "NONE";
    doc["th_temp"] = THRESHOLD_TEMP_C;
    doc["th_humidity"] = THRESHOLD_HUMIDITY;
    doc["th_gas"] = THRESHOLD_GAS_PPM;
    
    char buffer[256];
    serializeJson(doc, buffer);
    client.publish(TOPIC_DATA, buffer);
}
```

### 3.5.2 Logic xử lý Backend

**Xử lý MQTT message:**
```javascript
function handleSensorPayload(topic, payload, receivedAt) {
    // 1. Normalize dữ liệu
    const normalizedData = normalizeSensorPayload(payload);
    
    // 2. Cập nhật latestSensorData
    latestSensorData = { ...normalizedData, updatedAt: receivedAt };
    
    // 3. Kiểm tra alert
    const alert = buildAlertFromPayload(topic, normalizedData, payload);
    
    if (alert) {
        // 4a. Có alert → lưu ngay
        rememberAlert(alert);
        persistSensorAlertIfFirst(alert, normalizedData);
    } else {
        // 4b. Không alert → lưu định kỳ (5 phút)
        clearLatestAlertIfNormal(normalizedData);
        persistSensorDataIfDue(normalizedData);
    }
}
```

**Logic phát hiện alert:**
```javascript
function buildAlertFromPayload(topic, data, rawData) {
    const issues = [];
    const thresholds = data.thresholds || {};
    
    // Kiểm tra từng điều kiện
    if (isTruthy(data.fire)) {
        issues.push({ type: 'fire', message: 'Phát hiện lửa' });
    }
    
    if (data.temperature >= thresholds.temperature) {
        issues.push({ 
            type: 'temp', 
            message: `Nhiệt độ ${data.temperature}°C vượt ngưỡng` 
        });
    }
    
    if (data.gas >= thresholds.gas) {
        issues.push({ 
            type: 'gas', 
            message: `Gas ${data.gas} ppm vượt ngưỡng` 
        });
    }
    
    if (data.humidity >= thresholds.humidity) {
        issues.push({ 
            type: 'humi', 
            message: `Độ ẩm ${data.humidity}% vượt ngưỡng` 
        });
    }
    
    // Trả về alert nếu có issues
    return issues.length > 0 ? {
        topic,
        message: issues.map(i => i.message).join('. '),
        issues,
        updatedAt: new Date().toISOString()
    } : null;
}
```

### 3.5.3 Logic AI Detection

**Pipeline chính:**
```python
def process_frame(frame):
    # 1. Pose Detection + Tracking
    persons = pose_detector.track(frame, conf=0.4)
    
    # 2. Object Detection + Tracking
    objects = object_detector.track(frame, classes=[24,26,28,43], conf=0.4)
    
    # 3. Update tracking history
    for person in persons:
        tracker.update_history(person['track_id'], person['kpts'])
    
    # 4. Stroke Detection
    for person in persons:
        history = tracker.get_history(person['track_id'])
        result = stroke_recognizer.analyze(
            history, 
            img_size=(frame.shape[1], frame.shape[0]),
            track_id=person['track_id']
        )
        
        if result['detected']:
            # Upload alert
            cloud_client.upload_alert(frame, person['track_id'], result)
    
    # 5. Baggage Tracking
    baggage_alerts = baggage_tracker.update(objects, persons)
    for alert in baggage_alerts:
        cloud_client.upload_airport_alert(frame, alert)
    
    # 6. Weapon Detection
    weapon_alerts = weapon_detector.detect_frame(objects, persons)
    for alert in weapon_alerts:
        cloud_client.upload_airport_alert(frame, alert)
    
    # 7. Visualization
    frame = draw_skeleton(frame, persons)
    frame = draw_baggage_overlays(frame, baggage_tracker.states)
    frame = draw_weapon_alerts(frame, weapon_alerts)
    
    return frame
```

**Stroke Detection Logic:**
```python
def analyze(self, history, img_size, track_id):
    # 1. Kiểm tra đủ frames
    if len(history) < 5:
        return self._result(False, 0.0, 'Normal', 'low')
    
    # 2. Validate keypoints
    latest = history[-1]
    valid_mask = (latest[:, 2] > 0.25) & (latest[:, 0] > 0) & (latest[:, 1] > 0)
    if valid_mask.sum() < 5:
        return self._result(False, 0.0, 'Normal', 'low')
    
    # 3. Detector 1: Sudden Fall
    result = self._detect_sudden_fall(track_id, img_size[1])
    if result['detected']:
        return result
    
    # 4. Detector 2: Abnormal Posture
    result = self._detect_abnormal_posture(track_id, history, latest, img_size[1])
    if result['detected']:
        return result
    
    # 5. Detector 3: Gradual Collapse
    result = self._detect_gradual_collapse(track_id, img_size[1])
    if result['detected']:
        return result
    
    return self._result(False, 0.0, 'Normal', 'low')
```

## 3.6 Thiết kế API

### 3.6.1 REST API Endpoints

**Authentication:**
```
POST   /api/auth/login
       Body: { username, password }
       Response: { token, user: { username, role } }

GET    /api/auth/me
       Headers: Authorization: Bearer <token>
       Response: { user: { username, role } }
```

**Health & Status:**
```
GET    /api/health
       Response: {
           mqtt: boolean,
           supabaseStatus: { connected, error },
           latestSensorData: { temp, humi, gas, fire, alert, thresholds },
           latestAlert: { message, issues, updatedAt }
       }
```

**Control:**
```
POST   /api/control
       Body: { device, value } hoặc { values: { temp, gas, humi } }
       Response: { success, message }
```

**Statistics:**
```
GET    /api/statistics?type=sensor&range=today
       Response: {
           type: 'sensor',
           range: 'today',
           summary: { avgTemperature, avgGas, avgHumidity, alertCount },
           points: [{ label, temperature, humidity, gas }]
       }

GET    /api/statistics?type=stroke_event&range=7d
       Response: {
           type: 'stroke_event',
           range: '7d',
           summary: { total, maxTable, averagePerDay },
           tables: [{ key, label, count }]
       }
```

**Database:**
```
GET    /api/database/rows?table=stroke_events&start=...&end=...&limit=100
       Response: { rows: [...], count }

DELETE /api/database/rows/:id?table=stroke_events
       Response: { success, message }
```

**History:**
```
GET    /api/history?type=sensor&range=today
       Response: { events: [...] }

GET    /api/history?type=images&range=7d
       Response: { events: [...] }
```

### 3.6.2 WebSocket / Realtime

**Supabase Realtime Channels:**
```javascript
// Frontend subscribe
const channel = supabase
    .channel('ai_events')
    .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'stroke_events'
    }, (payload) => {
        console.log('New stroke event:', payload.new);
        updateLatestImage(payload.new.image_url);
    })
    .subscribe();
```


## 3.7 Thiết kế giao diện Web quản trị

### 3.7.1 Cấu trúc trang

**Layout chính:**
```
┌────────────────────────────────────────────────────────┐
│  Sidebar                │  Main Content                │
│  ┌──────────────┐       │  ┌────────────────────────┐ │
│  │ Logo         │       │  │ Top Header             │ │
│  │              │       │  │ - Page Title           │ │
│  ├──────────────┤       │  │ - Status Badges        │ │
│  │ Navigation   │       │  │ - User Info            │ │
│  │ - Trang chủ  │       │  │ - Logout Button        │ │
│  │ - Thống kê   │       │  └────────────────────────┘ │
│  │ - Database   │       │                              │
│  │ - Lịch sử    │       │  ┌────────────────────────┐ │
│  └──────────────┘       │  │ View Container         │ │
│                         │  │ - Home View            │ │
│                         │  │ - Stats View           │ │
│                         │  │ - Database View        │ │
│                         │  │ - History View         │ │
│                         │  └────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

### 3.7.2 Trang chủ (Home View)

**Bố cục:**
```
┌─────────────────────────────────────────────────────────┐
│  Alert Banner (Hiện khi có cảnh báo)                    │
└─────────────────────────────────────────────────────────┘

┌──────────────────────────┐  ┌──────────────────────────┐
│  Left Panel              │  │  Right Panel             │
│                          │  │                          │
│  ┌────────────────────┐  │  │  ┌────────────────────┐ │
│  │ Sensor Cards Grid  │  │  │  │ Live Image Stream  │ │
│  │ ┌────┐  ┌────┐    │  │  │  │                    │ │
│  │ │Temp│  │Gas │    │  │  │  │  [Latest AI Image] │ │
│  │ └────┘  └────┘    │  │  │  │                    │ │
│  │ ┌────┐  ┌────┐    │  │  │  │  Event Overlay     │ │
│  │ │Fire│  │Humi│    │  │  │  └────────────────────┘ │
│  │ └────┘  └────┘    │  │  │                          │
│  └────────────────────┘  │  │  Image Alert Banner     │
│                          │  │  Acknowledge Button      │
│  ┌────────────────────┐  │  └──────────────────────────┘
│  │ Controls Card      │  │
│  │ - Gas Threshold    │  │
│  │ - Temp Threshold   │  │
│  │ - Humi Threshold   │  │
│  └────────────────────┘  │
└──────────────────────────┘
```

**Sensor Cards:**
- Nhiệt độ (Thermometer icon, màu đỏ)
- Nồng độ gas (Wind icon, màu cam)
- Trạng thái lửa (Flame icon, màu đỏ)
- Độ ẩm (Droplets icon, màu xanh)

Mỗi card hiển thị:
- Icon và label
- Giá trị hiện tại + đơn vị
- Ngưỡng cảnh báo
- Thời gian cập nhật

**Live Image Stream:**
- Hiển thị ảnh AI mới nhất từ 3 bảng (stroke_events, airport_events, baggage_tracks)
- Event overlay với thông tin sự kiện
- Alert banner khi có ảnh mới
- Nút "Xác nhận đã xem" để dismiss alert

### 3.7.3 Trang thống kê (Stats View)

**Filters:**
- Time Range: Hôm nay / 7 ngày / 30 ngày
- Data Type: Thống kê cảm biến / Thống kê cảnh báo từ AI

**Sensor Statistics:**
```
┌──────────────────────────────────────────────────────┐
│  Summary Cards (4 cards)                             │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐            │
│  │ Temp │  │ Gas  │  │ Fire │  │ Humi │            │
│  │ Avg  │  │ Avg  │  │Count │  │ Avg  │            │
│  └──────┘  └──────┘  └──────┘  └──────┘            │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│  Chart: Nhiệt độ và Độ ẩm theo thời gian            │
│  [Line Chart with 2 datasets]                        │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│  Chart: Nồng độ gas theo thời gian                  │
│  [Line Chart with 1 dataset]                         │
└──────────────────────────────────────────────────────┘
```

**AI Statistics:**
```
┌──────────────────────────────────────────────────────┐
│  Summary Cards (3 cards)                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │ Tổng     │  │ Bảng     │  │ Trung    │          │
│  │ cảnh báo │  │ nhiều    │  │ bình/    │          │
│  │ từ AI    │  │ nhất     │  │ ngày     │          │
│  └──────────┘  └──────────┘  └──────────┘          │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│  Frequency List (Theo từng bảng)                     │
│  ┌────────────────────────────────────────────────┐ │
│  │ stroke_events        [████████████] 45 cảnh báo│ │
│  │ airport_events       [████████] 30 cảnh báo    │ │
│  │ baggage_tracks       [████] 15 cảnh báo        │ │
│  └────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

### 3.7.4 Trang Database (Admin Only)

**Toolbar:**
- Dropdown chọn bảng: stroke_events, airport_events, baggage_tracks, sensor_data
- Date range filters: Từ thời gian, Đến thời gian
- Nút "Lọc"
- Nút "Xóa theo thời gian" (chỉ hiện với sensor_data)

**Table:**
- Hiển thị dữ liệu theo bảng đã chọn
- Columns động theo bảng
- Nút "Xóa" cho từng row
- Pagination (nếu cần)

**Chức năng:**
- Xem chi tiết dữ liệu
- Xóa từng record
- Xóa hàng loạt theo thời gian (sensor_data)
- Preview ảnh (nếu có image_url)

### 3.7.5 Trang Lịch sử (History View)

**Filters:**
- Loại lịch sử: Cảnh báo cảm biến / Ảnh AI chụp
- Khoảng thời gian: Hôm nay / 7 ngày / 30 ngày

**Table:**
```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ Thời gian    │ Loại sự kiện │ Chi tiết     │ Hình ảnh     │
├──────────────┼──────────────┼──────────────┼──────────────┤
│ 10:30:15     │ Stroke       │ Sudden Fall  │ [Thumbnail]  │
│ 10:25:42     │ Baggage      │ Abandoned    │ [Thumbnail]  │
│ 10:20:18     │ Sensor       │ Gas alert    │ --           │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

**Pagination:**
- Hiển thị tổng số records
- Nút Previous/Next
- Page numbers

### 3.7.6 Responsive Design

**Breakpoints:**
- Desktop: > 1024px (sidebar + main content)
- Tablet: 768px - 1024px (collapsible sidebar)
- Mobile: < 768px (hamburger menu, stacked layout)

**Mobile Optimizations:**
- Sensor cards: 2 columns grid
- Charts: Full width, scrollable
- Table: Horizontal scroll
- Sidebar: Overlay menu

## 3.8 Thiết kế Backend (xử lý số liệu)

### 3.8.1 Kiến trúc Backend

**Layers:**
```
┌─────────────────────────────────────────┐
│  API Layer (Express Routes)             │
│  - /api/auth/*                          │
│  - /api/health                          │
│  - /api/control                         │
│  - /api/statistics                      │
│  - /api/database/*                      │
│  - /api/history                         │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│  Business Logic Layer                   │
│  - Authentication (JWT)                 │
│  - Data Normalization                   │
│  - Alert Detection                      │
│  - Statistics Calculation               │
│  - Database Operations                  │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│  Data Access Layer                      │
│  - MQTT Client                          │
│  - Supabase Client                      │
│  - In-memory Cache                      │
└─────────────────────────────────────────┘
```

### 3.8.2 Xử lý dữ liệu cảm biến

**Normalization:**
```javascript
function normalizeSensorPayload(data) {
    return {
        temperature: toNumber(firstDefined(data.temp, data.temperature, data.t)),
        humidity: toNumber(firstDefined(data.humi, data.humidity, data.hum)),
        gas: toNumber(firstDefined(data.gas, data.gasValue)),
        fire: firstDefined(data.fire, data.flame),
        alert: firstDefined(data.alert, data.warning),
        thresholds: {
            temperature: toNumber(data.th_temp),
            humidity: toNumber(data.th_humidity),
            gas: toNumber(data.th_gas)
        }
    };
}
```

**Persist Strategy:**
- **Immediate**: Khi có alert lần đầu
- **Periodic**: Mỗi 5 phút (300,000 ms)
- **Batch**: Tạo 3 records (temperature, humidity, gas)

### 3.8.3 Xử lý thống kê

**Sensor Statistics:**
```javascript
async function calculateSensorStatistics(range) {
    const { start, end, days } = getStatsRange(range);
    
    // 1. Fetch data từ Supabase
    const { data } = await supabase
        .from('sensor_data')
        .select('*')
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString());
    
    // 2. Group by day
    const buckets = buildDayBuckets(days, end);
    for (const row of data) {
        const key = dateKey(row.created_at);
        if (buckets[key]) {
            if (row.temperature) buckets[key].tempSum += row.temperature;
            if (row.humidity) buckets[key].humiSum += row.humidity;
            if (row.gas_value) buckets[key].gasSum += row.gas_value;
            if (row.warning) buckets[key].alertCount++;
        }
    }
    
    // 3. Calculate averages
    const points = Object.values(buckets).map(bucket => ({
        label: dayLabel(bucket.key),
        temperature: bucket.tempCount > 0 ? bucket.tempSum / bucket.tempCount : null,
        humidity: bucket.humiCount > 0 ? bucket.humiSum / bucket.humiCount : null,
        gas: bucket.gasCount > 0 ? bucket.gasSum / bucket.gasCount : null
    }));
    
    return { summary, points };
}
```

**AI Statistics:**
```javascript
async function calculateAiStatistics(range) {
    const { start, end } = getStatsRange(range);
    
    // 1. Fetch từ 3 bảng AI
    const results = await Promise.all([
        fetchAiEventRows(stroke_events_config, { start, end, requireStatsAlert: true }),
        fetchAiEventRows(airport_events_config, { start, end, requireStatsAlert: true }),
        fetchAiEventRows(baggage_tracks_config, { start, end, requireStatsAlert: true })
    ]);
    
    // 2. Count theo bảng
    const tables = [
        { key: 'stroke_events', label: 'Stroke_event', count: results[0].length },
        { key: 'airport_events', label: 'airport_events', count: results[1].length },
        { key: 'baggage_tracks', label: 'baggage_tracks', count: results[2].length }
    ];
    
    // 3. Summary
    const total = tables.reduce((sum, t) => sum + t.count, 0);
    const maxTable = tables.reduce((max, t) => t.count > max.count ? t : max);
    const averagePerDay = total / days;
    
    return { summary: { total, maxTable, averagePerDay }, tables };
}
```


## 3.9 Lưu đồ thuật toán

### 3.9.1 Lưu đồ tổng quát hệ thống

```
                    [START]
                       │
        ┌──────────────┼──────────────┐
        │              │              │
   [ESP32 Loop]   [Backend]    [AI System]
        │              │              │
        ▼              ▼              ▼
   Đọc cảm biến   Subscribe      Capture Frame
        │          MQTT Topic         │
        ▼              │              ▼
   So sánh ngưỡng     │         Pose Detection
        │              │              │
        ▼              ▼              ▼
   Tạo JSON      Normalize Data  Object Detection
        │              │              │
        ▼              ▼              ▼
   Publish MQTT  Detect Alert    Tracking
        │              │              │
        ▼              ▼              ▼
   Hiển thị LCD  Persist DB     Stroke Analysis
        │              │              │
        └──────────────┼──────────────┘
                       │
                       ▼
                  [Supabase]
                       │
                       ▼
                  [Frontend]
                       │
                       ▼
                    [END]
```

### 3.9.2 Lưu đồ xử lý cảm biến (ESP32)

```
                [Loop Start]
                     │
                     ▼
            ┌─ Kiểm tra MQTT ─┐
            │                  │
         Mất kết nối?      Đã kết nối
            │                  │
            ▼                  ▼
        Reconnect()       client.loop()
            │                  │
            └──────────────────┘
                     │
                     ▼
         ┌─ Đã đủ 2 giây? ─┐
         │                  │
        Chưa              Đủ
         │                  │
         │                  ▼
         │          Đọc DHT22 → temp, humi
         │                  │
         │                  ▼
         │          Đọc ADC → gas_ppm
         │                  │
         │                  ▼
         │          Đọc GPIO → fire
         │                  │
         │                  ▼
         │          ┌─ So sánh ngưỡng ─┐
         │          │                   │
         │       Vượt ngưỡng?        Bình thường
         │          │                   │
         │          ▼                   ▼
         │    buildAlertList()    alertCount = 0
         │          │                   │
         │          └───────┬───────────┘
         │                  │
         │                  ▼
         │            sendData() → MQTT
         │                  │
         └──────────────────┘
                     │
                     ▼
         ┌─ Quản lý LCD ─┐
         │               │
    alertCount > 0?   alertCount == 0
         │               │
         ▼               ▼
   Nhấp nháy       displayNormal()
   displayAlert()       │
         │               │
         └───────┬───────┘
                 │
                 ▼
            [Loop End]
```

### 3.9.3 Lưu đồ phát hiện đột quỵ (AI)

```
            [Nhận frame mới]
                   │
                   ▼
         Pose Detection (YOLO)
                   │
                   ▼
         ┌─ Có người? ─┐
         │             │
        Không         Có
         │             │
         │             ▼
         │    Update tracking history
         │             │
         │             ▼
         │    ┌─ Đủ 5 frames? ─┐
         │    │                 │
         │   Chưa              Đủ
         │    │                 │
         │    │                 ▼
         │    │    Validate keypoints
         │    │                 │
         │    │                 ▼
         │    │    ┌─ Đủ 5 keypoints? ─┐
         │    │    │                    │
         │    │   Không                Đủ
         │    │    │                    │
         │    │    │                    ▼
         │    │    │         Detector 1: Sudden Fall
         │    │    │                    │
         │    │    │                    ▼
         │    │    │         ┌─ Phát hiện? ─┐
         │    │    │         │              │
         │    │    │        Có            Không
         │    │    │         │              │
         │    │    │         │              ▼
         │    │    │         │   Detector 2: Abnormal Posture
         │    │    │         │              │
         │    │    │         │              ▼
         │    │    │         │   ┌─ Phát hiện? ─┐
         │    │    │         │   │              │
         │    │    │         │  Có            Không
         │    │    │         │   │              │
         │    │    │         │   │              ▼
         │    │    │         │   │   Detector 3: Gradual Collapse
         │    │    │         │   │              │
         │    │    │         │   │              ▼
         │    │    │         │   │   ┌─ Phát hiện? ─┐
         │    │    │         │   │   │              │
         │    │    │         │   │  Có            Không
         │    │    │         │   │   │              │
         │    └────┴─────────┴───┴───┴──────────────┘
         │                        │                  │
         │                        ▼                  ▼
         │                  Upload Alert      Return Normal
         │                        │                  │
         └────────────────────────┴──────────────────┘
                                  │
                                  ▼
                          [Vẽ visualization]
                                  │
                                  ▼
                            [Hiển thị frame]
```

---

# CHƯƠNG 4: XÂY DỰNG VÀ THIẾT LẬP MÔ PHỎNG

## 4.1 Môi trường phát triển

### 4.1.1 Phần IoT (ESP32)

**IDE và Tools:**
- **Visual Studio Code** 1.85+
- **PlatformIO Extension** 6.1+
- **Wokwi Simulator Extension** 4.0+

**Platform và Framework:**
- **Platform**: espressif32
- **Board**: esp32dev (ESP32 DevKit C V4)
- **Framework**: Arduino

**Thư viện sử dụng:**
```ini
lib_deps = 
    knolleary/PubSubClient@^2.8
    marcoschwartz/LiquidCrystal_I2C@^1.1.4
    adafruit/DHT sensor library@^1.4.4
    adafruit/Adafruit Unified Sensor@^1.1.14
    bblanchon/ArduinoJson@^7.0.4
```

**Cấu hình PlatformIO:**
```ini
[env:esp32dev]
platform = espressif32
board = esp32dev
framework = arduino
monitor_speed = 115200
```

### 4.1.2 Phần AI (Python)

**Python Version:** 3.10+

**IDE:** Visual Studio Code hoặc PyCharm

**Thư viện chính:**
```
torch>=2.0.0              # PyTorch
ultralytics>=8.1.0        # YOLOv8
opencv-python>=4.8.0      # Computer Vision
numpy>=1.24.0             # Numerical Computing
supabase>=2.4.0           # Cloud Backend
customtkinter>=5.2.0      # Modern GUI
```

**GPU Support:**
- CUDA 11.8+ (nếu có NVIDIA GPU)
- cuDNN 8.6+
- TensorRT 8.5+ (optional, cho tối ưu)

### 4.1.3 Phần Backend (Node.js)

**Node.js Version:** 18.x LTS

**Package Manager:** npm 9.x

**Dependencies:**
```json
{
  "express": "^5.2.1",
  "mqtt": "^5.15.1",
  "@supabase/supabase-js": "^2.105.4",
  "cors": "^2.8.6",
  "dotenv": "^17.4.2"
}
```

**Development Tools:**
- **Nodemon**: Auto-restart server
- **Postman**: API testing

### 4.1.4 Phần Frontend

**Browser Support:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Libraries:**
- **Chart.js** 4.x: Biểu đồ
- **Lucide Icons**: Icon library
- **Supabase JS Client** 2.x: Realtime

**Development Server:**
- Live Server extension (VS Code)
- hoặc `python -m http.server 8000`

### 4.1.5 Cloud Services

**HiveMQ Cloud:**
- Plan: Free (100 connections)
- Region: EU (Europe)
- TLS: Enabled

**Supabase:**
- Plan: Free (500 MB database, 1 GB storage)
- Region: Southeast Asia
- Postgres Version: 15

**Render.com:**
- Plan: Free (750 hours/month)
- Region: Singapore
- Auto-deploy từ GitHub


## 4.2 Xây dựng mô hình Firmware (Wokwi)

### 4.2.1 Cấu trúc code

**File chính: src/main.cpp**

**Sections:**
1. **Includes và Defines** (dòng 1-30)
   - Thư viện: Arduino.h, WiFi.h, PubSubClient.h, DHT.h, ArduinoJson.h
   - Định nghĩa pins và constants

2. **Global Variables** (dòng 31-60)
   - MQTT client, DHT sensor, LCD
   - Sensor data: temp, humidity, gas, fire
   - Alert management: activeAlerts[], alertCount
   - Timing: lastUpdateTime, lastBlinkTime

3. **WiFi & MQTT Setup** (dòng 61-140)
   - `setup_wifi()`: Kết nối WiFi Wokwi-GUEST
   - `callback()`: Xử lý MQTT commands
   - `reconnect()`: Tự động kết nối lại MQTT

4. **Main Logic** (dòng 141-220)
   - `setup()`: Khởi tạo LCD, DHT, WiFi, MQTT
   - `loop()`: Vòng lặp chính
     - Đọc cảm biến mỗi 2 giây
     - Gửi dữ liệu qua MQTT
     - Quản lý hiển thị LCD

5. **Helper Functions** (dòng 221-260)
   - `buildAlertList()`: Tạo danh sách alerts
   - `displayNormal()`: Hiển thị bình thường
   - `displayAlert()`: Hiển thị cảnh báo
   - `sendData()`: Gửi JSON qua MQTT

### 4.2.2 Cấu hình Wokwi

**File: diagram.json**

**Components:**
```json
{
  "parts": [
    { "type": "board-esp32-devkit-c-v4", "id": "esp" },
    { "type": "wokwi-lcd1602", "id": "lcd1", "attrs": { "pins": "i2c", "address": "0x27" } },
    { "type": "wokwi-potentiometer", "id": "pot1", "attrs": { "label": "Gas Sensor (MQ-2 Sim)" } },
    { "type": "wokwi-flame-sensor", "id": "flame1" },
    { "type": "wokwi-dht22", "id": "dht1" },
    { "type": "wokwi-pushbutton", "id": "btn1", "attrs": { "color": "red", "label": "LỬA" } }
  ]
}
```

**Connections:**
- LCD I2C: SDA (GPIO 21), SCL (GPIO 22)
- DHT22: Data (GPIO 15)
- Potentiometer: Signal (GPIO 34)
- Flame Sensor: Digital Out (GPIO 25)
- Fire Button: GPIO 26

### 4.2.3 Build và Deploy

**Build firmware:**
```bash
cd IOT
pio run
```

Output: `.pio/build/esp32dev/firmware.bin`

**Run simulation:**
1. Mở VS Code
2. Mở file `diagram.json`
3. Click nút ▶️ "Start Simulation"
4. Hoặc: F1 → "Wokwi: Start Simulator"

**Monitor Serial:**
```bash
pio device monitor
```

Hoặc xem trong Wokwi Serial Monitor.

## 4.3 Xây dựng mô hình AI

### 4.3.1 Cấu trúc project

```
Stroke_al/
├── app/
│   ├── ai/
│   │   ├── detector.py           # YOLOv8-Pose wrapper
│   │   ├── object_detector.py    # YOLOv8 Object Detection
│   │   ├── tracker.py            # Keypoint history tracker
│   │   ├── recognizer_v2.py      # Stroke detection logic
│   │   ├── baggage_tracker.py    # Abandoned baggage
│   │   └── weapon_detector.py    # Weapon detection
│   ├── cloud/
│   │   ├── supabase.py           # Stroke events client
│   │   └── airport_cloud.py      # Airport events client
│   ├── gui/
│   │   └── main_window.py        # CustomTkinter GUI
│   └── utils/
│       ├── visualization.py      # Stroke visualization
│       └── airport_viz.py        # Airport visualization
├── main.py                       # Entry point
├── requirements.txt
├── .env                          # Supabase credentials
├── yolov8n-pose.pt              # Pose model
└── yolov8n.pt                   # Object detection model
```

### 4.3.2 Cài đặt dependencies

```bash
cd Al_Python/Stroke_al
pip install -r requirements.txt
```

**Cấu hình .env:**
```env
SUPABASE_URL=https://ypddfcoesrtvjabyqqta.supabase.co
SUPABASE_KEY=your_supabase_key
SUPABASE_BUCKET=surveillance-images
```

### 4.3.3 Chạy ứng dụng

```bash
python main.py
```

**GUI Controls:**
- **Source**: Chọn Webcam hoặc Video file
- **Frame Skip**: Điều chỉnh tốc độ (1-5)
- **Start/Stop**: Bắt đầu/dừng detection
- **Tabs**: Live Detection, Database Manager, Airport Database

### 4.3.4 Tối ưu hiệu năng

**GPU Acceleration:**
```python
device = 'cuda' if torch.cuda.is_available() else 'cpu'
model.to(device)
```

**FP16 Half Precision:**
```python
results = model.predict(frame, half=True)  # Chỉ trên GPU
```

**Frame Skip:**
```python
if frame_counter % object_skip != 0:
    return cached_results  # Dùng cache
```

**TensorRT Export:**
```bash
yolo export model=yolov8n-pose.pt format=engine device=0
```

## 4.4 Xây dựng giao diện Web (Frontend)

### 4.4.1 Cấu trúc files

```
frontend/
├── index.html          # Main HTML
├── style.css           # Styles
├── main.js             # JavaScript logic
├── logo/
│   └── Web IoT.png     # Logo
└── GIF/
    └── nen01.gif       # Placeholder image
```

### 4.4.2 HTML Structure

**Sections:**
1. **Auth Screen** (Login form)
2. **App Layout**
   - Sidebar (Navigation)
   - Main Content
     - Top Header
     - View Container
       - Home View
       - Stats View
       - Database View
       - History View

### 4.4.3 CSS Architecture

**CSS Variables:**
```css
:root {
    --primary: #3b82f6;
    --danger: #ef4444;
    --success: #10b981;
    --warning: #f59e0b;
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --text-primary: #f1f5f9;
}
```

**Layout:**
- Flexbox cho sidebar + main
- Grid cho sensor cards
- Responsive breakpoints: 768px, 1024px

### 4.4.4 JavaScript Modules

**Main Functions:**
- `switchPage()`: Chuyển trang
- `login()`, `logout()`: Authentication
- `checkBackendStatus()`: Polling backend mỗi 2s
- `updateSensorCards()`: Cập nhật sensor data
- `updateChartsData()`: Cập nhật biểu đồ
- `loadStatistics()`: Tải thống kê
- `loadDatabaseRows()`: Tải database
- `loadHistory()`: Tải lịch sử

**Realtime Updates:**
```javascript
// Supabase Realtime
const subscription = supabase
    .channel('ai_events')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'stroke_events' },
        (payload) => updateLatestImage(payload.new.image_url)
    )
    .subscribe();
```

### 4.4.5 Deployment

**Local Development:**
```bash
cd frontend
# Option 1: Live Server (VS Code extension)
# Option 2: Python HTTP server
python -m http.server 8000
```

**Production:**
- Deploy lên Render.com Static Site
- Hoặc Netlify, Vercel, GitHub Pages

## 4.5 Xây dựng Backend

### 4.5.1 Cấu trúc code

**File: server.js**

**Sections:**
1. **Imports và Setup** (dòng 1-50)
2. **Configuration** (dòng 51-100)
3. **MQTT Client** (dòng 101-200)
4. **Authentication** (dòng 201-300)
5. **Data Processing** (dòng 301-500)
6. **API Routes** (dòng 501-800)
7. **Server Start** (dòng 801-850)

### 4.5.2 Cấu hình .env

```env
# Server
PORT=3001
AUTH_SECRET=iot-demo-auth-secret

# MQTT
MQTT_BROKER=0cf84da2cc5b47ccb9613aee2edcc06b.s1.eu.hivemq.cloud
MQTT_PORT=8883
MQTT_PROTOCOL=mqtts
MQTT_USERNAME=doantuan
MQTT_PASSWORD=Tuan1234
MQTT_SENSOR_TOPIC=wokwi/sensors/#
MQTT_COMMAND_TOPIC=wokwi/sensors/commands

# Supabase
SUPABASE_URL=https://ypddfcoesrtvjabyqqta.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SURVEILLANCE_BUCKET=surveillance-images

# Auth Users
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
USER_USERNAME=user
USER_PASSWORD=user123
```

### 4.5.3 Chạy server

**Development:**
```bash
cd backend
npm install
npm run dev
```

**Production:**
```bash
npm start
```

Server chạy tại: `http://localhost:3001`

### 4.5.4 Deploy lên Render.com

**Bước 1: Tạo repository GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/iot-backend.git
git push -u origin main
```

**Bước 2: Tạo Web Service trên Render**
- New → Web Service
- Connect GitHub repository
- Build Command: `npm install`
- Start Command: `npm start`
- Environment: Node
- Plan: Free

**Bước 3: Thêm Environment Variables**
- Vào Settings → Environment
- Thêm tất cả biến từ .env

**Bước 4: Deploy**
- Click "Manual Deploy" hoặc push code lên GitHub
- Render tự động build và deploy

**URL:** `https://backend-iot-0ud5.onrender.com`


## 4.6 Thiết kế thông số mô phỏng

### 4.6.1 Thông số cảm biến

**DHT22 (Nhiệt độ và Độ ẩm):**
- Nhiệt độ bình thường: 25-30°C
- Nhiệt độ nguy hiểm: > 50°C (ngưỡng mặc định)
- Độ ẩm bình thường: 50-70%
- Độ ẩm cao: > 80% (ngưỡng mặc định)
- Tần suất đọc: Mỗi 2 giây

**MQ-2 (Gas Sensor - Potentiometer):**
- Giá trị bình thường: 0-1500 ppm
- Giá trị nguy hiểm: > 2000 ppm (ngưỡng mặc định)
- Range: 0-4095 (ADC 12-bit)
- Điều chỉnh: Xoay potentiometer trong Wokwi

**Flame Sensor:**
- Output: Digital (HIGH/LOW)
- LOW = Phát hiện lửa
- HIGH = Không có lửa
- Kết hợp với nút nhấn thủ công (GPIO 26)

### 4.6.2 Thông số MQTT

**Connection:**
- Keep-alive: 60 giây
- Reconnect period: 3 giây
- QoS: 0 (At most once)
- Clean session: true

**Message Rate:**
- Publish: Mỗi 2 giây
- Payload size: ~150 bytes (JSON)
- Bandwidth: ~75 bytes/s

### 4.6.3 Thông số AI

**YOLOv8-Pose:**
- Input size: 640x640
- Confidence threshold: 0.4
- Keypoint confidence: 0.25
- FPS target: 30 (với GPU)

**YOLOv8 Object Detection:**
- Input size: 640x640
- Confidence threshold: 0.4 (baggage), 0.25 (weapon)
- Frame skip: 3 frames
- NMS IoU threshold: 0.45

**Stroke Detection:**
- Sudden Fall velocity: > 7% frame height
- Abnormal Posture aspect ratio: > 1.2
- Sustained frames: 6 (Abnormal), 5 (Collapse)
- Buffer size: 5-12 frames

**Baggage Tracking:**
- Owner radius: 160 pixels
- Abandon timeout: 60 giây
- Alert cooldown: 120 giây
- Grace period: 3 giây

**Weapon Detection:**
- Bearer radius: 130 pixels
- Alert cooldown: 25 giây
- Confidence minimum: 0.25

### 4.6.4 Thông số Backend

**API Rate Limits:**
- Health check: Mỗi 2 giây (frontend polling)
- Statistics: Cache 10 giây
- Database queries: Limit 100-200 rows

**Sensor Persist:**
- Periodic: Mỗi 5 phút (300,000 ms)
- Immediate: Khi có alert lần đầu
- Batch size: 3 records (temp, humi, gas)

**Memory:**
- Latest sensor data: In-memory
- Alert history: 50 alerts (in-memory)
- MQTT buffer: Default (mqtt library)

## 4.7 Thiết kế các kịch bản mô phỏng

### 4.7.1 Kịch bản 1: Cảnh báo nhiệt độ cao

**Mục tiêu:** Kiểm tra phát hiện nhiệt độ vượt ngưỡng

**Các bước:**
1. Khởi động Wokwi simulation
2. Đợi ESP32 kết nối MQTT (xem Serial Monitor)
3. Mở Web Dashboard
4. Quan sát nhiệt độ hiện tại trên card "Nhiệt độ"
5. Trong Wokwi, click vào DHT22 sensor
6. Điều chỉnh nhiệt độ lên > 50°C
7. Đợi 2 giây (chu kỳ gửi dữ liệu)

**Kết quả mong đợi:**
- LCD nhấp nháy hiển thị "TEMP ALERT"
- Web hiển thị alert banner màu đỏ
- Card "Nhiệt độ" có viền đỏ (danger-glow)
- Toast notification xuất hiện
- Dữ liệu được lưu vào Supabase với `warning` field

### 4.7.2 Kịch bản 2: Cảnh báo gas vượt ngưỡng

**Mục tiêu:** Kiểm tra phát hiện gas nguy hiểm

**Các bước:**
1. Trong Wokwi, tìm Potentiometer (label: "Gas Sensor MQ-2 Sim")
2. Click và kéo slider lên giá trị > 2000
3. Đợi 2 giây

**Kết quả mong đợi:**
- LCD hiển thị "GAS ALERT"
- Web hiển thị cảnh báo gas
- Card "Nồng độ gas" có viền đỏ
- Message: "Gas X ppm vượt ngưỡng 2000 ppm"

### 4.7.3 Kịch bản 3: Cảnh báo lửa

**Mục tiêu:** Kiểm tra phát hiện lửa

**Các bước:**
1. Trong Wokwi, click nút đỏ "LỬA" (GPIO 26)
2. Hoặc click vào Flame Sensor để kích hoạt

**Kết quả mong đợi:**
- LCD hiển thị "FIRE ALERT"
- Card "Trạng thái lửa" hiển thị "Nguy hiểm" màu đỏ
- Alert banner: "Phát hiện lửa hoặc tín hiệu cháy"
- Dữ liệu lưu với `fire_detected = true`

### 4.7.4 Kịch bản 4: Điều khiển ngưỡng từ xa

**Mục tiêu:** Kiểm tra gửi lệnh MQTT từ Web

**Các bước:**
1. Trong Web Dashboard, tìm "Cài đặt ngưỡng cảnh báo"
2. Thay đổi "Ngưỡng gas" từ 2000 → 1500
3. Click nút "Lưu"
4. Quan sát Serial Monitor trong Wokwi

**Kết quả mong đợi:**
- Serial Monitor hiển thị: "✅ SET GAS THRESHOLD: 1500 PPM"
- ESP32 cập nhật biến `THRESHOLD_GAS_PPM = 1500`
- Lần gửi dữ liệu tiếp theo sẽ có `th_gas: 1500`
- Web hiển thị "Ngưỡng: 1500 ppm"

### 4.7.5 Kịch bản 5: Phát hiện đột quỵ (Sudden Fall)

**Mục tiêu:** Kiểm tra AI phát hiện ngã đột ngột

**Các bước:**
1. Chạy AI System: `python main.py`
2. Chọn source: Webcam hoặc video file
3. Click "Start Detection"
4. Đứng trước camera
5. Thực hiện động tác ngã nhanh xuống đất

**Kết quả mong đợi:**
- Bounding box màu đỏ quanh người
- Label: "ID:X | Sudden_Fall"
- Alert text: "⚠ ALERT: SUDDEN_FALL"
- Ảnh được upload lên Supabase (folder: alerts/)
- Record mới trong bảng `stroke_events` với `event_type = 'Sudden_Fall'`
- Web hiển thị ảnh mới trong "Luồng giám sát mới nhất"

### 4.7.6 Kịch bản 6: Phát hiện hành lý bỏ lại

**Mục tiêu:** Kiểm tra phát hiện abandoned baggage

**Các bước:**
1. Chạy AI System
2. Đặt ba lô/túi xách trước camera
3. Đứng gần túi (trong bán kính 160px)
4. Đợi hệ thống detect và track
5. Rời xa túi (ngoài bán kính 160px)
6. Đợi 60 giây

**Kết quả mong đợi:**
- Bounding box xanh lá khi có chủ: "backpack ✓ có chủ"
- Chuyển sang màu cam khi chủ rời đi: "backpack ⚠ 45s"
- Progress bar đếm ngược
- Sau 60s, chuyển màu đỏ: "backpack 🚨 BỎ LẠI 65s"
- Ảnh upload lên Supabase (folder: baggage/)
- Record trong `airport_events` với `event_type = 'abandoned_baggage'`

### 4.7.7 Kịch bản 7: Thống kê và lịch sử

**Mục tiêu:** Kiểm tra chức năng thống kê

**Các bước:**
1. Tạo nhiều alerts (sensor và AI) trong vài ngày
2. Vào trang "Thống kê"
3. Chọn "Thống kê cảm biến" → "7 ngày gần nhất"
4. Quan sát biểu đồ và summary cards
5. Chọn "Thống kê cảnh báo từ AI" → "Hôm nay"
6. Quan sát frequency list

**Kết quả mong đợi:**
- Biểu đồ hiển thị xu hướng nhiệt độ, độ ẩm, gas
- Summary cards hiển thị giá trị trung bình
- AI statistics hiển thị số lượng theo từng bảng
- Frequency list với progress bars

### 4.7.8 Kịch bản 8: Quản lý Database (Admin)

**Mục tiêu:** Kiểm tra CRUD operations

**Các bước:**
1. Đăng nhập với tài khoản admin (admin/admin123)
2. Vào trang "Cơ sở dữ liệu"
3. Chọn bảng "stroke_events"
4. Chọn khoảng thời gian
5. Click "Lọc"
6. Click nút "Xóa" trên một row
7. Confirm deletion

**Kết quả mong đợi:**
- Table hiển thị dữ liệu đúng
- Xóa row thành công
- Ảnh trên Storage cũng bị xóa
- Toast notification: "Đã xóa record"
- Table refresh tự động

---

# KẾT LUẬN

## Kết quả đạt được

Đồ án đã hoàn thành mục tiêu xây dựng hệ thống giám sát an toàn thông minh tích hợp IoT và AI với các kết quả cụ thể:

**1. Phần IoT (ESP32):**
- ✅ Firmware hoạt động ổn định trên Wokwi
- ✅ Đọc chính xác 3 loại cảm biến (DHT22, MQ-2, Flame)
- ✅ Kết nối MQTT với HiveMQ Cloud qua TLS
- ✅ Gửi dữ liệu JSON mỗi 2 giây
- ✅ Nhận lệnh điều khiển ngưỡng từ xa
- ✅ Hiển thị thông tin và cảnh báo trên LCD 16x2

**2. Phần AI (Python):**
- ✅ Phát hiện đột quỵ với 3 detectors (độ chính xác 78-92%)
- ✅ Phát hiện hành lý bỏ lại với timeout 60s
- ✅ Phát hiện vũ khí nguy hiểm
- ✅ Tracking ổn định với ByteTrack
- ✅ Upload ảnh alert lên Supabase tự động
- ✅ GUI hiện đại với CustomTkinter

**3. Phần Backend (Node.js):**
- ✅ REST API hoàn chỉnh với 8 endpoints
- ✅ MQTT client subscribe và publish
- ✅ Authentication với JWT (2 roles: admin, user)
- ✅ Xử lý và normalize dữ liệu cảm biến
- ✅ Phát hiện alert tự động
- ✅ Thống kê theo thời gian (today, 7d, 30d)
- ✅ Deploy thành công lên Render.com

**4. Phần Frontend (Web):**
- ✅ Giao diện responsive (desktop + mobile)
- ✅ Dashboard real-time với 4 sensor cards
- ✅ Biểu đồ thống kê với Chart.js
- ✅ Hiển thị ảnh AI mới nhất
- ✅ Quản lý database (admin only)
- ✅ Lịch sử cảnh báo
- ✅ Realtime updates với Supabase subscriptions

**5. Tích hợp Cloud:**
- ✅ Supabase: 4 bảng (sensor_data, stroke_events, airport_events, baggage_tracks)
- ✅ Storage: 3 folders (alerts, baggage, weapons)
- ✅ HiveMQ Cloud: MQTTS với TLS
- ✅ Render.com: Backend deployment

## Hạn chế và hướng phát triển

**Hạn chế hiện tại:**
1. **False Positives**: AI có thể nhầm tư thế ngồi/nằm bình thường với đột quỵ
2. **Phụ thuộc Internet**: Mất kết nối → mất dữ liệu
3. **Chưa có Edge Computing**: AI chạy trên máy tính, chưa tối ưu cho thiết bị nhúng
4. **Chưa có thông báo SMS/Email**: Chỉ cảnh báo trên Web
5. **Mô phỏng**: Chưa test trên phần cứng thật

**Hướng phát triển:**
1. **Cải thiện AI**:
   - Fine-tune YOLOv8 trên dataset custom
   - Thêm ML model cho stroke detection (thay rule-based)
   - Tích hợp face recognition để nhận diện người

2. **Edge Computing**:
   - Port AI sang TensorFlow Lite
   - Chạy trên Raspberry Pi hoặc Jetson Nano
   - Giảm latency và phụ thuộc cloud

3. **Thông báo đa kênh**:
   - SMS qua Twilio
   - Email qua SendGrid
   - Push notification qua Firebase

4. **Mở rộng cảm biến**:
   - Thêm camera IP
   - Cảm biến chuyển động PIR
   - Cảm biến áp suất, độ rung

5. **Triển khai thực tế**:
   - Test trên phần cứng ESP32 thật
   - Triển khai tại bệnh viện, sân bay
   - Thu thập feedback và cải thiện

## Đánh giá chung

Đồ án đã đạt được mục tiêu ban đầu, tạo ra một hệ thống hoàn chỉnh từ IoT đến AI, từ Backend đến Frontend. Hệ thống có khả năng mở rộng tốt, dễ bảo trì, và có thể ứng dụng thực tế trong nhiều lĩnh vực.

Điểm mạnh của đồ án là sự tích hợp đa công nghệ (IoT, AI, Cloud, Web) một cách mượt mà, tạo ra trải nghiệm người dùng tốt với giao diện hiện đại và dữ liệu real-time.

---

# PHỤ LỤC

## A. Danh sách công nghệ và thư viện

**IoT (ESP32):**
- PlatformIO 6.1+
- Arduino Framework
- PubSubClient 2.8
- DHT sensor library 1.4.4
- ArduinoJson 7.0.4
- LiquidCrystal_I2C 1.1.4

**AI (Python):**
- Python 3.10+
- PyTorch 2.0+
- Ultralytics (YOLOv8) 8.1+
- OpenCV 4.8+
- NumPy 1.24+
- Supabase 2.4+
- CustomTkinter 5.2+

**Backend (Node.js):**
- Node.js 18.x LTS
- Express.js 5.2.1
- MQTT 5.15.1
- @supabase/supabase-js 2.105.4
- CORS 2.8.6
- dotenv 17.4.2

**Frontend:**
- HTML5, CSS3, JavaScript ES6+
- Chart.js 4.x
- Lucide Icons
- Supabase JS Client 2.x

**Cloud Services:**
- HiveMQ Cloud (MQTT Broker)
- Supabase (Database + Storage)
- Render.com (Backend Hosting)

## B. Tài liệu tham khảo

1. **ESP32 Documentation**: https://docs.espressif.com/projects/esp-idf/
2. **MQTT Protocol**: https://mqtt.org/
3. **YOLOv8 Documentation**: https://docs.ultralytics.com/
4. **Supabase Documentation**: https://supabase.com/docs
5. **Node.js Documentation**: https://nodejs.org/docs/
6. **Wokwi Simulator**: https://docs.wokwi.com/

## C. Source Code Repository

- **GitHub**: https://github.com/username/iot-project
- **IoT Firmware**: /IOT
- **AI System**: /Al_Python/Stroke_al
- **Backend**: /WEB_IOT/backend
- **Frontend**: /WEB_IOT/frontend

---

**HẾT**

