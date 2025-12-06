import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Trash2, Plus, Minus, Image as ImageIcon, Type, ShoppingBag } from 'lucide-react';
import { useCartStore, PERSONALIZATION_PRICES } from '@/stores/useCartStore';
import { formatPrice } from '@/lib/pricing';
import { Button } from '@/components/ui/Button';

export const CartDrawer = memo(function CartDrawer() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  const totalPrice = getTotalPrice();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card border-l border-border shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold">Koszyk</h2>
                <span className="text-sm text-muted-foreground">
                  ({items.length} {items.length === 1 ? 'produkt' : items.length < 5 ? 'produkty' : 'produktów'})
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
                  <p className="text-lg font-medium text-foreground">Koszyk jest pusty</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Dodaj swoje pierwsze etui!
                  </p>
                  <Button onClick={closeCart} className="mt-4">
                    Kontynuuj zakupy
                  </Button>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="bg-accent/30 rounded-xl p-4 space-y-3"
                    >
                      {/* Phone info */}
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-foreground">
                            {item.phoneSelection.manufacturerName} {item.phoneSelection.modelName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.phoneSelection.caseTypeName}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Personalization badges */}
                      {(item.personalization.uploadedImage || item.personalization.customText) && (
                        <div className="flex gap-2 flex-wrap">
                          {item.personalization.uploadedImage && (
                            <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                              <ImageIcon className="w-3 h-3" />
                              Własna grafika (+{PERSONALIZATION_PRICES.customImage} zł)
                            </span>
                          )}
                          {item.personalization.customText && (
                            <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                              <Type className="w-3 h-3" />
                              "{item.personalization.customText.slice(0, 15)}{item.personalization.customText.length > 15 ? '...' : ''}"
                            </span>
                          )}
                        </div>
                      )}

                      {/* Quantity and price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-accent rounded transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-accent rounded transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">
                            {formatPrice(item.totalPrice * item.quantity, 'PLN')}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-muted-foreground">
                              {formatPrice(item.totalPrice, 'PLN')} / szt.
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-4 space-y-4">
                {/* Subtotal breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Produkty ({items.reduce((sum, i) => sum + i.quantity, 0)} szt.)</span>
                    <span>{formatPrice(totalPrice, 'PLN')}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Dostawa</span>
                    <span className="text-green-500">Gratis od 150 zł</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center py-2 border-t border-border">
                  <span className="text-lg font-semibold">Razem</span>
                  <span className="text-2xl font-bold">{formatPrice(totalPrice, 'PLN')}</span>
                </div>

                {/* Checkout button */}
                <Button size="lg" className="w-full gap-2" onClick={handleCheckout}>
                  <ShoppingBag className="w-5 h-5" />
                  Przejdź do kasy
                </Button>

                <button
                  onClick={closeCart}
                  className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Kontynuuj zakupy
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});
