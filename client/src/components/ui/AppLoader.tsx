import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
function AppLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-base-200 z-50">
      {/* Animated icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
        className="flex flex-col items-center"
      >
        <div className="bg-primary/10 p-6 rounded-full mb-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg font-medium text-base-content"
        >
          Loading Dashboard...
        </motion.p>
      </motion.div>

      {/* Animated bottom bar */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 2000 / 1000, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 h-1 bg-primary"
      ></motion.div>
    </div>
  );
}

export default AppLoader;
