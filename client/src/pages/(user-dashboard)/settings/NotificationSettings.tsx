import { Bell } from "lucide-react";
import ArriveAnimationContainer from "../../../components/ui/ArriveAnimationContainer";

function NotificationSettings() {
  return (
   <ArriveAnimationContainer delay={.3}>
     <div className="p-6 bg-base-300 rounded-2xl  space-y-6">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Bell className="text-primary" /> Notification Settings
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between items-center bg-base-100 p-4 rounded-xl">
          <p>Email Notifications</p>
          <input type="checkbox" className="toggle toggle-primary" defaultChecked />
        </div>
        <div className="flex justify-between items-center bg-base-100 p-4 rounded-xl">
          <p>SMS Alerts</p>
          <input type="checkbox" className="toggle toggle-secondary" />
        </div>
        <div className="flex justify-between items-center bg-base-100 p-4 rounded-xl">
          <p>Transaction Updates</p>
          <input type="checkbox" className="toggle toggle-accent" defaultChecked />
        </div>
      </div>
    </div>
   </ArriveAnimationContainer>
  );
}

export default NotificationSettings;
