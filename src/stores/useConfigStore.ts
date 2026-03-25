import { create } from 'zustand';
import { subscribeWithSelector, persist } from 'zustand/middleware';
import type { Configuration, Product } from '@/types';
import { phoneCaseProduct } from '@/data/products/phoneCase';
import { getConfigFromUrl, updateUrlWithConfig } from '@/lib/url-state';

// ============================================
// PHONE SELECTION TYPES
// ============================================

export interface PhoneSelection {
  manufacturer: string;
  manufacturerName: string;
  model: string;
  modelName: string;
  caseType: string;
  caseTypeName: string;
}

export interface UploadedImage {
  id: string;
  url: string;
  name: string;
  width: number;
  height: number;
}

export interface ImageTransform {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export type ImageFillMode = 'contain' | 'cover' | 'fill' | 'custom';

export interface TextPosition {
  x: number;
  y: number;
}

// ============================================
// STORE INTERFACE
// ============================================

interface ConfigStore {
  // State
  product: Product;
  configuration: Configuration;
  activeOptionIndex: number;
  isShareModalOpen: boolean;
  
  // Phone selection
  phoneSelection: PhoneSelection | null;
  
  // Custom image
  uploadedImage: UploadedImage | null;
  imageTransform: ImageTransform;
  imageFillMode: ImageFillMode;
  customText: string;
  textColor: string;
  textSize: number;
  textPosition: TextPosition;

  // Actions
  setOption: (optionId: string, valueId: string) => void;
  setActiveOptionIndex: (index: number) => void;
  resetConfiguration: () => void;
  openShareModal: () => void;
  closeShareModal: () => void;
  initializeFromUrl: () => void;
  
  // Phone selection actions
  setPhoneSelection: (selection: PhoneSelection) => void;
  
  // Image actions
  setUploadedImage: (image: UploadedImage | null) => void;
  setImageTransform: (transform: Partial<ImageTransform>) => void;
  setImageFillMode: (mode: ImageFillMode) => void;
  setCustomText: (text: string) => void;
  setTextColor: (color: string) => void;
  setTextPosition: (position: Partial<TextPosition>) => void;
  setTextSize: (size: number) => void;
  clearCustomization: () => void;
}

// ============================================
// STORE IMPLEMENTATION
// ============================================

const defaultImageTransform: ImageTransform = {
  x: 0,
  y: 0,
  scale: 1,
  rotation: 0,
};

export const useConfigStore = create<ConfigStore>()(
  persist(
    subscribeWithSelector((set, get) => ({
      // Initial state
      product: phoneCaseProduct,
      configuration: { ...phoneCaseProduct.defaultConfiguration },
      activeOptionIndex: 0,
      isShareModalOpen: false,
      
      // Phone selection
      phoneSelection: null,
      
      // Custom image
      uploadedImage: null,
      imageTransform: { ...defaultImageTransform },
      imageFillMode: 'contain' as ImageFillMode,
      customText: '',
      textColor: '#FFFFFF',
      textSize: 24,
      textPosition: { x: 0, y: 0 },

      // Actions
      setOption: (optionId, valueId) => {
        set((state) => ({
          configuration: {
            ...state.configuration,
            [optionId]: valueId,
          },
        }));
        // Sync to URL
        updateUrlWithConfig(get().configuration);
      },

      setActiveOptionIndex: (index) => {
      set({ activeOptionIndex: index });
    },

    resetConfiguration: () => {
      const product = get().product;
      set({
        configuration: { ...product.defaultConfiguration },
        activeOptionIndex: 0,
      });
      updateUrlWithConfig(get().configuration);
    },

    openShareModal: () => set({ isShareModalOpen: true }),
    closeShareModal: () => set({ isShareModalOpen: false }),

    initializeFromUrl: () => {
      const urlConfig = getConfigFromUrl();
      if (urlConfig) {
        set({ configuration: urlConfig });
      }
    },
    
    // Phone selection actions
    setPhoneSelection: (selection) => {
      set({ phoneSelection: selection });
    },
    
    // Image actions
    setUploadedImage: (image) => {
      set({ uploadedImage: image });
    },
    
    setImageTransform: (transform) => {
      set((state) => ({
        imageTransform: { ...state.imageTransform, ...transform },
      }));
    },
    
    setImageFillMode: (mode) => {
      set({ imageFillMode: mode });
    },
    
    setCustomText: (text) => {
      set({ customText: text });
    },
    
    setTextColor: (color) => {
      set({ textColor: color });
    },
    
    setTextPosition: (position) => {
      set((state) => ({
        textPosition: { ...state.textPosition, ...position },
      }));
    },
    
    setTextSize: (size) => {
      set({ textSize: size });
    },
    
    clearCustomization: () => {
      set({
        uploadedImage: null,
        imageTransform: { ...defaultImageTransform },
        imageFillMode: 'contain' as ImageFillMode,
        customText: '',
        textColor: '#FFFFFF',
        textSize: 24,
        textPosition: { x: 0, y: 0 },
      });
    },
  })),
  {
    name: 'app-config',
    partialize: (state) => ({
      phoneSelection: state.phoneSelection,
      configuration: state.configuration,
      // Don't persist uploaded images (too large for localStorage)
      // uploadedImage: state.uploadedImage,
      customText: state.customText,
      textColor: state.textColor,
      textSize: state.textSize,
      textPosition: state.textPosition,
    }),
  }
  )
);

// ============================================
// SELECTORS (for optimized re-renders)
// ============================================

export const selectProduct = (state: ConfigStore) => state.product;
export const selectConfiguration = (state: ConfigStore) => state.configuration;
export const selectActiveOptionIndex = (state: ConfigStore) => state.activeOptionIndex;
export const selectIsShareModalOpen = (state: ConfigStore) => state.isShareModalOpen;
export const selectPhoneSelection = (state: ConfigStore) => state.phoneSelection;
export const selectUploadedImage = (state: ConfigStore) => state.uploadedImage;
export const selectImageTransform = (state: ConfigStore) => state.imageTransform;
export const selectImageFillMode = (state: ConfigStore) => state.imageFillMode;
export const selectCustomText = (state: ConfigStore) => state.customText;
export const selectTextColor = (state: ConfigStore) => state.textColor;
export const selectTextSize = (state: ConfigStore) => state.textSize;
export const selectTextPosition = (state: ConfigStore) => state.textPosition;

// Derived selector - get current option
export const selectActiveOption = (state: ConfigStore) => {
  return state.product.options[state.activeOptionIndex];
};

// Derived selector - get selected value for specific option
export const createSelectOptionValue = (optionId: string) => {
  return (state: ConfigStore) => state.configuration[optionId];
};
