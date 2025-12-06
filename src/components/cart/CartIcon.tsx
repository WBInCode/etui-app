import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/stores/useCartStore';

export const CartIcon = memo(function CartIcon() {
  const itemCount = useCartStore((state) => state.getItemCount());
  const toggleCart = useCartStore((state) => state.toggleCart);

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 hover:bg-accent rounded-lg transition-colors"
      aria-label={`Koszyk (${itemCount} produktów)`}
    >
      <ShoppingCart className="w-5 h-5" />
      
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center bg-primary text-primary-foreground text-xs font-bold rounded-full px-1"
          >
            {itemCount > 99 ? '99+' : itemCount}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
});
