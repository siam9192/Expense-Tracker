import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Container from "../../components/ui/Container";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { SigninValidation } from "../../validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import authValidations from "../../validations/auth.validation";
import type { SigninPayload } from "../../types/auth.type";
import { DEFAULT_ERROR_MESSAGE } from "../../utils/constant";
import { useSigninMutation } from "../../redux/api/auth.api";
import { storeAuthToken } from "../../utils/helper";
import useDeviceInfo from "../../hooks/useDeviceInfo";
import { useCurrentUserProviderContext } from "../../Provider/CurrentUserProvider";

function SigninPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const deviceInfo = useDeviceInfo();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SigninValidation>({
    resolver: zodResolver(authValidations.signinValidation),
  });

  const [signupMutate, { isLoading }] = useSigninMutation();
  const { userRefetch, userSettingsRefetch } = useCurrentUserProviderContext();
  const handelSignin = handleSubmit(async (data) => {
    try {
      setErrorMessage("");
      const payload: SigninPayload = {
        email: data.email,
        password: data.password,
        session_info: deviceInfo,
      };

      const response = await signupMutate(payload);

      const { data: resData, error } = response;
      if (error) throw error;
      storeAuthToken(resData.data);
      userRefetch();
      userSettingsRefetch();
      navigate("/");
    } catch (error: any) {
      setErrorMessage((error as any)?.data?.message || DEFAULT_ERROR_MESSAGE);
    } finally {
      reset();
    }
  });
  return (
    <Container>
      <div className=" h-screen flex flex-col items-center justify-center py-10">
        <form
          onSubmit={handelSignin}
          className=" w-full md:w-lg bg-base-300 p-8 rounded-2xl shadow-md space-y-6"
        >
          {/* Header */}
          <h1 className="text-2xl md:text-3xl font-semibold text-center">Login your account</h1>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full bg-base-200"
              required
            />
            {errors.email && <p className="text-sm text-error mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="input input-bordered w-full bg-base-200 pr-10"
              required
            />
            {errors.password && (
              <p className="text-sm text-error mt-1">{errors.password.message}</p>
            )}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-primary"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <p className="text-sm text-error mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            disabled={isLoading}
            type="submit"
            className="btn btn-primary w-full mt-4 text-white font-medium"
          >
            Signin
          </button>
          {errorMessage && <p className=" text-error mt-2">{errorMessage}</p>}
          {/* Footer Text */}
          <p className="text-sm text-center text-gray-500 mt-3">
            Don't have an account?{" "}
            <a href="/signup" className="text-primary font-medium hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </Container>
  );
}

export default SigninPage;
