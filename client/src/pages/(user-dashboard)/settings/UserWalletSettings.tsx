import { useState } from "react";
import { Settings, Bell, PiggyBank, DollarSign, Shield } from "lucide-react";
import ArriveAnimationContainer from "../../../components/ui/ArriveAnimationContainer";


function UserWalletSettings() {
  const [currency, setCurrency] = useState("USD");
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(false);
  const [spendingLimit, setSpendingLimit] = useState(5000);

  return (
  <ArriveAnimationContainer delay={.3}>
      <div className="p-6 md:p-8 bg-base-300 rounded-2xl shadow-lg space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="text-primary" size={22} />
          <h2 className="text-xl font-semibold">Wallet Settings</h2>
        </div>
        <button className="btn btn-sm btn-primary">Save Changes</button>
      </div>

      {/* Settings List */}
      <div className="space-y-6">
        {/* Currency Selection */}
        <div className="flex items-center justify-between p-4 bg-base-100 rounded-xl hover:shadow-sm transition">
          <div className="flex items-center gap-3">
            <DollarSign className="text-success" size={20} />
            <div>
              <p className="font-medium">Currency</p>
              <p className="text-sm text-neutral-content">Select preferred currency</p>
            </div>
          </div>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="select select-sm select-bordered w-28"
            disabled
          >
            <option>USD</option>
            <option>EUR</option>
            <option>BDT</option>
            <option>INR</option>
          </select>
        </div>

        {/* Spending Limit */}
        <div className="p-4 bg-base-100 rounded-xl hover:shadow-sm transition">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="text-warning" size={20} />
            <div>
              <p className="font-medium">Monthly Spending Limit</p>
              <p className="text-sm text-neutral-content">Set your maximum monthly expense limit</p>
            </div>
          </div>
          <input
            type="range"
            min={1000}
            max={20000}
            step={500}
            value={spendingLimit}
            onChange={(e) => setSpendingLimit(Number(e.target.value))}
            className="range range-primary"
          />
          <div className="text-right text-sm mt-1">
            Current: <span className="font-semibold">${spendingLimit}</span>
          </div>
        </div>

        {/* Auto-Save */}
        <div className="flex items-center justify-between p-4 bg-base-100 rounded-xl hover:shadow-sm transition">
          <div className="flex items-center gap-3">
            <PiggyBank className="text-accent" size={20} />
            <div>
              <p className="font-medium">Auto-Save Mode</p>
              <p className="text-sm text-neutral-content">
                Automatically save a portion of income each month
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            className="toggle toggle-accent"
            checked={autoSave}
            onChange={() => setAutoSave(!autoSave)}
          />
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between p-4 bg-base-100 rounded-xl hover:shadow-sm transition">
          <div className="flex items-center gap-3">
            <Bell className="text-info" size={20} />
            <div>
              <p className="font-medium">Notifications</p>
              <p className="text-sm text-neutral-content">
                Get alerts for expenses and balance updates
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            className="toggle toggle-info"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
        </div>
      </div>
    </div>
  </ArriveAnimationContainer>
  );
}

export default UserWalletSettings;
