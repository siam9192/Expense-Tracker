import { Router } from "express";
import authController from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import authValidations from "./auth.validation";
import auth from "../../middlewares/auth";
import { ALL_ROLES } from "../../utils/constant";
import { UserRole } from "../user/user.interface";

const router = Router();

router.post(
  "/signup",
  validateRequest(authValidations.customerSignupValidation),
  authController.userSignup,
);

router.post(
  "/signup/otp-resend",
  validateRequest(authValidations.customerSignupValidation),
  authController.resendVerificationOTP,
);

router.post(
  "/signup/verify",
  validateRequest(authValidations.customerSignupValidation),
  authController.verifyUserSignup,
);

router.post(
  "/signin",
  validateRequest(authValidations.customerSignInValidation),
  authController.userSignin,
);

router.post("/signout", auth([UserRole.USER]), authController.userSignout);

router.patch(
  "/change-password",
  auth([UserRole.USER]),
  validateRequest(authValidations.changePasswordValidation),
  authController.changePassword,
);

router.get("/access-token", authController.getNewAccessToken);

const authRouter = router;

export default authRouter;
