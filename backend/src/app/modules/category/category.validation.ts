import { z } from "zod";

const MAX_NAME_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 300;

const createCurrentUserCategoryPayloadValidation = z.object({
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

  type: z.enum(["INCOME", "EXPENSE"], {
    errorMap: () => ({ message: "Type must be either INCOME or EXPENSE" }),
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
  createCurrentUserCategoryPayloadValidation,
  updateCurrentUserCategoryPayloadValidation,
};

export default categoryValidation;
