import { NotificationType } from "@prisma/client";

export interface FilterNotificationsQuery {
  type?: NotificationType;
  is_read?: "true" | "false";
  search_term?: string;
}
