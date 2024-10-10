import { RequestHandler } from "express";
import { createUserService, seeUsers } from "../services/userService";
import User from "../models/User";

const getAllUser: RequestHandler = async (req, res) => {
    try {
        const allUsers = await seeUsers();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching user data" });
    }
};

const postUser: RequestHandler = async(req, res) =>{
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: "Username and password are required" });
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

export { getAllUser,postUser};