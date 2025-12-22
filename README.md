🕯️ Candle Shop – Next.js E-Commerce App

A full-featured e-commerce candle shop application built using Next.js (App Router), Zustand, and Material UI.
The project focuses on real-world authentication, state management, cart persistence, and checkout flow.

✨ Features
🔐 Authentication (Mock)

Signup & Login

Multi-user support (stored by email)

Persistent login session

Logout functionality

Navbar updates instantly on login/logout

🛒 Cart Management

Add products to cart

Increase / decrease quantity

Remove items

Cart persists per logged-in user

Live cart badge count

💳 Checkout Flow

Shipping address form

Cart summary

Mock payment (no real gateway)

Protected checkout route

🎉 Order Success Page

Order summary snapshot

Shipping details

Correct total amount

Cart cleared safely after order

Auth-protected page

🧠 Key Concepts Implemented

Zustand for global state management

Separate stores for auth and cart

Single source of truth for authentication

Snapshot logic to prevent cart data loss

Clean logout and session handling

Real-world bug fixes (auto-login, stale state, cart clearing)

🛠 Tech Stack

Next.js 14 (App Router)

React

Zustand

Material UI (MUI)

MongoDB (products API)

LocalStorage (mock auth & cart persistence)

📁 Project Structure
src/
 ├── app/
 │   ├── login/
 │   ├── signup/
 │   ├── shop/
 │   ├── cart/
 │   ├── checkout/
 │   ├── success/
 │   └── logout/
 │
 ├── components/
 │   ├── Navbar.jsx
 │   ├── AuthGuard.jsx
 │   └── ProductCard.jsx
 │
 ├── store/
 │   ├── authStore.js
 │   └── cartStore.js
 │
 └── api/
     └── products/

▶️ Running the Project Locally
1️⃣ Clone the repository
git clone https://github.com/YOUR_USERNAME/candle-shop-nextjs.git
cd candle-shop-nextjs

2️⃣ Install dependencies
npm install

3️⃣ Start development server
npm run dev


Open:

http://localhost:3000

🔐 Authentication Notes

Authentication is mocked using localStorage

Users are stored under users

Active session stored as sessionUser

Designed to be easily replaced with real backend authentication later

⚠️ Disclaimer

This project does not handle real payments.
The payment flow is mocked for learning and demonstration purposes only.

🎯 What This Project Demonstrates

Real-world frontend architecture

Proper auth & session handling

State persistence patterns

Cart & checkout logic

Debugging complex React state issues

👩‍💻 Author

Anusha