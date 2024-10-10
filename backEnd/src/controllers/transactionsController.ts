import type { RequestHandler } from "express";
import { seeTransaction } from "../services/transactionsServices";

const transactionHandler: RequestHandler = async (req, res) => {
    try {
        const allTransactions = await seeTransaction();
        res.status(200).json(allTransactions);
    } catch (error) {
        console.error("Error fetching transaction data:", error);
        res.status(500).json({ message: "An error occurred while fetching transaction data" });
    }
}

export { transactionHandler };