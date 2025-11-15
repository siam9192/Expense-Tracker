import { z } from "zod";

const createUserGoalPayloadValidation = z.object({
  title: z
    .string()
    .trim()
    .nonempty("Title is required")
    .max(150, "Title must be at most 150 characters long"),

  target_amount: z.coerce
    .number({
        message:"Target amount must be a number"
     
    })
    .positive("Target amount must be greater than 0"),

  initial_amount: z.coerce
    .number({
      message: "Initial amount is required",
     
    })
    .min(0, "Initial amount cannot be negative"),

  deadline: z
    .preprocess(
      (val) => (typeof val === "string" ? new Date(val) : val),
      z.date({
       message: "Deadline is required",
      }),
    )
    .refine((date) => date > new Date(), "Deadline must be a future date"),
});

const depositUserGoalPayloadValidation = z.object({
  goal_id: z
    .number({
      message: "Goal ID is required",
     
    })
    .int("Goal ID must be an integer")
    .positive("Goal ID must be a positive number"),

  amount: z.coerce
    .number({
     message: "Amount is required",
     
    })
    .positive("Deposit amount must be greater than 0"),
});

const goalValidation = {
  createUserGoalPayloadValidation,
  depositUserGoalPayloadValidation,
};

export default goalValidation;
