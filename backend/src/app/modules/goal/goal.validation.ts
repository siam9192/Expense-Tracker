import { z } from "zod";

const createCurrentUserGoalPayloadValidation = z.object({
  title: z
    .string()
    .trim()
    .nonempty("Title is required")
    .max(150, "Title must be at most 150 characters long"),

  target_amount: z
    .number({
      required_error: "Target amount is required",
      invalid_type_error: "Target amount must be a number",
    })
    .positive("Target amount must be greater than 0"),

  initial_amount: z
    .number({
      required_error: "Initial amount is required",
      invalid_type_error: "Initial amount must be a number",
    })
    .min(0, "Initial amount cannot be negative"),

  deadline: z
    .preprocess(
      (val) => (typeof val === "string" ? new Date(val) : val),
      z.date({
        required_error: "Deadline is required",
        invalid_type_error: "Deadline must be a valid date",
      }),
    )
    .refine((date) => date > new Date(), "Deadline must be a future date"),
});

const depositCurrentUserGoalPayloadValidation = z.object({
  goal_id: z
    .number({
      required_error: "Goal ID is required",
      invalid_type_error: "Goal ID must be a number",
    })
    .int("Goal ID must be an integer")
    .positive("Goal ID must be a positive number"),

  amount: z
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

export default goalValidation;
