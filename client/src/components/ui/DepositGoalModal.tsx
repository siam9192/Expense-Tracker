import { Fragment } from "react";
import DepositGoalForm from "../forms/DepositGoalForm";
import { X } from "lucide-react";

interface Props {
  goal_id: number;
  onSuccess?(): void;
}
function DepositGoalModal({ goal_id, onSuccess }: Props) {
  const modal_id = `deposit_goal_modal_${goal_id}`;
  const open = () => {
    (document?.getElementById(modal_id) as any)?.showModal();
  };
  const close = () => {
    (document?.getElementById(modal_id) as any)?.close();
  };
  return (
    <Fragment>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button onClick={open} className="hover:text-secondary font-medium text-primary">
        Deposit
      </button>
      <dialog id={modal_id} className="modal">
        <div className="modal-box w-[90%] md:w-lg max-w-5xl text-start relative">
          <h1 className="text-2xl font-medium">Deposit Money </h1>
          <DepositGoalForm
            goal_id={goal_id}
            key={goal_id}
            onSuccess={() => {
              close();
              onSuccess && onSuccess();
            }}
          />
          <div className="modal-action">
            <form method="dialog">
              <button className=" bg-base-300 absolute top-2 right-2 p-3  rounded-xl ">
                <X />
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </Fragment>
  );
}

export default DepositGoalModal;
