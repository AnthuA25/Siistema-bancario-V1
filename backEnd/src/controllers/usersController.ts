import { RequestHandler } from "express";
import { createUserService, seeUsers,userById } from "../services/userService";

const getAllUser: RequestHandler = async (req, res) => {
    try {
        const allUsers = await seeUsers();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching user data" });
    }
};

const postUser: RequestHandler = async(req, res)=>{
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

export { getAllUser,postUser};