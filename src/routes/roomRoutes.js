import express from 'express';
import { getRoomById,getAllRooms } from '../controllers/roomController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/',authMiddleware,getAllRooms);
router.get('/:id',authMiddleware,getRoomById);

export default router;