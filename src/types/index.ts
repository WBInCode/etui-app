// ============================================
// PRODUCT CONFIGURATION TYPES
// ============================================

export type OptionType = 'color' | 'material' | 'style' | 'size';

export interface OptionValue {
  id: string;
  name: string;
  price: number; // Price modifier (can be 0, positive or negative)
  color?: string; // Hex color for color options
  preview?: string; // Image path for material preview
}

export interface ProductOption {
  id: string;
  type: OptionType;
  name: string;
  description?: string;
  values: OptionValue[];
  layerIndex: number; // Order for layered rendering
  required: boolean;
}

export interface ProductLayer {
  optionId: string;
  valueId: string;
  imagePath: string;
  zIndex: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  currency: string;
  options: ProductOption[];
  defaultConfiguration: Record<string, string>; // optionId -> valueId
}

// ============================================
// CONFIGURATION STATE TYPES
// ============================================

export interface Configuration {
  [optionId: string]: string; // optionId -> selected valueId
}

export interface ConfigurationStep {
  optionId: string;
  completed: boolean;
}

// ============================================
// PRICING TYPES
// ============================================

export interface PriceBreakdown {
  basePrice: number;
  modifiers: Array<{
    optionName: string;
    valueName: string;
    price: number;
  }>;
  totalPrice: number;
  currency: string;
}

// ============================================
// UI STATE TYPES
// ============================================

export interface UIState {
  activeStep: number;
  isShareModalOpen: boolean;
  isLoading: boolean;
}
