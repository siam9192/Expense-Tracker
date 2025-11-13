import { createContext, useContext, useState } from "react";
import UserProfileSetupChooseAvatar from "./UserProfileSetupChooseAvatar";
import UserProfileSetupChooseCountry from "./UserProfileSetupChooseCountry";
import UserProfileSetupChooseCurrency from "./UserProfileSetupChooseCurrency";
import UserProfileSetupChooseLanguage from "./UserProfileSetupChooseLanguage";
import UserProfileSetupSectionArrivalAnimationContainer from "./UserProfileSetupSectionArrivalAnimationContainer";
import UserProfileSetupSuccessMessage from "./UserProfileSetupSuccessful";
import UserProfileSetupChooseProfession from "./UserProfileSetupChooseProfession";
import UserProfileSetupInitialBalance from "./UserProfileSetupInitialBalance";
import UserProfileSetupMonthlyBudget from "./UserProfileSetupMonthlyBudget";
import UserProfileSetupNameGender from "./UserProfileSetupNameGender";

import { AppLanguage } from "../../../types/settings.type";
import { Gender, type UserProfileSetupProfilePayload } from "../../../types/user.type";
import { useSetupUserProfileMutation } from "../../../redux/api/user.api";

// ---------------------- //
// Types
// ---------------------- //
type Data = {
  name: string | null;
  gender: Gender | null;
  avatar_id: number | null;
  profession_id: number | null;
  country_id: number | null;
  currency_id: number | null;
  monthly_budget: number;
  spendable_balance: number;
  language: AppLanguage;
};

type UserProfileSetupFormProviderType = {
  data: Data;
  setData: React.Dispatch<React.SetStateAction<Data>>;
};

// ---------------------- //
// Context Setup
// ---------------------- //
const UserProfileSetupFormProvider = createContext<UserProfileSetupFormProviderType | null>(null);

export function useUserProfileSetupFormContext() {
  const context = useContext(UserProfileSetupFormProvider);
  if (!context) throw new Error("useUserProfileSetupFormContext must be used within Provider");
  return context as UserProfileSetupFormProviderType;
}

// ---------------------- //
// Component
// ---------------------- //
function UserProfileSetupDialog() {
  const [step, setStep] = useState(1);
  const [prevStep, setPrevStep] = useState(0);

  const [data, setData] = useState<Data>({
    name: "",
    gender: null,
    avatar_id: null,
    profession_id: null,
    currency_id: null,
    country_id: null,
    monthly_budget: 100,
    spendable_balance: 0,
    language: AppLanguage.English,
  });

  const updateStep = (nextStep: number) => {
    setPrevStep(step);
    setStep(nextStep);
  };

  const [setupMutate, { isLoading: isSetupLoading }] = useSetupUserProfileMutation();
  const handelSetupProfile = async () => {
    try {
      const { language, ...payload } = data;
      const { error } = await setupMutate(payload as UserProfileSetupProfilePayload);
      if (error) throw error;
      localStorage.setItem("app-language", language);
      setStep(9);
    } catch (error: any) {}
  };

  // ---------------------- //
  // Render Steps
  // ---------------------- //
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <UserProfileSetupSectionArrivalAnimationContainer step={step} prevStep={prevStep}>
            <UserProfileSetupNameGender onNext={() => updateStep(2)} />
          </UserProfileSetupSectionArrivalAnimationContainer>
        );

      case 2:
        return (
          <UserProfileSetupSectionArrivalAnimationContainer step={step} prevStep={prevStep}>
            <UserProfileSetupChooseAvatar
              onNext={() => updateStep(3)}
              onBack={() => updateStep(1)}
            />
          </UserProfileSetupSectionArrivalAnimationContainer>
        );

      case 3:
        return (
          <UserProfileSetupSectionArrivalAnimationContainer step={step} prevStep={prevStep}>
            <UserProfileSetupChooseCountry
              onNext={() => updateStep(4)}
              onBack={() => updateStep(2)}
            />
          </UserProfileSetupSectionArrivalAnimationContainer>
        );

      case 4:
        return (
          <UserProfileSetupSectionArrivalAnimationContainer step={step} prevStep={prevStep}>
            <UserProfileSetupChooseCurrency
              onNext={() => updateStep(5)}
              onBack={() => updateStep(3)}
            />
          </UserProfileSetupSectionArrivalAnimationContainer>
        );

      case 5:
        return (
          <UserProfileSetupSectionArrivalAnimationContainer step={step} prevStep={prevStep}>
            <UserProfileSetupChooseProfession
              onNext={() => updateStep(6)}
              onBack={() => updateStep(4)}
            />
          </UserProfileSetupSectionArrivalAnimationContainer>
        );

      case 6:
        return (
          <UserProfileSetupSectionArrivalAnimationContainer step={step} prevStep={prevStep}>
            <UserProfileSetupInitialBalance
              onNext={() => updateStep(7)}
              onBack={() => updateStep(5)}
            />
          </UserProfileSetupSectionArrivalAnimationContainer>
        );

      case 7:
        return (
          <UserProfileSetupSectionArrivalAnimationContainer step={step} prevStep={prevStep}>
            <UserProfileSetupMonthlyBudget
              onNext={() => updateStep(8)}
              onBack={() => updateStep(6)}
            />
          </UserProfileSetupSectionArrivalAnimationContainer>
        );

      case 8:
        return (
          <UserProfileSetupSectionArrivalAnimationContainer step={step} prevStep={prevStep}>
            <UserProfileSetupChooseLanguage
              onNext={handelSetupProfile}
              onBack={() => updateStep(7)}
              isLoading={isSetupLoading}
            />
          </UserProfileSetupSectionArrivalAnimationContainer>
        );

      case 9:
        return <UserProfileSetupSuccessMessage />;

      default:
        return null;
    }
  };

  // ---------------------- //
  // JSX
  // ---------------------- //
  return (
    <UserProfileSetupFormProvider.Provider value={{ data, setData }}>
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 backdrop-blur-sm">
        <div className="bg-base-100 p-8 rounded-2xl shadow-xl w-full max-w-5xl relative h-[90vh] overflow-y-auto lg:mx-0 mx-2 hide-scrollbar">
          {renderStep()}
        </div>
      </div>
    </UserProfileSetupFormProvider.Provider>
  );
}

export default UserProfileSetupDialog;
