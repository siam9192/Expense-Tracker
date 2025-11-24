import { Fragment } from "react";
import CreateGoalForm from "../forms/CreateGoalForm";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
interface Props {
  onSuccess?(): void;
}
function CreateGoalModal({ onSuccess }: Props) {
  const { t } = useTranslation();
  const open = () => {
    (document?.getElementById("create_goal_modal") as any)?.showModal();
  };
  const close = () => {
    (document?.getElementById("create_goal_modal") as any)?.close();
  };
  return (
    <Fragment>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        onClick={open}
        className="text-primary hover:text-secondary font-semibold bg-base-100 btn md:btn-lg "
      >
        {t("createGoal")}
      </button>
      <dialog id="create_goal_modal" className="modal">
        <div className="modal-box w-[90%] md:w-lg max-w-5xl text-start relative">
          <h1 className="text-2xl font-medium ">{t("createYourNewGoal")}</h1>
          <CreateGoalForm
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

export default CreateGoalModal;
