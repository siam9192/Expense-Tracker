import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useProfileSetupProviderContext } from "../../../Provider/ProfileSetupProvider";
import { useNavigate } from "react-router-dom";

interface Props {
  onFinish?: () => void;
}
function UserProfileSetupSuccessMessage({ onFinish }: Props) {
  const { setIsOpen, setIsComplete } = useProfileSetupProviderContext();
  const navigate = useNavigate();

  const handelFinish = () => {
    onFinish && onFinish();
    setIsOpen(false);
    setIsComplete(true);
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center justify-center text-center space-y-6 p-8 h-[60vh]"
    >
      <div className="relative">
        <CheckCircle2 className="w-24 h-24 text-success animate-bounce" />
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-success/40 animate-ping"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.3, opacity: 0 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      </div>

      <h2 className="text-3xl font-semibold text-success">Profile Setup Complete 🎉</h2>
      <p className="text-gray-500 max-w-md">
        Congratulations! Your profile is all set up. You can now explore your dashboard and start
        using all the features.
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handelFinish}
        className="btn btn-primary px-6 mt-4"
      >
        Continue to Dashboard
      </motion.button>
    </motion.div>
  );
}

export default UserProfileSetupSuccessMessage;
