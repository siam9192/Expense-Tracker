import { paginationOptionPicker } from "../../helpers/pagination.helper";
import httpStatus from "../../shared/http-status";
import catchAsync from "../../utils/catchAsync";
import { pick } from "../../utils/helpers";
import { sendSuccessResponse } from "../../utils/response";
import notificationService from "./notification.service";

class NotificationController {
  getCurrentUserNotifications = catchAsync(async (req, res) => {
    const result = await notificationService.getCurrentUserNotificationsFromDB(
      req.user,
      pick(req.query, ["search_term", "type", "is_read"]),
      paginationOptionPicker(req.query),
    );
    sendSuccessResponse(res, {
      message: "Notifications retrieved successfully",
      status_code: httpStatus.OK,
      ...result,
    });
  });
  setCurrentUserUnreadNotificationAsRead = catchAsync(async (req, res) => {
    const result =
      await notificationService.setCurrentUserUnreadNotificationsAsRead(
        req.user,
      );
    sendSuccessResponse(res, {
      message: "All unread notifications set as read successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });
  setCurrentUserNotificationAsRead = catchAsync(async (req, res) => {
    const result = await notificationService.setCurrentUserNotificationAsRead(
      req.user,
      req.params.id,
    );
    sendSuccessResponse(res, {
      message: "Notification set as read successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });

  deleteCurrentUserNotification = catchAsync(async (req, res) => {
    const result = await notificationService.deleteCurrentUserNotification(
      req.user,
      req.params.id,
    );
    sendSuccessResponse(res, {
      message: "Notification deleted successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });
}

export default new NotificationController();
