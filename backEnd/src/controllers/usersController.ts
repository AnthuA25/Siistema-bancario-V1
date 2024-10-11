import { RequestHandler } from "express";
import dotenv from "dotenv";
import { createUserService, seeUsers,  userById, deleteUserService } from "../services/userService";
dotenv.config();

const getAllUser: RequestHandler = async (req, res) => {
    try {
        const allUsers = await seeUsers();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching user data" });
    }
};

const postUser: RequestHandler = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: "Username and password are required" });
            return;
        }
        const existingUser = await userById(username);

        if (existingUser) {
            res.status(400).json({ message: "Username already exists" });
            return;
        }

        const newUser = await createUserService(username, password);

        res.status(201).json({
            message: "User created successfully",
            user: newUser,
        });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while creating the user" });
    }
}
const deleteUserByUsername: RequestHandler = async (req, res) => {
    try {
        const { username } = req.params;
        if (!username) {
            res.status(400).json({ message: 'Username parameter is required' });
            return;
        }
        
        const existingUser = await userById(username);
        if (!existingUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const result = await deleteUserService(username);

        if (result === 1) { 
            res.status(200).json({ message: 'User deleted successfully' });
            return;
        }

        res.status(400).json({ message: 'Unable to delete user' });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while deleting the user", error });
    }
}


export { getAllUser, postUser, deleteUserByUsername };