import { ArrowLeftRight, Goal, Grid2x2Plus, Home, Languages, LogOut, Settings, Wallet } from "lucide-react";
import type { Route } from "../../types/utils.type";
import ThemeSwitchButton from "../ui/ThemeSwitchButton";
import { Link, useLocation } from "react-router-dom";

function UserDashboardSidebar() {
  const {pathname} = useLocation();

  const routes: Route[] = [
    { label: "Dashboard", path: "/", icon: Home },
    { label: "Transactions", path: "/transactions", icon: ArrowLeftRight },
    { label: "Wallet", path: "/wallet", icon: Wallet },
    { label: "Goals", path: "/goals", icon: Goal },
    { label: "Categories", path: "/categories", icon: Grid2x2Plus },
  ];

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
              <img
                src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                alt="User Avatar"
              />
            </div>
          </div>
          <p className="font-semibold text-primary font-secondary">Arafat Hasan Siam</p>
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
        </nav>
      </div>

      {/* --- Footer --- */}
      <div className="space-y-5">
        <Link to="settings" className="block">
         <button  className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all duration-150 w-full
                ${
                  pathname.includes("settings")
                    ? "bg-primary text-white shadow-md"
                    : "text-neutral dark:text-neutral-content hover:text-secondary hover:bg-base-200"
                }`}>
          <Settings size={20} />
          <span>Settings</span>
        </button>
        </Link>
     <button  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-neutral dark:text-neutral-content font-medium hover:text-error transition-all duration-150`}>
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
     
        <div className="flex items-center gap-3">
          <Languages className="text-primary" size={24} />
          <select className="select select-sm select-bordered border-primary font-secondary">
            <option disabled>Choose Language</option>
            <option>English</option>
            <option>Bangla</option>
          </select>
        </div>
      </div>

      {/* Theme toggle */}
      <div className="size-fit absolute right-2 top-2">
        <ThemeSwitchButton />
      </div>
    </aside>
  );
}

export default UserDashboardSidebar;
