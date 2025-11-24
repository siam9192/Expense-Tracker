import React from "react";
import { Sun, Moon } from "lucide-react";
import { useLocalSettingsProviderContext } from "../../Provider/LocalSettingsProvider";
import type { AppTheme } from "../../types/settings.type";

const ThemeSwitchButton: React.FC = () => {
  const { settings, setSettings } = useLocalSettingsProviderContext();
  const theme = settings.theme;

  const toggleTheme = () => {
    setSettings((p) => ({ ...p, theme: (theme === "light" ? "dark" : "light") as AppTheme }));
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
        <Moon size={20} className="text-blue-600 sm:text-gray-600" />
      ) : (
        <Sun size={20} className="text-yellow-500 sm:text-yellow-400" />
      )}
    </button>
  );
};

export default ThemeSwitchButton;
