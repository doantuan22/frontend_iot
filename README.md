<img width="1909" height="907" alt="image" src="https://github.com/user-attachments/assets/df3bf2aa-f6ba-4de1-aa1e-c399571a0293" /># BÁO CÁO ĐỒ ÁN IOT
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

## 3.4 Phát triển và triển khai mô hình AI

### 3.4.1 Lựa chọn mô hình YOLOv8

**YOLOv8-Pose cho Pose Estimation:**

Hệ thống sử dụng mô hình pre-trained `yolov8n-pose.pt` đã được huấn luyện trên COCO dataset với 17 keypoints. Mô hình này không cần training lại vì:

- Dataset COCO chứa hơn 200,000 ảnh người với keypoint annotations chất lượng cao
- Độ chính xác của mô hình (mAP 50-95: ~50%) đủ tốt cho phát hiện tư thế bất thường
- Keypoints COCO 17 bao gồm đầy đủ các điểm khớp cần thiết: mũi, mắt, tai, vai, khuỷu tay, cổ tay, hông, đầu gối, mắt cá chân

**YOLOv8 cho Object Detection:**

Mô hình `yolov8n.pt` được sử dụng để phát hiện hành lý và vũ khí. COCO dataset đã bao gồm các classes cần thiết:
- Class 0 (person): Phát hiện người để xác định owner/bearer
- Class 24, 26, 28 (backpack, handbag, suitcase): Phát hiện hành lý
- Class 43 (knife): Phát hiện vũ khí cơ bản

**Tùy chọn mở rộng:**

Để tăng độ chính xác phát hiện vũ khí, có thể fine-tune mô hình trên dataset chuyên biệt từ Roboflow hoặc tự thu thập, bao gồm thêm các classes: gun, pistol, rifle, scissors. Quá trình fine-tuning sử dụng transfer learning, chỉ cần 500-1000 ảnh annotated và training 50-100 epochs.

### 3.4.2 Thiết kế thuật toán phát hiện đột quỵ

Thuật toán phát hiện đột quỵ là **rule-based system** kết hợp 3 detectors độc lập, không phải deep learning model. Mỗi detector phân tích các đặc trưng khác nhau từ keypoints:

**Detector 1: Sudden Fall (Ngã đột ngột)**

Phát hiện dựa trên vận tốc di chuyển của keypoint hông (hip) theo phương thẳng đứng:

- Tính toán: `velocity = Δy_hip / Δt` qua 5 frames gần nhất
- Ngưỡng: `max_velocity > 7% * frame_height`
- Confidence: 0.92 (92%)

**Detector 2: Abnormal Posture (Tư thế bất thường)**

Phát hiện người nằm ngang hoặc tư thế không tự nhiên:

- Điều kiện 1: `aspect_ratio = bbox_width / bbox_height > 1.2`
- Điều kiện 2: `bbox_height < 45% * frame_height`
- Điều kiện 3: Đầu/vai thấp hơn hông (margin 15%)
- Sustained: 6 frames liên tục để giảm false positive
- Confidence: 0.87 (87%)

**Detector 3: Gradual Collapse (Suy sụp từ từ)**

Phát hiện người từ từ ngã xuống qua 12 frames:

- Theo dõi aspect ratio tăng dần
- Velocity trung bình: `> 2.5% * frame_height`
- Sustained: 5 frames
- Confidence: 0.78 (78%)

**Ưu điểm của rule-based approach:**

- Không cần dataset đột quỵ (rất khó thu thập)
- Giải thích được (explainable AI) - biết chính xác tại sao alert
- Dễ điều chỉnh ngưỡng theo môi trường cụ thể
- Chạy nhanh, không cần GPU mạnh

**Hạn chế:**

- Phụ thuộc vào ngưỡng cứng, cần fine-tuning cho từng camera
- False positive với tư thế ngồi/nằm bình thường (yoga, nghỉ ngơi)
- Cần keypoints chất lượng cao (confidence > 0.25)

### 3.4.3 Thiết kế thuật toán phát hiện hành lý bỏ lại

Thuật toán sử dụng **state machine** kết hợp **proximity detection** và **timer mechanism**:

**Kiến trúc tổng thể:**

1. **Object Detection & Tracking**: YOLOv8 phát hiện hành lý (backpack, handbag, suitcase) và ByteTrack gán track_id ổn định
2. **Owner Detection**: Tìm người (person) trong bán kính 160 pixels từ tâm hành lý
3. **State Management**: Theo dõi trạng thái "có chủ" / "không có chủ" của mỗi hành lý
4. **Timer**: Đếm thời gian hành lý không có chủ
5. **Alert Generation**: Kích hoạt cảnh báo khi thời gian vượt 60 giây

**Cấu trúc dữ liệu BaggageState:**

Mỗi hành lý được tracking có một state object chứa:
- `track_id`: ID duy nhất từ ByteTrack
- `object_class`: Loại hành lý (backpack/handbag/suitcase)
- `bbox`: Tọa độ bounding box [x1, y1, x2, y2]
- `owner_gone_at`: Timestamp lúc chủ rời đi (None nếu đang có chủ)
- `alerted`: Flag đánh dấu đã gửi alert
- `last_alert_at`: Timestamp alert gần nhất (cho cooldown)

