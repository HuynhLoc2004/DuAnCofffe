Flow Google OAuth
1. CLIENT (Frontend)
   ├─ User click "Đăng nhập bằng Google"
   └─ Browser redirect tới Google Login Page
   URL: https://accounts.google.com/o/oauth2/v2/auth?
   client_id=YOUR_CLIENT_ID&
   redirect_uri=http://localhost:8080/auth/google/callback&
   scope=openid profile email&
   response_type=code

2. GOOGLE (Authentication Server)
   ├─ User nhập email/password
   ├─ Google xác thực thành công
   └─ Google generate authorization code (hết hạn nhanh - vài phút)

3. GOOGLE → BACKEND (Redirect)
   ├─ Google redirect tới Backend callback URL
   ├─ URL: http://localhost:8080/auth/google/callback?
   │        code=4/0AY22YmVx...&
   │        state=abc123
   └─ Backend nhận code này

4. BACKEND (Exchange Code for Token)
   ├─ Nhận authorization code từ Google
   ├─ Backend gọi tới Google Token Endpoint:
   │  POST https://oauth2.googleapis.com/token
   │  ├─ client_id
   │  ├─ client_secret (KHÔNG gửi cho FE)
   │  ├─ code (nhận từ step 3)
   │  └─ redirect_uri
   ├─ Google trả về:
   │  ├─ access_token (dùng để call Google API)
   │  ├─ id_token (JWT chứa user info)
   │  ├─ refresh_token (tạo access_token mới)
   │  └─ expires_in
   ├─ Decode id_token → lấy user info:
   │  ├─ email
   │  ├─ name
   │  ├─ picture
   │  └─ sub (Google User ID)
   └─ Verify signature của id_token

5. BACKEND (Check User in DB)
   ├─ SELECT * FROM users WHERE google_id = 'sub'
   ├─ Nếu user đã tồn tại:
   │  └─ Login user đó
   ├─ Nếu user chưa tồn tại:
   │  ├─ Tạo user mới trong DB:
   │  │  ├─ email (từ id_token)
   │  │  ├─ name (từ id_token)
   │  │  ├─ google_id (từ id_token.sub)
   │  │  └─ avatar (từ id_token.picture)
   │  └─ Login user mới tạo

6. BACKEND (Create Session/Token)
   ├─ Tạo Access Token (JWT - 5 phút)
   ├─ Tạo Refresh Token (JWT - 7 ngày)
   ├─ Lưu Refresh Token vào DB hoặc Redis
   └─ Set Refresh Token vào HttpOnly Cookie:
   Set-Cookie: Refresh_Token=eyJhbGc...;
   HttpOnly;
   Secure;
   SameSite=Strict

7. BACKEND → CLIENT (Redirect)
   ├─ Backend redirect tới Frontend:
   │  http://localhost:5173/authentication?
   │  access_token=eyJhbGc...&
   │  user={"id":123,"email":"user@gmail.com"}
   └─ (Hoặc redirect không kèm token, return trong response body)

8. CLIENT (Frontend - Authentication Page)
   ├─ Nhận access_token từ URL params (hoặc response)
   ├─ Lưu access_token:
   │  ├─ localStorage.setItem('accessToken', token)
   │  ├─ hoặc sessionStorage
   │  ├─ hoặc memory variable
   │  └─ Refresh Token đã lưu trong cookie (auto)
   ├─ Xóa URL params: window.history.replaceState()
   └─ Redirect tới Dashboard

9. CLIENT (Frontend - Dashboard)
   ├─ Hiển thị thông tin user
   ├─ Access Token trong memory/localStorage
   ├─ Gửi request API kèm token:
   │  Authorization: Bearer <access_token>
   └─ Server verify token và return data

10. BACKEND (Verify Token)
    ├─ Nhận request + access_token từ Authorization header
    ├─ Decode + verify JWT signature
    ├─ Nếu valid:
    │  └─ Return data
    ├─ Nếu hết hạn:
    │  ├─ Return 401 Unauthorized
    │  └─ FE gọi /auth/refresh_token endpoint
    └─ Nếu invalid:
    └─ Return 401 Unauthorized → FE redirect login

11. CLIENT (Refresh Token khi hết hạn)
    ├─ Gọi POST /auth/refresh_token
    ├─ Backend lấy Refresh Token từ Cookie
    ├─ Backend verify refresh token
    ├─ Backend tạo access token mới
    └─ Return access token mới cho FE

12. CLIENT (Logout)
    ├─ User click Logout
    ├─ Xóa localStorage/sessionStorage
    ├─ Gọi DELETE /auth/logout
    ├─ Backend xóa refresh token từ DB
    ├─ Backend set cookie = null
    └─ Redirect tới Login page

