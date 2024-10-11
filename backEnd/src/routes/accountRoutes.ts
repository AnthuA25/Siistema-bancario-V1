import express from 'express'
import { deleteAnAccount } from '../controllers/accountCrontroller'

const router = express.Router()

router.get('/');
router.delete('/:id_account', deleteAnAccount);

export default router