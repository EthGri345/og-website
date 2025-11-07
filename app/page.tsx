'use client';

import { LockOverlay } from '@/components/LockOverlay';
import { Ticker } from '@/components/Ticker';
import { XButton } from '@/components/XButton';

export default function Home() {
  // TODO: Replace with actual contract address when available
  const contractAddress = 'CA_PLACEHOLDER_REPLACE_WITH_ACTUAL_ADDRESS';
  // Telegram community link
  const telegramLink = 'https://t.me/+muEv0hqi5Ug3NjE1';
  // Placeholder X/Twitter link
  const xLink = 'https://x.com';

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Lock Overlay - The main interactive feature */}
      <LockOverlay telegramLink={telegramLink} />

      {/* X Button */}
      <XButton xLink={xLink} />

      {/* Ticker */}
      <Ticker contractAddress={contractAddress} />
    </main>
  );
}
