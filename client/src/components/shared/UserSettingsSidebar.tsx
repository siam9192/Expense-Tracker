import { Bell, LogOut, Settings2, ShieldCheck, User, Wallet } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const tabs = [
  { key: "profile", label: "Profile", icon: User },
  { key: "wallet", label: "Wallet", path: "wallet", icon: Wallet },
  { key: "notifications", label: "Notifications", path: "notifications", icon: Bell },
  { key: "security", label: "Security", path: "security", icon: ShieldCheck },
];
function UserSettingsSidebar() {
  const { pathname } = useLocation();
  const activeTab = (tabs.find((_) => pathname.replace("/settings/", "") === _.path) || tabs[0])
    .key;

  return (
    <div className="md:w-1/4 w-full bg-base-100 rounded-2xl  p-4 space-y-4 max-h-[600px]">
      <div className="flex items-center gap-2 mb-6">
        <Settings2 className="text-primary" size={22} />
        <h2 className="text-lg font-semibold">Settings</h2>
      </div>

      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = activeTab === tab.key;
        return (
          <Link to={`/settings/${tab.path || ""}`}>
            <button
              key={tab.key}
              className={`flex items-center gap-3 w-full p-3 rounded-xl text-left transition-all ${
                active
                  ? "bg-primary text-primary-content shadow-sm"
                  : "hover:bg-base-300 text-neutral-content"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{tab.label}</span>
            </button>
          </Link>
        );
      })}

      <hr className="my-4 border-base-300" />

      <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-error/10 text-error transition-all">
        <LogOut size={20} />
        <span className="font-medium">Logout</span>
      </button>
    </div>
  );
}

export default UserSettingsSidebar;
