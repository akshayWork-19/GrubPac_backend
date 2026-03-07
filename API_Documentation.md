# GrubPac API Documentation

This document provides a detailed reference for all available API endpoints in the GrubPac application.

**Base URL**: `https://your-backend-url.onrender.com/api` (Production) or `http://localhost:5000/api` (Local)

---

## 🔐 Authentication

### 1. Register User
- **URL**: `/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Success Response**: `201 Created` with JWT token.

### 2. Login User
- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Success Response**: `200 OK` with JWT token.

---

## 🏨 Rooms
*All room endpoints require a valid `Authorization: Bearer <token>` header.*

### 3. Get All Rooms
- **URL**: `/rooms`
- **Method**: `GET`
- **Success Response**: List of all available rooms.

### 4. Get Room Details
- **URL**: `/rooms/:id`
- **Method**: `GET`
- **Success Response**: Detailed information for a specific room.

---

## 📅 Bookings
*All booking endpoints require a valid `Authorization: Bearer <token>` header.*

### 5. Create Booking
- **URL**: `/bookings`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "room_id": 1,
    "start_date": "2026-03-10",
    "end_date": "2026-03-15",
    "total_price": 750.00
  }
  ```
- **Success Response**: `201 Created`.

### 6. Get My Bookings
- **URL**: `/bookings/my`
- **Method**: `GET`
- **Success Response**: List of bookings made by the authenticated user.

### 7. Check Availability
- **URL**: `/bookings/check-availability`
- **Method**: `GET`
- **Query Params**: `room_id`, `start_date`, `end_date`
- **Example**: `/bookings/check-availability?room_id=1&start_date=2026-03-10&end_date=2026-03-15`
- **Success Response**: Boolean or availability status.

---

## 🛑 Error Handling
- **400 Bad Request**: Missing or invalid parameters.
- **401 Unauthorized**: Missing or invalid JWT token.
- **404 Not Found**: Resource (Room/Booking) not found.
- **500 Internal Server Error**: Unexpected server-side issues.
