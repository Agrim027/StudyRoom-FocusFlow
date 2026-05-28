# Collaborative Study Room Platform

Staying consistent with study sessions can be difficult, especially when working alone. This project was built to address that challenge by creating a focused, distraction-free environment where users can study together in real time.

The Collaborative Study Room Platform allows users to create virtual study spaces, collaborate with others, and track their progress — helping recreate the experience of a real study group or library from anywhere.

---

## 🚀 Features Implemented

* **User Authentication**
  * Secure signup and login using JWT-based authentication
  * Protected routes and session handling

* **Study Room Management**
  * Create and join study rooms
  * View available rooms in real time

* **Real-time Chat & Focus Zones**
  * Instant communication between participants
  * Powered by WebSockets for live updates

* **Session Timer**
  * Track study sessions using a built-in timer
  * Helps maintain focus and consistency

* **Activity Dashboard**
  * View past sessions and study activity
  * Track productivity over time

---

## 🛠️ Tech Stack

| Layer      | Technology                     |
| ---------- | ------------------------------ |
| Frontend   | React.js, Tailwind CSS         |
| Backend    | Java, Spring Boot              |
| Database   | MongoDB Atlas                  |
| Realtime   | WebSockets (STOMP)             |

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

To run this project locally, you will need to configure your environment variables. 

**Backend** (Create a `.env` file in the `backend/` directory):
```env
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
```

**Frontend** (Create a `.env` file in the `frontend/` directory):
```env
VITE_API_URL=http://localhost:8080/api
```

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
