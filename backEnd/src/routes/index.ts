import express from 'express';
import transactions from './transactionRoutes';
import usersRouter from './userRouters';

const router = express.Router();

router.use('/', transactions);
router.use('/',usersRouter);

export default router;

