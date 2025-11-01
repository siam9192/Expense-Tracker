import { Check } from "lucide-react";
import { useState } from "react";
interface Props {
  onNext: (avatar: string) => void;
}
function UserProfileSetupChooseAvatar({ onNext }: Props) {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const avatars = [
    "https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4866.jpg?semt=ais_hybrid&w=740&q=80",
    "https://img.freepik.com/premium-vector/woman-avatar-profile-picture-isolated-background-avatar-profile-picture-woman_1293239-4867.jpg?w=740",
    "https://img.freepik.com/premium-vector/businessman-avatar-profile-picture_1293239-4845.jpg?w=740",
    "https://img.freepik.com/premium-vector/girl-avatar-profile-picture_1293239-4846.jpg?w=740",
    "https://img.freepik.com/premium-vector/young-man-avatar-profile-picture_1293239-4859.jpg?w=740",
    "https://img.freepik.com/premium-vector/female-avatar-profile-picture_1293239-4860.jpg?w=740",
    "https://img.freepik.com/premium-vector/teen-boy-avatar-profile-picture_1293239-4861.jpg?w=740",
    "https://img.freepik.com/premium-vector/teen-girl-avatar-profile-picture_1293239-4862.jpg?w=740",
    "https://img.freepik.com/premium-vector/old-man-avatar-profile-picture_1293239-4863.jpg?w=740",
    "https://img.freepik.com/premium-vector/old-woman-avatar-profile-picture_1293239-4864.jpg?w=740",
  ];

  const handleSelect = (url: string) => {
    setSelectedAvatar(url);
  };

  const handleContinue = () => {
    onNext(selectedAvatar as string);
  };
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <h1 className="text-2xl font-semibold mb-2 text-center">Setup your profile</h1>
      <p className="text-gray-500 text-center">Choose your avatar to get started</p>

      {/* Avatar Grid */}
      <div className="mt-10  grow">
        <div className="flex flex-wrap justify-center gap-6">
          {avatars.map((url, i) => (
            <div
              key={i}
              onClick={() => handleSelect(url)}
              className={`relative cursor-pointer rounded-full border-4 transition-all duration-300 ${
                selectedAvatar === url
                  ? "border-primary scale-105"
                  : "border-transparent hover:border-base-300"
              }`}
            >
              <img
                className="size-32 rounded-full object-cover"
                src={url}
                alt={`Avatar ${i + 1}`}
              />
              {selectedAvatar === url && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-full">
                  <Check className="text-white w-8 h-8" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-10 flex justify-end gap-4">
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
