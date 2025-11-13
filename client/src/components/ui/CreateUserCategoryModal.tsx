import { Fragment } from "react";
import { X } from "lucide-react";
import CreateUserCategoryForm from "../forms/CreateUserCategoryForm";
interface Props {
  onSuccess?():void
}
function CreateUserCategoryModal({onSuccess}:Props) {
  const open = () => {
    (document?.getElementById("create_category_modal") as any)?.showModal();
  };
  const close = ()=>{
     (document?.getElementById("create_category_modal") as any)?.close();
     onSuccess&& onSuccess()
  }
  return (
    <Fragment>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        onClick={open}
        className="text-primary hover:text-secondary font-semibold bg-base-100 btn md:btn-lg "
      >
        Create Category
      </button>
      <dialog id="create_category_modal" className="modal">
        <div className="modal-box w-[90%] md:w-lg max-w-5xl text-start relative">
          <h1 className="text-2xl font-medium ">Create Your New Goal</h1>
          <CreateUserCategoryForm onSuccess={close} />
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

export default CreateUserCategoryModal;
