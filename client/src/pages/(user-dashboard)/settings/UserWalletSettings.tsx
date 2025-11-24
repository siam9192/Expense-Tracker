import { useEffect, useRef, useState } from "react";
import { Settings, Bell, PiggyBank, DollarSign, Shield } from "lucide-react";
import ArriveAnimationContainer from "../../../components/ui/ArriveAnimationContainer";
import { useCurrentUserProviderContext } from "../../../Provider/CurrentUserProvider";
import { useUpdateUserSettingsMutation } from "../../../redux/api/user.api";
import { toast } from "sonner";
import { DEFAULT_ERROR_MESSAGE } from "../../../utils/constant";
import { useTranslation } from "react-i18next";

function UserWalletSettings() {
  const { t } = useTranslation();
  const { settings } = useCurrentUserProviderContext();
  const [currency, setCurrency] = useState(settings?.currency.code);
  const [notifications, setNotifications] = useState(settings?.balance_expense_income_alert);
  const [autoSave, setAutoSave] = useState(settings?.auto_saving);
  const [spendingLimit, setSpendingLimit] = useState(settings?.monthly_budget);

  const [isChanged, setIsChanged] = useState(false);

  const renderRef = useRef(false);

  useEffect(() => {
    // Skip first render
    if (!renderRef.current) {
      renderRef.current = true;
      return;
    }

    const hasChanged =
      currency !== settings?.currency.code ||
      notifications !== settings?.balance_expense_income_alert ||
      autoSave !== settings?.auto_saving ||
      spendingLimit !== settings?.monthly_budget;

    setIsChanged(hasChanged);
  }, [currency, notifications, autoSave, spendingLimit, settings]);

  const [mutate] = useUpdateUserSettingsMutation();

  async function handelUpdate() {
    try {
      const { error } = await mutate({
        balance_expense_income_alert: notifications,
        auto_saving: autoSave,
        monthly_budget: spendingLimit,
      });
      if (error) throw error;
      toast.success("Saved successfully!");
    } catch (error: any) {
      toast.error(error?.data.message || DEFAULT_ERROR_MESSAGE);
    }
  }
  return (
    <ArriveAnimationContainer delay={0.3}>
      <div className="p-6 md:p-8 bg-base-300 rounded-2xl shadow-lg space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="text-primary" size={22} />
            <h2 className="text-xl font-semibold">{t("walletSettings")}</h2>
          </div>
          <button disabled={!isChanged} onClick={handelUpdate} className="btn btn-sm btn-primary">
            Save Changes
          </button>
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
                <p className="text-sm text-neutral-content">
                  Set your maximum monthly expense limit
                </p>
              </div>
            </div>
            <input
              type="range"
              min={500}
              max={200000}
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
