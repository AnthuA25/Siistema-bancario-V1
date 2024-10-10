"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginFunction = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const bcrypt = require('bcrypt');
const secret = process.env.JWT_SECRET || 'secretkey';
const loginFunction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        //verificamos entrada
        if (!username || !password) {
            return res.status(400).send('Faltan datos por ingresar');
        }
        //buscamos usuario
        const user = yield User_1.default.findOne({ where: { username } });
        console.log('User:', user);
        if (!user) {
            return res.status(404).send('Username incorrecto');
        }
        //aqui comparamos pw
        const passwordMatch = yield bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(404).send('Password incorrecto, intente de nuevo');
        }
        //si hacen match generamos token
        const token = jsonwebtoken_1.default.sign({ id_user: user.id, email: user.username }, secret, { expiresIn: '1h' });
        return res.status(200).json({ token });
    }
    catch (error) {
        console.error('Error al hacer login:', error);
        return res.status(500).send('Ocurrio un error');
    }
});
exports.loginFunction = loginFunction;
