import express from 'express'
import { transactionHandler, depositTransaction, withdrawalTransaction, transferTransactionHandler } from '../controllers/transactionsController'

const router = express.Router()

router.get('/', transactionHandler);
router.post('/deposit/:id_account', depositTransaction);
router.post('/withdrawal', withdrawalTransaction);
router.post('/transfer', transferTransactionHandler);

export default router