**Xử lý các trường hợp đặc biệt:**

1. **Non-Maximum Suppression (NMS)**: Loại bỏ bounding boxes trùng lặp khi YOLO phát hiện cùng một hành lý với nhiều classes khác nhau. Sử dụng IoU threshold 0.45.

2. **Track Switching**: Khi ByteTrack đổi ID do occlusion, hệ thống kế thừa state cũ dựa trên IoU giữa bbox cũ và mới.

3. **Grace Period**: Cho phép chủ rời đi tạm thời 3 giây trước khi bắt đầu đếm thời gian bỏ lại.

4. **Alert Cooldown**: 120 giây giữa các alerts cho cùng một hành lý để tránh spam.

**Ví dụ code mô phỏng logic chính:**

```python
def update_baggage_tracking(bags, persons):
    """Cập nhật trạng thái tracking và trả về alerts"""
    alerts = []
    
    for bag in bags:
        # Tìm owner trong bán kính 160px
        owner_id = find_nearest_person(bag['bbox'], persons, radius=160)
        
        if bag['track_id'] not in states:
            # Tạo state mới cho hành lý lần đầu xuất hiện
            states[bag['track_id']] = BaggageState(bag)
        
        state = states[bag['track_id']]
        
        if owner_id:
            # Có chủ → reset timer
            state.owner_gone_at = None
            state.alerted = False
        else:
            # Không có chủ
            if not state.owner_gone_at:
                state.owner_gone_at = time.time()  # Bắt đầu đếm
            
            abandon_time = time.time() - state.owner_gone_at
            
            if abandon_time >= 60 and not state.alerted:
                # Vượt ngưỡng → tạo alert
                alerts.append(create_alert(state, abandon_time))
                state.alerted = True
    
    return alerts
```

**Thông số cấu hình:**
- Owner radius: 160 pixels
- Abandon timeout: 60 giây
- Alert cooldown: 120 giây
- NMS IoU threshold: 0.45
- Confidence threshold: 0.22

### 3.4.4 Thiết kế thuật toán phát hiện vũ khí

Thuật toán phát hiện vũ khí sử dụng **two-stage approach** và **bearer detection**:

**Stage 1 - Baseline Detection:**

Sử dụng COCO class 43 (knife) làm baseline, không cần training. Đây là giải pháp nhanh cho prototype và demo.

**Stage 2 - Fine-tuned Model (Optional):**

Có thể thay thế bằng mô hình custom được fine-tune trên dataset vũ khí chuyên biệt, bao gồm: gun, pistol, rifle, knife, scissors.

**Bearer Detection:**

Khi phát hiện vũ khí, hệ thống tìm người gần nhất trong bán kính 130 pixels từ tâm vũ khí. Người này được xác định là "bearer" (người cầm vũ khí) và track_id được lưu lại để theo dõi.

**Risk Level Classification:**

- **Critical**: Vũ khí trong restricted zone (khu vực lên máy bay, phòng họp quan trọng)
- **High**: Vũ khí ở khu vực thông thường
- **Medium**: Vật thể có thể nguy hiểm (scissors)

**Alert Strategy:**

Khác với hành lý bỏ lại cần timer 60 giây, vũ khí được alert **ngay lập tức** khi phát hiện. Cooldown 25 giây theo vị trí (grid cell 50x50 pixels) để tránh spam alerts.

**Ví dụ code mô phỏng:**

```python
def detect_weapons(frame, persons, zone_name=None):
    """Phát hiện vũ khí và xác định người cầm"""
    alerts = []
    
    # Detect weapons với YOLO
    weapons = yolo_detect(frame, classes=[43], conf=0.25)
    
    for weapon in weapons:
        # Tìm bearer trong bán kính 130px
        bearer_id = find_nearest_person(weapon['bbox'], persons, radius=130)
        
        # Xác định risk level
        risk = 'critical' if zone_name else 'high'
        
        # Tạo alert ngay lập tức
        alerts.append({
            'event_type': 'weapon_detected',
            'object_class': weapon['class_name'],
            'bearer_id': bearer_id,
            'risk_level': risk,
            'confidence': weapon['conf']
        })
    
    return alerts
```

**So sánh với Baggage Detection:**

