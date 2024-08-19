import express from "express";
import {login, register, profile, updateProfile} from "../controller/AuthController.js"; 
import {authenticateToken} from "../middleware/authenticateToken.js";
import upload from "../middleware/multer.js";

const router = express.Router(); 

router.post('/login', login,);
router.post('/register', register);
router.get('/profile', authenticateToken, profile);
router.patch('/profile', authenticateToken, upload.single('image'), updateProfile);
export default router;