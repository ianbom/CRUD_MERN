import express from "express";
import {getUserTransactions, createTransaction} from "../controller/TransactionController.js";
import {authenticateToken} from "../middleware/authenticateToken.js";

const router = express.Router(); 


router.get('/transaction',authenticateToken, getUserTransactions, );
router.post('/transaction', createTransaction, authenticateToken);

export default router;