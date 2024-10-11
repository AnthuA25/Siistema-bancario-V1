"use strict";
// import express, { Request, Response } from "express";
// import User from "../models/User";
// import bcrypt from 'bcrypt';
// const router = express.Router();
// router.post('/login', async (req: Request, res: Response): Promise<Response> => {
//     const { username, password } = req.body;
//     if (!username || !password) {
//         return res.status(400).json({ message: 'Se requieren username y password' });
//     }
//     try {
//         const user = await User.findOne({ where: { username } });
//         if (!user) {
//             return res.status(404).json({ message: 'Usuario no encontrado' });
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Contraseña incorrecta' });
//         }
//         res.status(200).json({ message: 'Inicio de sesión exitoso', userId: user.id_user });
//     } catch (error) {
//         res.status(500).json({ message: 'Error al iniciar sesión', error });
//     }
// });
// export default router
