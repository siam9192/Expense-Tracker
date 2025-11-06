import z from "zod";

const createTransactionPayloadValidation = z.object({
  category_id: z
    .number({
      required_error: "Category ID is required",
      invalid_type_error: "Category ID must be a number",
    })
    .int("Category ID must be an integer")
    .positive("Category ID must be a positive number"),

  currency_id: z
    .number({
      required_error: "Currency ID is required",
      invalid_type_error: "Currency ID must be a number",
    })
    .int("Currency ID must be an integer")
    .positive("Currency ID must be a positive number"),

  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .positive("Amount must be greater than 0"),

  date: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date({
      required_error: "Date is required",
      invalid_type_error: "Date must be a valid date",
    }),
  ),

  note: z
    .string()
    .trim()
    .max(500, "Note must be at most 500 characters long")
    .optional(),
});

const transactionValidation = {
  createTransactionPayloadValidation,
};

export default transactionValidation;
