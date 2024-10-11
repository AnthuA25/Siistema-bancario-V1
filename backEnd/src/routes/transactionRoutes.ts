import express from 'express'
import { transactionHandler, depositTransaction, withdrawalTransaction } from '../controllers/transactionsController'

const router = express.Router()

router.get('/', transactionHandler);
router.post('/deposit', depositTransaction);
router.post('/withdrawal', withdrawalTransaction);

export default router