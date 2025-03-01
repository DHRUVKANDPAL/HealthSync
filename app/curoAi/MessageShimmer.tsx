import React from "react";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";

const MessageLoadingShimmer = () => {
  const shimmerVariants = {
    initial: {
      backgroundPosition: "-468px 0",
    },
    animate: {
      backgroundPosition: "468px 0",
    },
  };

  return (
    <div className="flex flex-col space-y-2 mb-8">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center">
          <Bot className="h-4 w-4 text-white" />
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          CuroAI Assistant
        </div>
      </div>
      <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg">
        <div className="space-y-4">
          {/* Loading Dots */}
          <div className="flex space-x-2 mb-4">
            <motion.div
              className="w-2 h-2 bg-violet-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            <motion.div
              className="w-2 h-2 bg-violet-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="w-2 h-2 bg-violet-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: 0.4 }}
            />
          </div>

          {/* Shimmer Lines */}
          {[1, 2].map((_, index) => (
            <motion.div
              key={index}
              className="h-4 w-full rounded"
              style={{
                background:
                  "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                backgroundSize: "936px",
              }}
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
                delay: 0.1 * index,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageLoadingShimmer;
