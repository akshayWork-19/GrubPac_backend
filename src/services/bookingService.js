import db from "../config/db.js";

const checkAvailablity = async (roomId, startDate, endDate, exludeBookingId = null) => {
    let query = `SELECT id FROM bookings
    WHERE room_id = ?
      AND start_date < ?
      AND end_date > ?`;
    const params = [roomId, endDate, startDate];

    if (exludeBookingId) {
        query += ' AND id != ?';
        params.push(exludeBookingId);
    }

    const [rows] = await db.query(query, params);
    return rows.length === 0;
}

const createBooking = async ({ userId, roomId, startDate, endDate }) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(start) || isNaN(end)) {
        throw { status: 400, message: "Invalid Date Format!" };
    }

    if (start >= end) {
        throw { status: 400, message: "End date must be after start date" };
    }

    if (start < today) {
        throw { status: 400, message: "Start date cannot be in the past!" };
    }

    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();

        const [roomRows] = await conn.query('SELECT * FROM rooms WHERE id = ? FOR UPDATE', [roomId]);
        if (roomRows.length === 0) {
            throw { status: 404, message: "Room not found!" };
        }

        const room = roomRows[0];

        const [overlap] = await conn.query(
            `SELECT id FROM bookings
            WHERE room_id = ?
            AND start_date < ?
            AND end_date > ?`,
            [roomId, endDate, startDate]
        );

        if (overlap.length > 0) {
            throw { status: 409, message: "Room is not available for the selected dates!" };
        }

        const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        const totalPrice = (room.price_per_night * nights).toFixed(2);

        const [result] = await conn.query(
            'INSERT INTO bookings (user_id, room_id, start_date, end_date, total_price) VALUES (?, ?, ?, ?, ?)',
            [userId, roomId, startDate, endDate, totalPrice]
        );

        await conn.commit();
        conn.release();

        return {
            id: result.insertId,
            userId,
            roomId,
            startDate,
            endDate,
            totalPrice,
            nights,
            roomName: room.name,
        };

    } catch (error) {
        await conn.rollback();
        conn.release();
        throw error;
    };
};


const getUsersBookings = async (userId) => {
    const [rows] = await db.query(
        `SELECT b.id, b.start_date, b.end_date, b.total_price, b.created_at,
            r.id as room_id, r.name as room_name, r.price_per_night, r.image_url, r.description
     FROM bookings b
     JOIN rooms r ON b.room_id = r.id
     WHERE b.user_id = ?
     ORDER BY b.created_at DESC`,
        [userId]
    );

    return rows;
}

const checkRoomAvailablity = async (roomId, startDate, endDate) => {
    return await checkAvailablity(roomId, startDate, endDate);
}

export {
    checkAvailablity,
    getUsersBookings,
    createBooking
}