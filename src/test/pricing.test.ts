import { describe, it, expect } from 'vitest';
import {
  calculatePriceBreakdown,
  formatPrice,
  calculateCompletionPercentage,
  isConfigurationComplete,
} from '@/lib/pricing';
import type { Product } from '@/types';

const mockProduct: Product = {
  id: 'test-case',
  name: 'Test Case',
  description: 'A test product',
  basePrice: 49,
  currency: 'PLN',
  options: [
    {
      id: 'color',
      type: 'color',
      name: 'Kolor',
      values: [
        { id: 'black', name: 'Czarny', price: 0 },
        { id: 'gold', name: 'Złoty', price: 20 },
      ],
      layerIndex: 0,
      required: true,
    },
    {
      id: 'material',
      type: 'material',
      name: 'Materiał',
      values: [
        { id: 'silicone', name: 'Silikon', price: 0 },
        { id: 'leather', name: 'Skóra', price: 30 },
      ],
      layerIndex: 1,
      required: true,
    },
    {
      id: 'style',
      type: 'style',
      name: 'Styl',
      values: [
        { id: 'matte', name: 'Matowy', price: 0 },
        { id: 'glossy', name: 'Błyszczący', price: 10 },
      ],
      layerIndex: 2,
      required: false,
    },
  ],
  defaultConfiguration: { color: 'black', material: 'silicone' },
};

describe('calculatePriceBreakdown', () => {
  it('returns base price with no modifiers for default config', () => {
    const result = calculatePriceBreakdown(mockProduct, {
      color: 'black',
      material: 'silicone',
    });
    expect(result.basePrice).toBe(49);
    expect(result.totalPrice).toBe(49);
    expect(result.modifiers).toHaveLength(0);
  });

  it('adds modifiers for premium options', () => {
    const result = calculatePriceBreakdown(mockProduct, {
      color: 'gold',
      material: 'leather',
      style: 'glossy',
    });
    expect(result.totalPrice).toBe(49 + 20 + 30 + 10);
    expect(result.modifiers).toHaveLength(3);
  });

  it('handles partial configuration', () => {
    const result = calculatePriceBreakdown(mockProduct, { color: 'gold' });
    expect(result.totalPrice).toBe(49 + 20);
    expect(result.modifiers).toHaveLength(1);
  });

  it('handles empty configuration', () => {
    const result = calculatePriceBreakdown(mockProduct, {});
    expect(result.totalPrice).toBe(49);
    expect(result.modifiers).toHaveLength(0);
  });
});

describe('formatPrice', () => {
  it('formats PLN correctly', () => {
    const result = formatPrice(79, 'PLN');
    expect(result).toContain('79');
    expect(result.toLowerCase()).toContain('zł');
  });

  it('formats zero price', () => {
    const result = formatPrice(0, 'PLN');
    expect(result).toContain('0');
  });
});

describe('calculateCompletionPercentage', () => {
  it('returns 100% when all required options are set', () => {
    const result = calculateCompletionPercentage(mockProduct, {
      color: 'black',
      material: 'silicone',
    });
    expect(result).toBe(100);
  });

  it('returns 50% when half of required options are set', () => {
    const result = calculateCompletionPercentage(mockProduct, {
      color: 'black',
    });
    expect(result).toBe(50);
  });

  it('returns 0% when no required options are set', () => {
    const result = calculateCompletionPercentage(mockProduct, {});
    expect(result).toBe(0);
  });

  it('ignores optional options in completion', () => {
    const result = calculateCompletionPercentage(mockProduct, {
      style: 'matte',
    });
    expect(result).toBe(0);
  });
});

describe('isConfigurationComplete', () => {
  it('returns true when all required options are set', () => {
    expect(
      isConfigurationComplete(mockProduct, {
        color: 'black',
        material: 'silicone',
      })
    ).toBe(true);
  });

  it('returns false when a required option is missing', () => {
    expect(
      isConfigurationComplete(mockProduct, { color: 'black' })
    ).toBe(false);
  });

  it('returns false for empty configuration', () => {
    expect(isConfigurationComplete(mockProduct, {})).toBe(false);
  });
});
