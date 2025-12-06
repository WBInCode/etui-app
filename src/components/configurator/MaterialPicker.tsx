import { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { OptionValue } from '@/types';
import { formatPrice } from '@/lib/pricing';

interface MaterialPickerProps {
  values: OptionValue[];
  selectedId: string | undefined;
  onSelect: (valueId: string) => void;
  currency?: string;
}

export const MaterialPicker = memo(function MaterialPicker({
  values,
  selectedId,
  onSelect,
  currency = 'PLN',
}: MaterialPickerProps) {
  return (
    <div className="flex flex-col gap-2">
      {values.map((value) => (
        <MaterialOption
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

interface MaterialOptionProps {
  value: OptionValue;
  isSelected: boolean;
  onSelect: (valueId: string) => void;
  currency: string;
}

const MaterialOption = memo(function MaterialOption({
  value,
  isSelected,
  onSelect,
  currency,
}: MaterialOptionProps) {
  const handleClick = useCallback(() => {
    onSelect(value.id);
  }, [onSelect, value.id]);

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative flex items-center justify-between p-4 rounded-xl transition-all',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-card',
        isSelected
          ? 'bg-primary/20 ring-2 ring-primary'
          : 'bg-accent/50 hover:bg-accent'
      )}
      aria-pressed={isSelected}
    >
      <div className="flex items-center gap-3">
        {/* Selection indicator */}
        <div
          className={cn(
            'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors',
            isSelected ? 'border-primary bg-primary' : 'border-border'
          )}
        >
          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <Check className="w-3 h-3 text-white" strokeWidth={3} />
            </motion.div>
          )}
        </div>

        {/* Name */}
        <span className={cn('font-medium', isSelected ? 'text-foreground' : 'text-muted-foreground')}>
          {value.name}
        </span>
      </div>

      {/* Price */}
      <span
        className={cn(
          'font-semibold',
          value.price > 0 ? 'text-chart-2' : 'text-muted-foreground'
        )}
      >
        {value.price > 0 ? `+${formatPrice(value.price, currency)}` : 'W cenie'}
      </span>
    </motion.button>
  );
});
