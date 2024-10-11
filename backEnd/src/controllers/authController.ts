import type { RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userById } from "../services/userService";



const login: RequestHandler = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ message: 'Username and password are required' });
        return;
    }

    try {
        const user = await userById(username);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: 'Incorrect password' });
            return;
        }

        const token = jwt.sign(
            { username: user.username },
            process.env.JWT_SECRET as string,
        );

        res.status(200).json({ message: 'Successful login', token, userId: user.id_user, username: user.username });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
}

export {login}