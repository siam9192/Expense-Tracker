import { User } from "lucide-react";

import ArriveAnimationContainer from "../../../components/ui/ArriveAnimationContainer";

function ProfileSettings() {
  return (
 <ArriveAnimationContainer delay={.3}>
     <div className="p-6 bg-base-300 rounded-2xl  space-y-6">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <User className="text-primary" /> Profile Settings
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-neutral-content">Full Name</label>
          <input type="text" placeholder="John Doe" className="input input-bordered w-full" />
        </div>

        <div>
          <label className="text-sm text-neutral-content">Email</label>
          <input
            type="email"
            placeholder="john@example.com"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="text-sm text-neutral-content">Phone</label>
          <input type="text" placeholder="+123456789" className="input input-bordered w-full" />
        </div>

        <div>
          <label className="text-sm text-neutral-content">Country</label>
          <select className="select select-bordered w-full">
            <option>United States</option>
            <option>Bangladesh</option>
            <option>India</option>
            <option>Germany</option>
          </select>
        </div>
      </div>

      <div className="text-right">
        <button className="btn btn-primary">Save Profile</button>
      </div>
    </div>
 </ArriveAnimationContainer>
  );
}

export default ProfileSettings;
