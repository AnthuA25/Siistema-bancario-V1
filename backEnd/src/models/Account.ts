import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import User from "./User";

class Account extends Model {
    public id_user!: number; 
    public account_balance!: number;
}

Account.init(
    {
        id_account: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_account', 
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User, 
                key: 'id_user',
            },
        },
        account_balance: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Account",
        tableName: "account",
        timestamps: false,
    }
);

export default Account;