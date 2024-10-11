"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWithdrawal = exports.createDeposit = exports.seeTransactions = void 0;
const Transaction_1 = __importDefault(require("../models/Transaction"));
const Account_1 = __importDefault(require("../models/Account"));
const helper_1 = require("../helper");
const seeTransactions = () => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield Transaction_1.default.findAll(); // Transaction ID
    return transaction; // Return transaction data as a Promise.
});
exports.seeTransactions = seeTransactions;
const createDeposit = (accId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield Account_1.default.findByPk(accId); // Replace with the account ID you want to deposit into
    if (!account) {
        throw new Error("Account not found");
    }
    yield account.increment("account_balance", { by: amount });
    const newTransaction = yield Transaction_1.default.create({
        id_account: accId,
        amount: amount,
        id_target_account: accId,
        transaction_type: "Deposit",
    });
    return newTransaction;
});
exports.createDeposit = createDeposit;
const createWithdrawal = (accId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const res = (0, helper_1.initResponse)();
    const account = yield Account_1.default.findByPk(accId);
    if (!account) {
        res.error = "Account not found";
        return res;
    }
    console.log(typeof amount);
    console.log("🚀 ~ createWithdrawal ~ amount:", amount);
    console.log("🚀 ~ createWithdrawal ~ account.account_balance:", account.account_balance);
    if (account.account_balance < amount) {
        res.error = "Insufficient funds";
        return res;
    }
    yield account.decrement("account_balance", { by: amount });
    const newTransaction = yield Transaction_1.default.create({
        id_account: accId,
        amount: amount,
        id_target_account: accId,
        transaction_type: "Withdrawal",
    });
    res.success = true;
    res.data = newTransaction;
    return res;
});
exports.createWithdrawal = createWithdrawal;
