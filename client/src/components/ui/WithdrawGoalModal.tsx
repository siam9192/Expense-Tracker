import { Fragment } from "react";
import { X } from "lucide-react";
import { useWithdrawUserGoalMutation } from "../../redux/api/goal.api";
import { toast } from "sonner";
import { DEFAULT_ERROR_MESSAGE } from "../../utils/constant";

interface Props {
  goal_id: number;
  amount: number; // display-only amount
  onSuccess?(): void;
}

function WithdrawGoalModal({ goal_id, amount, onSuccess }: Props) {
  const modal_id = `withdraw_goal_modal_${goal_id}`;

  const open = () => {
    (document?.getElementById(modal_id) as any)?.showModal();
  };

  const close = () => {
    (document?.getElementById(modal_id) as any)?.close();
  };

  const [mutate] = useWithdrawUserGoalMutation();
  const handleWithdraw = async () => {
    try {
      const { error } = await mutate(goal_id);
      if (error) {
        throw error;
      }
      toast.success("Amount withdrawn successfully");

      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast.error(error?.data?.message || DEFAULT_ERROR_MESSAGE);
    } finally {
      close();
    }
  };

  return (
    <Fragment>
      <button onClick={open} className="hover:text-secondary font-medium text-error">
        Withdraw
      </button>

      <dialog id={modal_id} className="modal">
        <div className="modal-box w-[90%] md:w-lg max-w-5xl text-start relative">
          <h1 className="text-2xl font-medium">Goal Withdraw</h1>

          {/* AMOUNT DISPLAY */}
          <div className="mt-5">
            <p className="text-lg font-medium">
              Withdraw Amount: <span className="text-error font-bold">${amount}</span>
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-3 mt-8">
            <button onClick={close} className="btn btn-ghost">
              Cancel
            </button>

            <button onClick={handleWithdraw} className="btn btn-error ">
              Confirm Withdraw
            </button>
          </div>

          {/* CLOSE ICON */}
          <button onClick={close} className="bg-base-300 absolute top-2 right-2 p-3 rounded-xl">
            <X />
          </button>
        </div>
      </dialog>
    </Fragment>
  );
}

export default WithdrawGoalModal;
