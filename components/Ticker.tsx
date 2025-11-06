'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useClipboard } from '@/hooks/useClipboard';

interface TickerProps {
  contractAddress: string;
}

export const Ticker = ({ contractAddress }: TickerProps) => {
  const { copied, copyToClipboard } = useClipboard();

  const handleClick = async () => {
    await copyToClipboard(contractAddress);
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-4 right-4 md:top-8 md:right-8 z-50 cursor-pointer group"
      aria-label={copied ? 'Contract address copied!' : 'Click to copy contract address'}
    >
      <div className="glass-effect px-4 py-2 md:px-6 md:py-3 rounded-full glow-border transition-all duration-300 group-hover:scale-105">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm md:text-lg font-bold gradient-text tracking-wider">
            $OG
          </span>
        </div>
      </div>

      {/* Copied notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full right-0 mt-2 whitespace-nowrap"
          >
            <div className="glass-effect px-4 py-2 rounded-lg">
              <span className="text-xs md:text-sm text-primary font-medium">
                Copied to clipboard! ✓
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
