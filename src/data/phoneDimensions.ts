// Phone dimensions in millimeters (height x width x depth)
// Used for scaling the phone case preview proportionally

export interface PhoneDimensions {
  height: number;  // mm
  width: number;   // mm
  depth: number;   // mm
}

// Reference phone for scaling (iPhone 14 - medium size)
export const REFERENCE_PHONE: PhoneDimensions = {
  height: 146.7,
  width: 71.5,
  depth: 7.8,
};

// All phone dimensions organized by model ID
export const phoneDimensions: Record<string, PhoneDimensions> = {
  // ============================================
  // APPLE iPHONE
  // ============================================
  
  // iPhone 16 series (2024)
  'iphone-16-pro-max': { height: 163.0, width: 77.6, depth: 8.25 },
  'iphone-16-pro': { height: 149.6, width: 71.5, depth: 8.25 },
  'iphone-16-plus': { height: 160.9, width: 77.8, depth: 7.8 },
  'iphone-16': { height: 147.6, width: 71.6, depth: 7.8 },
  
  // iPhone 15 series (2023)
  'iphone-15-pro-max': { height: 159.9, width: 76.7, depth: 8.25 },
  'iphone-15-pro': { height: 146.6, width: 70.6, depth: 8.25 },
  'iphone-15-plus': { height: 160.9, width: 77.8, depth: 7.8 },
  'iphone-15': { height: 147.6, width: 71.6, depth: 7.8 },
  
  // iPhone 14 series (2022)
  'iphone-14-pro-max': { height: 160.7, width: 77.6, depth: 7.85 },
  'iphone-14-pro': { height: 147.5, width: 71.5, depth: 7.85 },
  'iphone-14-plus': { height: 160.8, width: 78.1, depth: 7.8 },
  'iphone-14': { height: 146.7, width: 71.5, depth: 7.8 },
  
  // iPhone 13 series (2021)
  'iphone-13-pro-max': { height: 160.8, width: 78.1, depth: 7.65 },
  'iphone-13-pro': { height: 146.7, width: 71.5, depth: 7.65 },
  'iphone-13': { height: 146.7, width: 71.5, depth: 7.65 },
  'iphone-13-mini': { height: 131.5, width: 64.2, depth: 7.65 },
  
  // iPhone 12 series (2020)
  'iphone-12-pro-max': { height: 160.8, width: 78.1, depth: 7.4 },
  'iphone-12-pro': { height: 146.7, width: 71.5, depth: 7.4 },
  'iphone-12': { height: 146.7, width: 71.5, depth: 7.4 },
  'iphone-12-mini': { height: 131.5, width: 64.2, depth: 7.4 },
  
  // iPhone 11 series (2019)
  'iphone-11-pro-max': { height: 158.0, width: 77.8, depth: 8.1 },
  'iphone-11-pro': { height: 144.0, width: 71.4, depth: 8.1 },
  'iphone-11': { height: 150.9, width: 75.7, depth: 8.3 },
  
  // iPhone SE
  'iphone-se-2022': { height: 138.4, width: 67.3, depth: 7.3 },
  'iphone-se-2020': { height: 138.4, width: 67.3, depth: 7.3 },
  
  // iPhone X series (2017-2018)
  'iphone-xr': { height: 150.9, width: 75.7, depth: 8.3 },
  'iphone-xs-max': { height: 157.5, width: 77.4, depth: 7.7 },
  'iphone-xs': { height: 143.6, width: 70.9, depth: 7.7 },
  'iphone-x': { height: 143.6, width: 70.9, depth: 7.7 },

  // ============================================
  // SAMSUNG GALAXY
  // ============================================
  
  // Galaxy S25 series (2025)
  'galaxy-s25-ultra': { height: 162.8, width: 77.6, depth: 8.2 },
  'galaxy-s25-plus': { height: 158.4, width: 75.8, depth: 7.3 },
  'galaxy-s25': { height: 146.9, width: 70.5, depth: 7.2 },
  
  // Galaxy S24 series (2024)
  'galaxy-s24-ultra': { height: 162.3, width: 79.0, depth: 8.6 },
  'galaxy-s24-plus': { height: 158.5, width: 75.9, depth: 7.7 },
  'galaxy-s24': { height: 147.0, width: 70.6, depth: 7.6 },
  'galaxy-s24-fe': { height: 162.0, width: 77.3, depth: 8.0 },
  
  // Galaxy S23 series (2023)
  'galaxy-s23-ultra': { height: 163.4, width: 78.1, depth: 8.9 },
  'galaxy-s23-plus': { height: 157.8, width: 76.2, depth: 7.6 },
  'galaxy-s23': { height: 146.3, width: 70.9, depth: 7.6 },
  'galaxy-s23-fe': { height: 158.0, width: 76.5, depth: 8.2 },
  
  // Galaxy Z Fold series
  'galaxy-z-fold-6': { height: 153.5, width: 68.1, depth: 12.1 }, // Złożony
  'galaxy-z-fold-5': { height: 154.9, width: 67.1, depth: 13.4 },
  'galaxy-z-fold-4': { height: 155.1, width: 67.1, depth: 14.2 },
  
  // Galaxy Z Flip series
  'galaxy-z-flip-6': { height: 165.1, width: 71.9, depth: 6.9 }, // Rozłożony
  'galaxy-z-flip-5': { height: 165.1, width: 71.9, depth: 6.9 },
  'galaxy-z-flip-4': { height: 165.2, width: 71.9, depth: 6.9 },
  
  // Galaxy A series
  'galaxy-a55': { height: 161.1, width: 77.4, depth: 8.2 },
  'galaxy-a54': { height: 158.2, width: 76.7, depth: 8.2 },
  'galaxy-a35': { height: 161.7, width: 78.0, depth: 8.2 },
  'galaxy-a34': { height: 161.3, width: 78.1, depth: 8.2 },
  'galaxy-a25': { height: 161.9, width: 76.5, depth: 8.3 },
  'galaxy-a15': { height: 160.1, width: 76.8, depth: 8.4 },
  'galaxy-a14': { height: 167.0, width: 78.0, depth: 9.1 },
  'galaxy-m54': { height: 166.4, width: 77.3, depth: 8.4 },
  'galaxy-m34': { height: 161.7, width: 77.2, depth: 8.2 },

  // ============================================
  // XIAOMI
  // ============================================
  
  // Xiaomi flagship series
  'xiaomi-15-ultra': { height: 161.4, width: 75.3, depth: 9.2 },
  'xiaomi-15-pro': { height: 161.4, width: 75.3, depth: 8.5 },
  'xiaomi-15': { height: 152.3, width: 71.2, depth: 8.1 },
  'xiaomi-14-ultra': { height: 161.4, width: 75.3, depth: 9.2 },
  'xiaomi-14-pro': { height: 161.4, width: 75.3, depth: 8.5 },
  'xiaomi-14': { height: 152.8, width: 71.5, depth: 8.2 },
  'xiaomi-14t-pro': { height: 160.4, width: 75.1, depth: 8.4 },
  'xiaomi-14t': { height: 160.4, width: 75.1, depth: 7.8 },
  'xiaomi-13-ultra': { height: 163.2, width: 74.6, depth: 9.1 },
  'xiaomi-13-pro': { height: 162.9, width: 74.6, depth: 8.4 },
  'xiaomi-13': { height: 152.8, width: 71.5, depth: 8.0 },
  'xiaomi-13t-pro': { height: 162.2, width: 76.0, depth: 8.6 },
  'xiaomi-13t': { height: 162.2, width: 76.0, depth: 8.6 },
  
  // Redmi Note series
  'redmi-note-14-pro-plus': { height: 162.5, width: 74.7, depth: 8.9 },
  'redmi-note-14-pro': { height: 162.3, width: 74.6, depth: 8.4 },
  'redmi-note-14': { height: 162.4, width: 75.7, depth: 8.2 },
  'redmi-note-13-pro-plus': { height: 161.4, width: 74.2, depth: 8.9 },
  'redmi-note-13-pro': { height: 161.2, width: 74.2, depth: 8.0 },
  'redmi-note-13': { height: 161.1, width: 74.2, depth: 8.0 },
  'redmi-note-12-pro': { height: 163.0, width: 76.0, depth: 8.0 },
  'redmi-14c': { height: 171.9, width: 77.8, depth: 8.2 },
  'redmi-13c': { height: 168.6, width: 76.8, depth: 8.1 },
  
  // POCO series
  'poco-x6-pro': { height: 160.5, width: 74.3, depth: 8.3 },
  'poco-x6': { height: 160.5, width: 74.3, depth: 8.0 },
  'poco-f6-pro': { height: 160.9, width: 75.0, depth: 8.4 },
  'poco-f6': { height: 160.5, width: 74.3, depth: 8.0 },
  'poco-m6-pro': { height: 161.2, width: 74.2, depth: 8.0 },

  // ============================================
  // HUAWEI
  // ============================================
  'huawei-pura-70-ultra': { height: 162.6, width: 75.1, depth: 8.4 },
  'huawei-pura-70-pro': { height: 162.6, width: 75.1, depth: 8.4 },
  'huawei-pura-70': { height: 157.6, width: 74.0, depth: 7.9 },
  'huawei-p60-pro': { height: 161.2, width: 74.5, depth: 8.3 },
  'huawei-p60': { height: 161.2, width: 74.5, depth: 7.8 },
  'huawei-mate-60-pro': { height: 163.9, width: 76.1, depth: 8.1 },
  'huawei-mate-60': { height: 161.4, width: 76.0, depth: 7.9 },
  'huawei-nova-12-ultra': { height: 163.9, width: 76.1, depth: 7.9 },
  'huawei-nova-12-pro': { height: 160.5, width: 73.9, depth: 7.6 },
  'huawei-nova-12': { height: 161.8, width: 74.7, depth: 6.9 },

  // ============================================
  // GOOGLE PIXEL
  // ============================================
  'pixel-9-pro-xl': { height: 162.8, width: 76.6, depth: 8.5 },
  'pixel-9-pro': { height: 152.8, width: 72.0, depth: 8.5 },
  'pixel-9': { height: 152.8, width: 72.0, depth: 8.5 },
  'pixel-9-pro-fold': { height: 155.2, width: 77.1, depth: 10.5 }, // Złożony
  'pixel-8-pro': { height: 162.6, width: 76.5, depth: 8.8 },
  'pixel-8': { height: 150.5, width: 70.8, depth: 8.9 },
  'pixel-8a': { height: 152.1, width: 72.7, depth: 8.9 },
  'pixel-7-pro': { height: 162.9, width: 76.6, depth: 8.7 },
  'pixel-7': { height: 155.6, width: 73.2, depth: 8.7 },
  'pixel-7a': { height: 152.0, width: 72.9, depth: 9.0 },

  // ============================================
  // OnePlus
  // ============================================
  'oneplus-13': { height: 162.9, width: 76.5, depth: 8.5 },
  'oneplus-12': { height: 164.3, width: 76.2, depth: 9.2 },
  'oneplus-12r': { height: 163.3, width: 75.3, depth: 8.8 },
  'oneplus-open': { height: 153.4, width: 73.3, depth: 11.9 }, // Złożony
  'oneplus-nord-4': { height: 162.6, width: 75.1, depth: 7.99 },
  'oneplus-nord-ce4': { height: 161.5, width: 74.0, depth: 7.8 },
  'oneplus-nord-3': { height: 162.0, width: 73.9, depth: 8.2 },

  // ============================================
  // MOTOROLA
  // ============================================
  'motorola-edge-50-ultra': { height: 161.1, width: 72.4, depth: 8.6 },
  'motorola-edge-50-pro': { height: 161.2, width: 72.4, depth: 8.2 },
  'motorola-edge-50-fusion': { height: 161.9, width: 73.1, depth: 7.9 },
  'motorola-razr-50-ultra': { height: 171.3, width: 73.99, depth: 7.1 }, // Rozłożony
  'motorola-razr-50': { height: 171.3, width: 73.99, depth: 7.25 },
  'moto-g85': { height: 161.9, width: 73.1, depth: 7.6 },
  'moto-g84': { height: 160.0, width: 74.0, depth: 7.6 },
  'moto-g54': { height: 161.6, width: 74.0, depth: 8.6 },

  // ============================================
  // OPPO
  // ============================================
  'oppo-find-x8-pro': { height: 162.3, width: 76.7, depth: 8.2 },
  'oppo-find-x8': { height: 157.4, width: 74.0, depth: 7.9 },
  'oppo-find-n3-flip': { height: 166.2, width: 75.8, depth: 7.8 }, // Rozłożony
  'oppo-reno-12-pro': { height: 161.4, width: 74.8, depth: 7.4 },
  'oppo-reno-12': { height: 161.4, width: 74.8, depth: 7.6 },
  'oppo-a79': { height: 166.0, width: 76.1, depth: 8.0 },
  'oppo-a60': { height: 165.7, width: 76.0, depth: 7.7 },
  'oppo-a38': { height: 163.0, width: 75.6, depth: 8.2 },

  // ============================================
  // REALME
  // ============================================
  'realme-gt-6': { height: 162.0, width: 75.1, depth: 8.6 },
  'realme-gt-5-pro': { height: 161.6, width: 75.3, depth: 8.7 },
  'realme-gt-neo-6': { height: 162.0, width: 75.1, depth: 8.5 },
  'realme-12-pro-plus': { height: 161.5, width: 73.9, depth: 8.8 },
  'realme-12-pro': { height: 161.5, width: 74.0, depth: 8.2 },
  'realme-12': { height: 162.2, width: 76.2, depth: 7.8 },
  'realme-c67': { height: 167.3, width: 76.7, depth: 7.9 },
  'realme-c65': { height: 167.3, width: 76.7, depth: 7.9 },
  'realme-c55': { height: 165.7, width: 76.0, depth: 7.9 },

  // ============================================
  // VIVO
  // ============================================
  'vivo-x100-ultra': { height: 164.5, width: 75.2, depth: 9.2 },
  'vivo-x100-pro': { height: 164.0, width: 75.3, depth: 8.9 },
  'vivo-x100': { height: 164.0, width: 75.3, depth: 8.5 },
  'vivo-v40-pro': { height: 164.1, width: 75.1, depth: 7.6 },
  'vivo-v40': { height: 164.2, width: 75.0, depth: 7.6 },
  'vivo-v30': { height: 164.2, width: 74.9, depth: 7.4 },
  'vivo-y200-pro': { height: 164.1, width: 75.8, depth: 7.5 },
  'vivo-y100': { height: 164.1, width: 75.8, depth: 7.8 },

  // ============================================
  // NOTHING
  // ============================================
  'nothing-phone-2a-plus': { height: 161.74, width: 76.32, depth: 8.55 },
  'nothing-phone-2a': { height: 161.74, width: 76.32, depth: 8.55 },
  'nothing-phone-2': { height: 162.1, width: 76.4, depth: 8.6 },
  'nothing-phone-1': { height: 159.2, width: 75.8, depth: 8.3 },

  // ============================================
  // SONY XPERIA
  // ============================================
  'sony-xperia-1-vi': { height: 162.0, width: 74.0, depth: 8.2 },
  'sony-xperia-5-v': { height: 154.0, width: 68.0, depth: 8.6 },
  'sony-xperia-10-vi': { height: 155.0, width: 68.0, depth: 8.3 },
  'sony-xperia-1-v': { height: 165.0, width: 71.0, depth: 8.3 },
  'sony-xperia-10-v': { height: 155.0, width: 68.0, depth: 8.3 },

  // ============================================
  // ASUS ROG/ZENFONE
  // ============================================
  'asus-rog-phone-9-pro': { height: 163.8, width: 77.0, depth: 8.9 },
  'asus-rog-phone-9': { height: 163.8, width: 77.0, depth: 8.9 },
  'asus-rog-phone-8-pro': { height: 163.8, width: 76.8, depth: 8.9 },
  'asus-rog-phone-8': { height: 163.8, width: 76.8, depth: 8.9 },
  'asus-zenfone-11-ultra': { height: 163.6, width: 76.8, depth: 8.9 },
  'asus-zenfone-10': { height: 146.5, width: 68.1, depth: 9.4 },

  // ============================================
  // HONOR
  // ============================================
  'honor-magic-7-pro': { height: 162.7, width: 77.1, depth: 8.8 },
  'honor-magic-6-pro': { height: 162.5, width: 75.8, depth: 8.9 },
  'honor-magic-v3': { height: 156.6, width: 74.0, depth: 9.3 }, // Złożony
  'honor-200-pro': { height: 163.3, width: 75.2, depth: 8.2 },
  'honor-200': { height: 161.5, width: 74.5, depth: 7.7 },
  'honor-90': { height: 161.9, width: 74.1, depth: 7.8 },
  'honor-x9b': { height: 166.6, width: 76.5, depth: 8.1 },

  // ============================================
  // NOKIA
  // ============================================
  'nokia-g60': { height: 166.1, width: 75.9, depth: 8.5 },
  'nokia-g42': { height: 164.4, width: 75.3, depth: 8.5 },
  'nokia-g22': { height: 164.6, width: 75.8, depth: 8.5 },
  'nokia-c32': { height: 165.1, width: 76.9, depth: 8.5 },
  'nokia-c22': { height: 164.0, width: 75.8, depth: 8.5 },
  'nokia-xr21': { height: 171.0, width: 81.5, depth: 10.4 },

  // ============================================
  // TECNO
  // ============================================
  'tecno-phantom-v-fold-2': { height: 159.8, width: 71.9, depth: 11.9 },
  'tecno-phantom-v-flip-2': { height: 170.4, width: 76.0, depth: 7.6 },
  'tecno-camon-30-pro': { height: 163.7, width: 74.6, depth: 8.0 },
  'tecno-camon-30': { height: 163.7, width: 75.1, depth: 7.9 },
  'tecno-spark-20-pro': { height: 168.0, width: 77.0, depth: 8.0 },
  'tecno-pova-6-pro': { height: 168.0, width: 76.6, depth: 7.9 },

  // ============================================
  // INFINIX
  // ============================================
  'infinix-zero-40': { height: 163.5, width: 74.5, depth: 7.9 },
  'infinix-note-40-pro': { height: 163.5, width: 75.4, depth: 7.8 },
  'infinix-hot-50-pro': { height: 163.8, width: 76.0, depth: 8.0 },
  'infinix-hot-40-pro': { height: 168.6, width: 76.4, depth: 7.9 },
  'infinix-smart-8': { height: 163.8, width: 75.4, depth: 8.4 },
};

