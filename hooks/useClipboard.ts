import { useState, useCallback } from 'react';

interface UseClipboardReturn {
  copied: boolean;
  copyToClipboard: (text: string) => Promise<void>;
  error: Error | null;
}

export const useClipboard = (resetDelay: number = 2000): UseClipboardReturn => {
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const copyToClipboard = useCallback(
    async (text: string): Promise<void> => {
      if (!navigator.clipboard) {
        const err = new Error('Clipboard API not supported');
        setError(err);
        return;
      }

      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setError(null);

        setTimeout(() => {
          setCopied(false);
        }, resetDelay);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to copy');
        setError(error);
        setCopied(false);
      }
    },
    [resetDelay]
  );

  return { copied, copyToClipboard, error };
};
