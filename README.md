# 🎓 RND1 - Seatudy Project

This repository contains the **Seatudy Online Learning Platform**, built with:

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** PostgreSQL
- **Auth:** JWT-based Authentication
- **Real-time:** Socket.IO

---

## 📦 Project Structure

```
RND1/
│── react-app/        # Frontend (React + Vite)
│── server/           # Backend (Express + PostgreSQL)
│   ├── controllers/  # Route handlers
│   ├── middlewares/  # Middleware functions
│   ├── routes/       # API routes
│   ├── uploads/      # Uploaded files
│   ├── db.js         # Database connection
│   ├── index.js      # Express entry point
│── .env.example      # Example environment variables
│── README.md         # Documentation
```

---

## 🚀 How to Run Locally

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/RND1.git
cd RND1
```

### 2. Setup Environment
- Copy `.env.example` to `.env`
- Fill it with your real values:

```bash
cp .env.example .env
```

### 3. Install Dependencies

- Install server dependencies:
```bash
cd server
npm install
```

- Install frontend dependencies:
```bash
cd ../react-app
npm install
```

### 4. Setup Database

Make sure PostgreSQL is running and create a database:

```bash
createdb seatudy
```

Run the schema (if you have an `init.sql`):
```bash
psql -U postgres -d seatudy -f db/init.sql
```

### 5. Start Backend

```bash
cd server
npm start
```

### 6. Start Frontend

```bash
cd react-app
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file in `/server` with the following:

```env
# Server settings
PORT=5000

# PostgreSQL database connection
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=seatudy

# JWT Secret
JWT_SECRET=your_secret_key
```

---

## ✅ Features

- [x] User authentication (JWT)
- [x] Role-based access (Student, Instructor, Admin)
- [x] Course management (CRUD)
- [x] Student enrollment & purchase flow
- [x] Assignments & submissions
- [x] Real-time notifications (Socket.IO)