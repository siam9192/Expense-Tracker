import { TextAlignJustify } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import UserDashboardSidebar from "../shared/UserDashboardSidebar";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

function ResponsiveDashboardSideBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const {pathname} = useLocation()
  useEffect(()=>{
    if(open) setOpen(false)
  },[pathname])


  // Motion variants for sidebar
  const sidebarVariants = {
    hidden: { opacity: 0, x: "-100%" },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "-100%" },
  };
  
  
  return (
    <Fragment>
      <button
        onClick={() => setOpen(true)}
        className="p-2 bg-base-300 rounded-lg xl:hidden size-fit "
      >
        <TextAlignJustify />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 h-screen bg-base-300/50"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-10/12 lg:w-1/3 h-screen"
              onClick={(e) => e.stopPropagation()}
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 20,
              }}
            >
              <UserDashboardSidebar />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Fragment>
  );
}

export default ResponsiveDashboardSideBar;
