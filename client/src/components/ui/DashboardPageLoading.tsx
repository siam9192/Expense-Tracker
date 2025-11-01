import { motion } from "framer-motion";

function DashboardPageLoading() {
  return (
    <div className="p-8 space-y-8">
      {/* Header Skeleton */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div className="h-8 w-40 bg-base-300 rounded-md animate-pulse"></div>
        <div className="h-10 w-32 bg-base-300 rounded-md animate-pulse"></div>
      </motion.div>

      {/* Balance Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-6 bg-base-200 rounded-xl border border-base-300 space-y-3 animate-pulse"
          >
            <div className="h-5 w-32 bg-base-300 rounded"></div>
            <div className="h-8 w-20 bg-base-300 rounded"></div>
          </div>
        ))}
      </motion.div>

      {/* Chart Section Skeleton */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-base-200 p-8 rounded-xl border border-base-300 h-80 animate-pulse"
      >
        <div className="h-full w-full bg-base-300 rounded-lg"></div>
      </motion.div>

      {/* Recent Transactions Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-base-200 p-6 rounded-xl border border-base-300"
      >
        <div className="h-6 w-44 bg-base-300 rounded mb-4 animate-pulse"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex justify-between items-center border-b border-base-300 pb-2"
            >
              <div className="h-4 w-32 bg-base-300 rounded animate-pulse"></div>
              <div className="h-4 w-16 bg-base-300 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default DashboardPageLoading;
