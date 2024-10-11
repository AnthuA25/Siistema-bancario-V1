import express from 'express'
import { deleteAnAccount, accountInfoHandler } from '../controllers/accountController'

const router = express.Router()

router.get('/');
router.delete('/:id_account', deleteAnAccount);
router.get('/id', accountInfoHandler);

export default router



