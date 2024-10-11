import Transaction from "../models/Transaction";
import Account from "../models/Account";
import { initResponse } from "../helper";

const seeTransactions = async () => {
  const res = initResponse<Transaction[]>(); // Initialize a response with an array of transactions.
  const transaction = await Transaction.findAll(); // Transaction ID
  res.success = true;
  res.data = transaction;
  return res;
};

const createDeposit = async (accId: number, amount: number) => {
  const res = initResponse<Transaction>();
  const account = await Account.findByPk(accId); // Replace with the account ID you want to deposit into
  if (!account) {
    res.error = "Account not found";
    return res;
  }

  await account.increment("account_balance", { by: amount });
  const newTransaction = await Transaction.create({
    id_account: accId,
    amount: amount,
    id_target_account: accId,
    transaction_type: "Deposit",
  });

  res.success = true;
  res.data = newTransaction;
  return res;
};

const createWithdrawal = async (accId: number, amount: number) => {
  const res = initResponse<Transaction>();

  const account = await Account.findByPk(accId);
  if (!account) {
    res.error = "Account not found";
    return res;
  }
  if (account.account_balance < amount) {
    res.error = "Insufficient funds";
    return res;
  }

  await account.decrement("account_balance", { by: amount });
  const newTransaction = await Transaction.create({
    id_account: accId,
    amount: amount,
    id_target_account: accId,
    transaction_type: "Withdrawal",
  });
  res.success = true;
  res.data = newTransaction;
  return res;
};

export { seeTransactions, createDeposit, createWithdrawal };
