import UserSettingsSidebar from "../../../components/shared/UserSettingsSidebar";
import { Outlet } from "react-router-dom";

function SettingsPage() {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 md:p-10 bg-base-200 min-h-[90vh] rounded-2xl ">
      {/* Sidebar */}
      <UserSettingsSidebar />

      {/* Content */}
      <div className="flex-1 space-y-6">
        <Outlet />
      </div>
    </div>
  );
}

export default SettingsPage;
