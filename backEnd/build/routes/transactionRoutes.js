"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactionsController_1 = require("../controllers/transactionsController");
const router = express_1.default.Router();
router.get('/transaction', transactionsController_1.transactionHandler);
router.post('/transaction/deposit', transactionsController_1.depositTransaction);
router.post('/transaction/withdrawal', transactionsController_1.withdrawalTransaction);
exports.default = router;
