import { useState } from "react";
import { X, DollarSign } from "lucide-react";

function UserProfileSetupChooseCurrency({
  onNext,
  onBack,
}: {
  onNext: (currencyCode: string) => void;
  onBack: () => void;
}) {
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);

  const currencies = [
    { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
    { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
    { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
    { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
    { code: "BDT", name: "Bangladeshi Taka", symbol: "৳", flag: "🇧🇩" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
    { code: "CAD", name: "Canadian Dollar", symbol: "$", flag: "🇨🇦" },
    { code: "AUD", name: "Australian Dollar", symbol: "$", flag: "🇦🇺" },
  ];

  const handleContinue = () => {
    if (selectedCurrency) onNext(selectedCurrency);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="text-center mb-6">
        <div className="p-3 bg-primary/10 rounded-full text-primary inline-block">
          <DollarSign size={30} />
        </div>
        <h2 className="text-2xl font-semibold mt-3">Choose Your Currency</h2>
        <p className="text-gray-500 text-sm">Select your default currency for all transactions</p>
      </div>

      <div className=" grow grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
        {currencies.map((cur) => (
          <div
            key={cur.code}
            onClick={() => setSelectedCurrency(cur.code)}
            className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-300 ${
              selectedCurrency === cur.code
                ? "border-primary bg-primary/10 scale-105"
                : "border-base-300 hover:border-primary/50"
            }`}
          >
            <div className="text-3xl">{cur.flag}</div>
            <p className="font-semibold mt-2">
              {cur.symbol} {cur.code}
            </p>
            <p className="text-sm text-gray-500">{cur.name}</p>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-between">
        <button onClick={onBack} className="btn btn-ghost px-6">
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={!selectedCurrency}
          className="btn btn-primary px-8 text-white disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default UserProfileSetupChooseCurrency;
