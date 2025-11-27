import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

function DashboardLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-base-200 z-50">

      {/* Dashboard Title */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-primary mb-6"
      >
        Dashboard Loading
      </motion.h1>

      {/* Loader Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
        className="bg-primary/10 p-6 rounded-full shadow-inner mb-4"
      >
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </motion.div>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-base-content text-sm opacity-70"
      >
        Preparing your dashboard...
      </motion.p>
    </div>
  );
}

export default DashboardLoader;
