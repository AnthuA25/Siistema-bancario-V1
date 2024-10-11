import express from 'express'
import { transactionHandler, depositTransaction, withdrawalTransaction } from '../controllers/transactionsController'

const router = express.Router()

router.get('/transaction', transactionHandler);
router.post('/transaction/deposit', depositTransaction);
router.post('/transaction/withdrawal', withdrawalTransaction);

export default router