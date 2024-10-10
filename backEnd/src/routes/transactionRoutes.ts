import express from 'express'
import { transactionHandler } from '../controllers/transactionsController'

const router = express.Router()

router.get('/transaction', transactionHandler);

export default router