export enum NotificationType {
  ALERT = "ALERT",
  INFO = "INFO",
  SUCCESS = "SUCCESS",
  WARNING = "WARNING",
}

export interface Notification {
  id: number;
  user_id: number;
  message: number;
  type: NotificationType;
  is_read: boolean;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface UserNotificationsSummaryMetadata {
  total: number;
  read: number;
  unread: number;
}
