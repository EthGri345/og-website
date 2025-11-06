'use client';

import { motion } from 'framer-motion';
import { LockOverlay } from '@/components/LockOverlay';
import { Ticker } from '@/components/Ticker';
import Image from 'next/image';

export default function Home() {
  // TODO: Replace with actual contract address when available
  const contractAddress = 'CA_PLACEHOLDER_REPLACE_WITH_ACTUAL_ADDRESS';
  // TODO: Replace with actual Telegram link
  const telegramLink = 'https://t.me/onlygoon';

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Lock Overlay - The main interactive feature */}
      <LockOverlay telegramLink={telegramLink} />

      {/* Ticker */}
      <Ticker contractAddress={contractAddress} />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16 md:py-24">
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-12 md:gap-16">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-6 text-center"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative w-40 h-40 md:w-56 md:h-56"
            >
              <div className="absolute inset-0 gradient-primary rounded-full blur-3xl opacity-30 animate-pulse" />
              <div className="relative w-full h-full">
                <Image
                  src="/logo.svg"
                  alt="OnlyGoon"
                  width={224}
                  height={224}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </motion.div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                <span className="gradient-text">OnlyGoon</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl">
                Enter the portal. Join the exclusive community.
                <span className="text-primary"> Unlock the key.</span>
              </p>
            </div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
          >
            {[
              {
                title: 'Exclusive',
                description: 'Join an elite community of holders',
                icon: '🔒',
              },
              {
                title: 'Premium',
                description: 'Access premium features and benefits',
                icon: '💎',
              },
              {
                title: 'Community',
                description: 'Connect with like-minded individuals',
                icon: '🚀',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-effect rounded-2xl p-6 hover:glow-border transition-all duration-300"
              >
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="text-4xl">{feature.icon}</div>
                  <h3 className="text-xl font-bold gradient-text">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-500">
              © 2025 OnlyGoon. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
