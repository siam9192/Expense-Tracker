import ResponsiveDashboardSideBar from "../ui/ResponsiveDashboardSideBar";
import ThemeSwitchButton from "../ui/ThemeSwitchButton";

function UserDashboardHeader() {
  return (
    <header className="flex justify-between items-center p-5">
      <ResponsiveDashboardSideBar />
      <h1 className="text-4xl font-primary font-semibold text-center ">Dashboard</h1>
      <ThemeSwitchButton />
    </header>
  );
}

export default UserDashboardHeader;
