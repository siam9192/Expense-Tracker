import { useState } from "react";
import { X, DollarSign } from "lucide-react";
import { useGetPublicCurrenciesQuery } from "../../../redux/api/currency.api";
import { useUserProfileSetupFormContext } from "./UserProfileSetupDialog";

function UserProfileSetupChooseCurrency({
  onNext,
  onBack,
}: {
  onNext: (currencyCode: number) => void;
  onBack: () => void;
}) {
   const {data:formData,setData:setFormData} =  useUserProfileSetupFormContext()
  const [selectedCurrency, setSelectedCurrency] = useState<number | null>(formData.currency_id);
   const [searchTerm, setSearchTerm] = useState("");
  const {data} =  useGetPublicCurrenciesQuery({
    limit:200,
    sortBy:"name",
    sortOrder:"asc"
  })

  const currencies = data?.data||[]
  const filteredCurrencies = currencies.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())||c.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const handleContinue = () => {
    if (selectedCurrency) {
      onNext(selectedCurrency);
      setFormData(p=>({
        ...p,
        currency_id:selectedCurrency
      }))
    }
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
         {/* Search Input */}
      <div className="mb-5 flex justify-center">
        <input
          type="text"
          placeholder="Search currency..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full max-w-sm"
        />
      </div>

   <div className="grow overflow-y-auto max-h-[50vh] pr-2">
      <div className=" grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 ">
        {filteredCurrencies.map((cur) => (
          <div
            key={cur.code}
            onClick={() => setSelectedCurrency(cur.id)}
            className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-300 ${
              selectedCurrency === cur.id
                ? "border-primary bg-primary/10 scale-105"
                : "border-base-300 hover:border-primary/50"
            }`}
          >
            <div className="text-3xl">{cur.code}</div>
            <p className="font-semibold mt-2">
              {cur.symbol}
            </p>
            <p className="text-sm text-gray-500">{cur.name}</p>
          </div>
        ))}
      </div>
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
