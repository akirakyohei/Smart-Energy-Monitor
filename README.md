
#Smart Monitor energy
 Chuẩn bị môi trường.
Mã nguồn: https://github.com/akirakyohei/Smart-Energy-Monitor
Trong đó sem-embedd-app sử dụng để phát triển chương trình chạy trên thiết bị nhúng.Project sem-back-end-app phát triển service cung cấp các api public sử dụng cho ứng dụng giao diện web sem-front-end-app. Sem-management-device-app phát triển service quản lý thiết bị, kết nối với IBM Waston Internet Of Thing nhận các dữ liệu từ thiết bị nhúng gửi lên. sem-ml-app phát triển service tích hợp với model Machine Learning  từ môi trường python để dự đoán mức độ tiêu thụ điện năng.
Yêu cầu môi trường có sẵn: node ≥12.0.0, VueJs ≥2.6.0, python ≥3.6.
Chuẩn bị RabbitMQ, Redis, MongoDB.
Với sem-embedd-app cần có framework platformIO hỗ trợ phát triển.
Cài đặt
Áp dụng khi cài đặt với thiết bị nhúng mô phỏng:
B1: Thay đổi cấu hình trong data/json/file config.json
B2: Nạp mã nguồn vào trong thiết bị mô phỏng
B3: Đợi thiết bị mô phỏng chạy tiến hành kết nối với mạng Wifi.
Chạy server hệ thống:
Thực hiện với các project Sem-management-device-app, sem-front-end-app, sem-back-end-app, sem-ml-app. Chú ý phần này cần có thêm Rabbitmq và Redis, cơ sở dữ liệu MongoDB hỗ trợ nên cần chạy trước.

B1: Cài đặt thư viện.
Mở command chạy : npm install/ yarn install.
B2: Thực hiện cập nhật cấu hình tại các file trong thư mục config
B3: Chạy project
Mở command chạy: npm run start/npm start.
