"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Account_1 = __importDefault(require("./Account"));
class Transaction extends sequelize_1.Model {
}
Transaction.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id', // nombre de la columna en la base de datos
    },
    id_account: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Account_1.default, // Referencia al modelo Account
            key: 'id_account',
        },
    },
    amount: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
    },
    id_target_account: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    transaction_type: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "Transaction",
    tableName: "transaction",
    timestamps: true,
});
exports.default = Transaction;