| Đặc điểm | Baggage | Weapon |
|----------|---------|--------|
| Timer | 60s | Ngay lập tức |
| State | Stateful | Stateless |
| Proximity | 160px | 130px |
| Cooldown | 120s | 25s |
| Risk | High | High/Critical |


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

                         [START]
                            │
                            ▼
                    ┌────────────────┐
                    │     SETUP      │
                    └────────────────┘
                            │
                            ▼
              ┌────────────────────────────┐
              │ Khởi tạo Serial Monitor    │
              └────────────────────────────┘
                            │
                            ▼
              ┌────────────────────────────┐
              │ Khởi tạo cảm biến          │
              │ - DHT22                    │
              │ - MQ Gas ADC               │
              │ - Cảm biến lửa GPIO        │
              └────────────────────────────┘
                            │
                            ▼
              ┌────────────────────────────┐
              │ Khởi tạo LCD               │
              │ Hiển thị trạng thái ban đầu│
              └────────────────────────────┘
                            │
                            ▼
              ┌────────────────────────────┐
              │ Kết nối WiFi               │
              └────────────────────────────┘
                            │
                            ▼
              ┌────────────────────────────┐
              │ Cấu hình MQTT Server       │
              │ Thiết lập topic gửi dữ liệu│
              └────────────────────────────┘
                            │
                            ▼
              ┌────────────────────────────┐
              │ Kết nối MQTT lần đầu       │
              └────────────────────────────┘
                            │
                            ▼
                       [LOOP START]
                            │
                            ▼
              ┌────────────────────────────┐
              │ Kiểm tra kết nối MQTT      │
              └────────────────────────────┘
                       │              │
                Mất kết nối       Đã kết nối
                       │              │
                       ▼              ▼
              ┌──────────────┐   ┌──────────────┐
              │ Reconnect()  │   │ client.loop()│
              └──────────────┘   └──────────────┘
                       │              │
                       └──────┬───────┘
                              │
                              ▼
              ┌────────────────────────────┐
              │ Kiểm tra thời gian gửi     │
              │ Đã đủ 2 giây chưa?         │
              └────────────────────────────┘
                       │              │
                      Chưa            Đủ
                       │              │
                       │              ▼
                       │   ┌────────────────────────┐
                       │   │ Đọc cảm biến DHT22     │
                       │   │ temp, humi             │
                       │   └────────────────────────┘
                       │              │
                       │              ▼
                       │   ┌────────────────────────┐
                       │   │ Đọc cảm biến Gas ADC   │
                       │   │ gas_ppm                │
                       │   └────────────────────────┘
                       │              │
                       │              ▼
                       │   ┌────────────────────────┐
                       │   │ Đọc cảm biến lửa GPIO  │
                       │   │ fire                   │
                       │   └────────────────────────┘
                       │              │
                       │              ▼
                       │   ┌────────────────────────┐
                       │   │ So sánh với ngưỡng     │
                       │   │ nhiệt độ, gas, lửa     │
                       │   └────────────────────────┘
                       │              │
                       │       ┌──────┴──────┐
                       │       │             │
                       │   Vượt ngưỡng   Bình thường
                       │       │             │
                       │       ▼             ▼
                       │ ┌──────────────┐ ┌──────────────┐
                       │ │Tạo danh sách │ │ alertCount=0 │
                       │ │cảnh báo      │ │              │
                       │ └──────────────┘ └──────────────┘
                       │       │             │
                       │       └──────┬──────┘
                       │              │
                       │              ▼
                       │   ┌────────────────────────┐
                       │   │ Đóng gói dữ liệu JSON  │
                       │   └────────────────────────┘
                       │              │
                       │              ▼
                       │   ┌────────────────────────┐
                       │   │ Gửi dữ liệu lên MQTT   │
                       │   └────────────────────────┘
                       │
                       └──────┬─────────────────────┘
                              │
                              ▼
              ┌────────────────────────────┐
              │ Quản lý hiển thị LCD       │
              └────────────────────────────┘
                       │              │
                Có cảnh báo       Không cảnh báo
                alertCount > 0    alertCount == 0
                       │              │
                       ▼              ▼
              ┌──────────────┐   ┌──────────────┐
              │ Nhấp nháy LCD│   │ Hiển thị     │
              │ displayAlert │   │ bình thường  │
              └──────────────┘   └──────────────┘
                       │              │
                       └──────┬───────┘
                              │
                              ▼
                         [LOOP END]
                              │
                              ▼
                         Quay lại LOOP

### 3.9.3 Lưu đồ AI

