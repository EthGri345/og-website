'use client';

import { LockOverlay } from '@/components/LockOverlay';
import { Ticker } from '@/components/Ticker';
import { XButton } from '@/components/XButton';

export default function Home() {
  // OG Token contract address
  const contractAddress = 'HTU8LZQaTC6dKptdJA6AHDutoRf9kqTfHW9qVXeapump';
  // Telegram community link
  const telegramLink = 'https://t.me/+muEv0hqi5Ug3NjE1';
  // X community link
  const xLink = 'https://x.com/i/communities/1986890630526853327';

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
