import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface Props {
  children: React.ReactNode;
  step: number; // current step number
  prevStep?: number; // previous step number
}

const UserProfileSetupSectionArrivalAnimationContainer: React.FC<Props> = ({
  children,
  step,
  prevStep = 0,
}) => {
  // Determine animation direction
  const isNext = step > prevStep;

  const variants = {
    initial: (direction: boolean) => ({
      x: direction ? 100 : -100, // next: right → 100, back: left → -100
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    exit: (direction: boolean) => ({
      x: direction ? -100 : 100, // next: exit left, back: exit right
      opacity: 0,
      transition: { duration: 0.4, ease: "easeInOut" },
    }),
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step} // key must change for AnimatePresence to detect exit/enter
        custom={isNext}
        variants={variants as any}
        initial="initial"
        animate="animate"
        exit="exit"
        className="h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default UserProfileSetupSectionArrivalAnimationContainer;