```
            ┌─────────────────┐
                        │   BẮT ĐẦU       │
                        └────────┬────────┘
                                 │
                        ┌────────▼────────┐
                        │ Khởi tạo hệ     │
                        │ thống:          │
                        │ - Load Models   │
                        │ - Kết nối DB    │
                        │ - Mở Camera     │
                        └────────┬────────┘
                                 │
                        ┌────────▼────────┐
                        │ Đọc frame từ    │
                        │ video/camera    │
                        └────────┬────────┘
                                 │
                        ┌────────▼────────┐
                        │ Frame hợp lệ?   │
                        └────┬───────┬────┘
                             │ NO    │ YES
                             │       │
                    ┌────────▼──┐    │
                    │ KẾT THÚC  │    │
                    └───────────┘    │
                                     │
                        ┌────────────▼────────────┐
                        │ Chạy YOLO Detection:    │
                        │ - Detect objects        │
                        │ - Track với ByteTrack   │
                        │ - Trích xuất keypoints  │
                        └────────┬────────────────┘
                                 │
                        ┌────────▼────────┐
                        │ Phân loại       │
                        │ objects         │
                        └────┬────────────┘
                             │
                ┌────────────┼────────────┐
                │            │            │
        ┌───────▼──────┐ ┌──▼──────┐ ┌──▼──────┐
        │   PERSON     │ │ BAGGAGE │ │ WEAPON  │
        │   detected   │ │detected │ │detected │
        └───────┬──────┘ └──┬──────┘ └──┬──────┘
                │           │           │
        ┌───────▼──────┐ ┌──▼──────┐ ┌──▼──────┐
        │ Phân tích    │ │ Kiểm tra│ │ Xác định│
        │ tư thế       │ │ chủ sở  │ │ người   │
        │ (Pose)       │ │ hữu     │ │ cầm     │
        └───────┬──────┘ └──┬──────┘ └──┬──────┘
                │           │           │
        ┌───────▼──────┐ ┌──▼──────┐ ┌──▼──────┐
        │ Phát hiện    │ │ Đếm thời│ │ Đánh giá│
        │ đột quỵ?     │ │ gian bỏ │ │ mức độ  │
        │              │ │ lại?    │ │ nguy    │
        └───┬──────┬───┘ └──┬───┬──┘ └──┬───┬──┘
            │ YES  │ NO     │YES│NO     │YES│NO
            │      │        │   │       │   │
            │      └────────┼───┼───────┼───┼──┐
            │               │   │       │   │  │
            │               │   └───────┼───┘  │
            │               │           │      │
        ┌───▼───────────────▼───────────▼──┐   │
        │ Tạo Alert:                       │   │
        │ - Event type                     │   │
        │ - Confidence                     │   │
        │ - Bounding box                   │   │
        │ - Timestamp                      │   │
        └───────────────┬──────────────────┘   │
                        │                       │
        ┌───────────────▼──────────────────┐   │
        │ Lưu ảnh local (backup)           │   │
        └───────────────┬──────────────────┘   │
                        │                       │
        ┌───────────────▼──────────────────┐   │
        │ Encode ảnh thành JPEG            │   │
        └───────────────┬──────────────────┘   │
                        │                       │
        ┌───────────────▼──────────────────┐   │
        │ Upload lên Supabase Storage      │   │
        │ (HTTPS POST)                     │   │
        └───────────────┬──────────────────┘   │
                        │                       │
        ┌───────────────▼──────────────────┐   │
        │ Nhận public URL của ảnh          │   │
        └───────────────┬──────────────────┘   │
                        │                       │
        ┌───────────────▼──────────────────┐   │
        │ Insert metadata vào Database     │   │
        │ (HTTPS POST)                     │   │
        └───────────────┬──────────────────┘   │
                        │                       │
                        └───────────────────────┘
                                 │
                        ┌────────▼────────┐
                        │ Vẽ bounding box │
                        │ và labels lên   │
                        │ frame           │
                        └────────┬────────┘
                                 │
                        ┌────────▼────────┐
                        │ Hiển thị frame  │
                        │ trên màn hình   │
                        └────────┬────────┘
                                 │
                        ┌────────▼────────┐
                        │ Nhấn 'q' để     │
                        │ thoát?          │
                        └────┬───────┬────┘
                             │ NO    │ YES
                             │       │
                             │   ┌───▼───────┐
                             │   │ Đóng video│
                             │   │ KẾT THÚC  │
                             │   └───────────┘
                             │
                             └──────┐
                                    │
                        ┌───────────▼────────┐
                        │ Quay lại đọc frame │
                        │ tiếp theo          │
                        └────────────────────┘
                                 │
                                 └──────┐
                                        │
                        (Quay lại bước đọc frame)


---

# CHƯƠNG 4: MÔ PHỎNG VÀ ĐÁNH GIÁ HỆ THỐNG

## 4.1 Thiết lập môi trường mô phỏng

### 4.1.1 Tổng quan môi trường mô phỏng

Hệ thống giám sát an toàn thông minh được triển khai trong môi trường mô phỏng hoàn chỉnh, bao gồm ba thành phần chính: mô phỏng phần cứng IoT trên nền tảng Wokwi, hệ thống AI xử lý hình ảnh thời gian thực, và hệ thống backend-frontend triển khai trên cloud. Môi trường mô phỏng được thiết kế để tái hiện đầy đủ các tình huống thực tế mà không cần phần cứng vật lý, cho phép kiểm thử và đánh giá hệ thống một cách toàn diện.

Việc sử dụng môi trường mô phỏng mang lại nhiều lợi ích: giảm chi phí đầu tư phần cứng, dễ dàng thay đổi cấu hình và thông số, khả năng tái tạo các tình huống nguy hiểm mà không gây rủi ro thực tế, và khả năng kiểm thử song song nhiều kịch bản khác nhau. Đặc biệt, môi trường mô phỏng cho phép tích hợp liền mạch với các dịch vụ cloud thực tế, đảm bảo tính khả thi khi triển khai hệ thống vào thực tế.

### 4.1.2 Môi trường phát triển IoT

**Nền tảng mô phỏng Wokwi:**

Wokwi là nền tảng mô phỏng phần cứng trực tuyến cho phép mô phỏng vi điều khiển ESP32 và các linh kiện điện tử mà không cần phần cứng thật. Nền tảng này cung cấp môi trường mô phỏng chính xác về mặt thời gian (cycle-accurate simulation), hỗ trợ đầy đủ các tính năng của ESP32 bao gồm WiFi, GPIO, ADC, I2C, và các giao thức truyền thông. Wokwi tích hợp với Visual Studio Code thông qua extension, cho phép lập trình, biên dịch và chạy mô phỏng trực tiếp trong IDE.

**Công cụ phát triển:**

Môi trường phát triển sử dụng Visual Studio Code kết hợp với PlatformIO - một nền tảng phát triển nhúng đa nền tảng. PlatformIO cung cấp hệ thống quản lý thư viện tự động, công cụ biên dịch tối ưu, và khả năng debug mạnh mẽ. Framework Arduino được chọn làm nền tảng lập trình nhờ tính đơn giản, cộng đồng lớn, và thư viện phong phú.

**Thư viện và dependencies:**

Hệ thống sử dụng các thư viện chuẩn công nghiệp: PubSubClient cho giao thức MQTT, DHT sensor library cho cảm biến nhiệt độ độ ẩm, LiquidCrystal_I2C cho màn hình LCD, và ArduinoJson cho xử lý dữ liệu JSON. Các thư viện này được quản lý tự động bởi PlatformIO, đảm bảo tính tương thích và dễ dàng cập nhật.

### 4.1.3 Môi trường phát triển AI

**Nền tảng Python và Deep Learning:**

Hệ thống AI được phát triển trên Python 3.10+, ngôn ngữ lập trình phổ biến nhất trong lĩnh vực Machine Learning và Computer Vision. PyTorch được chọn làm framework deep learning chính nhờ tính linh hoạt, khả năng debug tốt, và hỗ trợ mạnh mẽ cho nghiên cứu. Ultralytics YOLOv8 cung cấp API cấp cao để triển khai các mô hình object detection và pose estimation với hiệu năng cao.

**Xử lý hình ảnh và visualization:**

OpenCV (Open Source Computer Vision Library) đảm nhận vai trò xử lý hình ảnh cơ bản như đọc video, resize, color conversion, và vẽ annotations. NumPy cung cấp các phép toán mảng hiệu năng cao cho xử lý dữ liệu keypoints và bounding boxes. CustomTkinter được sử dụng để xây dựng giao diện người dùng hiện đại với theme tối, phù hợp cho ứng dụng giám sát.

**Tăng tốc GPU:**

Hệ thống hỗ trợ tăng tốc GPU thông qua CUDA (Compute Unified Device Architecture) của NVIDIA. Khi có GPU khả dụng, các mô hình YOLOv8 tự động chuyển sang chạy trên GPU, tăng tốc độ xử lý lên 5-10 lần so với CPU. Hỗ trợ FP16 (half precision) giúp tăng thêm 30-50% tốc độ trên GPU hiện đại mà không ảnh hưởng đáng kể đến độ chính xác.

### 4.1.4 Môi trường phát triển Backend và Frontend

**Backend Node.js:**

Backend được xây dựng trên Node.js 18.x LTS, phiên bản hỗ trợ dài hạn đảm bảo tính ổn định. Express.js framework cung cấp cấu trúc cơ bản cho RESTful API với middleware pattern linh hoạt. MQTT client library cho phép backend đóng vai trò bridge giữa ESP32 và web frontend, nhận dữ liệu từ IoT devices và phân phối đến các clients qua HTTP.

**Frontend Web:**

Frontend được phát triển theo mô hình Single Page Application (SPA) sử dụng HTML5, CSS3, và JavaScript thuần (Vanilla JS) không phụ thuộc framework nặng. Cách tiếp cận này giảm độ phức tạp, tăng tốc độ tải trang, và dễ dàng bảo trì. Chart.js cung cấp các biểu đồ tương tác đẹp mắt cho visualization dữ liệu cảm biến. Supabase JS Client cho phép kết nối trực tiếp từ frontend đến database và nhận realtime updates.

### 4.1.5 Cấu hình dịch vụ Cloud

**HiveMQ Cloud - MQTT Broker:**

HiveMQ Cloud được chọn làm MQTT broker nhờ độ tin cậy cao, hỗ trợ TLS/SSL mặc định, và gói miễn phí đủ cho mục đích nghiên cứu (100 kết nối đồng thời). Broker được triển khai tại region EU (châu Âu) với độ trễ thấp và uptime 99.9%. Cấu hình bảo mật bao gồm username/password authentication và mã hóa TLS 1.2+ cho tất cả kết nối.

**Supabase - Backend as a Service:**

Supabase cung cấp PostgreSQL database được quản lý hoàn toàn, RESTful API tự động, và realtime subscriptions. Gói miễn phí cung cấp 500 MB database storage và 1 GB file storage, đủ cho việc lưu trữ dữ liệu cảm biến và hình ảnh alert. Database được triển khai tại region Southeast Asia (Singapore) để giảm độ trễ cho người dùng khu vực. Row Level Security (RLS) được cấu hình để bảo vệ dữ liệu, chỉ cho phép truy cập qua service role key từ backend.

**Render.com - Backend Hosting:**

Render.com được chọn để triển khai backend Node.js nhờ quy trình deploy đơn giản (git push to deploy), hỗ trợ environment variables, và SSL certificate tự động. Gói miễn phí cung cấp 750 giờ runtime mỗi tháng, đủ cho việc chạy server 24/7. Server được triển khai tại region Singapore, gần với Supabase để giảm độ trễ khi truy vấn database.

### 4.1.6 Thông số kỹ thuật môi trường

**Thông số phần cứng mô phỏng:**

ESP32 được mô phỏng với cấu hình đầy đủ: dual-core Xtensa LX6 240 MHz, 520 KB SRAM, 4 MB Flash, WiFi 802.11 b/g/n. Các cảm biến được mô phỏng với đặc tính gần với thực tế: DHT22 với độ phân giải 0.1°C và 0.1% RH, MQ-2 với ADC 12-bit (0-4095), Flame Sensor với output digital. Màn hình LCD 16x2 với giao tiếp I2C địa chỉ 0x27.

**Thông số mạng và truyền thông:**

Kết nối WiFi mô phỏng với SSID "Wokwi-GUEST" không mật khẩu. MQTT connection sử dụng protocol MQTTS (MQTT over TLS) port 8883, QoS level 0 cho sensor data (at most once), QoS level 1 cho commands (at least once). Keep-alive interval 60 giây, reconnect delay 3 giây khi mất kết nối.

**Thông số AI và xử lý hình ảnh:**

Mô hình YOLOv8n (nano) với input size 640x640 pixels, confidence threshold 0.4 cho pose detection, 0.25 cho weapon detection. Frame processing rate tối đa 30 FPS trên GPU, 5-10 FPS trên CPU. Buffer size cho keypoint tracking: 5-12 frames tùy thuộc detector. Image upload size tối đa 2 MB, format JPEG với quality 85%.

**Thông số backend và API:**

Backend API với rate limit 100 requests/minute per IP. Database connection pool size 10 connections. Sensor data persistence interval 5 phút (300 giây). Statistics cache TTL 10 giây. CORS enabled cho tất cả origins trong development, restricted trong production. JWT token expiration 24 giờ.


## 4.2 Chạy mô phỏng và thu thập dữ liệu mô phỏng

### 4.2.1 Khởi động hệ thống mô phỏng IoT

**Quy trình khởi động Wokwi Simulator:**

Quá trình khởi động mô phỏng ESP32 trên Wokwi bắt đầu bằng việc mở project trong Visual Studio Code với PlatformIO và Wokwi extension đã được cài đặt. File cấu hình `diagram.json` định nghĩa sơ đồ mạch điện tử bao gồm ESP32 DevKit C V4, màn hình LCD 16x2 với giao tiếp I2C, cảm biến DHT22, potentiometer mô phỏng MQ-2, flame sensor, và nút nhấn khẩn cấp. Khi nhấn nút Start Simulation, Wokwi compiler biên dịch firmware từ source code C++ và nạp vào ESP32 ảo.

Trong quá trình khởi động, firmware thực hiện các bước initialization theo thứ tự: khởi tạo Serial communication với baudrate 115200, khởi tạo màn hình LCD và hiển thị logo "IoT Safety System", khởi tạo cảm biến DHT22, thiết lập các GPIO pins cho analog input (MQ-2) và digital input (Flame Sensor, Button). Sau đó, ESP32 kết nối WiFi đến mạng "Wokwi-GUEST" - một mạng ảo được Wokwi cung cấp với khả năng truy cập Internet thực tế. Quá trình kết nối WiFi thường mất 2-5 giây, được hiển thị qua LED nhấp nháy và thông báo trên Serial Monitor.

**Thiết lập kết nối MQTT:**

Sau khi có kết nối WiFi, ESP32 thiết lập kết nối MQTT đến HiveMQ Cloud broker. Quá trình này bao gồm: thiết lập TLS/SSL context với certificate validation, kết nối đến broker qua port 8883 với username và password, subscribe vào topic `wokwi/sensors/commands` để nhận lệnh điều khiển từ backend. Khi kết nối MQTT thành công, ESP32 gửi một message "ESP32 Connected" lên topic `wokwi/sensors/status` để thông báo trạng thái online. LCD hiển thị "MQTT Connected" và chuyển sang chế độ hiển thị dữ liệu cảm biến.

**Vòng lặp đọc và gửi dữ liệu:**

Sau khi hoàn tất initialization, ESP32 vào vòng lặp chính với chu kỳ 2 giây. Mỗi chu kỳ, firmware thực hiện: đọc nhiệt độ và độ ẩm từ DHT22 qua giao thức 1-Wire, đọc giá trị analog từ potentiometer (mô phỏng MQ-2) qua ADC 12-bit và chuyển đổi sang đơn vị ppm, đọc trạng thái digital từ flame sensor và nút nhấn khẩn cấp. Dữ liệu được đóng gói thành JSON object với cấu trúc chuẩn bao gồm timestamp, giá trị cảm biến, và ngưỡng cảnh báo hiện tại.

JSON payload được publish lên topic `wokwi/sensors/data` với QoS 0 (at most once) vì dữ liệu cảm biến có tính real-time, việc mất một vài message không ảnh hưởng nghiêm trọng. Đồng thời, firmware kiểm tra các điều kiện cảnh báo: nhiệt độ vượt ngưỡng, gas vượt ngưỡng, hoặc phát hiện lửa. Nếu có cảnh báo, LCD chuyển sang chế độ nhấp nháy với màu đỏ và hiển thị loại cảnh báo. Danh sách các cảnh báo active được duy trì trong bộ nhớ và cập nhật trong mỗi message.

### 4.2.2 Khởi động hệ thống AI

**Quy trình khởi động AI System:**

Hệ thống AI được khởi động bằng lệnh `python main.py` từ thư mục `Al_Python/Stroke_al`. Quá trình initialization bao gồm: load environment variables từ file `.env` chứa Supabase credentials, khởi tạo Supabase clients cho hai databases (stroke_events và airport_events), load các mô hình YOLOv8 (yolov8n-pose.pt cho pose estimation và yolov8n.pt cho object detection) vào memory và chuyển sang GPU nếu có.

Giao diện CustomTkinter được khởi tạo với ba tabs chính: Live Detection cho giám sát real-time, Database Manager cho quản lý stroke events, và Airport Database cho quản lý airport events. Mỗi tab có các controls riêng: source selection (webcam/video file), frame skip slider, confidence threshold slider, và các nút Start/Stop. Theme tối được áp dụng mặc định để giảm mỏi mắt khi giám sát lâu dài.

**Khởi tạo các detectors và trackers:**

Khi người dùng chọn source và nhấn Start, hệ thống khởi tạo các components: StrokeDetector wrapper cho YOLOv8-Pose với confidence threshold 0.4, KeypointTracker với buffer size 12 frames để lưu lịch sử keypoints, StrokeRecognizerV2 với ba sub-detectors (SuddenFallDetector, AbnormalPostureDetector, GradualCollapseDetector). Đối với airport mode, thêm BaggageTracker và WeaponDetector với các thông số riêng.

Video capture được mở từ webcam (index 0) hoặc video file. Frame rate được điều chỉnh dựa trên frame skip setting: skip=1 xử lý mọi frame (30 FPS), skip=3 xử lý mỗi 3 frames (10 FPS), giúp cân bằng giữa độ mượt và hiệu năng. Một thread riêng được tạo để xử lý video frames, tránh block GUI thread.

**Vòng lặp xử lý video:**

Mỗi frame được đọc từ video source, resize về kích thước chuẩn (thường 1280x720 hoặc 640x480 tùy source), và đưa qua pipeline xử lý: YOLOv8-Pose inference để detect người và keypoints, ByteTrack tracking để gán track ID ổn định, StrokeRecognizer phân tích keypoints để phát hiện các sự kiện đột quỵ, YOLOv8 Object Detection để phát hiện hành lý và vũ khí, BaggageTracker và WeaponDetector để phân tích và tạo alerts.

Kết quả được visualize trên frame: bounding boxes với màu sắc theo trạng thái (xanh lá = bình thường, cam = cảnh báo, đỏ = nguy hiểm), keypoints skeleton cho pose, labels với track ID và event type, progress bars cho baggage abandon timer. Frame đã annotate được hiển thị trong GUI với FPS counter và statistics overlay.

### 4.2.3 Khởi động Backend và Frontend

**Khởi động Backend Server:**

Backend Node.js được khởi động bằng lệnh `npm start` hoặc `npm run dev` (với nodemon auto-restart). Quá trình initialization bao gồm: load environment variables từ `.env`, khởi tạo Express app với middleware (CORS, JSON parser, static file serving), khởi tạo Supabase client với service role key để có quyền admin, thiết lập MQTT client và kết nối đến HiveMQ Cloud broker.

MQTT client subscribe vào topic `wokwi/sensors/#` (wildcard để nhận tất cả subtopics) và đăng ký callback handler. Khi nhận được message, callback parse JSON payload, normalize dữ liệu (xử lý giá trị null, NaN), phát hiện alerts bằng cách so sánh với ngưỡng, lưu vào in-memory cache để phục vụ API `/api/sensor/latest`, và định kỳ persist vào Supabase database mỗi 5 phút hoặc khi có alert mới.

