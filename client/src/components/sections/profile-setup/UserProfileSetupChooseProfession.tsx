import { BriefcaseBusiness } from "lucide-react";
import { useState } from "react";
import { useGetPublicProfessionsQuery } from "../../../redux/api/profession.api";
import { useUserProfileSetupFormContext } from "./UserProfileSetupDialog";

interface Props {
  onNext: (id: number) => void;
  onBack: () => void;
}

export default function UserProfileSetupChooseProfession({ onNext, onBack }: Props) {
  const { data: formData, setData: setFormData } = useUserProfileSetupFormContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfession, setSelectedProfession] = useState<number | null>(
    formData.profession_id,
  );
  const { data } = useGetPublicProfessionsQuery({
    limit: 200,
  });
  const professions = data?.data || [];

  const filteredProfessions = professions.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleContinue = () => {
    if (selectedProfession) {
      onNext(selectedProfession);
      setFormData((p) => ({ ...p, profession_id: selectedProfession }));
    }
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="text-center mb-6">
        <div className="p-3 bg-primary/10 rounded-full text-primary inline-block">
          <BriefcaseBusiness size={30} />
        </div>
        <h2 className="text-2xl font-semibold">Choose Your Profession</h2>
        <p className="text-gray-500 mb-8 text-center">
          Select the profession that best describes what you do.
        </p>
      </div>
      {/* Search Input */}
      <div className="mb-5 flex justify-center">
        <input
          type="text"
          placeholder="Search profession..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full max-w-sm"
        />
      </div>

      <div className="grow overflow-y-auto max-h-[50vh] pr-2">
        <div className="   grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
          {filteredProfessions.map(({ name, id }) => (
            <button
              key={id}
              className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-300 min-h-40 ${
                selectedProfession === id
                  ? "border-primary bg-primary/10 scale-105"
                  : "border-base-300 hover:border-primary/50"
              }`}
              onClick={() => setSelectedProfession(id)}
            >
              {/* <BriefcaseBusiness className="w-8 h-8 text-primary mb-2" /> */}
              <span className="text-lg font-medium text-gray-400">{name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between w-full  mt-10 w">
        <button onClick={onBack} className="btn btn-ghost">
          Back
        </button>
        <button onClick={handleContinue} className="btn btn-primary">
          Continue
        </button>
      </div>
    </div>
  );
}
