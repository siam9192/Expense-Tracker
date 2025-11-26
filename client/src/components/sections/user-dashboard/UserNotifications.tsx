import { useEffect, useState } from "react";
import ArriveAnimationContainer from "../../ui/ArriveAnimationContainer";
import { useTranslation } from "react-i18next";
import type { Notification } from "../../../types/notification.type";
import { useNotificationPageProviderContext } from "../../../Provider/NotificationPageProvider";
import UserNotificationCard from "../../cards/UserNotificationCard";

const tabs = [
  { label: "All", value: null },
  { label: "Read", value: "true" },
  { label: "Unread", value: "false" },
];

function UserNotifications() {
  const { t } = useTranslation();
  const { notificationsQuery, setNotificationsQueryParams } = useNotificationPageProviderContext();

  const { data, isFetching } = notificationsQuery;

  const currentPageNotifications = data?.data || [];
  const meta = data?.meta;

  const [allNotifications, setAllNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const isMoreAvailable = meta && meta.total_results > meta.limit * meta.page;

  // ---------------- TAB SWITCH ----------------
  const handelTabSwitch = (value: string | null) => {
    setActiveTab(value);
    setAllNotifications([]);
    setPage(1);

    if (value !== null) {
      setNotificationsQueryParams({
        is_read: value,
        page: 1,
      });
    } else {
      setNotificationsQueryParams(({ is_read, ...oth }) => ({ ...oth, page: 1 }));
    }
  };

  // ---------------- LOAD MORE ----------------
  const handelLoadMore = () => {
    if (!isMoreAvailable) return;
    const nextPage = page + 1;
    setPage(nextPage);

    setNotificationsQueryParams((prev) => ({
      ...prev,
      page: nextPage,
    }));
  };

  // ---------------- MERGE RESULTS ----------------
  useEffect(() => {
    if (currentPageNotifications.length) {
      setAllNotifications((prev) => {
        const existingIds = new Set(prev.map((n) => n.id));
        const newItems = currentPageNotifications.filter((n) => !existingIds.has(n.id));
        return [...prev, ...newItems];
      });
    }
  }, [currentPageNotifications, isFetching]);

  return (
    <ArriveAnimationContainer delay={0.3}>
      <div className="mt-10">
        {/* ----------- TABS ----------- */}
        <div className="flex justify-end">
          <div role="tablist" className="tabs tabs-box">
            {tabs.map((tab) => (
              <a
                role="tab"
                onClick={() => handelTabSwitch(tab.value)}
                className={`tab ${tab.value === activeTab ? "tab-active" : ""} `}
              >
                {tab.label}
              </a>
            ))}
          </div>
        </div>

        {/* ----------- LIST CONTAINER ----------- */}
        <div className="mt-5 p-6 rounded-xl bg-base-300">
          {allNotifications.length ? (
            <div className="space-y-4">
              {allNotifications.map((n) => (
                <UserNotificationCard key={n.id} notification={n} />
              ))}
            </div>
          ) : (
            <div className="min-h-72 flex justify-center items-center text-center">
              <p className="text-lg font-semibold text-base-content">{t("noResults")}</p>
            </div>
          )}
        </div>

        {/* ----------- LOAD MORE ----------- */}
        {isMoreAvailable && (
          <div className="mt-10 text-center">
            <button className="btn btn-secondary" onClick={handelLoadMore} disabled={isFetching}>
              {isFetching ? t("loading") : t("loadMore")}
            </button>
          </div>
        )}
      </div>
    </ArriveAnimationContainer>
  );
}

export default UserNotifications;
