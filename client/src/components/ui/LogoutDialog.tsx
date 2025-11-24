import { LogOut, X } from "lucide-react";
import { Fragment, useEffect } from "react";
import { useSignoutMutation } from "../../redux/api/auth.api";
import { toast } from "sonner";
import { DEFAULT_ERROR_MESSAGE } from "../../utils/constant";
import { useCurrentUserProviderContext } from "../../Provider/CurrentUserProvider";
import { clearAuthToken } from "../../utils/helper";

interface Props {
  onConfirm?(): void; // logout action
  onCancel?(): void;
}

function LogoutDialog({ onConfirm, onCancel }: Props) {
  const { setUser, setSettings } = useCurrentUserProviderContext();
  const modal_id = "logout_confirm_dialog";

  const open = () => {
    (document?.getElementById(modal_id) as any)?.showModal();
  };

  const close = () => {
    (document?.getElementById(modal_id) as any)?.close();
    onCancel && onCancel();
  };

  const [mutate] = useSignoutMutation();
  const handleConfirm = async () => {
    try {
      const { error } = await mutate(undefined);
      if (error) throw error;
      onConfirm && onConfirm();
      close();
      localStorage.removeItem("current-user");
      localStorage.removeItem("current-user-settings");
      setUser(null);
      setSettings(null);
      clearAuthToken();
    } catch (error) {
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
  };

  useEffect(() => {
    open();
  }, []);

  return (
    <Fragment>
      {/* Logout trigger button */}
      <div></div>
      {/* Modal */}
      <dialog id={modal_id} className="modal">
        <div className="modal-box w-[90%] md:w-md max-w-md text-center relative">
          {/* Close Icon */}
          <button onClick={close} className="bg-base-300 absolute top-2 right-2 p-2 rounded-xl ">
            <X size={18} />
          </button>

          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-error/10 rounded-full">
              <LogOut size={40} className="text-error" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold mb-2">Confirm Logout</h2>

          {/* Description */}
          <p className="text-gray-600 mb-6">Are you sure you want to log out from your account?</p>

          {/* Buttons */}
          <div className="flex justify-center gap-3">
            <button onClick={close} className="btn btn-ghost">
              Cancel
            </button>

            <button onClick={handleConfirm} className="btn btn-error ">
              Yes, Logout
            </button>
          </div>
        </div>
      </dialog>
    </Fragment>
  );
}

export default LogoutDialog;
