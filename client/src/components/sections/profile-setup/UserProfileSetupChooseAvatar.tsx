import { Check } from "lucide-react";
import { useState } from "react";
import { useGetPublicAvatarsQuery } from "../../../redux/api/avatar.type";
import { useUserProfileSetupFormContext } from "./UserProfileSetupDialog";
interface Props {
  onNext: (avatar: number) => void;
  onBack: () => void;
}
function UserProfileSetupChooseAvatar({ onNext,onBack }: Props) {
  const {data:formData,setData:setFormData} =  useUserProfileSetupFormContext()
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(formData.avatar_id);
  const {data} =  useGetPublicAvatarsQuery({
    limit:200
  })
  const avatars = data?.data||[]

  const handleSelect = (id: number) => {
    setSelectedAvatar(id);
  };

  const handleContinue = () => {
   if(selectedAvatar) {
     onNext(selectedAvatar);
     setFormData(_=>({..._,avatar_id:selectedAvatar}))
   }
  };

  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <h1 className="text-2xl font-semibold mb-2 text-center">Setup your profile</h1>
      <p className="text-gray-500 text-center">Choose your avatar to get started</p>

      {/* Avatar Grid */}
      <div className="grow mt-10 ">
        <div className="flex flex-wrap justify-center gap-6 overflow-y-auto min-h-[40vh] max-h-[50vh] ">
          {avatars.map((avatar, i) => (
            <div
              key={i}
              onClick={() => handleSelect(avatar.id)}
              className={`relative h-fit cursor-pointer rounded-full border-4 transition-all duration-300 ${
                selectedAvatar === avatar.id
                  ? "border-primary scale-105"
                  : "border-transparent hover:border-base-300"
              }`}
            >
              <img
                className="size-32 rounded-full object-cover"
                src={avatar.src}
                alt={`Avatar ${i + 1}`}
              />
              {selectedAvatar === avatar.id && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-full">
                  <Check className="text-white w-8 h-8" />
                </div>
              )}
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
          disabled={!selectedAvatar}
          className="btn btn-primary px-8 text-white disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default UserProfileSetupChooseAvatar;
