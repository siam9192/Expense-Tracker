import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Container from "../../components/ui/Container";

function SigninPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container>
      <div className=" h-screen flex flex-col items-center justify-center py-10">
        <form className=" w-full md:w-lg bg-base-300 p-8 rounded-2xl shadow-md space-y-6">
          {/* Header */}
          <h1 className="text-2xl md:text-3xl font-semibold text-center">Login your account</h1>

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

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full mt-4 text-white font-medium">
            Signin
          </button>

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
