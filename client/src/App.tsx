
import { Outlet } from "react-router-dom";
import LocalSettingsProvider from "./Provider/LocalSettingsProvider";
import ProfileSetupProvider from "./Provider/ProfileSetupProvider";
import CurrentUserProvider from "./Provider/CurrentUserProvider";
import WrapperProvider from "./Provider/WrapperProvider";


function App() {
 return (
<WrapperProvider>
 <LocalSettingsProvider>
 <ProfileSetupProvider>
 <CurrentUserProvider>
 <Outlet/>
 </CurrentUserProvider>
 </ProfileSetupProvider>
 </LocalSettingsProvider>
</WrapperProvider>
 )
} 

export default App;
