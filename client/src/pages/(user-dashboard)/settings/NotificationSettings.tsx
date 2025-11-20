import { Bell } from "lucide-react";
import ArriveAnimationContainer from "../../../components/ui/ArriveAnimationContainer";
import { useRef, useState, useEffect } from "react";
import { useUpdateUserSettingsMutation } from "../../../redux/api/user.api";
import { useCurrentUserProviderContext } from "../../../Provider/CurrentUserProvider";
import { toast } from "sonner";
import { DEFAULT_ERROR_MESSAGE } from "../../../utils/constant";

function NotificationSettings() {
  const { settings } = useCurrentUserProviderContext();

  const [email_alerts, setEmail_alerts] = useState(settings?.email_alerts);
  const [sms_alerts, setSms_alerts] = useState(settings?.sms_alerts);
  const [transaction_updates, setTransaction_updates] = useState(settings?.transaction_updates);

  const [isChanged, setIsChanged] = useState(false);
  const renderRef = useRef(false);

  useEffect(() => {
    if (!renderRef.current) {
      renderRef.current = true;
      return;
    }

    const hasChanged =
      email_alerts !== settings?.email_alerts ||
      sms_alerts !== settings?.sms_alerts ||
      transaction_updates !== settings?.transaction_updates;

    setIsChanged(hasChanged);
  }, [email_alerts, sms_alerts, transaction_updates, settings]);

  const [mutate] = useUpdateUserSettingsMutation();

  async function handleUpdate() {
    try {
      const { error } = await mutate({
        email_alerts,
        sms_alerts,
        transaction_updates,
      });

      if (error) throw error;

      toast.success("Saved successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || DEFAULT_ERROR_MESSAGE);
    }
  }

  return (
    <ArriveAnimationContainer delay={0.3}>
      <div className="p-6 bg-base-300 rounded-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Bell className="text-primary" /> Notification Settings
          </h2>

          <button
            className="btn btn-sm btn-primary"
            disabled={!isChanged}
            onClick={handleUpdate}
          >
            Save Changes
          </button>
        </div>

        <div className="space-y-4">

          {/* Email Alerts */}
          <div className="flex justify-between items-center bg-base-100 p-4 rounded-xl">
            <p>Email Notifications</p>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={email_alerts}
              onChange={() => setEmail_alerts(!email_alerts)}
            />
          </div>

          {/* SMS Alerts */}
          <div className="flex justify-between items-center bg-base-100 p-4 rounded-xl">
            <p>SMS Alerts</p>
            <input
              type="checkbox"
              className="toggle toggle-secondary"
              checked={sms_alerts}
              onChange={() => setSms_alerts(!sms_alerts)}
            />
          </div>

          {/* Transaction Updates */}
          <div className="flex justify-between items-center bg-base-100 p-4 rounded-xl">
            <p>Transaction Updates</p>
            <input
              type="checkbox"
              className="toggle toggle-accent"
              checked={transaction_updates}
              onChange={() => setTransaction_updates(!transaction_updates)}
            />
          </div>
        </div>
      </div>
    </ArriveAnimationContainer>
  );
}

export default NotificationSettings;
