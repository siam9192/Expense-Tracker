import {
  User,
  Mail,
  Settings,
  Shield,
  Bell,
  LogOut,
  Calendar,
  Currency,
  Globe,
} from "lucide-react";
import { useCurrentUserProviderContext } from "../../../Provider/CurrentUserProvider";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import LogoutDialog from "../../ui/LogoutDialog";
import { Link } from "react-router-dom";

function UserProfileAndSettings() {
  const [isLogoutDialog, setIsLogoutDialog] = useState(false);
  const { t } = useTranslation();
  let { user: userData } = useCurrentUserProviderContext();
  userData = userData!;
  const user = {
    name: userData.name,
    email: userData.email,
    phone: null,
    avatar: userData.avatar.src,
    county: userData.country.name,
    currency: userData.currency.code,
    joined: new Date(userData.joined_at).toDateString(),
    role: "Premium Member",
  };

  const settingsOptions = [
    {
      id: 1,
      title: t("privacySecurity"),
      description: t("privacySecurityDesc"),
      icon: <Shield size={18} className="text-warning" />,
      buttonLabel: t("manage"),
      buttonClass: "btn-outline btn-warning group-hover:btn-warning",
      path: "/settings/security",
    },
    {
      id: 2,
      title: t("notifications"),
      description: t("notificationsDesc"),
      icon: <Bell size={18} className="text-info" />,
      buttonLabel: t("configure"),
      buttonClass: "btn-outline btn-info group-hover:btn-info",
      path: "/settings/notifications",
    },
    {
      id: 3,
      title: t("accountPreferences"),
      description: t("accountPreferencesDesc"),
      icon: <User size={18} className="text-primary" />,
      buttonLabel: t("update"),
      buttonClass: "btn-outline btn-primary group-hover:btn-primary",
      path: "/settings",
    },
    {
      id: 4,
      title: t("logout"),
      description: t("logoutDesc"),
      icon: <LogOut size={18} className="text-error" />,
      buttonLabel: t("logout"),
      buttonClass: "btn-error group-hover:brightness-110",
      titleClass: "text-error",
      onClick() {
        setIsLogoutDialog(true);
      },
    },
  ];

  return (
    <div className="p-4 md:p-8 min-h-60 bg-base-300 w-full rounded-2xl space-y-6">
      {/* ==== PROFILE SECTION ==== */}
      <div className="bg-base-100 rounded-2xl  border border-base-300 p-6 md:p-8 flex flex-col ,md:flex-row lg:flex-col xl:flex-row gap-8 items-center md:items-start transition-all hover:shadow-xl">
        {/* Avatar */}
        <div className="relative">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover ring ring-primary ring-offset-2 ring-offset-base-100"
          />
          <span className="absolute bottom-1 right-2 badge badge-primary badge-sm animate-pulse">
            ●
          </span>
        </div>

        {/* User Info */}
        <div className="text-center md:text-left flex-1 space-y-3">
          <h2 className="text-3xl font-bold">{user.name}</h2>
          <p className="badge badge-primary badge-outline">{user.role}</p>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 text-sm text-neutral-content justify-center md:justify-start">
            <span className="flex items-center gap-2">
              <Mail size={16} /> {user.email}
            </span>

            <span className="flex items-center gap-2">
              <Globe size={16} /> {user.county}
            </span>
            <span className="flex items-center gap-2">
              <Currency size={16} />
              {user.currency}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={16} /> {t("joined")} {user.joined}
            </span>
          </div>

          <div className="pt-4">
            <button className="btn btn-primary btn-sm gap-2">
              <User size={16} /> {t("editProfile")}
            </button>
          </div>
        </div>
      </div>

      {/* ==== SETTINGS SECTION ==== */}
      <div className="bg-base-100 rounded-2xl  border border-base-300 p-6 md:p-8">
        <div className="flex items-center gap-2 mb-6">
          <Settings size={22} className="text-primary" />
          <h3 className="text-2xl font-semibold">{t("accountSettings")}</h3>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {settingsOptions.map((option) => (
            <div
              key={option.id}
              className="group bg-base-200 hover:bg-base-300 rounded-2xl p-5 border border-base-300 transition-all hover:shadow-md h-full flex flex-col"
            >
              <div className="grow">
                <p
                  className={`flex items-center gap-2 font-semibold text-lg ${
                    option.titleClass || ""
                  }`}
                >
                  {option.icon} {option.title}
                </p>
                <p className="text-sm text-neutral-content mt-2">{option.description}</p>
              </div>
              {option.path ? (
                <Link to={option.path}>
                  <button className={`btn btn-sm mt-3 w-full ${option.buttonClass}`}>
                    {option.buttonLabel}
                  </button>
                </Link>
              ) : option.onClick ? (
                <button
                  onClick={option.onClick}
                  className={`btn btn-sm mt-3 w-full ${option.buttonClass}`}
                >
                  {option.buttonLabel}
                </button>
              ) : (
                <button className={`btn btn-sm mt-3 w-full ${option.buttonClass}`}>
                  {option.buttonLabel}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      {isLogoutDialog ? <LogoutDialog onCancel={() => setIsLogoutDialog(false)} /> : null}
    </div>
  );
}

export default UserProfileAndSettings;
