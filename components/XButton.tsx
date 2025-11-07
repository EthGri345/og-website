'use client';

import { motion } from 'framer-motion';
import { FaXTwitter } from 'react-icons/fa6';

interface XButtonProps {
  xLink?: string;
}

export const XButton = ({ xLink = 'https://x.com' }: XButtonProps) => {
  const handleClick = () => {
    window.open(xLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-4 left-4 md:top-8 md:left-8 z-50 cursor-pointer group"
      aria-label="Visit our X community"
    >
      <div className="glass-effect p-3 md:p-4 rounded-full glow-border transition-all duration-300 group-hover:scale-105">
        <div className="relative">
          {/* Glow effect on hover */}
          <div className="absolute inset-0 gradient-primary rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />

          {/* X icon */}
          <FaXTwitter className="relative w-5 h-5 md:w-6 md:h-6 text-foreground group-hover:text-primary transition-colors duration-300" />
        </div>
      </div>

      {/* Tooltip on hover */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        whileHover={{ opacity: 1, y: 0, scale: 1 }}
        className="absolute top-full left-0 mt-2 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <div className="glass-effect px-3 py-2 rounded-lg">
          <span className="text-xs md:text-sm text-foreground font-medium">
            Follow us on X
          </span>
        </div>
      </motion.div>
    </motion.button>
  );
};
