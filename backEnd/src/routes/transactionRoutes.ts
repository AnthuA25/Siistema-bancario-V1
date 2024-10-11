import express from 'express'
import { transactionHandler, depositTransaction, withdrawalTransaction,transferTransactionHandler } from '../controllers/transactionsController'

const router = express.Router()

router.get('/transaction', transactionHandler);
router.post('/transaction/deposit', depositTransaction);
router.post('/transaction/withdrawal', withdrawalTransaction);
router.post('/transaction/transfer', transferTransactionHandler);

export default router