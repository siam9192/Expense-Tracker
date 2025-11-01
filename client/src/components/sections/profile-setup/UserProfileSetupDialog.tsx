import { useState } from "react";
import UserProfileSetupChooseAvatar from "./UserProfileSetupChooseAvatar";
import UserProfileSetupChooseCountry from "./UserProfileSetupChooseCountry";
import UserProfileSetupChooseCurrency from "./UserProfileSetupChooseCurrency";
import UserProfileSetupChooseLanguage from "./UserProfileSetupChooseLanguage";
import UserProfileSetupSectionArrivalAnimationContainer from "./UserProfileSetupSectionArrivalAnimationContainer";
import UserProfileSetupSuccessMessage from "./UserProfileSetupSuccessful";
import UserProfileSetupChooseProfession from "./UserProfileSetupChooseProfession";
import UserProfileSetupInitialBalance from "./UserProfileSetupInitialBalance";
import UserProfileSetupMonthlyBudget from "./UserProfileSetupMonthlyBudget";

function UserProfileSetupDialog() {
  const [step, setStep] = useState(1);
  const [prevStep, setPrevStep] = useState(0);

  const updateStep = (upStep: number) => {
    setPrevStep(step);
    setStep(upStep);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 backdrop-blur-sm">
      <div className="bg-base-100 p-8 rounded-2xl shadow-xl w-full max-w-5xl relative  h-[90vh]  overflow-y-auto lg:mx-0 mx-2 hide-scrollbar ">
        {step === 1 ? (
          <UserProfileSetupSectionArrivalAnimationContainer step={step} prevStep={prevStep}>
            <UserProfileSetupChooseAvatar onNext={() => updateStep(2)} />
          </UserProfileSetupSectionArrivalAnimationContainer>
        ) : step === 2 ? (
          <UserProfileSetupSectionArrivalAnimationContainer step={step} prevStep={prevStep}>
            <UserProfileSetupChooseCountry
              onNext={() => updateStep(3)}
              onBack={() => updateStep(1)}
            />
          </UserProfileSetupSectionArrivalAnimationContainer>
        ) : step === 3 ? (
          <UserProfileSetupSectionArrivalAnimationContainer step={step} prevStep={prevStep}>
            <UserProfileSetupChooseCurrency
              onNext={() => updateStep(4)}
              onBack={() => updateStep(2)}
            />
          </UserProfileSetupSectionArrivalAnimationContainer>
        ) : step === 4 ? (
          <UserProfileSetupSectionArrivalAnimationContainer step={step} prevStep={prevStep}>
            <UserProfileSetupChooseProfession
              onNext={() => updateStep(5)}
              onBack={() => updateStep(3)}
            />
          </UserProfileSetupSectionArrivalAnimationContainer>
        ) : step === 5 ? (
          <UserProfileSetupSectionArrivalAnimationContainer step={step} prevStep={prevStep}>
            <UserProfileSetupChooseLanguage
              onNext={() => updateStep(6)}
              onBack={() => updateStep(4)}
            />
          </UserProfileSetupSectionArrivalAnimationContainer>
        ) : step === 6 ? (
          <UserProfileSetupSectionArrivalAnimationContainer step={step} prevStep={prevStep}>
            <UserProfileSetupInitialBalance
              onNext={() => updateStep(7)}
              onBack={() => updateStep(5)}
            />
          </UserProfileSetupSectionArrivalAnimationContainer>
        ) : step === 7 ? (
          <UserProfileSetupSectionArrivalAnimationContainer step={step} prevStep={prevStep}>
            <UserProfileSetupMonthlyBudget
              onNext={() => updateStep(8)}
              onBack={() => updateStep(7)}
            />
          </UserProfileSetupSectionArrivalAnimationContainer>
        ) : step === 8 ? (
          <UserProfileSetupSuccessMessage />
        ) : null}
      </div>
    </div>
  );
}

export default UserProfileSetupDialog;
