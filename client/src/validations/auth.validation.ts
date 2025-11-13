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

export type SignupValidation = z.infer<typeof signupValidation>;
export type SigninValidation = z.infer<typeof signinValidation>;
const authValidations = {
  signupValidation,
  signinValidation,
};
export default authValidations;
