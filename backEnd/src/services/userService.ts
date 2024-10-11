import User  from "../models/User";
import bcrypt from "bcrypt";

export const seeUsers = async () => {
    const users = await User.findAll(); 
    return users; 
}

export const createUserService = async (username: string, password: string) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10 );
        const newUser = await User.create({ username, password:hashedPassword });
        return newUser;
    } catch (error) {
        console.log(error)
        throw new Error("Error creating user");
    }
};

export const userById = async(username:string) =>{
    try {
        const userId = await User.findOne({where:{username:username}})
        return userId;
    } catch (error) {
        throw new Error("Errorwhen searching for id");
    }
};

