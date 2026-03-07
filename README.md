# GrubPac Backend

A premium Room Booking API built with Node.js, Express, and MySQL.

## 🚀 Features
- JWT Authentication
- Room Management API
- Availability Check Logic
- Booking System with Overlap Prevention
- CORS Configured for Production

## 🛠️ Tech Stack
- **Node.js**: Runtime
- **Express**: Framework
- **MySQL**: Database
- **JWT**: Authentication
- **Bcrypt.js**: Password Hashing

## ⚙️ Local Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file in the root:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=room_booking_db
   JWT_SECRET=your_secret_key
   CORS_ORIGIN=http://localhost:5173
   ```

3. **Database Setup**:
   - Run the schema found in the [Aiven Setup Guide](https://github.com/akshayWork-19/GrubPac_backend) or your local SQL client.

4. **Run Server**:
   ```bash
   npm run dev
   ```

## ☁️ Cloud Database (Aiven)
1. Create a MySQL service on [Aiven.io](https://aiven.io/).
2. Copy the Host, Port, User, and Password.
3. Update your `.env` or Render environment variables with these details.
4. Set `DB_NAME=defaultdb`.

## 🛳️ Deployment (Render)
1. Push to GitHub.
2. Connect to Render as a "Web Service".
3. Add environment variables (excluding `PORT`).
4. **Important**: Ensure `CORS_ORIGIN` matches your Vercel URL (including `https://`).
