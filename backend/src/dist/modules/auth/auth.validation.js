"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const initUserPayloadValidation = zod_1.z.object({
    email: zod_1.z.string().email().max(100),
    password: zod_1.z.string().min(6).max(50),
    session_info: zod_1.z.object({
        device_name: zod_1.z.string().nonempty("device name is required"),
        ip: zod_1.z.string().nonempty("Ip address is required"),
    }),
});
const verifyInitUserPayloadValidation = zod_1.z.object({
    token: zod_1.z.string().nonempty("Token is required"),
    otp: zod_1.z.string().nonempty("OTP is required"),
});
const userSigninPayloadValidation = zod_1.z.object({
    email: zod_1.z.string().email().max(100),
    password: zod_1.z.string().min(6).max(50),
    session_info: zod_1.z.object({
        device_name: zod_1.z.string().nonempty("device name is required"),
        ip: zod_1.z.string().nonempty("Ip address is required"),
    }),
});
const changePasswordPayloadValidation = zod_1.z.object({
    old_password: zod_1.z.string().nonempty("Old password is required"),
    new_password: zod_1.z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .max(32, {
        message: "Password must be at least 6 characters and Maximum 32 characters longs",
    }),
});
const resendVerificationOTPPayloadValidation = zod_1.z.object({
    token: zod_1.z.string().nonempty("Token is required"),
});
const authValidations = {
    initUserPayloadValidation,
    userSigninPayloadValidation,
    resendVerificationOTPPayloadValidation,
    verifyInitUserPayloadValidation,
    changePasswordPayloadValidation,
};
exports.default = authValidations;
