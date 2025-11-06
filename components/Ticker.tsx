'use client';

import { motion } from 'framer-motion';

export const Ticker = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-4 right-4 md:top-8 md:right-8 z-50"
    >
      <div className="glass-effect px-4 py-2 md:px-6 md:py-3 rounded-full glow-border">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm md:text-lg font-bold gradient-text tracking-wider">
            $OG
          </span>
        </div>
      </div>
    </motion.div>
  );
};
