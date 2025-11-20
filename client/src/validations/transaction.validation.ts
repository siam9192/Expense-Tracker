import z from "zod";
import { TransactionType } from "../types/transaction.type";

const createTransactionPayloadValidation = z.object({
  title: z
    .string({
      message: "Title must be a string",
    })
    .nonempty("Title cannot be empty")
    .max(100, "Title must not exceed 100 characters"),
  type: z.enum([TransactionType.EXPENSE, TransactionType.INCOME], "Invalid type"),
  category_id: z
    .number({
      message: "Category is required ",
    })
    .int("Category ID must be an integer")
    .positive("Category ID must be a positive number"),

  currency_id: z.coerce
    .number({
      message: "Currency is required",
    })
    .int("Currency ID must be an integer")
    .positive("Currency ID must be a positive number"),

  amount: z.coerce
    .number({
      message: "Amount is required",
    })
    .positive("Amount must be greater than 0"),

  date: z
    .object({
      day: z.coerce
        .number({
          message: "Day is required",
        })
        .int()
        .min(1, "Day must be between 1 and 31")
        .max(31, "Day must be between 1 and 31"),

      month: z.coerce
        .number({
          message: "Month is required",
        })
        .int()
        .min(1, "Month must be between 1 and 12")
        .max(12, "Month must be between 1 and 12"),

      year: z.coerce
        .number({
          message: "Year is required",
        })
        .int()
        .min(1900, "Year must be greater than 1900")
        .max(2100, "Year must be less than 2100"),
    })
    .refine(
      (d) => {
        const test = new Date(d.year, d.month - 1, d.day);
        return (
          test.getFullYear() === d.year &&
          test.getMonth() === d.month - 1 &&
          test.getDate() === d.day
        );
      },
      { message: "Invalid date combination" },
    ),

  note: z.string().trim().max(500, "Note must be at most 500 characters long").optional(),
});

export type CreateTransactionPayloadValidationType = z.infer<
  typeof createTransactionPayloadValidation
>;

const transactionValidation = {
  createTransactionPayloadValidation,
};

export default transactionValidation;
