import { Wallet2 } from "lucide-react";
import { useState } from "react";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function UserProfileSetupInitialBalance({ onNext, onBack }: Props) {
  const [balance, setBalance] = useState(0);

  const handleNext = () => {
    // save balance to backend or local state
    console.log("Initial Balance:", balance);
    onNext();
  };

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <div className="flex flex-col items-center text-center space-y-4 mb-8">
        <div className="p-4 bg-base-200 rounded-full">
          <Wallet2 className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold">Set Your Starting Balance</h2>
        <p className="text-gray-500 max-w-sm">
          This is the amount of money you currently have. You can always update it later.
        </p>
      </div>

      <div className=" grow w-full max-w-xs">
        <label className="block text-sm font-medium text-gray-600 mb-2">Current Balance</label>
        <input
          type="number"
          defaultValue={balance}
          onChange={(e) => setBalance(Number(e.target.value))}
          className="input input-bordered w-full text-center text-lg font-semibold"
          placeholder="Enter amount"
          min={0}
        />
        <p className="mt-2 text-sm text-gray-500 text-center">
          Default balance: <span className="text-primary font-medium">$0</span>
        </p>
      </div>

      <div className="flex justify-between w-full  mt-10">
        <button onClick={onBack} className="btn btn-ghost">
          Back
        </button>
        <button onClick={handleNext} className="btn btn-primary">
          Continue
        </button>
      </div>
    </div>
  );
}
