import express from "express";
import {getPS, createPs, updatePs, getPSById} from "../controller/PSController.js"

const router = express.Router(); 


router.get('/ps', getPS);
router.get('/ps/:id', getPSById);
router.post('/ps', createPs);
router.patch('/ps/:id', updatePs);

export default router;