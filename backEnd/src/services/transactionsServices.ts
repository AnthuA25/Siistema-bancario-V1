import { sequelize } from "../config/database";
import { Transaction } from "../models";


const seeTransaction = async () => {
    const transaction = await Transaction.findAll(); // Transaction ID
    console.log(transaction.every(transaction => transaction instanceof Transaction))
    console.log('All transactions:', JSON.stringify(transaction, null, 2));
}

export { seeTransaction }