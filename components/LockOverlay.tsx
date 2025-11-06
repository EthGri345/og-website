'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLock, FiUnlock } from 'react-icons/fi';
import { SiTelegram } from 'react-icons/si';
import Image from 'next/image';

interface LockOverlayProps {
  telegramLink?: string;
}

export const LockOverlay = ({ telegramLink = 'https://t.me/onlygoon' }: LockOverlayProps) => {
  const [isLocked, setIsLocked] = useState(true);
  const [showUnlockHint, setShowUnlockHint] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowUnlockHint(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleUnlock = () => {
    setIsLocked(false);
  };

  const handleTelegramClick = () => {
    window.open(telegramLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <AnimatePresence>
        {isLocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-40 flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle at center, rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%)',
            }}
          >
            {/* Animated scan line */}
            <motion.div
              animate={{
                y: ['0vh', '100vh'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent blur-sm"
            />

            {/* Static noise overlay */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Mouse follower glow */}
            <motion.div
              animate={{
                x: mousePosition.x - 150,
                y: mousePosition.y - 150,
              }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              className="absolute w-[300px] h-[300px] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255, 61, 143, 0.15) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-4">
              {/* Logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-32 h-32 md:w-48 md:h-48"
              >
                <div className="absolute inset-0 gradient-primary rounded-full blur-3xl opacity-30 animate-pulse" />
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="OnlyGoon Logo"
                    width={192}
                    height={192}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
              </motion.div>

              {/* Lock icon and text */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col items-center gap-4"
              >
                <motion.div
                  animate={{
                    rotate: [0, -5, 5, -5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  className="relative"
                >
                  <div className="absolute inset-0 gradient-primary blur-xl opacity-50" />
                  <FiLock className="relative w-16 h-16 md:w-20 md:h-20 text-primary" />
                </motion.div>

                <h1 className="text-3xl md:text-5xl font-bold text-center gradient-text">
                  ACCESS RESTRICTED
                </h1>

                <p className="text-gray-400 text-center max-w-md text-sm md:text-base">
                  The portal is locked. Find the key to unlock exclusive access.
                </p>
              </motion.div>

              {/* Unlock button */}
              <AnimatePresence>
                {showUnlockHint && (
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleUnlock}
                    className="relative group px-8 py-4 rounded-full font-bold text-white overflow-hidden"
                  >
                    <div className="absolute inset-0 gradient-primary" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundSize: '200% 100%' }} />
                    <div className="relative flex items-center gap-3">
                      <FiUnlock className="w-5 h-5" />
                      <span className="text-sm md:text-base">UNLOCK ACCESS</span>
                    </div>
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Hint text */}
              <AnimatePresence>
                {showUnlockHint && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xs md:text-sm text-gray-500 text-center max-w-xs"
                  >
                    Click to reveal the key
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-4 left-4 md:top-8 md:left-8 w-8 h-8 md:w-12 md:h-12 border-l-2 border-t-2 border-primary/30" />
            <div className="absolute top-4 right-4 md:top-8 md:right-8 w-8 h-8 md:w-12 md:h-12 border-r-2 border-t-2 border-primary/30" />
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-8 h-8 md:w-12 md:h-12 border-l-2 border-b-2 border-primary/30" />
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-8 h-8 md:w-12 md:h-12 border-r-2 border-b-2 border-primary/30" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unlocked content - Telegram reveal */}
      <AnimatePresence>
        {!isLocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative glass-effect rounded-3xl p-8 md:p-12 max-w-lg mx-4 glow-border"
            >
              <button
                onClick={() => setIsLocked(true)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex flex-col items-center gap-6 text-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 gradient-primary blur-2xl opacity-50" />
                    <SiTelegram className="relative w-20 h-20 md:w-24 md:h-24 text-primary" />
                  </div>
                </motion.div>

                <div className="space-y-2">
                  <h2 className="text-2xl md:text-4xl font-bold gradient-text">
                    KEY FOUND
                  </h2>
                  <p className="text-gray-400 text-sm md:text-base">
                    Join our exclusive Telegram community
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleTelegramClick}
                  className="relative group px-8 py-4 rounded-full font-bold text-white overflow-hidden w-full"
                >
                  <div className="absolute inset-0 gradient-primary" />
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <div className="relative flex items-center justify-center gap-3">
                    <SiTelegram className="w-6 h-6" />
                    <span>ENTER PORTAL</span>
                  </div>
                </motion.button>

                <p className="text-xs text-gray-500">
                  Click the button above to join our Telegram
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
