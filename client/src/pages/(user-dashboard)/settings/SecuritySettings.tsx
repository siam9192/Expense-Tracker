import { ShieldCheck } from "lucide-react";

import UserSessions from "../../../components/sections/user-dashboard/UserSessions";
import ArriveAnimationContainer from "../../../components/ui/ArriveAnimationContainer";

function SecuritySettings() {
  return (
    <ArriveAnimationContainer delay={0.3}>
      <div>
        <div className="p-6 bg-base-300 rounded-2xl  space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <ShieldCheck className="text-primary" /> Security Settings
          </h2>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-neutral-content">Change Password</label>
              <input
                type="password"
                placeholder="New password"
                className="input input-bordered w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-neutral-content">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="input input-bordered w-full"
              />
            </div>

            <div className="text-right">
              <button className="btn btn-primary">Update Password</button>
            </div>

            <hr className="my-4 border-base-300" />

            <div className="flex justify-between items-center bg-base-100 p-4 rounded-xl">
              <p>Two-Factor Authentication</p>
              <input type="checkbox" className="toggle toggle-warning" />
            </div>
          </div>
        </div>

        <UserSessions />
      </div>
    </ArriveAnimationContainer>
  );
}

export default SecuritySettings;
