import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from '../models/User'
const bcrypt = require('bcrypt');

const secret = process.env.JWT_SECRET || 'secretkey';

export const loginFunction = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
            //verificamos entrada
            if(!username || !password){
                return res.status(400).send('Faltan datos por ingresar');
            }
            //buscamos usuario
            const user = await User.findOne({where: { username } });
            console.log('User:', user);
            if(!user){
                return res.status(404).send('Username incorrecto');
            }
            //aqui comparamos pw
            const passwordMatch = await bcrypt.compare(password, user.password);
            if(!passwordMatch){
                return res.status(404).send('Password incorrecto, intente de nuevo');
            }
            //si hacen match generamos token
            const token = jwt.sign({ id_user: user.id, email: user.username }, secret, { expiresIn: '1h' });
            return res.status(200).json({ token });

        } catch (error) {
            console.error('Error al hacer login:', error);
            return res.status(500).send('Ocurrio un error');   
        }
    };