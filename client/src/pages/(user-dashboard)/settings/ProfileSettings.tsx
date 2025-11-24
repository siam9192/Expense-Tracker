import { User } from "lucide-react";

import ArriveAnimationContainer from "../../../components/ui/ArriveAnimationContainer";
import { useCurrentUserProviderContext } from "../../../Provider/CurrentUserProvider";
import { Gender } from "../../../types/user.type";
import { useState } from "react";
import ChooseCountryDialog from "../../../components/ui/ChooseCountryDialog";
import type { Avatar } from "../../../types/avatar.type";
import type { Country } from "../../../types/country.type";
import ChooseAvatarDialog from "../../../components/ui/ChooseAvatarDialog";
import type { UpdateUserProfileValidation } from "../../../validations/user.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import userValidation from "../../../validations/user.validation";
import { useForm } from "react-hook-form";
import { useUpdateUserProfileMutation } from "../../../redux/api/user.api";
import { toast } from "sonner";
import { DEFAULT_ERROR_MESSAGE } from "../../../utils/constant";
import { useTranslation } from "react-i18next";
const genderOptions = [
  {
    label: "Male",
    value: Gender.MALE,
  },
  {
    label: "Female",
    value: Gender.FEMALE,
  },
  {
    label: "Others",
    value: Gender.OTHER,
  },
];
function ProfileSettings() {
  const { t } = useTranslation();
  const { user } = useCurrentUserProviderContext();
  const { avatar, country } = user!;
  const [isCountryDialog, setIsCountryDialog] = useState(false);
  const [isAvatarDialog, setIsAvatarDialog] = useState(false);
  const [avatarSt, setAvatarSt] = useState<Avatar>(avatar);
  const [countrySt, setCountrySt] = useState<Country>(country);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateUserProfileValidation>({
    resolver: zodResolver(userValidation.updateUserProfileValidation),
    defaultValues: {
      name: user?.name,
      gender: user?.gender,
    },
  });

  const [mutate, { isLoading }] = useUpdateUserProfileMutation();

  const saveProfile = handleSubmit(async (data) => {
    try {
      const { error } = await mutate(data);
      if (error) throw error;
      toast.success("Profile saved successfully");
    } catch (error: any) {
      toast.error(error.data.message || DEFAULT_ERROR_MESSAGE);
    } finally {
    }
  });

  return (
    <ArriveAnimationContainer delay={0.3}>
      <form onSubmit={saveProfile} className="p-6 bg-base-300 rounded-2xl  space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <User className="text-primary" /> {t("profileSettings")}
        </h2>
        <div className="text-center">
          <img src={avatarSt.src} alt="" className="size-40 rounded-full mx-auto" />
          <button
            type="button"
            onClick={() => setIsAvatarDialog(true)}
            className="px-4 py-2  btn btn-secondary mt-3"
          >
            Change Avatar
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-neutral-content">Full Name</label>
            <input
              {...register("name")}
              type="text"
              placeholder="John Doe"
              className="input input-bordered w-full"
            />
            {errors.name && <p className="mt-1 text-sm text-error">{errors.name.message}</p>}
          </div>

          <div>
            <label className="text-sm text-neutral-content">Email</label>
            <input
              type="email"
              placeholder="john@example.com"
              className="input input-bordered w-full"
              value={user?.email}
              disabled
            />
          </div>

          <div>
            <label className="text-sm text-neutral-content">Gender</label>
            <select {...register("gender")} className="select select-bordered w-full">
              {genderOptions.map((opt) => (
                <option value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-neutral-content">Country</label>
            <button
              type="button"
              onClick={() => {
                setIsCountryDialog(true);
              }}
              className="select select-bordered w-full"
            >
              <img src={countrySt.flag_svg} className="w-6" alt="" />
              {countrySt.name}
            </button>
          </div>
        </div>

        <div className="text-right">
          <button disabled={isLoading} className="btn btn-primary">
            Save Profile
          </button>
        </div>
      </form>

      {/* Dialog*/}
      {isCountryDialog ? (
        <ChooseCountryDialog
          defaultId={country.id}
          onConfirm={(cn) => {
            setCountrySt(cn);
            setIsCountryDialog(false);
            setValue("country_id", cn.id);
          }}
        />
      ) : null}

      {isAvatarDialog ? (
        <ChooseAvatarDialog
          defaultId={avatar.id}
          onConfirm={(av) => {
            setAvatarSt(av);
            setIsAvatarDialog(false);
            setValue("avatar_id", av.id);
          }}
        />
      ) : null}
    </ArriveAnimationContainer>
  );
}

export default ProfileSettings;
