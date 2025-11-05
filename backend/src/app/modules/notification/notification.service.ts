import { Prisma } from "@prisma/client";
import { calculatePagination } from "../../helpers/pagination.helper";
import { PaginationOptions } from "../../types";
import { AuthUser } from "../auth/auth.interface";
import prisma from "../../prisma-client";
import { FilterNotificationsQuery } from "./notification.interface";
import AppError from "../../errors/AppError";

class NotificationService {
  async getCurrentUserNotificationsFromDB(
    authUser: AuthUser,
    filterQuery: FilterNotificationsQuery,
    paginationOptions: PaginationOptions,
  ) {
    const { page, skip, limit, sortBy, sortOrder } =
      calculatePagination(paginationOptions);
    const { type, is_read, search_term } = filterQuery;

    // 🧠 Convert "true"/"false" string to boolean if provided
    const isReadBoolean =
      is_read === "true" ? true : is_read === "false" ? false : undefined;

    // 🧠 Build dynamic filters
    const whereConditions: Prisma.NotificationWhereInput = {
      user_id: authUser.user_id,
      ...(type ? { type } : {}),
      ...(typeof isReadBoolean === "boolean" ? { is_read: isReadBoolean } : {}),
      ...(search_term
        ? {
            message: { contains: search_term, mode: "insensitive" },
          }
        : {}),
    };

    // 🔍 Fetch notifications
    const notifications = await prisma.notification.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy: {
        [sortBy || "created_at"]: sortOrder || "desc",
      },
    });

    // 📊 Count total results for pagination
    const total_results = await prisma.notification.count({
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
  }
  async setCurrentUserUnreadNotificationsAsRead(authUser: AuthUser) {
    // 🧠 Mark all unread notifications as read for the current user
    await prisma.notification.updateMany({
      where: {
        user_id: authUser.user_id,
        is_read: false,
      },
      data: {
        is_read: true,
      },
    });
    return null;
  }
  async setCurrentUserNotificationAsRead(
    authUser: AuthUser,
    notificationId: string,
  ) {
    // 🧠 Check if the notification exists and belongs to the user
    const notification = await prisma.notification.findFirst({
      where: {
        id: Number(notificationId),
        user_id: authUser.user_id,
      },
    });

    if (!notification) {
      throw new AppError(404, "Notification not found");
    }

    // 🧩 If already read, no need to update
    if (notification.is_read) {
      return { message: "Notification already marked as read" };
    }

    // ✅ Update specific notification as read
    const updatedNotification = await prisma.notification.update({
      where: { id: notification.id },
      data: {
        is_read: true,
      },
    });
    return null;
  }

  async deleteCurrentUserNotification(
    authUser: AuthUser,
    notificationId: string,
  ) {
    // 🧠 Check if the notification exists and belongs to the user
    const notification = await prisma.notification.findFirst({
      where: {
        id: Number(notificationId),
        user_id: authUser.user_id,
      },
    });

    if (!notification) {
      throw new AppError(404, "Notification not found");
    }

    // ✅ delete specific notification
    await prisma.notification.delete({
      where: { id: notification.id },
    });
    return null;
  }
}

export default new NotificationService();
