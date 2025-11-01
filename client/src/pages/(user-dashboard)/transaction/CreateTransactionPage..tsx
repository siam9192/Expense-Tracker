import { Plus } from "lucide-react";
import { useState } from "react";
import ArriveAnimationContainer from "../../../components/ui/ArriveAnimationContainer";
import DashboardPageHeading from "../../../components/ui/DashboardPageHeading";

function CreateTransactionPage() {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    currency: "BDT",
    day: "",
    month: "",
    year: "",
    note: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Transaction Submitted:", formData);
    // TODO: Send to backend or save locally
  };

  return (
   <ArriveAnimationContainer>
     <div className="mx-auto max-w-7xl bg-base-300 p-5 md:p-10 rounded-xl">
      <DashboardPageHeading heading="Add New Transaction"/>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-base-100 p-3 md:p-8 rounded-2xl shadow-md">
        {/* ===== LEFT: FORM FIELDS ===== */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block font-medium mb-2">Title <span className="text-error">*</span></label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input input-bordered w-full input-lg"
              placeholder="e.g. Grocery shopping"
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block font-medium mb-2">Amount <span className="text-error">*</span></label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="input input-bordered w-full input-lg"
              placeholder="e.g. 250"
              required
              min="1"
            />
          </div>

          {/* Type & Currency */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-2">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="select select-bordered select-lg w-full"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-2">Currency</label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="select select-bordered select-lg w-full"
              >
                <option value="BDT">BDT</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block font-medium mb-2">Date</label>
            <div className="flex gap-3">
              <input
                type="number"
                name="day"
                value={formData.day}
                onChange={handleChange}
                className="input input-bordered input-lg w-full"
                placeholder="Day"
                min="1"
                max="31"
              />
              <select
                name="month"
                value={formData.month}
                onChange={handleChange}
                className="select select-bordered select-lg w-full"
              >
                <option value="">Month</option>
                {[
                  "January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December",
                ].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="input input-bordered input-lg w-full"
                placeholder="Year"
                min="1900"
                max="2100"
              />
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="block font-medium mb-2">Note</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              className="textarea textarea-bordered w-full min-h-40"
              placeholder="Optional notes about this transaction..."
            ></textarea>
          </div>
        </div>

        {/* ===== RIGHT: UPLOAD BOX ===== */}
        <div className="flex flex-col justify-center items-center">
          <div className="bg-base-100 rounded-xl border border-dashed border-base-content/40 px-10 py-16 text-center flex flex-col items-center gap-4 hover:bg-base-200 transition-all">
            <Plus size={48} className="text-primary" />
            <p className="font-medium text-lg">Upload an Invoice</p>
            <p className="text-sm text-base-content/70">(Optional)</p>
            <button type="button" className="btn btn-outline btn-sm mt-4">
              Choose File
            </button>
          </div>
        </div>
      </form>

      {/* ===== ACTION BUTTONS ===== */}
      <div className="mt-8 flex justify-end gap-3">
        <button type="button" className="btn btn-ghost">
          Save as Draft
        </button>
        <button type="submit" onClick={handleSubmit} className="btn btn-primary">
          Save Transaction
        </button>
      </div>
    </div>
   </ArriveAnimationContainer>
  );
}

export default CreateTransactionPage;
