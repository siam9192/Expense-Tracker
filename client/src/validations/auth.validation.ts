import { z } from "zod";

const signupValidation = z
  .object({
    email: z.string().email("Invalid email format").max(100, "Email cannot exceed 100 characters"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password cannot exceed 50 characters"),

    confirm_password: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters")
      .max(50, "Confirm Password cannot exceed 50 characters"),
    // session_info: z.object({
    //   device_name: z.string().nonempty("Device name is required"),
    //   ip: z.string().nonempty("IP address is required"),
    // }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"], // shows error under confirmPassword field
  });

const signinValidation = z.object({
  email: z.string().email().max(100),
  password: z.string().min(6).max(50),
  // session_info: z.object({
  //   device_name: z.string().nonempty("device name is required"),
  //   ip: z.string().nonempty("Ip address is required"),
  // }),
});

export const changePasswordPayloadValidation = z
  .object({
    old_password: z.string().nonempty("Old password is required"),

    new_password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(32, {
        message: "Password must be at least 6 characters and maximum 32 characters long",
      }),

    confirm_password: z.string().nonempty("Confirm password is required"),
    signout_others: z.boolean(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });

export type SignupValidation = z.infer<typeof signupValidation>;
export type SigninValidation = z.infer<typeof signinValidation>;
export type ChangePasswordValidation = z.infer<typeof changePasswordPayloadValidation>;

const authValidations = {
  signupValidation,
  signinValidation,
  changePasswordPayloadValidation,
};
export default authValidations;
