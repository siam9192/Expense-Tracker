import { z } from "zod";

const initUserPayloadValidation = z.object({
  email: z.string().email().max(100),
  password: z.string().min(6).max(50),
  device_info: z.object({
    device_name: z.string().nonempty("device name is required"),
    ip: z.string().nonempty("Ip address is required"),
  }),
});

const verifyInitUserPayloadValidation = z.object({
  token: z.string().nonempty("Token is required"),
  otp: z.string().nonempty("OTP is required"),
});
const userSigninPayloadValidation = z.object({
  email: z.string().email().max(100),
  password: z.string().min(6).max(50),
  device_info: z.object({
    device_name: z.string().nonempty("device name is required"),
    ip: z.string().nonempty("Ip address is required"),
  }),
});

const changePasswordPayloadValidation = z.object({
  oldPassword: z.string().nonempty("Old password is required"),
  newPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(32, {
      message:
        "Password must be at least 6 characters and Maximum 32 characters longs",
    }),
});

const resendVerificationOTPPayloadValidation = z.object({
  token: z.string().nonempty("Token is required"),
});

const authValidations = {
  initUserPayloadValidation,
  userSigninPayloadValidation,
  resendVerificationOTPPayloadValidation,
  verifyInitUserPayloadValidation,
  changePasswordPayloadValidation,
};

export default authValidations;
