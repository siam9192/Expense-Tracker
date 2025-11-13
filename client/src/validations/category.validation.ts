import { z } from "zod";
import { CategoryType } from "../types/category.type";

const MAX_NAME_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 300;

const createCurrentUserCategoryValidation = z.object({
  name: z
    .string()
    .trim()
    .nonempty("Name is required")
    .max(
      MAX_NAME_LENGTH,
      `Name must be at most ${MAX_NAME_LENGTH} characters long`,
    ),

  description: z
    .string()
    .trim()
    .nonempty("Description is required")
    .max(
      MAX_DESCRIPTION_LENGTH,
      `Description must be at most ${MAX_DESCRIPTION_LENGTH} characters long`,
    ),

  type: z.enum([CategoryType.INCOME,CategoryType.EXPENSE], {
  message:"Type must be either INCOME or EXPENSE",
  }),
});

const updateCurrentUserCategoryPayloadValidation = z
  .object({
    name: z
      .string()
      .trim()
      .nonempty("Name is required")
      .max(
        MAX_NAME_LENGTH,
        `Name must be at most ${MAX_NAME_LENGTH} characters long`,
      ),

    description: z
      .string()
      .trim()
      .nonempty("Description is required")
      .max(
        MAX_DESCRIPTION_LENGTH,
        `Description must be at most ${MAX_DESCRIPTION_LENGTH} characters long`,
      ),
  })
  .partial();

const categoryValidation = {
  createCurrentUserCategoryValidation,
  updateCurrentUserCategoryPayloadValidation,
};

export default categoryValidation;
