import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number; // optional stagger/delay
}

const ArriveAnimationContainer: React.FC<AnimatedCardProps> = ({
  children,
  className = "",
  delay = 0,
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, translateY: 10 }}
        animate={{ opacity: 1, scale: 1, translateY: 0 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 15,
          mass: 0.8,
          duration: 0.6,
          delay: delay,
        }}
        exit="exit"
        className={className || "overflow-hidden "}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default ArriveAnimationContainer;
