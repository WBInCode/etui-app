import { memo, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Check, Image as ImageIcon, Type } from 'lucide-react';
import { 
  useConfigStore, 
  selectConfiguration, 
  selectProduct,
  selectPhoneSelection,
  selectUploadedImage,
  selectCustomText,
  selectImageTransform,
  selectImageFillMode,
  selectTextColor,
  selectTextSize,
  selectTextPosition,
} from '@/stores/useConfigStore';
import { useCartStore, calculatePersonalizationPrice, PERSONALIZATION_PRICES } from '@/stores/useCartStore';
import { calculatePriceBreakdown, formatPrice } from '@/lib/pricing';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const PriceSummary = memo(function PriceSummary() {
  const product = useConfigStore(selectProduct);
  const configuration = useConfigStore(selectConfiguration);
  const phoneSelection = useConfigStore(selectPhoneSelection);
  const uploadedImage = useConfigStore(selectUploadedImage);
  const customText = useConfigStore(selectCustomText);
  const imageTransform = useConfigStore(selectImageTransform);
  const imageFillMode = useConfigStore(selectImageFillMode);
  const textColor = useConfigStore(selectTextColor);
  const textSize = useConfigStore(selectTextSize);
  const textPosition = useConfigStore(selectTextPosition);
  
  const addToCart = useCartStore((state) => state.addItem);
  
  const [isAdded, setIsAdded] = useState(false);

  const priceBreakdown = useMemo(() => {
    return calculatePriceBreakdown(product, configuration);
  }, [product, configuration]);

  // Calculate personalization price
  const personalization = useMemo(() => ({
    uploadedImage,
    imageTransform,
    imageFillMode,
    customText,
    textColor,
    textSize,
    textPosition,
  }), [uploadedImage, imageTransform, imageFillMode, customText, textColor, textSize, textPosition]);

  const personalizationPrice = useMemo(() => {
    return calculatePersonalizationPrice(personalization);
  }, [personalization]);

  const totalWithPersonalization = priceBreakdown.totalPrice + personalizationPrice;

  const handleAddToCart = () => {
    if (!phoneSelection) return;
    
    addToCart({
      phoneSelection,
      configuration,
      personalization,
      basePrice: priceBreakdown.basePrice,
      optionsPrice: priceBreakdown.modifiers.reduce((sum, m) => sum + m.price, 0),
      personalizationPrice,
      totalPrice: totalWithPersonalization,
      quantity: 1,
    });
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Card className="sticky top-4">
      <CardContent className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Podsumowanie</h3>
        </div>

        {/* Base price */}
        <div className="flex justify-between text-muted-foreground">
          <span>Cena bazowa</span>
          <span>{formatPrice(priceBreakdown.basePrice, priceBreakdown.currency)}</span>
        </div>

        {/* Modifiers */}
        <AnimatePresence mode="popLayout">
          {priceBreakdown.modifiers.map((modifier, index) => (
            <motion.div
              key={`${modifier.optionName}-${modifier.valueName}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="flex justify-between text-sm"
            >
              <span className="text-muted-foreground">
                {modifier.optionName}: {modifier.valueName}
              </span>
              <span className="text-chart-2 font-medium">
                +{formatPrice(modifier.price, priceBreakdown.currency)}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Personalization costs */}
        <AnimatePresence mode="popLayout">
          {uploadedImage && (
            <motion.div
              key="custom-image"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex justify-between text-sm"
            >
              <span className="text-muted-foreground flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5" />
                Własna grafika
              </span>
              <span className="text-chart-2 font-medium">
                +{formatPrice(PERSONALIZATION_PRICES.customImage, 'PLN')}
              </span>
            </motion.div>
          )}
          
          {customText && customText.trim().length > 0 && (
            <motion.div
              key="custom-text"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex justify-between text-sm"
            >
              <span className="text-muted-foreground flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5" />
                Własny tekst
              </span>
              <span className="text-chart-2 font-medium">
                +{formatPrice(PERSONALIZATION_PRICES.customText, 'PLN')}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Total */}
        <motion.div
          className="flex justify-between items-center"
          layout
        >
          <span className="text-lg font-semibold text-foreground">Razem</span>
          <motion.span
            key={totalWithPersonalization}
            initial={{ scale: 1.2, color: 'var(--chart-2)' }}
            animate={{ scale: 1, color: 'var(--foreground)' }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold"
          >
            {formatPrice(totalWithPersonalization, priceBreakdown.currency)}
          </motion.span>
        </motion.div>

        {/* Add to cart button */}
        <Button
          onClick={handleAddToCart}
          disabled={!phoneSelection || isAdded}
          className="w-full gap-2"
          size="lg"
        >
          <AnimatePresence mode="wait">
            {isAdded ? (
              <motion.div
                key="added"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2"
              >
                <Check className="w-5 h-5" />
                Dodano do koszyka!
              </motion.div>
            ) : (
              <motion.div
                key="add"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Dodaj do koszyka
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
        
        {!phoneSelection && (
          <p className="text-xs text-center text-muted-foreground">
            Wybierz telefon, aby dodać do koszyka
          </p>
        )}

        {/* Payment methods */}
        <div className="pt-2">
          <p className="text-xs text-center text-muted-foreground mb-2">Akceptujemy płatności</p>
          <div className="flex items-center justify-center gap-2">
            <img 
              src="https://img.logo.dev/cardinalcommerce.com?token=pk_Dq3xRMdJT2qj7Iv75RkcGQ" 
              alt="Visa" 
              className="h-6 rounded opacity-70 hover:opacity-100 transition-opacity"
            />
            <img 
              src="https://img.logo.dev/mastercard.com.au?token=pk_Dq3xRMdJT2qj7Iv75RkcGQ" 
              alt="Mastercard" 
              className="h-6 rounded opacity-70 hover:opacity-100 transition-opacity"
            />
            <img 
              src="https://img.logo.dev/groupone.pl?token=pk_Dq3xRMdJT2qj7Iv75RkcGQ" 
              alt="BLIK" 
              className="h-6 rounded opacity-70 hover:opacity-100 transition-opacity"
            />
            <img 
              src="https://img.logo.dev/przelewy24.pl?token=pk_Dq3xRMdJT2qj7Iv75RkcGQ" 
              alt="Przelewy24" 
              className="h-6 rounded opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
