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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const testConnection_1 = require("./utils/testConnection");
const database_1 = require("./config/database");
require("./models/association");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 8000;
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API!');
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, testConnection_1.testConnection)();
        console.log('Database connected');
        yield database_1.sequelize.sync({ force: false });
        console.log('Database synchronized successfully!');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
startServer();
