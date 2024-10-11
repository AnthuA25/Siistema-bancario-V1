import express from 'express';
import transactions from './transactionRoutes';
import usersRouter from './userRouters';

const router = express.Router();

router.use('/', transactions);
router.use('/users',usersRouter);

export default router;

