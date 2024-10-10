import { DataTypes, Model } from "sequelize";
import {sequelize} from "../config/database";

class User extends Model {
    public id_user!: number; 
    public username!: string; 
    public password!: string; 
}

User.init(
    {
        id_user: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_user',
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: false,
    }
);

export default User; 
