# 🎬 ReelTalks - MERN Stack Movie Review Application

**ReelTalks** is a fully functional full-stack web application that allows users to browse movies, read and write reviews, and search for their favorites. It features a secure authentication system, role-based access control (Admin/User), and a dynamic content management system.

This project was built as an extended assignment to convert a React frontend into a production-ready **MERN (MongoDB, Express, React, Node.js)** application.

---

## 🚀 Live Demo
- **Frontend (Vercel):** [Add your Vercel Link Here]
- **Backend (Render):** [Add your Render Link Here]

---

## ✨ Features

### 🔐 Authentication & Security
- **User Registration & Login:** Secure authentication using **JWT (JSON Web Tokens)**.
- **Password Encryption:** Passwords are hashed using **bcryptjs** before storage.
- **Role-Based Access:** Distinction between standard **Users** and **Admins**.
- **Security Headers:** Implemented **Helmet** and **Rate Limiting** to prevent abuse.
- **Data Sanitization:** Protection against NoSQL injection and XSS attacks.

### 🎥 Movie Management (CRUD)
- **Browse Movies:** View all movies with pagination and filtering.
- **Search:** Real-time search by title or genre.
- **Movie Details:** Comprehensive view including ratings, cast, and trailers.
- **Admin Dashboard:**
  - **Add Movies:** Admins can create new movie entries.
  - **Image Upload:** Integrated file upload for movie posters using **Multer**.
  - **Edit/Delete:** Admins can update or remove movies.

### ⭐ Review System
- **Post Reviews:** Logged-in users can rate (1-5 stars) and review movies.
- **Ownership Checks:** Users can only delete their own reviews.
- **Real-time Updates:** Reviews appear immediately after submission.

### 🧪 Testing
- **Unit Testing:** Backend API testing implemented using **Jest** and **Supertest**.

---

## 🛠️ Tech Stack

### Frontend (Client)
- **React.js:** Component-based UI architecture.
- **React Router:** For seamless single-page navigation.
- **Context API:** Global state management for Authentication.
- **Axios:** For making HTTP requests to the backend.
- **CSS3:** Custom responsive styling with a dark theme.

### Backend (Server)
- **Node.js & Express.js:** RESTful API architecture.
- **MongoDB & Mongoose:** NoSQL database for flexible data modeling.
- **Multer:** Handling file uploads (images).
- **JsonWebToken (JWT):** Secure stateless authentication.

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/rohaanjoeyah/ReelTalks-reactproject.git](https://github.com/rohaanjoeyah/ReelTalks-reactproject.git)
cd ReelTalks-reactproject
```

### 2. Backend setup
Navigate to the server folder and install dependnecies
```
cd server
npm install
```
create a .env file in the server folder and add your variables
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

Start the server
```
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the client folder, and install dependencies.
```
cd client
npm install
```
start the react app
```
npm start

```
