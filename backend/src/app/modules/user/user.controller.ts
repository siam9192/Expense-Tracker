import httpStatus from "../../shared/http-status";
import catchAsync from "../../utils/catchAsync";
import { sendSuccessResponse } from "../../utils/response";
import userService from "./user.service";

class UserController {
  setupUserProfile = catchAsync(async (req, res) => {
    const result = await userService.setupUserProfileIntoDB(req.user, req.body);
    sendSuccessResponse(res, {
      message: "Profile setup completed",
      status_code: httpStatus.OK,
      data: result,
    });
  });

  updateCurrentUserProfile = catchAsync(async (req, res) => {
    const result = await userService.updateCurrentUserProfileIntoDB(
      req.user,
      req.body,
    );
    sendSuccessResponse(res, {
      message: "Profile updated successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });
  getCurrentUser = catchAsync(async (req, res) => {
    const result = await userService.getCurrentUserFromDB(req.user);
    sendSuccessResponse(res, {
      message: "Current user retrieved successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });
  getCurrentUserSettings = catchAsync(async (req, res) => {
    const result = await userService.getCurrentUserSettingsFromDB(req.user);
    sendSuccessResponse(res, {
      message: "Current user settings retrieved successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });

  getCurrentUserSessions = catchAsync(async (req, res) => {
    const result = await userService.getCurrentUserSessionsFromDB(req.user);
    sendSuccessResponse(res, {
      message: "Current user sessions retrieved successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });

  revokeCurrentUserSession = catchAsync(async (req, res) => {
    const result = await userService.revokeUserSessionIntoDB(
      req.user,
      req.params.sessionId,
    );
    sendSuccessResponse(res, {
      message: "Current user session revoked successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });

  updateCurrentUserSettings = catchAsync(async (req, res) => {
    const result = await userService.updateCurrentUserSettingsIntoDB(
      req.user,
      req.body,
    );
    sendSuccessResponse(res, {
      message: "Current user settings updated successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });
}

export default new UserController();