Express server lắng nghe trên port được định nghĩa trong environment variable (mặc định 3001). Các API endpoints được đăng ký: `/api/health` cho health check, `/api/sensor/latest` cho dữ liệu cảm biến mới nhất, `/api/statistics` cho thống kê, `/api/database/*` cho CRUD operations, `/api/history` cho lịch sử alerts. Middleware authentication kiểm tra JWT token trong Authorization header cho các endpoints protected.

**Khởi động Frontend:**

Frontend được serve bằng Live Server extension trong VS Code hoặc HTTP server đơn giản. Khi người dùng truy cập URL, browser tải `index.html` cùng với `style.css` và `main.js`. JavaScript initialization bao gồm: kiểm tra localStorage để tìm saved auth token, nếu có token thì verify với backend qua `/api/health`, nếu valid thì hiển thị app layout, nếu không thì hiển thị login screen.

Sau khi login thành công, frontend khởi tạo: Supabase client cho realtime subscriptions, Chart.js instances cho các biểu đồ (temperature chart, humidity chart, gas chart), polling intervals để cập nhật dữ liệu mỗi 2 giây, event listeners cho các buttons và forms. Realtime subscription được thiết lập cho bảng `stroke_events` và `airport_events` để nhận thông báo ngay khi có alert mới từ AI system.

