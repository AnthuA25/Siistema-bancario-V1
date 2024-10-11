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
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUser = exports.getAllUser = void 0;
const userService_1 = require("../services/userService");
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield (0, userService_1.seeUsers)();
        res.status(200).json(allUsers);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred while fetching user data" });
    }
});
exports.getAllUser = getAllUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: "Username and password are required" });
            return;
        }
        const existingUser = yield (0, userService_1.userById)(username);
        if (existingUser) {
            res.status(400).json({ message: "Username already exists" });
            return;
        }
        const newUser = yield (0, userService_1.createUserService)(username, password);
        res.status(201).json({
            message: "User created successfully",
            user: newUser,
        });
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred while creating the user" });
    }
});
exports.postUser = postUser;
