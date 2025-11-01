import { useState } from "react";
import { X, Globe } from "lucide-react";
import { div } from "motion/react-client";

// Optional: You can expand this list or load from a JSON later
const countryList = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "BD", name: "Bangladesh", flag: "🇧🇩" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦" },
];
interface Props {
  onNext: (countryCode: string) => void;
  onBack: () => void;
}

function UserProfileSetupChooseCountry({ onNext, onBack }: Props) {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCountries = countryList.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleContinue = () => {
    if (selectedCountry) onNext(selectedCountry);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="p-3 bg-primary/10 rounded-full text-primary inline-block">
          <Globe size={30} />
        </div>
        <h2 className="text-2xl font-semibold mt-3">Choose Your Country</h2>
        <p className="text-gray-500 text-sm">Select where you live</p>
      </div>

      {/* Search Input */}
      <div className="mb-5 flex justify-center">
        <input
          type="text"
          placeholder="Search country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full max-w-sm"
        />
      </div>

      {/* Country List */}
      <div className="  grow overflow-y-auto max-h-[50vh] pr-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {filteredCountries.map((country) => (
            <div
              key={country.code}
              onClick={() => setSelectedCountry(country.code)}
              className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-300 ${
                selectedCountry === country.code
                  ? "border-primary bg-primary/10 "
                  : "border-base-300 hover:border-primary/50"
              }`}
            >
              <span className="text-3xl">{country.flag}</span>
              <p className="font-semibold mt-2">{country.name}</p>
            </div>
          ))}
        </div>
        {filteredCountries.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No country found</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-between">
        <button onClick={onBack} className="btn btn-ghost px-6">
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={!selectedCountry}
          className="btn btn-primary px-8 text-white disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default UserProfileSetupChooseCountry;
