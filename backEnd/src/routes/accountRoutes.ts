import express from 'express'
import { accountInfoHandler } from '../controllers/accountController';
const router = express.Router()

router.get('/account/:id', accountInfoHandler);

export default router