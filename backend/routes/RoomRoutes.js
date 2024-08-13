import express from "express";
import {getRoom, createRoom, getRoomById} from '../controller/RoomController.js'

const router = express.Router(); 

router.get('/room', getRoom);
router.get('/room/:id', getRoomById);
router.post('/room', createRoom);

export default router;