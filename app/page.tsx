'use client';

import { LockOverlay } from '@/components/LockOverlay';
import { Ticker } from '@/components/Ticker';

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
    </main>
  );
}
