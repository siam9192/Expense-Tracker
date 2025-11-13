import { Fragment } from "react";
import DepositGoalForm from "../forms/DepositGoalForm";
import { X } from "lucide-react";

function DepositGoalModal() {
  const open = () => {
    (document?.getElementById("Deposit_goal_modal") as any)?.showModal();
  };
  return (
    <Fragment>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button onClick={open} className="hover:text-secondary font-medium text-primary">
        Deposit
      </button>
      <dialog id="Deposit_goal_modal" className="modal">
        <div className="modal-box w-[90%] md:w-lg max-w-5xl text-start relative">
          <h1 className="text-2xl font-medium">Deposit Money </h1>
          <DepositGoalForm />
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
