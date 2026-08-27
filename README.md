# Notes App (MERN Stack)

A full-stack Notes application built with MongoDB, Express, React, and Node.js. Users can sign up, log in, and manage their own notes with full CRUD functionality.

## 🚀 Features
- User authentication (JWT-based)
- Create, view, edit, and delete notes
- Notes are private per account
- Secure password reset flow

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Vite |
| **Backend** | Node.js, Express |
| **Database** | MongoDB (Mongoose) |
| **Auth** | JWT, bcrypt |

## 📦 Setup Instructions

### 1. Backend Setup
```bash
cd Backend
npm install
```

Copy `.env.example` to `.env` and fill in your values:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3001
FRONTEND_URL=http://localhost:5173
```

Run the server:
```bash
npm run dev
```
Backend runs at `http://localhost:3001`.

### 2. Frontend Setup
```bash
cd Frontend
npm install
```

Copy `.env.example` to `.env`:
```
VITE_API_URL=http://localhost:3001
```

Run the app:
```bash
npm run dev
```
Frontend runs at `http://localhost:5173`.
