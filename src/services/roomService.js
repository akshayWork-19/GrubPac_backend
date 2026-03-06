import db from '../config/db.js';

const getAllRooms = async () => {
    const [rows] = await db.query('SELECT * FROM rooms ORDER BY created_at DESC');
    return rows;
}

const getRoomById = async (id) => {
    const [rows] = await db.query('SELECT * FROM rooms WHERE id = ?', [id]);
    if (rows.length === 0) {
        throw { status: 404, message: "Room not found!" }
    }

    return rows[0];
}

export {
    getAllRooms,getRoomById
}