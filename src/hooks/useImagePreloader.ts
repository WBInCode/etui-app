import { useEffect, useState, useCallback } from 'react';

interface PreloadResult {
  loaded: boolean;
  error: boolean;
}

/**
 * Preload a single image
 */
function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Hook to preload images and track loading state
 */
export function useImagePreloader(imageSources: string[]): PreloadResult {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (imageSources.length === 0) {
      setLoaded(true);
      return;
    }

    setLoaded(false);
    setError(false);

    Promise.all(imageSources.map(preloadImage))
      .then(() => setLoaded(true))
      .catch(() => setError(true));
  }, [imageSources]);

  return { loaded, error };
}

/**
 * Hook to preload images on demand
 */
export function usePreloadOnHover() {
  const preload = useCallback((src: string) => {
    preloadImage(src).catch(() => {
      // Silently fail - image will load when needed
    });
  }, []);

  return preload;
}
