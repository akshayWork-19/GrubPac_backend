import * as bookingService from '../services/bookingService.js';

const createBooking = async (req, res) => {
    const { roomId, startDate, endDate } = req.body;
    const userId = req.user.id;

    if (!roomId || !startDate || !endDate) {
        return res.status(400).json({ success: false, message: 'roomId, startDate and endDate are required.' });
    }
    try {
        const booking = await bookingService.createBooking({ userId, roomId, startDate, endDate });
        return res.status(201).json({
            success: true,
            message: "Booking Confirmed!", data: booking
        });
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message || error });
    };
};

const getUsersBookings = async (req, res) => {
    try {
        const bookings = await bookingService.getUsersBookings(req.user.id);
        return res.status(200).json({
            success: true,
            data: bookings
        });
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message || error });
    };
};

const checkAvailablity = async (req, res) => {
    const { roomId, startDate, endDate } = req.query;
    if (!roomId || !startDate || !endDate) {
        return res.status(400).json({ success: false, message: 'roomId, startDate and endDate are required.' });
    }

    try {
        const available = await bookingService.checkAvailablity(roomId, startDate, endDate);
        return res.status(200).json({
            success: true,
            data: { available }
        })
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message || error });
    };
};

export {
    checkAvailablity,
    createBooking,
    getUsersBookings
}
