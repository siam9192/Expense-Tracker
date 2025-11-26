import {
  ArrowLeftRight,
  Bell,
  Goal,
  Grid2x2Plus,
  Home,
  LogOut,
  Settings,
  Wallet,
} from "lucide-react";
import type { Route } from "../../types/utils.type";
import ThemeSwitchButton from "../ui/ThemeSwitchButton";
import { Link, useLocation } from "react-router-dom";
import { useCurrentUserProviderContext } from "../../Provider/CurrentUserProvider";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import LogoutModal from "../ui/LogoutModal";
import { useGetUserNotificationsSummaryQuery } from "../../redux/api/metadata.api";

function UserDashboardSidebar() {
  const { t } = useTranslation();
  const { user } = useCurrentUserProviderContext();
  const { pathname } = useLocation();

  const routes: Route[] = [
    { label: t("dashboard"), path: "/", icon: Home },
    { label: t("transactions"), path: "/transactions", icon: ArrowLeftRight },
    { label: t("wallet"), path: "/wallet", icon: Wallet },
    { label: t("goals"), path: "/goals", icon: Goal },
    { label: t("categories"), path: "/categories", icon: Grid2x2Plus },
  ];

  const { data } = useGetUserNotificationsSummaryQuery(undefined);

  const notificationSummary = data?.data;
  console.log(notificationSummary);
  return (
    <aside className="h-full  w-full  shadow-xl rounded-r-2xl p-8 flex flex-col justify-between relative bg-white dark:bg-black ">
      {/* --- Header --- */}
      <div>
        <h1 className="text-4xl font-primary font-semibold text-center text-primary mb-12">
          Expense<span className="text-secondary">II</span>
        </h1>

        {/* --- Profile --- */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="avatar mb-3">
            <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user?.avatar.src} alt="User Avatar" />
            </div>
          </div>
          <p className="font-semibold text-primary font-secondary">{user?.name}</p>
        </div>

        {/* --- Navigation --- */}
        <nav className="flex flex-col gap-4">
          {routes.map(({ label, path, icon: Icon }) => {
            const isActive = pathname === path;
            return (
              <Link to={path} className="w-full">
                <button
                  key={label}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all duration-150 w-full
                ${
                  isActive
                    ? "bg-primary text-white shadow-md"
                    : "text-neutral dark:text-neutral-content hover:text-secondary hover:bg-base-200"
                }`}
                >
                  <Icon className={isActive ? "text-white" : "text-primary"} />
                  <span>{label}</span>
                </button>
              </Link>
            );
          })}
          <Link to={"/notifications"} className="w-full">
            <button
              key={"Notifications"}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all duration-150 w-full
                ${
                  pathname === "/notifications"
                    ? "bg-primary text-white shadow-md"
                    : "text-neutral dark:text-neutral-content hover:text-secondary hover:bg-base-200"
                }`}
            >
              <Bell className={pathname === "/notifications" ? "text-white" : "text-primary"} />
              <span>{t("notifications")}</span>{" "}
              {notificationSummary?.unread ? (
                <div className="size-6 flex justify-center items-center text-sm rounded-full text-black bg-pink-600 ">
                  {notificationSummary.unread}
                </div>
              ) : null}
            </button>
          </Link>
        </nav>
      </div>

      {/* --- Footer --- */}
      <div className="space-y-5">
        <Link to="settings" className="block">
          <button
            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all duration-150 w-full
                ${
                  pathname.includes("settings")
                    ? "bg-primary text-white shadow-md"
                    : "text-neutral dark:text-neutral-content hover:text-secondary hover:bg-base-200"
                }`}
          >
            <Settings size={20} />
            <span>{t("settings")}</span>
          </button>
        </Link>
        <LogoutModal>
          <button
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-neutral dark:text-neutral-content font-medium hover:text-error transition-all duration-150`}
          >
            <LogOut size={20} />
            <span>{t("signOut")}</span>
          </button>
        </LogoutModal>

        <LanguageSwitcher />
      </div>

      {/* Theme toggle */}
      <div className="size-fit absolute right-2 top-2">
        <ThemeSwitchButton />
      </div>
    </aside>
  );
}

export default UserDashboardSidebar;
