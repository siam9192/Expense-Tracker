import { Gender } from "@prisma/client";
import z from "zod";

const updateUserProfilePayloadValidation = 
z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name cannot be empty")
    .max(100, "Name must be at most 100 characters long")
    .optional(),

  profile_picture: z
    .string()
    .url("Profile picture must be a valid URL")
    .optional(),

  avatar_id: z
    .number({
      invalid_type_error: "Avatar ID must be a number",
    })
    .int("Avatar ID must be an integer")
    .positive("Avatar ID must be a positive number")
    .optional(),

  profession_id: z
    .number({
      invalid_type_error: "Profession ID must be a number",
    })
    .int("Profession ID must be an integer")
    .positive("Profession ID must be a positive number")
    .optional(),

  country_id: z
    .number({
      invalid_type_error: "Country ID must be a number",
    })
    .int("Country ID must be an integer")
    .positive("Country ID must be a positive number")
    .optional(),
});



 const setupUserProfilePayloadValidation = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .trim()
    .nonempty("Name cannot be empty")
    .max(100, "Name must be at most 100 characters long"),
   gender:z.nativeEnum(Gender,{message:"Invalid gender",required_error:"Gender is required"}),
  avatar_id: z
    .number({
      required_error: "Avatar ID is required",
      invalid_type_error: "Avatar ID must be a number",
    })
    .int("Avatar ID must be an integer")
    .positive("Avatar ID must be a positive number"),

  profession_id: z
    .number({
      required_error: "Profession ID is required",
      invalid_type_error: "Profession ID must be a number",
    })
    .int("Profession ID must be an integer")
    .positive("Profession ID must be a positive number"),

  country_id: z
    .number({
      required_error: "Country ID is required",
      invalid_type_error: "Country ID must be a number",
    })
    .int("Country ID must be an integer")
    .positive("Country ID must be a positive number"),

  currency_id: z
    .number({
      required_error: "Currency ID is required",
      invalid_type_error: "Currency ID must be a number",
    })
    .int("Currency ID must be an integer")
    .positive("Currency ID must be a positive number"),

  monthly_budget: z
    .number({
      required_error: "Monthly budget is required",
      invalid_type_error: "Monthly budget must be a number",
    })
    .nonnegative("Monthly budget cannot be negative"),

  spendable_balance: z
    .number({
      required_error: "Spendable balance is required",
      invalid_type_error: "Spendable balance must be a number",
    })
    .nonnegative("Spendable balance cannot be negative"),
});

 const updateCurrentUserSettingsPayloadValidation = z.object({
  auto_saving: z
    .boolean({
      invalid_type_error: "Auto saving must be a boolean value",
    })
    .optional(),

  balance_expense_income_alert: z
    .boolean({
      invalid_type_error: "Balance expense/income alert must be a boolean value",
    })
    .optional(),

  email_alerts: z
    .boolean({
      invalid_type_error: "Email alerts must be a boolean value",
    })
    .optional(),

  sms_alerts: z
    .boolean({
      invalid_type_error: "SMS alerts must be a boolean value",
    })
    .optional(),

  transaction_updates: z
    .boolean({
      invalid_type_error: "Transaction updates must be a boolean value",
    })
    .optional(),

  two_factor_auth: z
    .boolean({
      invalid_type_error: "Two-factor authentication must be a boolean value",
    })
    .optional(),

  monthly_budget: z
    .number({
      invalid_type_error: "Monthly budget must be a number",
    })
    .nonnegative("Monthly budget cannot be negative")
    .optional(),
});


const userValidation = {
 updateUserProfilePayloadValidation,
 setupUserProfilePayloadValidation,
 updateCurrentUserSettingsPayloadValidation
} 

export default userValidation