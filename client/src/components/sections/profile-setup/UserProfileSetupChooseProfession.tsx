import { Briefcase, Laptop, Stethoscope, GraduationCap, Wrench, Palette } from "lucide-react";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const professions = [
  { label: "Software Developer", icon: Laptop },
  { label: "Doctor", icon: Stethoscope },
  { label: "Teacher", icon: GraduationCap },
  { label: "Engineer", icon: Wrench },
  { label: "Designer", icon: Palette },
  { label: "Business Professional", icon: Briefcase },
  { label: "Other", icon: Briefcase },
];

export default function UserProfileSetupChooseProfession({ onNext, onBack }: Props) {
  return (
    <div className="h-full w-full flex flex-col">
      <h2 className="text-2xl font-semibold mb-6">Choose Your Profession</h2>
      <p className="text-gray-500 mb-8 text-center">
        Select the profession that best describes what you do.
      </p>

      <div className="grow">
        <div className="   grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 w-full max-w-3xl">
          {professions.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="flex flex-col items-center justify-center p-5 bg-base-200 rounded-xl shadow hover:shadow-md hover:bg-base-300 transition-all duration-300 "
            >
              <Icon className="w-8 h-8 text-primary mb-2" />
              <span className="text-sm font-medium text-gray-600">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between w-full  mt-10 w">
        <button onClick={onBack} className="btn btn-ghost">
          Back
        </button>
        <button onClick={onNext} className="btn btn-primary">
          Continue
        </button>
      </div>
    </div>
  );
}
