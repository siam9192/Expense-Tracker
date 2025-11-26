import { motion } from "framer-motion";
import { LogIn, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ThemeSwitchButton from "../../../components/ui/ThemeSwitchButton";

function WelcomePage() {
  const router = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-base-content px-6 text-center">
      {/* Animated Hero */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-extrabold mb-4"
        >
          Welcome to <span className="text-primary">ExpenseTrackr</span> 💰
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-neutral-content mb-8 leading-relaxed"
        >
          Simplify your financial life — track income, manage expenses, visualize savings, and gain
          control over your budget all in one place.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="btn btn-primary btn-wide gap-2" onClick={() => router("/signin")}>
            <LogIn size={18} /> Signin
          </button>

          <button className="btn btn-outline btn-wide gap-2" onClick={() => router("/signup")}>
            <UserPlus size={18} /> Sign Up
          </button>
        </motion.div>
      </motion.div>

      {/* Decorative Illustration */}
      <motion.img
        src="/images/team-discussion.webp"
        alt="Welcome Illustration"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="w-[280px] md:w-[400px]"
      />

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-sm text-neutral-content mt-8"
      >
        © {new Date().getFullYear()} ExpenseTrackr. All rights reserved.
      </motion.p>

      <div className="size-fit absolute top-2 left-2">
        <ThemeSwitchButton />
      </div>
    </div>
  );
}

export default WelcomePage;
