import express from "express";
import {getUserTransactions,myTransaction, createTransaction, getAllTransaction, doneTransaction} from "../controller/TransactionController.js";
import {authenticateToken} from "../middleware/authenticateToken.js";

const router = express.Router(); 


router.get('/transaction',authenticateToken, myTransaction, );
router.get('/transaction/all', getAllTransaction );
router.patch('/transaction/done/:id', doneTransaction );
router.post('/transaction', createTransaction, authenticateToken);

export default router;