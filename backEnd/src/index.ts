import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import {testConnection} from './utils/testConnection'
import { sequelize } from './config/database';
import { User, Account, Transaction } from './models';

dotenv.config();
const app: Application = express();
const PORT: number = 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('¡Bienvenido a la API!');
});

const startServer = async () => {
    try {
      await testConnection();
      console.log('Database connected');

      await sequelize.sync();
      console.log('Database synchronized successfully!');

      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
};
  
startServer();