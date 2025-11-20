import { Fragment, useState, useEffect } from "react";
import { useGetUserCategoriesQuery } from "../../redux/api/category.api";
import { TransactionType } from "../../types/transaction.type";

interface Props {
  defaultId: number;
  defaultType: TransactionType;
  onChange: (category:ChooseCategoryType ) => void;
  onTypeChange?: (type: TransactionType) => void;
}

export type ChooseCategoryType = { id: number; name: string,type:TransactionType }
function ChooseTransactionCategoryModal({
  defaultId,
  defaultType,
  onChange,
  onTypeChange,
}: Props) {
  const [type, setType] = useState(defaultType || TransactionType.EXPENSE);
  const [categoryId, setCategoryId] = useState<number | null>(defaultId || null);

  const id = "choose_category_modal";

  const open = () => {
    (document.getElementById(id) as any)?.showModal();
  };
  const close = () => {
    (document.getElementById(id) as any)?.close();
  };

  const { data: categoryRes, isLoading } = useGetUserCategoriesQuery({
    type,
    limit: 1000,
  });

  const categories = categoryRes?.data || [];

  const selectedCategory = categories.find((c: any) => c.id === categoryId);

  useEffect(() => {
    if (selectedCategory) {
      onChange({id:selectedCategory.id,name:selectedCategory.name,type:selectedCategory.type as any});
    }
  }, [categoryId]);

  useEffect(()=>{
    setType(defaultType)
    setCategoryId(defaultId)
  },[defaultId,type])
  
  return (
    <Fragment>
      <div>
        <label className="block font-medium mb-2">
          Category <span className="text-error">*</span>
        </label>

        <button
          type="button"
          className="input input-bordered w-full input-lg flex items-center justify-start"
          onClick={open}
        >
          {selectedCategory ? selectedCategory.name : "Choose Category"}
        </button>
      </div>

      {/* MODAL */}
      <dialog id={id} className="modal">
        <div className="modal-box w-[90%] md:w-2xl max-w-4xl text-start relative">

          <h1 className="text-xl font-semibold mb-5">Choose Transaction Category</h1>

          {/* TYPE SWITCHER */}
          <div className="flex gap-3 mb-5">
            <button
             type="button"
              className={`btn btn-sm ${
                type === TransactionType.EXPENSE ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => {
                setType(TransactionType.EXPENSE);
               onTypeChange &&  onTypeChange(TransactionType.EXPENSE);
                setCategoryId(null);
              }}
            >
              Expense
            </button>

            <button
             type="button"
              className={`btn btn-sm ${
                type === TransactionType.INCOME ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => {
                setType(TransactionType.INCOME);
             onTypeChange &&   onTypeChange(TransactionType.INCOME);
                setCategoryId(null);
              }}
            >
              Income
            </button>
          </div>

          {/* CATEGORY LIST */}
          <div className="max-h-[300px] overflow-y-auto border p-3 rounded-lg">
            {isLoading ? (
              <p>Loading...</p>
            ) : categories.length === 0 ? (
              <p className="text-gray-500">No categories found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {categories.map((c: any) => (
                  <div
                    key={c.id}
                    onClick={() => setCategoryId(c.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      categoryId === c.id
                        ? "border-primary bg-primary text-white"
                        : "border-base-300 hover:bg-base-200"
                    }`}
                  >
                    {c.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="modal-action">
            <button type="button" className="btn" onClick={close}>
              Close
            </button>
            <button
             type="button"
              className="btn btn-primary"
              disabled={!categoryId}
              onClick={close}
            >
              Confirm
            </button>
          </div>
        </div>
      </dialog>
    </Fragment>
  );
}

export default ChooseTransactionCategoryModal;
