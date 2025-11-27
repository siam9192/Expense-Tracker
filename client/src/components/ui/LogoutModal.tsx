import { LogOut, X } from "lucide-react";
import { Fragment, useState, type ReactNode } from "react";
import { useSignoutMutation } from "../../redux/api/auth.api";
import { toast } from "sonner";
import { DEFAULT_ERROR_MESSAGE } from "../../utils/constant";
import { useCurrentUserProviderContext } from "../../Provider/CurrentUserProvider";
import { clearAuthToken } from "../../utils/helper";

interface Props {
  onConfirm?(): void; // logout action
  children: ReactNode;
}

function LogoutModal({  children }: Props) {
  const { setUser, setSettings } = useCurrentUserProviderContext();
  const [isPending,setIsPending] = useState(false)
  const modal_id = "logout_confirm_modal";

  const open = () => {
    (document?.getElementById(modal_id) as any)?.showModal();
  };

  const close = () => {
    (document?.getElementById(modal_id) as any)?.close();
  };

  const [mutate] = useSignoutMutation();
  const handleConfirm = async () => {
    setIsPending(true)
     try {
      const { error } = await mutate(undefined);
      if (error) throw error;
      close();
      localStorage.removeItem("current-user");
      localStorage.removeItem("current-user-settings");
      setUser(null);
      setSettings(null);
      clearAuthToken();
    } catch (error) {
      setIsPending(false)
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
  };

  return (
    <Fragment>
      {/* Logout trigger button */}
      <div>
        <div onClick={open} className="size-fit">
          {children}
        </div>
      </div>
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
            <button disabled={isPending} onClick={close} className="btn btn-ghost">
              Cancel
            </button>

            <button disabled={isPending} onClick={handleConfirm} className="btn btn-error ">
              {isPending ?"Just a moment...":"Yes, Logout"}
            </button>
          </div>
        </div>
      </dialog>
    </Fragment>
  );
}

export default LogoutModal;
