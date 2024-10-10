import express from 'express'
import transactions from './transactionRoutes'

const router = express.Router()

router.use('/', transactions)

export default router

