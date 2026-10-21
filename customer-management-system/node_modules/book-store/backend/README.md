# Book Store API

MERN backend starter using Express, MongoDB, Mongoose, JWT cookies, and ES modules.

## Setup

1. Install Node.js and run MongoDB locally (or use a MongoDB Atlas URI).
2. In this folder, run `npm install`.
3. Copy `.env.example` to `.env`.
4. Set `MONGO_DB_URL` and a strong `JWT_SECRET`.
5. Run `npm run dev`.

API base URL: `http://localhost:3000`

## Routes

### Auth
- `POST /api/auth/signup` — `{ "fullName": "Gaurav", "email": "gaurav@example.com", "password": "password123" }`
- `POST /api/auth/signin` — `{ "email": "gaurav@example.com", "password": "password123" }`
- `POST /api/auth/signout`
- `GET /api/auth/me` — requires the auth cookie

### Books
- `GET /api/books?search=javascript&category=Programming&page=1&limit=12`
- `GET /api/books/:id`
- `POST /api/books` — admin only
- `PUT /api/books/:id` — admin only
- `DELETE /api/books/:id` — admin only

Book body example:
{
  "title": "The JavaScript Guide",
  "author": "John Smith",
  "description": "A beginner-friendly JavaScript book",
  "price": 499,
  "category": "Programming",
  "stock": 20,
  "image": ""
}

### Cart (requires sign-in)
- `GET /api/cart`
- `POST /api/cart/items` — `{ "bookId": "BOOK_OBJECT_ID", "quantity": 1 }`
- `PATCH /api/cart/items/:bookId` — `{ "quantity": 2 }`
- `DELETE /api/cart/items/:bookId`

### Orders
- `POST /api/orders` — requires sign-in; `{ "shippingAddress": "Your delivery address" }`
- `GET /api/orders/my` — user's orders
- `GET /api/orders` — admin only
- `PATCH /api/orders/:id/status` — admin only; `{ "status": "processing" }`

## Admin note

Public signup always creates a regular user. For local development, promote your own account to admin directly in MongoDB after signing up. Do not expose an admin signup endpoint.

## Important notes

- Order creation uses a MongoDB transaction, which requires a replica set (MongoDB Atlas supports transactions; local standalone MongoDB does not by default).
- Before production, add rate limiting, stronger request validation, logging, password reset, and tests.
- This ZIP includes the backend API. The React frontend has not been added yet.
