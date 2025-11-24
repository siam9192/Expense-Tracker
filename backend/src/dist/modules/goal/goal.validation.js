"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createCurrentUserGoalPayloadValidation = zod_1.z.object({
    title: zod_1.z
        .string()
        .trim()
        .nonempty("Title is required")
        .max(150, "Title must be at most 150 characters long"),
    target_amount: zod_1.z
        .number({
        required_error: "Target amount is required",
        invalid_type_error: "Target amount must be a number",
    })
        .positive("Target amount must be greater than 0"),
    initial_amount: zod_1.z
        .number({
        required_error: "Initial amount is required",
        invalid_type_error: "Initial amount must be a number",
    })
        .min(0, "Initial amount cannot be negative"),
    deadline: zod_1.z
        .preprocess((val) => (typeof val === "string" ? new Date(val) : val), zod_1.z.date({
        required_error: "Deadline is required",
        invalid_type_error: "Deadline must be a valid date",
    }))
        .refine((date) => date > new Date(), "Deadline must be a future date"),
});
const depositCurrentUserGoalPayloadValidation = zod_1.z.object({
    goal_id: zod_1.z
        .number({
        required_error: "Goal ID is required",
        invalid_type_error: "Goal ID must be a number",
    })
        .int("Goal ID must be an integer")
        .positive("Goal ID must be a positive number"),
    amount: zod_1.z
        .number({
        required_error: "Amount is required",
        invalid_type_error: "Amount must be a number",
    })
        .positive("Deposit amount must be greater than 0"),
});
const goalValidation = {
    createCurrentUserGoalPayloadValidation,
    depositCurrentUserGoalPayloadValidation,
};
exports.default = goalValidation;
