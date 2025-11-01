import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeSwitchButton: React.FC = () => {
  const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "dark") {
      root.setAttribute("data-theme", "night");
    } else {
      root.setAttribute("data-theme", "light");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="
  p-2 rounded-full hover:cursor-pointer transition-colors
  bg-blue-200 dark:bg-blue-900 hover:bg-blue-300 dark:hover:bg-blue-700
  sm:bg-gray-200 sm:dark:bg-gray-800 sm:hover:bg-gray-300 sm:dark:hover:bg-gray-700
"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? (
        <Moon size={20} className="text-blue-600 sm:text-gray-200" />
      ) : (
        <Sun size={20} className="text-yellow-500 sm:text-yellow-400" />
      )}
    </button>
  );
};

export default ThemeSwitchButton;
