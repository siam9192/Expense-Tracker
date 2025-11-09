import { useState } from "react";
import {  Globe } from "lucide-react";
import { AppLanguage } from "../../../types/settings.type";

const languages = [
  { code: "en", name: "English", value:AppLanguage.English },
  { code: "bn", name: "Bangla", value:AppLanguage.Bangla},
];

interface Props {
  onNext: (languageCode: string) => void;
  onBack: () => void;
}

function UserProfileSetupChooseLanguage({ onNext, onBack }: Props) {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedLanguage) onNext(selectedLanguage);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="p-3 bg-primary/10 rounded-full text-primary inline-block">
          <Globe size={30} />
        </div>
        <h2 className="text-2xl font-semibold mt-3">Choose App Language</h2>
        <p className="text-gray-500 text-sm">Select the default language for the app</p>
      </div>

      {/* Language Grid */}
      <div className=" grow grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
        {languages.map((lang) => (
          <div
            key={lang.code}
            onClick={() => setSelectedLanguage(lang.value)}
            className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-300 h-40 ${
              selectedLanguage === lang.code
                ? "border-primary bg-primary/10 scale-105"
                : "border-base-300 hover:border-primary/50"
            }`}
          
          
          >
            <span className="text-3xl">{lang.code}</span>
            <p className="font-semibold mt-2">{lang.name}</p>
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
          disabled={!selectedLanguage}
          className="btn btn-primary px-8 text-white disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default UserProfileSetupChooseLanguage;
