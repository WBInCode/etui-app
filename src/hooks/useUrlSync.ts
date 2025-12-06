import { useEffect } from 'react';
import { useConfigStore } from '@/stores/useConfigStore';

/**
 * Hook to initialize configuration from URL on mount
 */
export function useUrlSync() {
  const initializeFromUrl = useConfigStore((state) => state.initializeFromUrl);

  useEffect(() => {
    initializeFromUrl();
  }, [initializeFromUrl]);
}
