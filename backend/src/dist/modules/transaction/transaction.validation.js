"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const createTransactionPayloadValidation = zod_1.default.object({
    title: zod_1.default
        .string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string",
    })
        .nonempty("Title cannot be empty")
        .max(100, "Title must not exceed 100 characters"),
    category_id: zod_1.default
        .number({
        required_error: "Category ID is required",
        invalid_type_error: "Category ID must be a number",
    })
        .int("Category ID must be an integer")
        .positive("Category ID must be a positive number"),
    currency_id: zod_1.default
        .number({
        required_error: "Currency ID is required",
        invalid_type_error: "Currency ID must be a number",
    })
        .int("Currency ID must be an integer")
        .positive("Currency ID must be a positive number"),
    amount: zod_1.default
        .number({
        required_error: "Amount is required",
        invalid_type_error: "Amount must be a number",
    })
        .positive("Amount must be greater than 0"),
    date: zod_1.default.preprocess((val) => (typeof val === "string" ? new Date(val) : val), zod_1.default.date({
        required_error: "Date is required",
        invalid_type_error: "Date must be a valid date",
    })),
    note: zod_1.default
        .string()
        .trim()
        .max(500, "Note must be at most 500 characters long")
        .optional(),
});
const transactionValidation = {
    createTransactionPayloadValidation,
};
exports.default = transactionValidation;
