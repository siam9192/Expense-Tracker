import DashboardPageHeading from "../../components/ui/DashboardPageHeading";
import { useTranslation } from "react-i18next";
import UserNotifications from "../../components/sections/user-dashboard/UserNotifications";
import NotificationPageProvider from "../../Provider/NotificationPageProvider";

function NotificationsPage() {
  const { t } = useTranslation();

  return (
    <NotificationPageProvider>
      <div className="p-6 space-y-4">
        <DashboardPageHeading heading={t("notifications")} />
        <UserNotifications />
      </div>
    </NotificationPageProvider>
  );
}

export default NotificationsPage;
