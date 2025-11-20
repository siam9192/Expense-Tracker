import { Plus } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import ArriveAnimationContainer from "../../../components/ui/ArriveAnimationContainer";
import DashboardPageHeading from "../../../components/ui/DashboardPageHeading";
import { useForm } from "react-hook-form";
import { useCreateUserTransactionMutation } from "../../../redux/api/transaction.api";
import { useGetPublicCurrenciesQuery } from "../../../redux/api/currency.api";
import { zodResolver } from "@hookform/resolvers/zod";
import transactionValidation, {
  type CreateTransactionPayloadValidationType,
} from "../../../validations/transaction.validation";
import { DEFAULT_ERROR_MESSAGE, MONTH_NAMES } from "../../../utils/constant";
import { TransactionType, type CreateTransactionPayload } from "../../../types/transaction.type";
import ChooseTransactionCategoryModal, {
  type ChooseCategoryType,
} from "../../../components/ui/ChooseTransactionCategoryModal";

import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";
import { toast } from "sonner";
  import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";

GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function CreateTransactionPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    getValues,
  } = useForm<CreateTransactionPayloadValidationType>({
    resolver: zodResolver(transactionValidation.createTransactionPayloadValidation),
    defaultValues: {
      type: TransactionType.EXPENSE,
    },
  } as any);

  const [errorMessage, setErrorMessage] = useState("");
  const [currencySearch, setCurrencySearch] = useState("");
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [mutate, { isLoading }] = useCreateUserTransactionMutation();

  const { data: currencyResData } = useGetPublicCurrenciesQuery({
    limit: 300,
  });

  const publicCurrencies = currencyResData?.data || [];
  const selectedCurrency_id = getValues("currency_id");
  const selectedCurrency = selectedCurrency_id
    ? publicCurrencies.find((_) => _.id === selectedCurrency_id)
    : null;

  const onSubmit = async (formData: CreateTransactionPayloadValidationType) => {
    try {
      const date = new Date(formData.date.year, formData.date.month - 1, formData.date.day);
      const payload: CreateTransactionPayload = {
        title: formData.title,
        amount: formData.amount,
        category_id: formData.category_id,
        currency_id: formData.currency_id,
        date,
        ...(formData.note ? { note: formData.note } : {}),
      };
      const {error } = await mutate(payload);
      if (error) throw error;
      reset();
      setCurrencySearch("");
      toast.success("Transaction listed successfully!")
    } catch (err: any) {
      const message = err.data.message || DEFAULT_ERROR_MESSAGE;

      setErrorMessage(message);
      toast.error(message);
    }
  };
  const handelCategoryChange = (category: ChooseCategoryType) => {
    setValue("category_id", category.id);
    setValue("type", category.type as any);
  };


  const handleFileInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
      GlobalWorkerOptions.workerSrc = pdfjsWorker;
  const files = e.target.files;
  if (!files?.length) return;

  const file = files[0];

  
  const pdfUrl = URL.createObjectURL(file);

  try {
    

    const pdf = await getDocument(pdfUrl).promise;
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((item: any) => item.str);
      fullText += strings.join(" ") + "\n\n";
    }
   

  } catch (error) {
    console.error("PDF Parse Error:", error);
  } finally {
    // Always clean up the blob URL
    URL.revokeObjectURL(pdfUrl);
  }
};

  return (
    <ArriveAnimationContainer>
      <div className="mx-auto max-w-7xl bg-base-300 p-5 md:p-10 rounded-xl">
        <DashboardPageHeading heading="Add New Transaction" />

        <form
          id="transaction-form"
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-base-100 p-3 md:p-8 rounded-2xl shadow-md"
        >
          {/* LEFT SIDE */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block font-medium mb-2">
                Title <span className="text-error">*</span>
              </label>
              <input
                type="text"
                {...register("title")}
                className="input input-bordered w-full input-lg"
                placeholder="e.g. Grocery shopping"
              />
              {errors.title && <p className="text-error text-sm mt-1">{errors.title.message}</p>}
            </div>

            {/* Amount */}
            <div>
              <label className="block font-medium mb-2">
                Amount <span className="text-error">*</span>
              </label>
              <input
                type="number"
                {...register("amount")}
                className="input input-bordered w-full input-lg"
                placeholder="e.g. 250"
                min="1"
              />
              {errors.amount && <p className="text-error text-sm mt-1">{errors.amount.message}</p>}
            </div>

            {/* Type + Currency */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Type */}
              <div>
                <label className="block font-medium mb-2">Type</label>
                <select {...register("type")} className="select select-bordered select-lg w-full">
                  {[TransactionType.EXPENSE, TransactionType.INCOME].map((_) => (
                    <option value={_}>{_.toLowerCase()}</option>
                  ))}
                </select>
                {errors.type && <p className="text-error text-sm mt-1">{errors.type.message}</p>}
              </div>

              {/* Currency */}
              <div className="form-control w-full">
                <label className="block font-medium mb-2">Currency</label>

                <div tabIndex={0} className="dropdown w-full">
                  <div
                    className="select select-bordered select-lg w-full flex items-center justify-between cursor-pointer"
                    onClick={() => setIsCurrencyDropdownOpen((p) => !p)}
                  >
                    {selectedCurrency?.code || "Select currency"}
                  </div>

                  {isCurrencyDropdownOpen && (
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[999] menu p-2 shadow bg-base-100 rounded-box w-full max-h-64 overflow-y-auto"
                    >
                      <li className="p-0">
                        <input
                          type="text"
                          placeholder="Search currency..."
                          className="input input-bordered w-full"
                          value={currencySearch}
                          onChange={(e) => setCurrencySearch(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </li>

                      {publicCurrencies
                        .filter((c) => c.code.toLowerCase().includes(currencySearch.toLowerCase()))
                        .map((c) => (
                          <li key={c.id}>
                            <a
                              onClick={(e) => {
                                e.stopPropagation();
                                setValue("currency_id", c.id);
                                setIsCurrencyDropdownOpen(false);
                              }}
                            >
                              {c.code}
                            </a>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>

                {errors.currency_id && (
                  <p className="text-error text-sm mt-1">{errors.currency_id.message}</p>
                )}
              </div>
            </div>

            {/* Category */}
            <div>
              <ChooseTransactionCategoryModal
                defaultId={getValues("category_id")}
                defaultType={getValues("type")}
                onChange={handelCategoryChange}
              />
              {errors.category_id && (
                <p className="text-error text-sm mt-1">{errors.category_id.message}</p>
              )}
            </div>
            {/* Date */}
            <div>
              <label className="block font-medium mb-2">Date</label>
              <div className="flex gap-3">
                <div className="w-full">
                  <input
                    type="number"
                    {...register("date.day")}
                    className="input input-bordered input-lg w-full"
                    placeholder="Day"
                    min="1"
                    max="31"
                  />
                  {errors.date?.day && (
                    <p className="text-error text-sm mt-1">{errors.date.day.message}</p>
                  )}
                </div>

                <div className="w-full">
                  <select
                    {...register("date.month")}
                    className="select select-bordered select-lg w-full"
                  >
                    <option value="">Month</option>
                    {MONTH_NAMES.map((m, index) => (
                      <option key={m} value={index + 1}>
                        {m}
                      </option>
                    ))}
                  </select>
                  {errors.date?.month && (
                    <p className="text-error text-sm mt-1">{errors.date.month.message}</p>
                  )}
                </div>

                <div className="w-full">
                  <input
                    type="number"
                    {...register("date.year")}
                    className="input input-bordered input-lg w-full mt-1"
                    placeholder="Year"
                    min="1900"
                    max="2100"
                  />
                  {errors.date?.year && (
                    <p className="text-error text-sm">{errors.date.year.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="block font-medium mb-2">Note</label>
              <textarea
                {...register("note")}
                className="textarea textarea-bordered w-full min-h-40"
                placeholder="Optional notes about this transaction..."
              ></textarea>
              {errors.note && <p className="text-error text-sm mt-1">{errors.note.message}</p>}
            </div>
          </div>

          {/* Right Side Upload */}
          <div className="flex flex-col justify-center items-center">
            <input accept="pdf/*" type="file" onChange={handleFileInputChange} id="hidden-file-input"  className="hidden"/>
            <div  className="bg-base-100 rounded-xl  cursor-pointer border border-dashed border-base-content/40 px-10 py-16 text-center flex flex-col items-center gap-4 hover:bg-base-200 transition-all">
              <Plus size={48} className="text-primary" />
              <p className="font-medium text-lg">Upload an Invoice</p>
              <p className="text-sm text-base-content/70">(Optional)</p>
              <button type="button" onClick={()=>{
                const ele  =  document.getElementById("hidden-file-input")
                if(!ele) return
                ele.click()
              }} className="btn btn-outline btn-sm mt-4">
                Choose File
              </button>
            </div>
          </div>

          {
            errorMessage ? <p className="mt-2 text-sm text-error">{errorMessage}</p>:null
          }
        </form>

        {/* ACTION BUTTONS */}
        <div className="mt-8 flex justify-end gap-3">
          <button disabled type="button" className="btn btn-ghost">
            Save as Draft
          </button>

          <button type="submit" form="transaction-form" className="btn btn-primary">
            Save Transaction
          </button>
        </div>
      </div>
    </ArriveAnimationContainer>
  );
}

export default CreateTransactionPage;
