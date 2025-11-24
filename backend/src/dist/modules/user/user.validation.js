"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const zod_1 = __importDefault(require("zod"));
const updateUserProfilePayloadValidation = zod_1.default.object({
    name: zod_1.default
        .string()
        .trim()
        .min(1, "Name cannot be empty")
        .max(100, "Name must be at most 100 characters long")
        .optional(),
    gender: zod_1.default
        .nativeEnum(client_1.Gender, {
        message: "Invalid gender",
        required_error: "Gender is required",
    })
        .optional(),
    profile_picture: zod_1.default
        .string()
        .url("Profile picture must be a valid URL")
        .optional(),
    avatar_id: zod_1.default
        .number({
        invalid_type_error: "Avatar ID must be a number",
    })
        .int("Avatar ID must be an integer")
        .positive("Avatar ID must be a positive number")
        .optional(),
    profession_id: zod_1.default
        .number({
        invalid_type_error: "Profession ID must be a number",
    })
        .int("Profession ID must be an integer")
        .positive("Profession ID must be a positive number")
        .optional(),
    country_id: zod_1.default
        .number({
        invalid_type_error: "Country ID must be a number",
    })
        .int("Country ID must be an integer")
        .positive("Country ID must be a positive number")
        .optional(),
});
const setupUserProfilePayloadValidation = zod_1.default.object({
    name: zod_1.default
        .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    })
        .trim()
        .nonempty("Name cannot be empty")
        .max(100, "Name must be at most 100 characters long"),
    gender: zod_1.default.nativeEnum(client_1.Gender, {
        message: "Invalid gender",
        required_error: "Gender is required",
    }),
    avatar_id: zod_1.default
        .number({
        required_error: "Avatar ID is required",
        invalid_type_error: "Avatar ID must be a number",
    })
        .int("Avatar ID must be an integer")
        .positive("Avatar ID must be a positive number"),
    profession_id: zod_1.default
        .number({
        required_error: "Profession ID is required",
        invalid_type_error: "Profession ID must be a number",
    })
        .int("Profession ID must be an integer")
        .positive("Profession ID must be a positive number"),
    country_id: zod_1.default
        .number({
        required_error: "Country ID is required",
        invalid_type_error: "Country ID must be a number",
    })
        .int("Country ID must be an integer")
        .positive("Country ID must be a positive number"),
    currency_id: zod_1.default
        .number({
        required_error: "Currency ID is required",
        invalid_type_error: "Currency ID must be a number",
    })
        .int("Currency ID must be an integer")
        .positive("Currency ID must be a positive number"),
    monthly_budget: zod_1.default
        .number({
        required_error: "Monthly budget is required",
        invalid_type_error: "Monthly budget must be a number",
    })
        .nonnegative("Monthly budget cannot be negative"),
    spendable_balance: zod_1.default
        .number({
        required_error: "Spendable balance is required",
        invalid_type_error: "Spendable balance must be a number",
    })
        .nonnegative("Spendable balance cannot be negative"),
});
const updateCurrentUserSettingsPayloadValidation = zod_1.default.object({
    auto_saving: zod_1.default
        .boolean({
        invalid_type_error: "Auto saving must be a boolean value",
    })
        .optional(),
    balance_expense_income_alert: zod_1.default
        .boolean({
        invalid_type_error: "Balance expense/income alert must be a boolean value",
    })
        .optional(),
    email_alerts: zod_1.default
        .boolean({
        invalid_type_error: "Email alerts must be a boolean value",
    })
        .optional(),
    sms_alerts: zod_1.default
        .boolean({
        invalid_type_error: "SMS alerts must be a boolean value",
    })
        .optional(),
    transaction_updates: zod_1.default
        .boolean({
        invalid_type_error: "Transaction updates must be a boolean value",
    })
        .optional(),
    two_factor_auth: zod_1.default
        .boolean({
        invalid_type_error: "Two-factor authentication must be a boolean value",
    })
        .optional(),
    monthly_budget: zod_1.default
        .number({
        invalid_type_error: "Monthly budget must be a number",
    })
        .nonnegative("Monthly budget cannot be negative")
        .optional(),
});
const userValidation = {
    updateUserProfilePayloadValidation,
    setupUserProfilePayloadValidation,
    updateCurrentUserSettingsPayloadValidation,
};
exports.default = userValidation;
