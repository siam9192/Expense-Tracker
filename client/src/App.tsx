import { Outlet, useLocation } from "react-router-dom";
import LocalSettingsProvider from "./Provider/LocalSettingsProvider";
import ProfileSetupProvider from "./Provider/ProfileSetupProvider";
import CurrentUserProvider from "./Provider/CurrentUserProvider";
import WrapperProvider from "./Provider/WrapperProvider";
import "./utils/i18n";
import { Toaster } from "sonner";
import { useEffect } from "react";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    const body = document.body;
    body.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [pathname]);
  return (
 
      <WrapperProvider>
      <LocalSettingsProvider>
        <ProfileSetupProvider>
          <CurrentUserProvider>
            <Outlet />
            <Toaster />
          </CurrentUserProvider>
        </ProfileSetupProvider>
      </LocalSettingsProvider>
    </WrapperProvider>
  
  );
}

export default App;
