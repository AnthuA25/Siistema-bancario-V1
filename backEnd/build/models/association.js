"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./User"));
const Account_1 = __importDefault(require("./Account"));
const Transaction_1 = __importDefault(require("./Transaction"));
User_1.default.hasMany(Account_1.default, { foreignKey: 'id_user' });
Account_1.default.belongsTo(User_1.default, { foreignKey: 'id_user' });
Account_1.default.hasMany(Transaction_1.default, { foreignKey: 'id_account' });
Transaction_1.default.belongsTo(Account_1.default, { foreignKey: 'id_account' });
