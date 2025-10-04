# 🌤️ Weather Now

**Weather Now** is a modern full-stack weather dashboard application built with **React**, **Vite**, **TailwindCSS**, **Express.js**, and **MongoDB**.
It provides real-time weather updates, a 7-day forecast, favorites management, and a contact form with email delivery via **SendGrid**.

---

## 🚀 Features

### 🌦️ Weather Dashboard

* Search any city or use your current location (GPS)
* Get real-time temperature, humidity, and wind speed
* View a 7-day animated forecast via **Open-Meteo API**
* Switch between Light / Dark themes

### ⭐ Favorites System

* Save and manage your favorite cities
* Add, edit, or remove custom forecasts
* Stores favorites in MongoDB using Express REST APIs

### 📨 Contact Form

* Contact page that sends messages via **SendGrid**
* Auto-acknowledgement to user and admin email notifications

### 💡 Modern UI

* Built using **TailwindCSS**
* Responsive glassmorphism and gradient-based design
* Smooth animations via **Framer Motion**

---

## 🎗️ Tech Stack

| Layer           | Technology                                               |
| --------------- | -------------------------------------------------------- |
| **Frontend**    | React 18, Vite, TailwindCSS, Framer Motion, Lucide Icons |
| **Backend**     | Node.js, Express.js, SendGrid, Mongoose                  |
| **Database**    | MongoDB Atlas                                            |
| **Weather API** | [Open-Meteo API](https://open-meteo.com)                 |
| **Deployment**  | Vercel (Frontend), Render (Backend)                      |

---

## 📂 Project Structure

```
Weather-Now/
│
├── frontend/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── index.html
│   ├── .env
│   ├── vite.config.js
│   └── src/
│       ├── components/
│       ├── pages/
│       └── utils/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── models/
│   ├── test-sendgrid.js
│   └── .env
│
└── README.md
```

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/weather-now.git
cd weather-now
```

### 2️⃣ Setup backend

```bash
cd backend
npm install
```

#### Create `.env` file inside `backend/`

```env
PORT=5000
MONGO_URI=<your_mongodb_uri>
SENDGRID_API_KEY=<your_sendgrid_key>
EMAIL_USER=<verified_sender_email>
OWNER_EMAIL=<your_admin_email>
```

Run the backend:

```bash
node server.js
```

### 3️⃣ Setup frontend

```bash
cd frontend
npm install
```

#### Create `.env` file inside `frontend/`

```env
VITE_API_URL=https://your-backend-host/api
```

Run the frontend:

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`
Backend runs at `http://localhost:5000`

---

## 🧩 API Overview

| Method     | Endpoint             | Description                         |
| ---------- | -------------------- | ----------------------------------- |
| **GET**    | `/api/weather`       | Fetch weather data                  |
| **GET**    | `/api/favorites`     | Get all saved favorites             |
| **POST**   | `/api/favorites`     | Add a new favorite                  |
| **DELETE** | `/api/favorites/:id` | Delete a favorite city              |
| **POST**   | `/api/messages`      | Send contact message (via SendGrid) |

---

## ☁️ Environment Variables

### Frontend (`.env`)

| Key            | Description          |
| -------------- | -------------------- |
| `VITE_API_URL` | Backend API base URL |

### Backend (`.env`)

| Key                | Description                             |
| ------------------ | --------------------------------------- |
| `PORT`             | Server port                             |
| `MONGO_URI`        | MongoDB connection string               |
| `SENDGRID_API_KEY` | SendGrid API key                        |
| `EMAIL_USER`       | Verified sender email address           |
| `OWNER_EMAIL`      | Admin email to receive contact messages |

---

## 🧱 Build and Deploy

### 🖥️ Local build

```bash
npm run build
npm run preview
```

### ☁️ Deployment

* **Frontend** → Vercel (auto-deploys from Git)
* **Backend** → Render or Railway
* Add environment variables in both platforms

---

## 🧠 System Architecture

```
[ React Frontend ]
   ↓
[ Express REST API ]
   ↓
[ MongoDB Atlas ]
   ↓
[ SendGrid Email Service ]
```

---

## 📸 Screenshots

* 🌍 Home Dashboard
* ⭐ Favorites Page
* 📬 Contact Form
* 🌓 Light / Dark Mode Toggle

*(Add images or Vercel live demo URL here)*

---

## 🤝 Contributing

1. Fork this repo
2. Create a new branch (`feature/your-feature`)
3. Commit changes and push
4. Open a Pull Request 🎉

---

## 🧑‍💻 Author

**Aniket Dhumal**
✉️ Email: [aniketdhumal932003@gmail.com](#)
📍 Built with ❤️ using React, TailwindCSS & Express,Nodejs,MongoDB.

---

## 📜 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute.

---
