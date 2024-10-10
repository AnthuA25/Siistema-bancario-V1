import express from 'express'
import { postUser, getAllUser } from '../controllers/usersController';

const router = express.Router()

router.get('/users', getAllUser);
router.post('/user',postUser);

export default router