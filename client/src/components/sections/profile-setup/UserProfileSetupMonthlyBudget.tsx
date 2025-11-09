import { Target } from "lucide-react";
import { useState } from "react";
import { useUserProfileSetupFormContext } from "./UserProfileSetupDialog";

interface Props {
  onNext: () => void;
  onBack: () => void;
  defaultCurrency?: string; // optional, to show user's currency symbol
}

export default function UserProfileSetupMonthlyBudget({
  onNext,
  onBack,
  defaultCurrency = "$",
}: Props) {
   const {data:formData,setData:setFormData} =  useUserProfileSetupFormContext()
  const [budget, setBudget] = useState<number>(formData.monthly_budget||0);
  

  const handleContinue = () => {
    const value = Number(budget);
    if (isNaN(value) || value <= 0) {
      alert("Please enter a valid monthly budget amount.");
      return;
    }

    if(budget) {
      setFormData(_=>({..._,monthly_budget:budget}))
    }
    onNext();
  };

  return (
    <div className="h-full flex flex-col items-center justify-center text-center">
      {/* Header */}
      <div className="flex flex-col items-center space-y-4 mb-8">
        <div className="p-4 bg-base-200 rounded-full">
          <Target className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold">Set Your Monthly Budget</h2>
        <p className="text-gray-500 max-w-sm">
          Tell us how much you plan to spend or save each month. This will help track your financial
          goals.
        </p>
      </div>

      {/* Input field */}
      <div className=" grow w-full max-w-xs">
        <label className="block text-sm font-medium text-gray-600 mb-2">Monthly Budget</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
            {defaultCurrency}
          </span>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="input input-bordered w-full pl-10 text-center text-lg font-semibold"
            placeholder="Enter amount"
            min={0}
          />
        </div>
        <p className="mt-2 text-sm text-gray-500 text-center">
          You can adjust this anytime in settings.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-between w-full  mt-10">
        <button onClick={onBack} className="btn btn-ghost">
          Back
        </button>
        <button disabled={!budget} onClick={handleContinue} className="btn btn-primary">
          Continue
        </button>
      </div>
    </div>
  );
}
