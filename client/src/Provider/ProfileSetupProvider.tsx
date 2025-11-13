import React, { createContext, useContext, useState } from "react";
import UserProfileSetupDialog from "../components/sections/profile-setup/UserProfileSetupDialog";

export const ProfileSetupProviderContext = createContext<ProfileSetupProviderContextType | null>(
  null,
);
export type ProfileSetupProviderContextType = {
  isOpen: boolean;
  isComplete: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsComplete: React.Dispatch<React.SetStateAction<boolean>>;
};

interface Props {
  children: React.ReactNode;
}
function ProfileSetupProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  return (
    <ProfileSetupProviderContext value={{ isOpen, isComplete, setIsOpen, setIsComplete }}>
      {isOpen ? <UserProfileSetupDialog /> : children}
    </ProfileSetupProviderContext>
  );
}

export default ProfileSetupProvider;

export function useProfileSetupProviderContext() {
  const context = useContext(ProfileSetupProviderContext);
  if (!context) throw new Error("");
  return context;
}
