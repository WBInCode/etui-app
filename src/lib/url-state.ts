import type { Configuration } from '@/types';

/**
 * Encode configuration to URL-safe string
 */
export function encodeConfiguration(config: Configuration): string {
  try {
    const json = JSON.stringify(config);
    return btoa(json);
  } catch {
    return '';
  }
}

/**
 * Decode configuration from URL string
 */
export function decodeConfiguration(encoded: string): Configuration | null {
  try {
    const json = atob(encoded);
    return JSON.parse(json) as Configuration;
  } catch {
    return null;
  }
}

/**
 * Get configuration from URL
 */
export function getConfigFromUrl(): Configuration | null {
  const params = new URLSearchParams(window.location.search);
  const config = params.get('config');
  if (!config) return null;
  return decodeConfiguration(config);
}

/**
 * Update URL with configuration (without page reload)
 */
export function updateUrlWithConfig(config: Configuration): void {
  const encoded = encodeConfiguration(config);
  const url = new URL(window.location.href);
  url.searchParams.set('config', encoded);
  window.history.replaceState({}, '', url.toString());
}

/**
 * Generate shareable URL
 */
export function generateShareUrl(config: Configuration): string {
  const encoded = encodeConfiguration(config);
  const url = new URL(window.location.origin);
  url.searchParams.set('config', encoded);
  return url.toString();
}
