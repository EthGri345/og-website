'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { useClipboard } from '@/hooks/useClipboard';

interface CopyButtonProps {
  textToCopy: string;
  label?: string;
}

export const CopyButton = ({ textToCopy, label = 'Contract Address' }: CopyButtonProps) => {
  const { copied, copyToClipboard } = useClipboard();

  const handleCopy = async () => {
    await copyToClipboard(textToCopy);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full max-w-md"
    >
      <div className="glass-effect rounded-2xl p-6 glow-border">
        <div className="flex flex-col gap-3">
          <span className="text-sm text-gray-400 uppercase tracking-wide font-medium">
            {label}
          </span>

          <button
            onClick={handleCopy}
            className="group relative flex items-center justify-between gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-primary/50"
            aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
          >
            <span className="text-sm md:text-base font-mono text-gray-300 truncate flex-1 text-left">
              {textToCopy}
            </span>

            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg gradient-primary group-hover:scale-110 transition-transform duration-300">
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiCheck className="w-5 h-5 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiCopy className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </button>

          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-primary font-medium text-center"
              >
                Copied to clipboard!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
