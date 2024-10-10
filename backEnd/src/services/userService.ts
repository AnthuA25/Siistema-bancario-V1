import User  from "../models/User";


export const seeUsers = async () => {
    const users = await User.findAll(); 
    return users; 
}

export const createUserService = async (username: string, password: string) => {
    try {
        const newUser = await User.create({ username, password });
        return newUser;
    } catch (error) {
        throw new Error("Error creating user");
    }
};

