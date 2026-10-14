# Cung Đường — Frontend

Frontend React + TypeScript + Vite cho ba màn hình tài khoản: đăng nhập, đăng ký và yêu cầu đặt lại mật khẩu.

## Chạy ứng dụng

```bash
npm install
npm run dev
```

Sao chép `.env.example` thành `.env` khi cần đổi API base URL. Mặc định ứng dụng dùng `http://localhost:5000/api`; đây là giá trị mẫu, chưa phải backend đã xác nhận.

## Kiểm tra

```bash
npm run build
npm run typecheck
```

Các route API `/auth/login`, `/auth/register` và `/auth/forgot-password` là contract placeholder. Cần backend xác nhận URL, payload và response trước khi tích hợp thật. OAuth Google/Facebook chưa được cấu hình.


