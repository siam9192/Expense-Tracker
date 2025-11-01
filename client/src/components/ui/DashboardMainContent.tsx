import { Outlet } from "react-router-dom";

function DashboardMainContent() {
  return (
    <div className="mt-4 xl:mt-0">
      <Outlet />
    </div>
  );
}

export default DashboardMainContent;
