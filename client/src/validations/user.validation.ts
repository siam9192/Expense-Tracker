import z from "zod";
import { Gender } from "../types/user.type";

const updateUserProfileValidation = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name cannot be empty")
    .max(100, "Name must be at most 100 characters long")
    .optional(),
  gender: z.enum(Object.values(Gender)).optional(),
  profile_picture: z.string().url("Profile picture must be a valid URL").optional(),

  avatar_id: z
    .number({
      message: "Avatar ID must be a number",
    })
    .int("Avatar ID must be an integer")
    .positive("Avatar ID must be a positive number")
    .optional(),

  profession_id: z
    .number({
      message: "Profession ID must be a number",
    })
    .int("Profession ID must be an integer")
    .positive("Profession ID must be a positive number")
    .optional(),

  country_id: z
    .number({
      message: "Country ID must be a number",
    })
    .int("Country ID must be an integer")
    .positive("Country ID must be a positive number")
    .optional(),
});

export type UpdateUserProfileValidation = z.infer<typeof updateUserProfileValidation>;

const userValidation = {
  updateUserProfileValidation,
};

export default userValidation;
