import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class User extends Model {
    public id!: number; 
    public name!: string; 
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: true,
    }
);

export default User; 
