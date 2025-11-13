import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Container from "../../components/ui/Container";
import useDeviceInfo from "../../hooks/useDeviceInfo";
import { useForm } from "react-hook-form";
import { useSignupMutation } from "../../redux/api/auth.api";
import type { SignupPayload, SignupResponseData } from "../../types/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";
import authValidations, { type SignupValidation } from "../../validations/auth.validation";
import SignupOtpValidationDialog from "../../components/ui/SignupOtpValidationDialog";
import { useProfileSetupProviderContext } from "../../Provider/ProfileSetupProvider";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [response, setResponse] = useState<SignupResponseData | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const deviceInfo = useDeviceInfo();
  const { setIsOpen } = useProfileSetupProviderContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupValidation>({
    resolver: zodResolver(authValidations.signupValidation),
  });

  const [signupMutate, { isLoading }] = useSignupMutation();

  const handelSignup = handleSubmit(async (data) => {
    setErrorMessage("");
    const payload: SignupPayload = {
      email: data.email,
      password: data.password,
      session_info: deviceInfo,
    };

    const response = await signupMutate(payload);

    const { data: resData, error } = response;

    if (error) {
      setErrorMessage((error as any).data.message);
    } else {
      setResponse(resData.data);
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <Container>
        <div className="flex flex-col items-center justify-center py-10">
          <form
            onSubmit={handelSignup}
            className=" w-full md:w-lg bg-base-100 p-8 rounded-2xl shadow-md space-y-6"
          >
            {/* Header */}
            <h1 className="text-2xl md:text-3xl font-semibold text-center">Create your account</h1>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
              <input
                type="email"
                {...register("email")}
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
                placeholder="Create a password"
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
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Confirm Password
              </label>
              <input
                {...register("confirm_password")}
                type="password"
                placeholder="Confirm your password"
                className="input input-bordered w-full bg-base-200"
                required
              />
              {errors.confirm_password && (
                <p className="text-sm text-error mt-1">{errors.confirm_password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              disabled={isLoading}
              type="submit"
              className="btn btn-primary w-full mt-4 text-white font-medium"
            >
              Sign Up
            </button>
            {errorMessage && <p className=" text-error mt-2">{errorMessage}</p>}
            {/* Footer Text */}
            <p className="text-sm text-center text-gray-500 mt-3">
              Already have an account?{" "}
              <a href="/signin" className="text-primary font-medium hover:underline">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </Container>
      {response ? (
        <SignupOtpValidationDialog
          response={response}
          onClose={() => {
            setResponse(null);
            reset();
          }}
          onVerify={() => {
            setIsOpen(true);
            navigate("/");
          }}
        />
      ) : null}
    </div>
  );
}

export default SignupPage;
