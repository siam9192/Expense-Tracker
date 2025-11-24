import { LogOut, X, AlertTriangle } from "lucide-react";
import { Fragment } from "react";
import { useRevokeUserAllSessionMutation } from "../../redux/api/user.api";
import { toast } from "sonner";
import { DEFAULT_ERROR_MESSAGE } from "../../utils/constant";

function RevokeAllSessionModal() {
  const modalId = "session-logout-modal";

  function openModal() {
    (document?.getElementById(modalId) as any)?.showModal();
  }

  function closeModal() {
    (document?.getElementById(modalId) as any)?.close();
  }

  const [mutate] = useRevokeUserAllSessionMutation();

  async function handleConfirmRevoke() {
    try {
      const { error } = await mutate(undefined);
      if (error) throw error;
      toast.success("Session revoked successfully");
    } catch (error: any) {
      toast.error(error.data.message || DEFAULT_ERROR_MESSAGE);
    } finally {
      closeModal();
    }
  }

  return (
    <Fragment>
      <button onClick={openModal} className="btn btn-sm btn-outline btn-error gap-2">
        <LogOut size={16} /> Log out of all devices
      </button>

      <dialog id={modalId} className="modal">
        <div className="modal-box w-[90%] md:w-lg max-w-5xl text-start relative">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="bg-base-300 absolute top-2 right-2 p-3 rounded-xl"
          >
            <X />
          </button>

          {/* Icon + Title */}
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle size={32} className="text-warning" />
            <h3 className="text-xl font-bold">Log out of all devices?</h3>
          </div>

          {/* Message */}
          <p className="text-base text-gray-600 mb-4">
            This action will instantly log you out from all active sessions across all devices. You
            will need to log in again everywhere.
          </p>

          {/* Action Buttons */}
          <div className="modal-action">
            <button className="btn" onClick={closeModal}>
              Cancel
            </button>

            <button className="btn btn-error  gap-2" onClick={handleConfirmRevoke}>
              <LogOut size={18} />
              Log out all sessions
            </button>
          </div>
        </div>
      </dialog>
    </Fragment>
  );
}

export default RevokeAllSessionModal;
