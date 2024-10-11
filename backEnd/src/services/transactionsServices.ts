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

const transferTransaction = async (fromAccountId: number, toAccountId: number, amount: number) => {
  const res = initResponse<Transaction>();

  if (!fromAccountId || !toAccountId || !amount) {
      res.error = 'Datos inválidos';
      return res;
  }

  try {
      const fromAccount = await Account.findByPk(fromAccountId);
      const toAccount = await Account.findByPk(toAccountId);

      if (!fromAccount || !toAccount) {
          res.error = 'Una o ambas cuentas no son válidas';
          return res;
      }

      if (fromAccount.account_balance < amount) {
          res.error = 'Fondos insuficientes en la cuenta de origen';
          return res;
      }

      fromAccount.account_balance -= amount;
      toAccount.account_balance += amount;

      await fromAccount.save();
      await toAccount.save();

      const newTransaction = await Transaction.create({
          id_account: fromAccountId,
          amount: amount,
          id_target_account: toAccountId,
          transaction_type: 'transfer',
      });

      res.success = true;
      res.data = newTransaction;
      return res;
  } catch (error) {
      res.error = 'Error durante la transferencia';
      return res;
  }
};

export { seeTransactions, createDeposit, createWithdrawal, transferTransaction };
