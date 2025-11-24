import { ShieldCheck } from "lucide-react";

import UserSessions from "../../../components/sections/user-dashboard/UserSessions";
import ArriveAnimationContainer from "../../../components/ui/ArriveAnimationContainer";
import { useChangePasswordMutation } from "../../../redux/api/auth.api";
import { toast } from "sonner";
import { DEFAULT_ERROR_MESSAGE } from "../../../utils/constant";
import { useForm } from "react-hook-form";
import type { ChangePasswordValidation } from "../../../validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import authValidations from "../../../validations/auth.validation";
import { useTranslation } from "react-i18next";

function SecuritySettings() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordValidation>({
    resolver: zodResolver(authValidations.changePasswordPayloadValidation),
    defaultValues: {
      signout_others: true,
    },
  });

  const [mutate, { isLoading }] = useChangePasswordMutation();

  const handelChangePassword = handleSubmit(async (data) => {
    try {
      const { error } = await mutate({
        old_password: data.old_password,
        new_password: data.new_password,
        signout_others: data.signout_others,
      });
      if (error) throw error;
      reset();
      toast.success("Password changed successfully");
    } catch (error: any) {
      toast.error(error.data.message || DEFAULT_ERROR_MESSAGE);
    } finally {
    }
  });

  return (
    <ArriveAnimationContainer delay={0.3}>
      <div>
        <div className="p-6 bg-base-300 rounded-2xl  space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <ShieldCheck className="text-primary" /> {t("securitySettings")}
          </h2>

          <form onSubmit={handelChangePassword} className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-neutral-content">Old Password</label>
              <input
                {...register("old_password")}
                type="password"
                placeholder="Old password"
                className="input input-bordered w-full"
              />
              {errors.old_password && (
                <p className="mt-1 text-sm text-error">{errors.old_password.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-neutral-content">New Password</label>
              <input
                {...register("new_password")}
                type="text"
                placeholder="New password"
                className="input input-bordered w-full"
              />
              {errors.new_password && (
                <p className="mt-1 text-sm text-error">{errors.new_password.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-neutral-content">Confirm Password</label>
              <input
                {...register("confirm_password")}
                type="text"
                placeholder="Confirm password"
                className="input input-bordered w-full"
              />
              {errors.confirm_password && (
                <p className="mt-1 text-sm text-error">{errors.confirm_password.message}</p>
              )}
            </div>

            <div className="flex  gap-2">
              <input
                type="checkbox"
                onChange={(e) => setValue("signout_others", e.target.checked)}
                checked={getValues("signout_others")}
                className="checkbox checkbox-primary"
              />{" "}
              <label className="text-sm text-neutral-content">Logout from others</label>
            </div>
            <div className="text-right">
              <button disabled={isLoading} className="btn btn-primary">
                Update Password
              </button>
            </div>

            <hr className="my-4 border-base-300" />

            {/* <div className="flex justify-between items-center bg-base-100 p-4 rounded-xl">
              <p>Two-Factor Authentication</p>
              <input type="checkbox" className="toggle toggle-warning" />
            </div> */}
          </form>
        </div>

        <UserSessions />
      </div>
    </ArriveAnimationContainer>
  );
}

export default SecuritySettings;
