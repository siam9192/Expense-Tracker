"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_controller_1 = __importDefault(require("./transaction.controller"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_interface_1 = require("../user/user.interface");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const transaction_validation_1 = __importDefault(require("./transaction.validation"));
const router = (0, express_1.Router)();
router.post("/me", (0, auth_1.default)([user_interface_1.UserRole.USER]), (0, validateRequest_1.default)(transaction_validation_1.default.createTransactionPayloadValidation), transaction_controller_1.default.createTransaction);
router.get("/me", (0, auth_1.default)([user_interface_1.UserRole.USER]), transaction_controller_1.default.getCurrentUserTransactions);
router.get("/me/:id", (0, auth_1.default)([user_interface_1.UserRole.USER]), transaction_controller_1.default.getCurrentUserTransactionById);
const transitionRouter = router;
exports.default = transitionRouter;
