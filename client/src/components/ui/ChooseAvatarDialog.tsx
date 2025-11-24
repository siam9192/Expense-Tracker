import { useEffect, useState } from "react";
import { Check, Globe } from "lucide-react";
import type { Avatar } from "../../types/avatar.type";
import { useGetPublicAvatarsQuery } from "../../redux/api/avatar.type";
interface Props {
  onConfirm: (avatar: Avatar) => void;
  onCancel?: () => void;
  defaultId?: number;
}
function ChooseAvatarDialog({ onConfirm, onCancel, defaultId }: Props) {
  const id = "choose-avatar-dialog";

  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(defaultId || null);
  const { data } = useGetPublicAvatarsQuery({
    limit: 200,
  });
  const avatars = data?.data || [];

  const open = () => {
    (document?.getElementById(id) as any)?.showModal();
  };
  const close = () => {
    (document?.getElementById(id) as any)?.close();
  };

  useEffect(() => {
    open();
  }, []);

  const handleContinue = () => {
    if (selectedAvatar && selectedAvatar !== defaultId) {
      const find = avatars.find((_) => _.id === selectedAvatar);
      close();
      onConfirm && onConfirm(find!);
    }
  };

  const handleCancel = () => {
    onCancel && onCancel();
    close();
  };

  return (
    <dialog id={id} className="modal">
      <div className="modal-box max-w-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <h1 className="text-2xl font-semibold mb-2 text-center">Your profile avatar</h1>
          <p className="text-gray-500 text-center">Choose your avatar to get started</p>

          {/* Avatar Grid */}
          <div className="grow mt-10 ">
            <div className="flex flex-wrap justify-center gap-6 overflow-y-auto min-h-[40vh] max-h-[50vh] ">
              {avatars.map((avatar, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedAvatar(avatar.id)}
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
            <button onClick={handleCancel} className="btn btn-ghost px-6">
              Close
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
      </div>
    </dialog>
  );
}

export default ChooseAvatarDialog;