### 4.2.4 Thu thập dữ liệu cảm biến

**Cơ chế thu thập từ ESP32:**

Dữ liệu cảm biến được thu thập theo chu kỳ 2 giây từ ESP32. Mỗi lần đọc, firmware thực hiện error handling: nếu DHT22 trả về NaN (sensor error), giữ nguyên giá trị cũ và tăng error counter; nếu ADC đọc giá trị ngoài range (0-4095), clamp về giá trị hợp lệ; nếu flame sensor không phản hồi, assume trạng thái an toàn (no fire). Dữ liệu sau khi validate được đóng gói thành JSON với timestamp (milliseconds since boot).

JSON message được gửi qua MQTT với retained flag = false (không lưu message cuối cùng trên broker) và QoS = 0 (fire and forget). Nếu publish thất bại (broker offline, network error), firmware log error vào Serial và retry trong lần gửi tiếp theo. Không có queue mechanism để tránh memory overflow trên ESP32 với RAM hạn chế.

**Lưu trữ vào Backend:**

Backend nhận message từ MQTT callback, parse JSON, và lưu vào in-memory object `latestSensorData` với cấu trúc:

```javascript
{
  temperature: { value: 28.5, unit: "°C", warning: false, threshold: 50 },
  humidity: { value: 65.2, unit: "%", warning: false, threshold: 80 },
  gas: { value: 1234, unit: "ppm", warning: false, threshold: 2000 },
  fire: { detected: false, warning: false },
  timestamp: "2026-05-26T10:30:45.123Z",
  alerts: []
}
```

