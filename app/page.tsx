'use client';

import { LockOverlay } from '@/components/LockOverlay';
import { Ticker } from '@/components/Ticker';

export default function Home() {
  // TODO: Replace with actual contract address when available
  const contractAddress = 'CA_PLACEHOLDER_REPLACE_WITH_ACTUAL_ADDRESS';
  // Placeholder link that opens Telegram app
  const telegramLink = 'https://t.me/';

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Lock Overlay - The main interactive feature */}
      <LockOverlay telegramLink={telegramLink} />

      {/* Ticker */}
      <Ticker contractAddress={contractAddress} />
    </main>
  );
}
