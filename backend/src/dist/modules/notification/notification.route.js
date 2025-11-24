"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_controller_1 = __importDefault(require("./notification.controller"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_interface_1 = require("../user/user.interface");
const router = (0, express_1.Router)();
router.get("/me", (0, auth_1.default)([user_interface_1.UserRole.USER]), notification_controller_1.default.getCurrentUserNotifications);
router.patch("/me/all/set-read", (0, auth_1.default)([user_interface_1.UserRole.USER]), notification_controller_1.default.setCurrentUserUnreadNotificationAsRead);
router.patch("/me/:id/set-read", (0, auth_1.default)([user_interface_1.UserRole.USER]), notification_controller_1.default.setCurrentUserNotificationAsRead);
router.delete("/me/:id", (0, auth_1.default)([user_interface_1.UserRole.USER]), notification_controller_1.default.deleteCurrentUserNotification);
const notificationRouter = router;
exports.default = notificationRouter;