Mỗi 5 phút, hoặc khi có alert mới lần đầu, backend gọi hàm `persistSensorData()` để lưu vào Supabase bảng `sensor_data`. Batch insert được sử dụng để giảm số lượng database calls: một record cho temperature, một cho humidity, một cho gas. Fire events được lưu riêng vào bảng `fire_events` nếu có.

**Thu thập dữ liệu AI:**

Khi AI system phát hiện event (stroke, abandoned baggage, weapon), quá trình thu thập dữ liệu bao gồm: capture frame hiện tại từ video stream, crop bounding box của đối tượng liên quan (người bị đột quỵ, hành lý, vũ khí), resize về kích thước chuẩn (max 1920x1080), encode thành JPEG với quality 85%, upload lên Supabase Storage bucket tương ứng (alerts/, baggage/, weapons/).

Sau khi upload thành công, URL của ảnh được lấy từ Storage API và lưu cùng với metadata vào database table tương ứng. Metadata bao gồm: event_type, track_id, confidence score, bounding box coordinates, keypoints (nếu có), timestamp, location (nếu có GPS). Toàn bộ quá trình được thực hiện trong thread riêng để không block video processing.

### 4.2.5 Giám sát và logging

**Serial Monitor cho ESP32:**

Wokwi Serial Monitor hiển thị real-time logs từ ESP32 với các thông tin: WiFi connection status, MQTT connection status, sensor readings mỗi 2 giây, alert triggers, command received từ backend, error messages. Log format được thiết kế dễ đọc với emoji icons: ✅ cho success, ❌ cho error, ⚠️ cho warning, 📊 cho data, 🔥 cho fire alert.

**Console logs cho AI System:**

Terminal chạy AI system hiển thị: model loading progress, frame processing FPS, detection results (số người detected, số hành lý, số vũ khí), event triggers với timestamp và track ID, upload status cho mỗi ảnh, database insert confirmations, error stack traces nếu có exception. Logging level có thể điều chỉnh qua environment variable (DEBUG, INFO, WARNING, ERROR).

**Backend API logs:**

Backend console hiển thị: HTTP requests với method, path, status code, response time, MQTT messages received với topic và payload size, database operations với query time, authentication attempts (success/failure), error stack traces. Morgan middleware được sử dụng để format HTTP logs theo chuẩn Apache combined log format.

**Frontend console logs:**

Browser DevTools Console hiển thị: API calls với request/response data, Supabase realtime events, Chart.js updates, authentication state changes, error messages từ failed API calls. Production build có thể disable console.log để tăng performance và bảo mật.

**HẾT**

