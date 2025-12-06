import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Configuration } from '@/types';
import type { PhoneSelection, UploadedImage, ImageTransform, ImageFillMode, TextPosition } from './useConfigStore';

// ============================================
// CART TYPES
// ============================================

export interface CartItemPersonalization {
  uploadedImage: UploadedImage | null;
  imageTransform: ImageTransform;
  imageFillMode: ImageFillMode;
  customText: string;
  textColor: string;
  textSize: number;
  textPosition: TextPosition;
}

export interface CartItem {
  id: string;
  phoneSelection: PhoneSelection;
  configuration: Configuration;
  personalization: CartItemPersonalization;
  basePrice: number;
  optionsPrice: number;
  personalizationPrice: number;
  totalPrice: number;
  quantity: number;
  createdAt: number;
  previewImageUrl?: string; // Optional snapshot of the design
}

interface CartStore {
  items: CartItem[];
  isCartOpen: boolean;
  
  // Actions
  addItem: (item: Omit<CartItem, 'id' | 'createdAt'>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  
  // Computed
  getItemCount: () => number;
  getTotalPrice: () => number;
}

// ============================================
// PRICING CONSTANTS
// ============================================

export const PERSONALIZATION_PRICES = {
  customImage: 15, // PLN za własną grafikę
  customText: 5,   // PLN za własny tekst
};

// ============================================
// CART STORE
// ============================================

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      
      addItem: (item) => {
        const newItem: CartItem = {
          ...item,
          id: crypto.randomUUID(),
          createdAt: Date.now(),
        };
        
        set((state) => ({
          items: [...state.items, newItem],
          isCartOpen: true, // Open cart when item is added
        }));
      },
      
      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },
      
      updateQuantity: (itemId, quantity) => {
        if (quantity < 1) {
          get().removeItem(itemId);
          return;
        }
        
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      
      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce(
          (sum, item) => sum + item.totalPrice * item.quantity,
          0
        );
      },
    }),
    {
      name: 'casestudio-cart',
      partialize: (state) => ({ items: state.items }), // Only persist items, not UI state
    }
  )
);

// ============================================
// HELPER FUNCTIONS
// ============================================

export function calculatePersonalizationPrice(
  personalization: CartItemPersonalization
): number {
  let price = 0;
  
  if (personalization.uploadedImage) {
    price += PERSONALIZATION_PRICES.customImage;
  }
  
  if (personalization.customText && personalization.customText.trim().length > 0) {
    price += PERSONALIZATION_PRICES.customText;
  }
  
  return price;
}
