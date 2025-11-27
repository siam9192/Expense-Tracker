import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface AppLoaderProps {
  children: ReactNode;
  delay?: number; // optional custom loading time (default 2s)
}

function AppLoader({ children, delay = 2000 }: AppLoaderProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (loading) {
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
            Loading Application...
          </motion.p>
        </motion.div>

        {/* Animated bottom bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: delay / 1000, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 h-1 bg-primary"
        ></motion.div>
      </div>
    );
  }

  // After loading completes → show children
  return <>{children}</>;
}

export default AppLoader;
