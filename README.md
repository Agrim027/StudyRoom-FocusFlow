# FocusFlow

A real-time productivity and study room application featuring:

- ⏱ Focus timers
- 💬 Live chat (WebSocket-based)
- 👥 Room-based collaboration
- 🔐 JWT authentication

---

## 🛠 Tech Stack

Frontend:
- React (Vite)

Backend:
- Spring Boot
- WebSocket (STOMP + SockJS)

Database:
- MongoDB Atlas

Deployment:
- Render (Backend)
- Vercel (Frontend)

---

## ⚙️ Project Setup Instructions

### 🔧 Backend Setup

1. **Navigate to the backend directory and build the project:**
   ```bash
   cd backend
   ./mvnw clean install
   ```

2. **Run the Spring Boot server:**
   ```bash
   ./mvnw spring-boot:run
   ```

### 💻 Frontend Setup

1. **Navigate to the frontend directory and install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Run the React development server:**
   ```bash
   npm run dev
   ```

---

## 🔐 Environment Variables

### Backend (.env in /backend)

MONGODB_URI=your_mongodb_atlas_uri  
JWT_SECRET=your_secure_random_secret  
FRONTEND_URL=https://study-room-focus-flow.vercel.app  

---

### Frontend (.env in /frontend)

For LOCAL development:

VITE_API_URL=http://localhost:8080/api  

For PRODUCTION (Vercel):

VITE_API_URL=https://studyroom-focusflow-1.onrender.com/api  

IMPORTANT:
- Do NOT hardcode values in code
- Always use environment variables

---

## 🚀 Deployment

### Backend (Render)

- Connect GitHub repo
- Add environment variables:
  - MONGODB_URI
  - JWT_SECRET
  - FRONTEND_URL
- Deploy service

---

### Frontend (Vercel)

- Import GitHub repo
- Set environment variable:
  - VITE_API_URL = https://studyroom-focusflow-1.onrender.com/api
- Deploy

---

## 📡 API Endpoints

| Method | Endpoint         | Description               |
| ------ | ---------------- | ------------------------- |
| POST   | /api/auth/signup | Register new user         |
| POST   | /api/auth/signin | Login and receive JWT     |
| GET    | /api/rooms       | Get all rooms             |
| POST   | /api/rooms       | Create new room           |
| GET    | /api/sessions    | Get study session history |

---

## 📸 Screenshots

### Login Page
![Login UI](./screenshots/Login.png)

### Dashboard
![Dashboard UI](./screenshots/dashboard.png)

### Room Page
![Room Page UI](./screenshots/room_page.png)

### Focus Zone
![Focus Zone UI](./screenshots/Focus_Zone.png)

---

## 📌 Future Improvements

* Study streak tracking
* Notifications for session start/end
* Dark mode support
* Invite links for rooms

---

## 👤 Author

Built by **AGRIM GUPTA**
