import type { RequestHandler } from "express";
import {
  seeTransactions,
  createDeposit,
  createWithdrawal,
  transferTransaction
} from "../services/transactionsServices";

const transactionHandler: RequestHandler = async (req, res) => {
  try {
    const allTransactions = await seeTransactions();
    res.status(200).json(allTransactions);
  } catch (error) {
    console.error("Error fetching transaction data:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching transaction data" });
  }
};

const depositTransaction: RequestHandler = async (req, res) => {
  try {
    const { accId, amount } = req.body;
    const newDeposit = await createDeposit(accId, +amount);
    res.status(201).json(newDeposit);
  } catch (error) {
    console.error("Error creating deposit transaction:", error);
    res
      .status(500)
      .json({
        message: "An error occurred while creating deposit transaction",
      });
  }
};

const withdrawalTransaction: RequestHandler = async (
  req,
  res
): Promise<void> => {
  try {
    const { accId, amount } = req.body;
    const newWithdrawal = await createWithdrawal(accId, +amount);
    if (!newWithdrawal.success) {
      res.status(400).json(newWithdrawal);
      return;
    }

    res.status(201).json(newWithdrawal);
  } catch (error) {
    console.error("Error creating withdrawal transaction:", error);
    res
      .status(500)
      .json({
        message: "An error occurred while creating withdrawal transaction",
      });
  }
};

const transferTransactionHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { fromAccountId, toAccountId, amount } = req.body;
    const transferResult = await transferTransaction(fromAccountId, toAccountId, +amount);

    if (!transferResult.success) {
      res.status(400).json(transferResult);
      return;
    }
    res.status(201).json(transferResult);
  } catch (error) {
    console.error("Error during transfer transaction:", error);
    res.status(500).json({
      message: "An error occurred during the transfer transaction",
    });
  }
};

export { transactionHandler, depositTransaction, withdrawalTransaction, transferTransactionHandler };
