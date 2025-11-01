import { Fragment } from "react";
import CreateGoalForm from "../forms/CreateGoalForm";
import { X } from "lucide-react";

function CreateGoalModal() {
  const open = () => {
    (document?.getElementById("create_goal_modal") as any)?.showModal();
  };
  return (
    <Fragment>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        onClick={open}
        className="text-primary hover:text-secondary font-semibold bg-base-100 btn md:btn-lg "
      >
        Create Goal
      </button>
      <dialog id="create_goal_modal" className="modal">
        <div className="modal-box w-[90%] md:w-lg max-w-5xl text-start relative">
          <h1 className="text-2xl font-medium ">Create Your New Goal</h1>
          <CreateGoalForm />
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

export default CreateGoalModal;
