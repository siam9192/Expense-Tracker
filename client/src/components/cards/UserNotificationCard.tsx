import { AlertTriangle, Bell, CheckCircle, Info, XCircle } from "lucide-react";
import type { Notification } from "../../types/notification.type";
import {
  useDeleteUserNotificationMutation,
  useUserNotificationSetAsReadMutation,
} from "../../redux/api/notification.api";
import { toast } from "sonner";
import { DEFAULT_ERROR_MESSAGE } from "../../utils/constant";

interface Props {
  notification: Notification;
}

const getIcon = (type: string) => {
  switch (type) {
    case "SUCCESS":
      return <CheckCircle className="text-success" size={22} />;
    case "INFO":
      return <Info className="text-info" size={22} />;
    case "WARNING":
      return <AlertTriangle className="text-warning" size={22} />;
    case "ALERT":
      return <XCircle className="text-error" size={22} />;
    default:
      return <Bell />;
  }
};

const getGlow = (type: string) => {
  switch (type) {
    case "SUCCESS":
      return "shadow-success/20";
    case "INFO":
      return "shadow-info/20";
    case "WARNING":
      return "shadow-warning/20";
    case "ALERT":
      return "shadow-error/20";
    default:
      return "shadow-base-300/20";
  }
};

function UserNotificationCard({ notification }: Props) {
  const [setReadMutate, { isLoading: isSetAsReadLoading }] = useUserNotificationSetAsReadMutation();
  const [deleteMutate, { isLoading: isDeleteLoading }] = useDeleteUserNotificationMutation();
  const setAsRead = async () => {
    try {
      const { error } = await setReadMutate(notification.id);
      if (error) throw error;
      toast.success("Set as deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || DEFAULT_ERROR_MESSAGE);
    }
  };
  const handleDelete = async () => {
    try {
      const { error } = await deleteMutate(notification.id);
      if (error) throw error;
      toast.success("Set as read successful");
    } catch (error: any) {
      toast.error(error?.data?.message || DEFAULT_ERROR_MESSAGE);
    }
  };

  const isPending = isDeleteLoading || isSetAsReadLoading;
  return (
    <div
      className={`
    p-4 md:p-5 lg:p-6 rounded-xl border transition-all relative
    ${notification.is_read ? "bg-base-200 border-base-300" : "bg-base-100 border-primary/20"}
    hover:shadow-xl hover:border-primary/30 ${getGlow(notification.type)}
    group
  `}
    >
      {/* Main Content */}
      <div className="flex items-start gap-4 md:flex-row flex-col">
        {/* Icon bubble */}
        <div
          className="
        p-3 rounded-xl bg-base-300 shadow-inner
        flex items-center justify-center shrink-0
      "
        >
          {getIcon(notification.type)}
        </div>

        {/* Message Text */}
        <div className="flex-1 space-y-1">
          <p className="text-base md:text-lg font-semibold">{notification.message}</p>
          <p className="text-xs text-neutral-content">
            {new Date(notification.created_at).toLocaleString()}
          </p>
        </div>

        {/* New Badge */}
        {!notification.is_read && (
          <span className="badge badge-info badge-sm md:badge-md mt-1 md:mt-0">Unread</span>
        )}
      </div>

      {/* Action Buttons — Slide Up Reveal */}
      <div
        className="
      flex justify-end gap-2 mt-4 
      
      lg:opacity-0 translate-y-2 
      group-hover:opacity-100 group-hover:translate-y-0
      transition-all duration-300
    "
      >
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="btn btn-sm btn-ghost hover:bg-error/20 hover:text-error"
        >
          Delete
        </button>
        {!notification.is_read && (
          <button onClick={setAsRead} disabled={isPending} className="btn btn-primary btn-sm">
            Mark as Read
          </button>
        )}
      </div>
    </div>
  );
}

export default UserNotificationCard;
