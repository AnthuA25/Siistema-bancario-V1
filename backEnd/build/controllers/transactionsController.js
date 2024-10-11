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
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawalTransaction = exports.depositTransaction = exports.transactionHandler = void 0;
const transactionsServices_1 = require("../services/transactionsServices");
const transactionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTransactions = yield (0, transactionsServices_1.seeTransactions)();
        res.status(200).json(allTransactions);
    }
    catch (error) {
        console.error("Error fetching transaction data:", error);
        res.status(500).json({ message: "An error occurred while fetching transaction data" });
    }
});
exports.transactionHandler = transactionHandler;
const depositTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accId, amount } = req.body;
        const newDeposit = yield (0, transactionsServices_1.createDeposit)(accId, amount);
        res.status(201).json(newDeposit);
    }
    catch (error) {
        console.error("Error creating deposit transaction:", error);
        res.status(500).json({ message: "An error occurred while creating deposit transaction" });
    }
});
exports.depositTransaction = depositTransaction;
const withdrawalTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accId, amount } = req.body;
        const newWithdrawal = yield (0, transactionsServices_1.createWithdrawal)(accId, +amount);
        if (!newWithdrawal.success) {
            res.status(400).json(newWithdrawal);
            return;
        }
        res.status(201).json(newWithdrawal);
    }
    catch (error) {
        console.error("Error creating withdrawal transaction:", error);
        res.status(500).json({ message: "An error occurred while creating withdrawal transaction" });
    }
});
exports.withdrawalTransaction = withdrawalTransaction;
