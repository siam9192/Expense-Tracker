import { Router } from "express";
import notificationController from "./notification.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../user/user.interface";

const router = Router();

router.get(
  "/me",
  auth([UserRole.USER]),
  notificationController.getCurrentUserNotifications,
);

router.patch(
  "/me/all/set-read",
  auth([UserRole.USER]),
  notificationController.setCurrentUserUnreadNotificationAsRead,
);

router.patch(
  "/me/:id/set-read",
  auth([UserRole.USER]),
  notificationController.setCurrentUserNotificationAsRead,
);

router.delete(
  "/me/:id",
  auth([UserRole.USER]),
  notificationController.deleteCurrentUserNotification,
);

const notificationRouter = router;

export default notificationRouter;
