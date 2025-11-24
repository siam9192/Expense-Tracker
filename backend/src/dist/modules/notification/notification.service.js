"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pagination_helper_1 = require("../../helpers/pagination.helper");
const prisma_client_1 = __importDefault(require("../../prisma-client"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
class NotificationService {
    getCurrentUserNotificationsFromDB(authUser, filterQuery, paginationOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, skip, limit, sortBy, sortOrder } = (0, pagination_helper_1.calculatePagination)(paginationOptions);
            const { type, is_read, search_term } = filterQuery;
            // 🧠 Convert "true"/"false" string to boolean if provided
            const isReadBoolean = is_read === "true" ? true : is_read === "false" ? false : undefined;
            // 🧠 Build dynamic filters
            const whereConditions = Object.assign(Object.assign(Object.assign({ user_id: authUser.user_id }, (type ? { type } : {})), (typeof isReadBoolean === "boolean" ? { is_read: isReadBoolean } : {})), (search_term
                ? {
                    message: { contains: search_term, mode: "insensitive" },
                }
                : {}));
            // 🔍 Fetch notifications
            const notifications = yield prisma_client_1.default.notification.findMany({
                where: whereConditions,
                skip,
                take: limit,
                orderBy: {
                    [sortBy || "created_at"]: sortOrder || "desc",
                },
            });
            // 📊 Count total results for pagination
            const total_results = yield prisma_client_1.default.notification.count({
                where: whereConditions,
            });
            const meta = {
                page,
                limit,
                total_results,
            };
            return {
                data: notifications,
                meta,
            };
        });
    }
    setCurrentUserUnreadNotificationsAsRead(authUser) {
        return __awaiter(this, void 0, void 0, function* () {
            // 🧠 Mark all unread notifications as read for the current user
            yield prisma_client_1.default.notification.updateMany({
                where: {
                    user_id: authUser.user_id,
                    is_read: false,
                },
                data: {
                    is_read: true,
                },
            });
            return null;
        });
    }
    setCurrentUserNotificationAsRead(authUser, notificationId) {
        return __awaiter(this, void 0, void 0, function* () {
            // 🧠 Check if the notification exists and belongs to the user
            const notification = yield prisma_client_1.default.notification.findFirst({
                where: {
                    id: Number(notificationId),
                    user_id: authUser.user_id,
                },
            });
            if (!notification) {
                throw new AppError_1.default(404, "Notification not found");
            }
            // 🧩 If already read, no need to update
            if (notification.is_read) {
                return { message: "Notification already marked as read" };
            }
            // ✅ Update specific notification as read
            const updatedNotification = yield prisma_client_1.default.notification.update({
                where: { id: notification.id },
                data: {
                    is_read: true,
                },
            });
            return null;
        });
    }
    deleteCurrentUserNotification(authUser, notificationId) {
        return __awaiter(this, void 0, void 0, function* () {
            // 🧠 Check if the notification exists and belongs to the user
            const notification = yield prisma_client_1.default.notification.findFirst({
                where: {
                    id: Number(notificationId),
                    user_id: authUser.user_id,
                },
            });
            if (!notification) {
                throw new AppError_1.default(404, "Notification not found");
            }
            // ✅ delete specific notification
            yield prisma_client_1.default.notification.delete({
                where: { id: notification.id },
            });
            return null;
        });
    }
}
exports.default = new NotificationService();