/**
 * Get dimensions for a phone model
 * @param modelId - The phone model ID from phones.json
 * @returns PhoneDimensions or default reference dimensions if not found
 */
export function getPhoneDimensions(modelId: string): PhoneDimensions {
  return phoneDimensions[modelId] || REFERENCE_PHONE;
}

/**
 * Calculate scale factor relative to reference phone
 * @param modelId - The phone model ID
 * @returns Scale factor (1.0 = same size as reference, >1 = larger, <1 = smaller)
 */
export function getPhoneScaleFactor(modelId: string): number {
  const dimensions = getPhoneDimensions(modelId);
  // Scale based on height as the primary dimension
  return dimensions.height / REFERENCE_PHONE.height;
}

/**
 * Calculate aspect ratio (height/width)
 * @param modelId - The phone model ID
 * @returns Aspect ratio
 */
export function getPhoneAspectRatio(modelId: string): number {
  const dimensions = getPhoneDimensions(modelId);
  return dimensions.height / dimensions.width;
}

/**
 * Get a category for phone size
 * @param modelId - The phone model ID
 * @returns 'mini' | 'standard' | 'plus' | 'max'
 */
export function getPhoneSizeCategory(modelId: string): 'mini' | 'standard' | 'plus' | 'max' {
  const dimensions = getPhoneDimensions(modelId);
  
  if (dimensions.height < 140) return 'mini';
  if (dimensions.height < 155) return 'standard';
  if (dimensions.height < 165) return 'plus';
  return 'max';
}

/**
 * Get display name for size category
 * @param category - Size category
 * @returns Localized size name
 */
export function getSizeCategoryName(category: 'mini' | 'standard' | 'plus' | 'max'): string {
  const names = {
    mini: 'Kompaktowy',
    standard: 'Standardowy',
    plus: 'Duży',
    max: 'Bardzo duży',
  };
  return names[category];
}
