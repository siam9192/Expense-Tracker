import { Loader2, Clock, X } from "lucide-react";
import { useEffect, Fragment } from "react";

interface Props {
  onClose?(): void;
}

function PendingDialog({ onClose }: Props) {
  const modal_id = "pending_dialog";

  const open = () => {
    (document?.getElementById(modal_id) as any)?.showModal();
  };

  const close = () => {
    (document?.getElementById(modal_id) as any)?.close();
    onClose && onClose();
  };

  useEffect(() => {
    open();
  }, []);

  return (
    <Fragment>
      <dialog id={modal_id} className="modal">
        <div className="modal-box w-[90%] max-w-sm text-center relative p-6 space-y-4">
          {/* Close Icon */}
          <button
            onClick={close}
            className="bg-base-300 hover:bg-base-200 absolute top-2 right-2 p-2 rounded-xl"
          >
            <X size={18} />
          </button>

          {/* Icon */}
          <div className="flex justify-center mb-2">
            <div className="p-4 bg-warning/20 rounded-full">
              <Clock size={42} className="text-warning" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold">Pending...</h3>

          {/* Description */}
          <p className="text-base opacity-80">
            Your request is being processed. Please wait a moment.
          </p>

          {/* Spinner */}
          <div className="flex justify-center py-4">
            <Loader2 size={30} className="animate-spin text-warning" />
          </div>

          <div className="modal-action">
            <button onClick={close} className="btn btn-warning w-full">
              Close
            </button>
          </div>
        </div>
      </dialog>
    </Fragment>
  );
}

export default PendingDialog;
