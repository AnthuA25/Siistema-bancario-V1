import express from 'express'
import { deleteAnAccount, accountInfoHandler } from '../controllers/accountController'

const router = express.Router()


router.get('/account/:id', accountInfoHandler);
router.delete('/:id_account', deleteAnAccount);

export default router



