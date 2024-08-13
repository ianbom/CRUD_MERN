import express from "express";
import {getTransaction, createTransaction} from "../controller/TransactionController.js";

const router = express.Router(); 


router.get('/transaction', getTransaction);
router.post('/transaction', createTransaction);

export default router;