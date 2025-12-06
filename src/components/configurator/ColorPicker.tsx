import { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { OptionValue } from '@/types';
import { formatPrice } from '@/lib/pricing';

interface ColorPickerProps {
  values: OptionValue[];
  selectedId: string | undefined;
  onSelect: (valueId: string) => void;
  currency?: string;
}

export const ColorPicker = memo(function ColorPicker({
  values,
  selectedId,
  onSelect,
  currency = 'PLN',
}: ColorPickerProps) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-3 p-1">
      {values.map((value) => (
        <ColorOption
          key={value.id}
          value={value}
          isSelected={selectedId === value.id}
          onSelect={onSelect}
          currency={currency}
        />
      ))}
    </div>
  );
});

interface ColorOptionProps {
  value: OptionValue;
  isSelected: boolean;
  onSelect: (valueId: string) => void;
  currency: string;
}

const ColorOption = memo(function ColorOption({
  value,
  isSelected,
  onSelect,
  currency,
}: ColorOptionProps) {
  const handleClick = useCallback(() => {
    onSelect(value.id);
  }, [onSelect, value.id]);

  const isTransparent = value.color === 'transparent';

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative flex flex-col items-center gap-2 p-3 rounded-xl transition-all',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset',
        isSelected
          ? 'bg-primary/10 ring-2 ring-primary ring-inset'
          : 'bg-accent/50 hover:bg-accent'
      )}
      aria-label={`${value.name}${value.price > 0 ? `, +${formatPrice(value.price, currency)}` : ''}`}
      aria-pressed={isSelected}
    >
      {/* Color swatch */}
      <div
        className={cn(
          'w-10 h-10 rounded-full border-2 flex items-center justify-center',
          isSelected ? 'border-primary' : 'border-border',
          isTransparent && 'bg-gradient-to-br from-gray-200 to-gray-400'
        )}
        style={{
          backgroundColor: isTransparent ? undefined : value.color,
        }}
      >
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <Check
              className={cn(
                'w-5 h-5',
                value.color === '#FFFFFF' || value.color === '#F5F5F5'
                  ? 'text-gray-800'
                  : 'text-white'
              )}
              strokeWidth={3}
            />
          </motion.div>
        )}
      </div>

      {/* Name */}
      <span className="text-xs text-muted-foreground font-medium truncate max-w-full">
        {value.name}
      </span>

      {/* Price modifier */}
      {value.price > 0 && (
        <span className="text-xs text-chart-2 font-semibold">
          +{formatPrice(value.price, currency)}
        </span>
      )}
    </motion.button>
  );
});
