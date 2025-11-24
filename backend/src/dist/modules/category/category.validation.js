"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const MAX_NAME_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 300;
const createCurrentUserCategoryPayloadValidation = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .nonempty("Name is required")
        .max(MAX_NAME_LENGTH, `Name must be at most ${MAX_NAME_LENGTH} characters long`),
    description: zod_1.z
        .string()
        .trim()
        .nonempty("Description is required")
        .max(MAX_DESCRIPTION_LENGTH, `Description must be at most ${MAX_DESCRIPTION_LENGTH} characters long`),
    type: zod_1.z.enum(["INCOME", "EXPENSE"], {
        errorMap: () => ({ message: "Type must be either INCOME or EXPENSE" }),
    }),
});
const updateCurrentUserCategoryPayloadValidation = zod_1.z
    .object({
    name: zod_1.z
        .string()
        .trim()
        .nonempty("Name is required")
        .max(MAX_NAME_LENGTH, `Name must be at most ${MAX_NAME_LENGTH} characters long`),
    description: zod_1.z
        .string()
        .trim()
        .nonempty("Description is required")
        .max(MAX_DESCRIPTION_LENGTH, `Description must be at most ${MAX_DESCRIPTION_LENGTH} characters long`),
})
    .partial();
const categoryValidation = {
    createCurrentUserCategoryPayloadValidation,
    updateCurrentUserCategoryPayloadValidation,
};
exports.default = categoryValidation;
