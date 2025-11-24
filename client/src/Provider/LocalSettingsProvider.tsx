import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { AppLanguage, AppTheme, type AppSettings } from "../types/settings.type";
import i18n from "../utils/i18n";

export const LocalSettingsProviderContext = createContext<LocalSettingsProviderContextType | null>(
  null,
);
export type LocalSettingsProviderContextType = {
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
};

interface Props {
  children: React.ReactNode;
}
function LocalSettingsProvider({ children }: Props) {
  const [settings, setSettings] = useState<AppSettings>({
    theme: AppTheme.DARK,
    language: AppLanguage.English,
  });
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as AppTheme;
    const storedLanguage = localStorage.getItem("language") as AppLanguage;

    // Validate theme
    const validTheme = Object.values(AppTheme).includes(storedTheme) ? storedTheme : AppTheme.DARK;

    // Validate language
    const validLanguage = Object.values(AppLanguage).includes(storedLanguage)
      ? storedLanguage
      : AppLanguage.English;

    // Save defaults back to storage if invalid
    localStorage.setItem("theme", validTheme);
    localStorage.setItem("language", validLanguage);

    // Update settings state once
    setSettings({
      theme: validTheme,
      language: validLanguage,
    });

    const root = window.document.documentElement;

    if (validTheme === "dark") {
      root.setAttribute("data-theme", "night");
    } else {
      root.setAttribute("data-theme", "light");
    }

    localStorage.setItem("theme", validTheme);

    // Apply i18n language
    i18n.changeLanguage(validLanguage);
  }, []);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    // Save in storage
    localStorage.setItem("theme", settings.theme);
    localStorage.setItem("language", settings.language);

    // Apply theme to DOM
    const root = document.documentElement;
    root.setAttribute("data-theme", settings.theme === "dark" ? "night" : "light");

    // Apply language
    i18n.changeLanguage(settings.language);
  }, [settings]);

  return (
    <LocalSettingsProviderContext value={{ settings: settings, setSettings: setSettings }}>
      {children}
    </LocalSettingsProviderContext>
  );
}

export default LocalSettingsProvider;

export function useLocalSettingsProviderContext() {
  const context = useContext(LocalSettingsProviderContext);
  if (!context) throw new Error("");
  return context;
}
