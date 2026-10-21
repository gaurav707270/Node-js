# 📚 Book Store Backend API

A RESTful backend API for an online Book Store built using **Node.js, Express.js, and MongoDB**. The project provides user authentication, book management, shopping cart functionality, and order processing.

## 🚀 Project Overview

The Book Store API is designed to handle the core backend operations of an online bookstore. It provides secure authentication, book browsing and searching, cart management, and order creation through RESTful APIs.

## ✨ Features

- **User Authentication:** JWT-based authentication using HTTP-only cookies.
- **Book Management:** Create, read, update, and delete book records.
- **Book Search:** Search books and filter by category.
- **Pagination:** Retrieve book listings in manageable pages.
- **Shopping Cart:** Manage cart items.
- **Order Management:** Create and manage customer orders.
- **Database Integration:** Store and retrieve data using MongoDB and Mongoose.
- **Organized Architecture:** Separate routes, controllers, models, and middleware.
- **Environment Configuration:** Manage application settings using environment variables.

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Backend Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JSON Web Token (JWT)
- **Security:** HTTP-only cookies
- **API Architecture:** RESTful APIs
- **Development Tools:** npm, Git, GitHub

## 📂 Project Structure

```text
book-store/
└── backend/
    ├── config/
    │   └── db.js
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── .env.example
    ├── .gitignore
    ├── app.js
    ├── server.js
    ├── package.json
    └── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/gaurav707270/Node-js.git
```

### 2. Navigate to the Backend Folder

```bash
cd Node-js/book-store/backend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the `backend` folder and add the following configuration:

```env
PORT=3000
MONGO_DB_URL=mongodb://127.0.0.1:27017/book-store
JWT_SECRET=your_secure_jwt_secret
CLIENT_URL=http://localhost:5173
```

Replace `your_secure_jwt_secret` with a strong, private secret. Make sure MongoDB is running, or use a MongoDB Atlas connection string.

### 5. Start the Server

For development:

```bash
npm run dev
```

For production, if the package scripts support it:

```bash
npm start
```

The server will run at:

```text
http://localhost:3000
```

## 🔐 Authentication

The API uses JSON Web Tokens (JWT) for user authentication. Tokens are stored in
