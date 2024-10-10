import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database';
dotenv.config();
const app: Application = express();
const PORT: number = 8000;

app.use(express.json());
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);
const startServer = async () => {
    try {
      await sequelize.authenticate();
      console.log('Database connected');
  
      app.listen(PORT, () => {
        console.log('Server running on port 8000');
      });
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
};
  
startServer();