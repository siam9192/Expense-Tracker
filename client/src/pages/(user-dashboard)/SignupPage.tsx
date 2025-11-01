import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Container from "../../components/ui/Container";

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <Container>
        <div className="flex flex-col items-center justify-center py-10">
          <form className=" w-full md:w-lg bg-base-100 p-8 rounded-2xl shadow-md space-y-6">
            {/* Header */}
            <h1 className="text-2xl md:text-3xl font-semibold text-center">Create your account</h1>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="input input-bordered w-full bg-base-200"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full bg-base-200"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="input input-bordered w-full bg-base-200 pr-10"
                required
              />
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
                type="password"
                placeholder="Confirm your password"
                className="input input-bordered w-full bg-base-200"
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full mt-4 text-white font-medium">
              Sign Up
            </button>

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
    </div>
  );
}

export default SignupPage;
