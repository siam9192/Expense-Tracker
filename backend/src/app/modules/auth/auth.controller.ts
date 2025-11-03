import authService from "./auth.service";
import { sendSuccessResponse } from "../../utils/response";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "../../shared/http-status";
class AuthController {
  userSignup = catchAsync(async (req, res) => {
    const result = await authService.initUserIntoDB(req.body);
    sendSuccessResponse(res, {
      message: "OTP sent to email",
      status_code: httpStatus.OK,
      data: result,
    });
  });

  resendVerificationOTP = catchAsync(async (req, res) => {
    const result = await authService.resendVerificationOTP(req.body);
    sendSuccessResponse(res, {
      message: "OTP resent to email",
      status_code: httpStatus.OK,
      data: result,
    });
  });

  verifyUserSignup = catchAsync(async (req, res) => {
    const result = await authService.verifyInitUser(req.body);
    sendSuccessResponse(res, {
      message: "Account verified successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });

  userSignin = catchAsync(async (req, res) => {
    const result = await authService.userLogin(req.body);
    sendSuccessResponse(res, {
      message: "Sign in successful",
      status_code: httpStatus.OK,
      data: result,
    });
  });

  userSignout = catchAsync(async (req, res) => {
    const result = await authService.useSignout(req.body);
    sendSuccessResponse(res, {
      message: "Signout successful",
      status_code: httpStatus.OK,
      data: result,
    });
  });

  changePassword = catchAsync(async (req, res) => {
    const result = await authService.changePassword(req.user, req.body);
    sendSuccessResponse(res, {
      message: "Password has been changed successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });

  getNewAccessToken = catchAsync(async (req, res) => {
    const result = await authService.getNewAccessToken(req.body.refreshToken);
    sendSuccessResponse(res, {
      message: "New access token retrieved successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });
}

export default new AuthController();
