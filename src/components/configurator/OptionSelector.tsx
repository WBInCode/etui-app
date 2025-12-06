import { memo, useCallback } from 'react';
import { useConfigStore, createSelectOptionValue } from '@/stores/useConfigStore';
import { ColorPicker } from './ColorPicker';
import { MaterialPicker } from './MaterialPicker';
import type { ProductOption } from '@/types';

interface OptionSelectorProps {
  option: ProductOption;
}

export const OptionSelector = memo(function OptionSelector({ option }: OptionSelectorProps) {
  const selectedValueId = useConfigStore(createSelectOptionValue(option.id));
  const setOption = useConfigStore((state) => state.setOption);
  const currency = useConfigStore((state) => state.product.currency);

  const handleSelect = useCallback(
    (valueId: string) => {
      setOption(option.id, valueId);
    },
    [setOption, option.id]
  );

  // Render appropriate picker based on option type
  switch (option.type) {
    case 'color':
      return (
        <ColorPicker
          values={option.values}
          selectedId={selectedValueId}
          onSelect={handleSelect}
          currency={currency}
        />
      );
    case 'material':
    case 'style':
      return (
        <MaterialPicker
          values={option.values}
          selectedId={selectedValueId}
          onSelect={handleSelect}
          currency={currency}
        />
      );
    default:
      return (
        <MaterialPicker
          values={option.values}
          selectedId={selectedValueId}
          onSelect={handleSelect}
          currency={currency}
        />
      );
  }
});
