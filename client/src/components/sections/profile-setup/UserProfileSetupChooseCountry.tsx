import { useState } from "react";
import { Globe } from "lucide-react";

import { useGetPublicCountriesQuery } from "../../../redux/api/country.api";
import { useUserProfileSetupFormContext } from "./UserProfileSetupDialog";

interface Props {
  onNext: (countryCode: number) => void;
  onBack: () => void;
}

function UserProfileSetupChooseCountry({ onNext, onBack }: Props) {
  const { data: formData, setData: setFormData } = useUserProfileSetupFormContext();

  const [selectedCountry, setSelectedCountry] = useState<number | null>(formData.country_id);
  const [searchTerm, setSearchTerm] = useState("");

  const { data } = useGetPublicCountriesQuery({
    limit: 250,
    sortBy: "name",
    sortOrder: "asc",
  });
  const countries = data?.data || [];

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleContinue = () => {
    if (selectedCountry) {
      setFormData((p) => ({ ...p, country_id: selectedCountry }));
      onNext(selectedCountry);
    }
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
              onClick={() => setSelectedCountry(country.id)}
              className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-300 ${
                selectedCountry === country.id
                  ? "border-primary bg-primary/10 "
                  : "border-base-300 hover:border-primary/50"
              }`}
            >
              <img src={country.flag_png} alt="" className="w-32  h-20 object-cover" />
              <div className="mt-2 text-center">
                <span className="text-3xl">{country.code}</span>
                <p className="font-semibold mt-2">{country.name}</p>
              </div>
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
