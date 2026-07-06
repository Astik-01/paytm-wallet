
## A basic version of PayTM

# Full-Stack Wallet Application (Paytm Clone)

A secure, end-to-end full-stack web application that allows users to sign up, log in, search for other users, and perform simulated, ACID-compliant money transfers.

## 🚀 Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Security & Auth:** JSON Web Tokens (JWT), Bcrypt (Password Hashing), Zod (Input Validation)

---

## 📁 Project Structure

This repository contains both the frontend and backend in separate directories. You will need to run two separate terminal windows to start the full application.

```text
/
├── frontend    (React Vite App)
└── backend     (Node.js Express API)
```

---

## 🛠️ Getting Started

### 1. Clone the Repository
//changes
```bash
git clone https://github.com/Astik-01/paytm-wallet.git
cd YOUR-REPO-NAME
```

### 2. Backend Setup

Open your first terminal window and navigate to the backend folder:

```bash
cd backend
npm install
```

**🔒 Environment Variables (CRITICAL)**

Since `.env` files are ignored by Git for security, you must manually create one to connect to the database and sign tokens.

Create a file named `.env` inside the `backend` folder and add the following:

```env
PORT=3000
JWT_SECRET="your_super_secret_jwt_string_here"
MONGO_URL="your_mongodb_connection_string_here"
```

Start the backend server:

```bash
node index.js
```

### 3. Frontend Setup

Open a second, new terminal window and navigate to the frontend folder:

```bash
cd frontend
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will typically be running on `http://localhost:5173`.

---

## 💡 Key Features

- **Secure Authentication:** Passwords are mathematically hashed with a salt using bcrypt before being stored in the database.
- **Protected Routes:** Axios interceptors automatically attach JWT tokens to every outgoing request to verify the user's identity.
- **Dynamic Search:** Real-time regex querying allows users to search the database by first or last name to find friends.
- **Safe Transactions:** Backend logic ensures users cannot transfer more money than they currently have in their simulated account, preventing negative balances.