import express from 'express';
import transactions from './transactionRoutes';
import usersRouter from './userRouters';
import accountRouter from './accountRoutes';

const app = express();
app.use(express.json());  
app.use('/', transactions); 
app.use('/', usersRouter);  
app.use('/', accountRouter);

export default app;

