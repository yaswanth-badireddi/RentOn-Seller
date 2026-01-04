# RentOn – Seller Dashboard (MERN Stack)

RentOn is a **seller-side rental management platform** built using the **MERN stack**.  
It allows sellers to manage products, track rentals, view earnings, and handle customer interactions through a clean and intuitive dashboard.

This repository contains the **Seller Application** of the RentOn rental ecosystem.

---

## 🚀 Features

### 🔐 Authentication
- Seller registration (Sign Up)
- Secure login
- Forgot & reset password using email (NodeMailer)

### 📦 Product Management
- Add new products with images
- View all listed products
- Manage product quantity & category
- Image upload support (Multer)

### 📊 Dashboard
- Overview of:
  - Total products
  - Active rentals
  - Total earnings
  - Total customers
- Recent rental activity

### 🔔 Notifications
- Rental-related notifications
- Seller alerts

### 💰 Earnings
- Track monthly & total earnings
- Rental-based income insights

### ⚙️ Settings
- Seller profile management
- Logout functionality

---

## 🛠️ Tech Stack

### Frontend
- **React (Vite)**
- **Tailwind CSS**
- React Router
- Context API / Store (State Management)
- Axios

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- Mongoose
- JWT Authentication
- Multer (Image Upload)
- NodeMailer (Email Service)

---

## 📂 Project Structure

### Client (Frontend)
client/
├── public/
├── src/
│ ├── assets/
│ ├── components/
│ ├── constants/
│ ├── contexts/
│ ├── hooks/
│ ├── pages/
│ ├── routes/
│ ├── store/
│ ├── utils/
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js


### Server (Backend)


server/
├── controllers/
├── DB/
├── middleware/
├── models/
├── nodemailer/
├── routes/
├── uploads/
├── utils/
├── index.js
├── .env
└── package.json


---

## ⚙️ Environment Variables

Create a `.env` file inside the `server` folder and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password

##▶️ Installation & Setup
###1️⃣ Clone the Repository
git clone https://github.com/yaswanth-badireddi/RentOn-Seller.git
cd RentOn-Seller

###2️⃣ Install Dependencies
####Client
cd client
npm install

####Server
cd server
npm install

###3️⃣ Run the Application
Start Backend
cd server
npm start

Start Frontend
cd client
npm run dev


###Frontend runs on:
👉 http://localhost:3000 (or Vite port)

###Backend runs on:
👉 http://localhost:5000

##Pages Included

Sign Up Page
Login Page
Forgot Password Page
Seller Dashboard
Add Product Page
Product Listing Page

##🔐 Authentication Flow

JWT-based authentication

Protected seller routes

Secure password hashing

Email-based password reset

##🎯 Use Case

This project is ideal for:

Rental businesses

Equipment leasing platforms

MERN stack learning & portfolio

Campus placements / internships

##👨‍💻 Author

Yaswanth Kumar Badireddi
###📧 Email: yaswanthbadireddi11@gmail.com

###🔗 GitHub: https://github.com/yaswanth-badireddi

##📌 Future Enhancements

Customer-side application

Rental approval workflow

Analytics charts

Admin panel

Payment gateway integration
