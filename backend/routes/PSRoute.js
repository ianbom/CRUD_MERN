import express from "express";
import {getPS, createPs, updatePs, getPSById} from "../controller/PSController.js"
import {authenticateToken} from "../middleware/authenticateToken.js";

const router = express.Router(); 


router.get('/ps', getPS, authenticateToken);
router.get('/ps/:id', getPSById, authenticateToken);
router.post('/ps', createPs);
router.patch('/ps/:id', updatePs);

export default router;