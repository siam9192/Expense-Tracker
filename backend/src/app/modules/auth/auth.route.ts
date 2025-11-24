import { Router } from "express";
import authController from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import authValidations from "./auth.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "../user/user.interface";

const router = Router();

router.post(
  "/signup",
  validateRequest(authValidations.initUserPayloadValidation),
  authController.userSignup,
);

router.post(
  "/signup/resend-otp",
  validateRequest(authValidations.resendVerificationOTPPayloadValidation),
  authController.resendVerificationOTP,
);

router.post(
  "/signup/verify",
  validateRequest(authValidations.verifyInitUserPayloadValidation),
  authController.verifyUserSignup,
);

router.post(
  "/signin",
  validateRequest(authValidations.userSigninPayloadValidation),
  authController.userSignin,
);

router.post("/signout", auth([UserRole.USER]), authController.userSignout);

router.patch(
  "/change-password",
  auth([UserRole.USER]),
  validateRequest(authValidations.changePasswordPayloadValidation),
  authController.changePassword,
);

router.post("/access-token", authController.getNewAccessToken);

const authRouter = router;

export default authRouter;
