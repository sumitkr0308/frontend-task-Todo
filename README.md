🚀 Full Stack Task Manager App

Frontend Developer Intern Assignment

A scalable full-stack web application with authentication, protected dashboard, and CRUD functionality built using React, Tailwind CSS, Node.js, Express, and MongoDB.

📌 Features
🔐 Authentication

User Registration & Login

Password hashing using bcrypt

JWT-based authentication

Protected routes (Dashboard accessible only after login)

📊 Dashboard

Add tasks with title & description

Edit tasks (inline editing)

Change task status (pending / completed)

Delete tasks

Search tasks by title

Filter tasks by status

Logout functionality

🛡️ Security

JWT authentication middleware

User-specific data access (users can only access their own tasks)

Environment variables for secrets

🧱 Tech Stack
Frontend

React (Vite)

Tailwind CSS

Axios

React Router DOM

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT (jsonwebtoken)

bcryptjs

📂 Project Structure
project-root/
│
├── client/                 # Frontend (React + Tailwind)
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── routes/
│   │   └── App.jsx
│
├── server/                 # Backend (Node + Express)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js

⚙️ Environment Variables
Backend (server/.env)
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Frontend (client/.env)
VITE_API_URL=http://localhost:4000/api

▶️ How to Run Locally
1️⃣ Clone Repository
git clone <your-github-repo-url>
cd project-root

2️⃣ Backend Setup
cd server
npm install
npm run dev


Backend runs on:

http://localhost:4000

3️⃣ Frontend Setup
cd client
npm install
npm run dev


Frontend runs on:

http://localhost:5173

🔗 API Endpoints
Auth
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
Tasks (Protected)
Method	Endpoint	Description
GET	/api/tasks	Get all tasks
POST	/api/tasks	Create task
PUT	/api/tasks/:id	Update task
DELETE	/api/tasks/:id	Delete task
🧪 API Testing

All APIs tested using Postman

JWT token passed via Authorization: Bearer <token>


<!-- Sample log -->

[2026-01-03T12:07:06.830Z] Server started successfully
[2026-01-03T12:07:40.268Z] User registered: xyz@gmail.com
[2026-01-03T12:07:57.509Z] User logged in: xyz@gmail.com
[2026-01-03T12:08:19.890Z] Task created by user 6959068ce3b895e9b26e7874
[2026-01-03T12:08:34.020Z] Task created by user 6959068ce3b895e9b26e7874
[2026-01-03T12:08:50.424Z] Task created by user 6959068ce3b895e9b26e7874
[2026-01-03T12:09:04.201Z] Task updated: 695906b3e3b895e9b26e7879
[2026-01-03T12:09:07.198Z] Task deleted: 695906b3e3b895e9b26e7879
[2026-01-03T12:09:10.686Z] Task deleted: 695906d2e3b895e9b26e787f



📈 Scalability & Improvements

If scaling to production:

Use HttpOnly cookies for JWT

Add refresh tokens

Implement rate limiting

Add role-based access control

Dockerize backend

CI/CD pipeline

  React Query

🧠 Key Learnings

JWT authentication & protected routes

Secure password handling

Full CRUD implementation

Frontend-backend integration

Real-world debugging & error handling

Clean and scalable project structure

👤 Author

Sumit Kumar
Final Year B.Tech CSE Student
Aspiring Frontend / Full-Stack Developer

✅ Assignment Status

✔ Completed within deadline
✔ All requirements implemented
✔ Production-ready structure