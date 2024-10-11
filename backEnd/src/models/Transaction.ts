import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import Account from "./Account"; 

class Transaction extends Model {
    public id?: number; 
    public id_account!: number; // Clave foránea
    public amount!: number;
    public id_target_account!: number;
    public transaction_type!: string;
}

Transaction.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id', // nombre de la columna en la base de datos
        },
        id_account: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Account, // Referencia al modelo Account
                key: 'id_account',
            },
        },
        amount: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        id_target_account: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        transaction_type: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Transaction",
        tableName: "transaction",
        timestamps: true,
    }
);

export default Transaction;
