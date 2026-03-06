import * as roomService from "../services/roomService.js";

const getAllRooms = async (req, res) => {
    try {
        const rooms = await roomService.getAllRooms();
        return res.status(200).json({
            success: true,
            message: "Successfully retrieved",
            data: rooms
        });
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || error
        });
    };
};

const getRoomById = async (req, res) => {
    try {
        const room = await roomService.getRoomById(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Successfully retrieved",
            data: room
        });
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || error
        });
    }
};

export {
    getAllRooms,
    getRoomById
}