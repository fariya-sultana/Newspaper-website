# 📰 NewsPress – A Full-Stack Modern Newspaper Web App

Welcome to **NewsPress**, a modern full-stack newspaper platform built with React, Firebase, Node.js, Express, and MongoDB. It enables users to read, submit, and manage news articles with support for subscriptions, admin control, and dynamic charts. This README focuses on the **Client Side**.

---

## 🚀 Live Website

🔗 (https://newspaper-website-a09b8.web.app/)

---

## 👤 Admin Credentials

- **Email:** fariya@admin.com  
- **Password:** Fariya1234@

---

## ⚙️ Technologies Used (Client Side)

- React 18+
- React Router DOM
- Firebase Authentication
- Tailwind CSS
- TanStack Query (for all GET requests)
- Axios + useAxios hooks (secured)
- GSAP + react-simple-typewriter
- React Google Charts
- React CountUp
- React Helmet Async
- React Hook Form & YUP
- React Toastify / SweetAlert2
- React Select
- Framer Motion

---

## 🌟 Key Features

✅ Fully responsive (Mobile, Tablet, Desktop)  
✅ Modern UI with dark/light theme support  
✅ Trending news slider based on article views  
✅ Publisher listing with logos  
✅ Live statistics for total, normal, and premium users  
✅ Pricing plans and subscription modal with timer  
✅ Admin dashboard with chart analytics and article moderation  
✅ Premium article access based on payment  
✅ JWT-based authentication (no cookies)  
✅ Route protection with session persistence  
✅ Error messages and success alerts for all operations  
✅ Real-time subscription check and expiry logic  
✅ GSAP animations for enhanced UX  
✅ Custom 404 page  
✅ Typing effect in home banner

---

## 📂 Folder Structure (Client)

```bash
📁 src
├── 📁 assets              # Static assets and logos
├── 📁 components          # Reusable UI sections
├── 📁 hooks               # Custom hooks like useAxios, useDarkMode
├── 📁 layouts             # Layout wrappers (Main, Dashboard)
├── 📁 pages
│   ├── 📁 Home            # Home page + all its sections
│   ├── 📁 Articles        # AllArticles, AddArticle, MyArticles
│   ├── 📁 Dashboard       # Admin and User dashboard pages
│   ├── 📁 Profile         # User profile and update info
│   └── 📁 Auth            # Login, Register
├── 📁 routes              # Route setup + Private/Admin routes
├── 📁 utils               # Helpers, context providers
├── App.jsx
└── main.jsx


🔒 Environment Variables
Create a .env file at the root of the project:

.env
Copy
Edit
VITE_API_BASE_URL=https://your-server-api.com
VITE_IMGBB_API_KEY=your_imgbb_api_key
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=sender_id
VITE_FIREBASE_APP_ID=your_app_id


🔧 Installation & Running Locally
bash
Copy
Edit
# 1. Clone the repository
git clone https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-fariya-sultana.git
cd newspress-client

# 2. Install dependencies
npm install

# 3. Setup your environment variables in .env

# 4. Run the client
npm run dev


📋 Client Commit History (Requirement Fulfilled)
✅ 20+ meaningful commits showing component development, hook setup, routing, UI integrations, and final feature refinements.

💡 Features Overview
🔥 Trending Articles Section (Sorted by views)

📢 Publishers Section

📊 Admin Dashboard with Pie, Line, and Bar Charts

🔐 JWT-based Protected Routes

📚 Subscription & Premium Access Management

📝 Add, Update, and Moderate Articles

📈 Statistics Counter (with CountUp)

🌐 Search & Filter Articles by Tags & Publishers

📅 Pagination for Admin Tables

🔁 Session Persistence after Reload

💬 SweetAlert & Toasts for feedback



🌐 Backend Repository
🔗 https://github.com/Programming-Hero-Web-Course4/b11a12-server-side-fariya-sultana


📌 Developer Info
👨‍💻 Developed by: Fariya Sultana
📧 Email: fariya-.sultana.dev@gmail.com
