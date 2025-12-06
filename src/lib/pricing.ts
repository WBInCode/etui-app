import type { Product, Configuration, PriceBreakdown } from '@/types';

/**
 * Pure function to calculate price breakdown
 * Completely separated from React/UI layer
 */
export function calculatePriceBreakdown(
  product: Product,
  configuration: Configuration
): PriceBreakdown {
  const modifiers: PriceBreakdown['modifiers'] = [];

  for (const option of product.options) {
    const selectedValueId = configuration[option.id];
    if (!selectedValueId) continue;

    const selectedValue = option.values.find((v) => v.id === selectedValueId);
    if (!selectedValue || selectedValue.price === 0) continue;

    modifiers.push({
      optionName: option.name,
      valueName: selectedValue.name,
      price: selectedValue.price,
    });
  }

  const totalModifiers = modifiers.reduce((sum, m) => sum + m.price, 0);

  return {
    basePrice: product.basePrice,
    modifiers,
    totalPrice: product.basePrice + totalModifiers,
    currency: product.currency,
  };
}

/**
 * Format price with currency
 */
export function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: currency === 'PLN' ? 'PLN' : currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Calculate completion percentage
 */
export function calculateCompletionPercentage(
  product: Product,
  configuration: Configuration
): number {
  const requiredOptions = product.options.filter((o) => o.required);
  const completedOptions = requiredOptions.filter(
    (o) => configuration[o.id] !== undefined
  );

  return Math.round((completedOptions.length / requiredOptions.length) * 100);
}

/**
 * Validate configuration
 */
export function isConfigurationComplete(
  product: Product,
  configuration: Configuration
): boolean {
  return product.options
    .filter((o) => o.required)
    .every((o) => configuration[o.id] !== undefined);
}
