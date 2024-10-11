import express from 'express';
import transactions from './transactionRoutes';
import usersRouter from './userRouters';
import accountsRouter from './accountRoutes';

const router = express.Router();

router.use('/transactions', transactions);
router.use('/account', accountsRouter)
router.use('/',usersRouter);

export default router;

