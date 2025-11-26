import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import DashboardPageLoading from "../components/ui/DashboardPageLoading";
import type { Params, UseQueryResult } from "../types/utils.type";
import type { Response } from "../types/response.type";

import { useGetUserNotificationsQuery } from "../redux/api/notification.api";
import type { Notification } from "../types/notification.type";

export type NotificationsPageContextType = {
  notificationsQuery: UseQueryResult<Response<Notification[]>>;
  notificationsQueryParams: Params;
  setNotificationsQueryParams: React.Dispatch<React.SetStateAction<Params>>;
};

export const NotificationsPageProviderContext = createContext<NotificationsPageContextType | null>(
  null,
);

interface Props {
  children: ReactNode;
}

function NotificationPageProvider({ children }: Props) {
  const [notificationsQueryParams, setNotificationsQueryParams] = useState<Params>({});

  const notificationsQuery = useGetUserNotificationsQuery(notificationsQueryParams);

  // ✅ Derived loading state from all queries
  const isLoading = notificationsQuery.isLoading;

  // ✅ Memoize context value properly
  const contextValue = useMemo(
    () => ({
      notificationsQuery,
      notificationsQueryParams,
      setNotificationsQueryParams,
    }),
    [notificationsQuery, notificationsQueryParams],
  );

  return (
    <NotificationsPageProviderContext.Provider value={contextValue as NotificationsPageContextType}>
      {isLoading ? <DashboardPageLoading /> : children}
    </NotificationsPageProviderContext.Provider>
  );
}

export default NotificationPageProvider;

export function useNotificationPageProviderContext() {
  const context = useContext(NotificationsPageProviderContext);
  if (!context) throw new Error("Must be under at home page provider");
  return context;
}
