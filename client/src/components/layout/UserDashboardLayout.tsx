import UserDashboardSidebar from "../shared/UserDashboardSidebar";
import DashboardMainContent from "../ui/DashboardMainContent";
import ResponsiveDashboardSideBar from "../ui/ResponsiveDashboardSideBar";
import { useCurrentUserProviderContext } from "../../Provider/CurrentUserProvider";
import WelcomePage from "../../pages/(user-dashboard)/welcome/WelcomePage";

function UserDashboardLayout() {
  const { user } = useCurrentUserProviderContext();
  if (!user) {
    return <WelcomePage />;
  }
  return (
    <div className="lg:flex xl:gap-6 h-screen">
      {/* Sidebar */}
      <div className="w-[300px] h-screen sticky top-0 overflow-y-auto shadow hidden xl:block">
        <UserDashboardSidebar />
      </div>

      {/* Main Content */}

      <div className="flex-1 flex flex-col overflow-y-auto p-2 lg:p-5 ">
        <ResponsiveDashboardSideBar />
        <DashboardMainContent />
      </div>
    </div>
  );
}

export default UserDashboardLayout;
