import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import type { CurrentUser } from "../types/user.type";
import { useGetCurrentUserQuery, useGetCurrentUserSettingsQuery } from "../redux/api/user.api";
import { useProfileSetupProviderContext } from "./ProfileSetupProvider";
import type { Currency } from "../types/currency.type";

export type UserCurrencyProviderContextType = null;

export const UserCurrencyProviderContext = createContext<
  UserCurrencyProviderContextType | undefined
>(undefined);

interface Props {
  children: React.ReactNode;
}

export default function UserCurrencyProvider({ children }: Props) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [settings, setSettings] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { setIsOpen } = useProfileSetupProviderContext();

  const {
    data: currentUserResData,
    error: currentUserError,
    isLoading: isUserLoading,
    isFetching: isUserFetching,
    refetch: userRefetch,
  } = useGetCurrentUserQuery(undefined);

  const {
    data: userSettingsResData,
    error: settingsError,
    isLoading: isSettingsLoading,
    isFetching: isSettingsFetching,
    refetch: userSettingsRefetch,
  } = useGetCurrentUserSettingsQuery(undefined);

  // Helpers
  const loadFromLocalStorage = useCallback((key: string) => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }, []);

  const saveToLocalStorage = useCallback((key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  }, []);

  const removeFromLocalStorage = useCallback((key: string) => {
    localStorage.removeItem(key);
  }, []);

  // Handle user
  useEffect(() => {
    if (!isUserLoading) {
      if (currentUserError) {
        removeFromLocalStorage("current-user");
        setUser(null);
      } else {
        const apiData = currentUserResData?.data;
        if (apiData) {
          if ("isSetupComplete" in apiData && !apiData.isSetupComplete) {
            setIsOpen(true);
          } else {
            saveToLocalStorage("current-user", apiData);
            setUser(apiData as CurrentUser);
          }
        }
      }
      setIsLoading(false);
    } else {
      const localUser = loadFromLocalStorage("current-user");
      if (localUser) {
        setUser(localUser);
        setIsLoading(false);
      }
    }
  }, [
    isUserLoading,
    currentUserResData,
    currentUserError,
    setIsOpen,
    loadFromLocalStorage,
    saveToLocalStorage,
    removeFromLocalStorage,
    isUserFetching,
  ]);

  // Handle user settings
  useEffect(() => {
    if (!isSettingsLoading) {
      if (settingsError) {
        removeFromLocalStorage("current-user-settings");
        setSettings(null);
      } else if (userSettingsResData?.success && userSettingsResData.data) {
        setSettings(userSettingsResData.data);
        saveToLocalStorage("current-user-settings", userSettingsResData.data);
      } else {
        const localSettings = loadFromLocalStorage("current-user-settings");
        if (localSettings) setSettings(localSettings);
      }
    }
  }, [
    isSettingsLoading,
    settingsError,
    userSettingsResData,
    loadFromLocalStorage,
    saveToLocalStorage,
    removeFromLocalStorage,
    isSettingsFetching,
  ]);

  const contextValue = useMemo(
    () => ({
      user,
      settings,
      isLoading,
      setUser,
      setSettings,
      setIsLoading,
      userRefetch,
      userSettingsRefetch,
    }),
    [user, settings, isLoading],
  );
  if (isLoading) return null;

  return (
    <UserCurrencyProviderContext.Provider value={null}>
      {children}
    </UserCurrencyProviderContext.Provider>
  );
}

export function useUserCurrencyProviderContext() {
  const context = useContext(UserCurrencyProviderContext);
  if (!context) {
    throw new Error("useUserCurrencyProviderContext must be used within a UserCurrencyProvider");
  }
  return context;
}
