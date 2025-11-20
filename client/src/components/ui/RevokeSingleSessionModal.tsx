import { X, ShieldX, LogOut } from "lucide-react";
import  { Fragment } from "react";
import { useRevokeUserSessionMutation } from "../../redux/api/user.api";
import { toast } from "sonner";
import { DEFAULT_ERROR_MESSAGE } from "../../utils/constant";

interface Props {
    sessionId:number
}

function RevokeSingleSessionModal({sessionId}:Props) {
  const modalId = "revoke-session-modal";

  function openModal() {
    (document?.getElementById(modalId) as any)?.showModal();
  }

  function closeModal() {
    (document?.getElementById(modalId) as any)?.close();
  }

  const [mutate] =  useRevokeUserSessionMutation()

  async function handleConfirmRevoke () {
    try {
         const {error} =  await mutate(sessionId)
         if(error) throw error
          toast.success("Session revoked successfully")
    } catch (error:any) {
        toast.error(error.data.message||DEFAULT_ERROR_MESSAGE)
    }
   finally {
     closeModal();
   }
  }

  return (
    <Fragment>
      <button onClick={openModal} className="btn btn-sm btn-outline btn-error gap-1">
                  <LogOut size={14} /> Revoke
                </button>

      <dialog id={modalId} className="modal">
        <div className="modal-box w-[90%] md:w-lg max-w-xl text-start relative">

          {/* Close */}
          <button
            onClick={closeModal}
            className="bg-base-300 absolute top-2 right-2 p-3 rounded-xl"
          >
            <X />
          </button>

          {/* Icon & Title */}
          <div className="flex items-center gap-3 mb-3">
            <ShieldX size={32} className="text-warning" />
            <h3 className="text-xl font-bold">Revoke this session?</h3>
          </div>

          {/* Message */}
          <p className="text-base text-gray-600 mb-4">
            This will log out the selected device session. You will remain logged in on
            your current device.
          </p>

          {/* Buttons */}
          <div className="modal-action">
            <button className="btn" onClick={closeModal}>
              Cancel
            </button>

            <button
              className="btn btn-warning  gap-2"
              onClick={handleConfirmRevoke}
            >
              <ShieldX size={18} /> Revoke Session
            </button>
          </div>
        </div>
      </dialog>
    </Fragment>
  );
}

export default RevokeSingleSessionModal;
