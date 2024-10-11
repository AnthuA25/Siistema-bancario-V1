import express from 'express'
import { postUser, getAllUser, deleteUserByUsername } from '../controllers/usersController';

const router = express.Router()

router.get('/all', getAllUser);
router.post('/createuser',postUser);
router.delete('/:username',deleteUserByUsername)

export default router