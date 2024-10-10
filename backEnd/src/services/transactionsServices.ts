import Transaction  from "../models/Transaction";


const seeTransaction = async () => {
    const transaction = await Transaction.findAll(); // Transaction ID
    return transaction; // Return transaction data as a Promise.
}



export { seeTransaction }