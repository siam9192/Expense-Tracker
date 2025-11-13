import { useState } from "react";
import { User, User2, UserCog, UserCircle2 } from "lucide-react";
import { useUserProfileSetupFormContext } from "./UserProfileSetupDialog";
import { Gender } from "../../../types/user.type";

interface Props {
  onNext: () => void;
}

const NAME_MIN_LENGTH = 1;
const NAME_MAX_LENGTH = 20;

export default function UserProfileSetupNameGender({ onNext }: Props) {
  const { data, setData } = useUserProfileSetupFormContext();
  const [name, setName] = useState(data.name || "");
  const [gender, setGender] = useState<Gender | null>(data.gender);
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!name?.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!gender) {
      setError("Please select your gender.");
      return;
    }
    setError("");
    setData((_) => ({ ..._, name, gender }));
    onNext();
  };

  const genderOptions = [
    { label: "Male", value: Gender.MALE, icon: User2 },
    { label: "Female", value: Gender.FEMALE, icon: UserCircle2 },
    { label: "Other", value: Gender.OTHER, icon: UserCog },
  ];

  const isFormValid =
    name.trim().length >= NAME_MIN_LENGTH && name.trim().length <= NAME_MAX_LENGTH && !!gender;

  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-6">
      {/* Header */}
      <div className="flex flex-col items-center space-y-4 mb-8">
        <div className="p-4 bg-base-200 rounded-full shadow-sm">
          <User className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold">Set Up Your Profile</h2>
        <p className="text-gray-500 max-w-sm">
          Tell us a bit about yourself to personalize your experience.
        </p>
      </div>

      {/* Form */}
      <div className="grow w-full max-w-sm space-y-6">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Full Name</label>
          <p className="text-end text-xs mb-1 text-gray-400">
            <span>{name.length}</span>/<span>{NAME_MAX_LENGTH}</span>
          </p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, NAME_MAX_LENGTH))}
            className="input input-bordered w-full text-center text-lg font-semibold"
            placeholder="Enter your full name"
          />
        </div>

        {/* Gender Field */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-3">Gender</label>
          <div className="grid grid-cols-3 gap-4">
            {genderOptions.map((option) => {
              const Icon = option.icon;
              const isActive = gender === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setGender(option.value)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200
                    ${
                      isActive
                        ? "border-primary bg-primary/10 text-primary shadow-sm scale-105"
                        : "border-base-300 hover:border-primary/40 hover:bg-base-200"
                    }`}
                >
                  <Icon className={`w-8 h-8 mb-2 ${isActive ? "text-primary" : "text-gray-500"}`} />
                  <span className="font-medium">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
      </div>

      {/* Continue Button */}
      <div className="flex justify-center w-full mt-10 max-w-sm">
        <button
          onClick={handleNext}
          disabled={!isFormValid}
          className={`btn btn-primary w-full transition-transform duration-200 ${
            isFormValid ? "hover:scale-105" : "opacity-50 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
