import { memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { useConfigStore, selectProduct, selectActiveOptionIndex } from '@/stores/useConfigStore';
import { OptionSelector } from './OptionSelector';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

export const ConfigPanel = memo(function ConfigPanel() {
  const product = useConfigStore(selectProduct);
  const activeIndex = useConfigStore(selectActiveOptionIndex);
  const setActiveIndex = useConfigStore((state) => state.setActiveOptionIndex);
  const resetConfiguration = useConfigStore((state) => state.resetConfiguration);

  const activeOption = product.options[activeIndex];
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === product.options.length - 1;

  const handlePrev = useCallback(() => {
    if (!isFirst) {
      setActiveIndex(activeIndex - 1);
    }
  }, [isFirst, activeIndex, setActiveIndex]);

  const handleNext = useCallback(() => {
    if (!isLast) {
      setActiveIndex(activeIndex + 1);
    }
  }, [isLast, activeIndex, setActiveIndex]);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">{product.name}</h2>
            <p className="text-sm text-muted-foreground">{product.description}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetConfiguration}
            aria-label="Resetuj konfigurację"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Progress indicator */}
        <div className="mt-4 flex gap-1">
          {product.options.map((option, index) => (
            <button
              key={option.id}
              onClick={() => setActiveIndex(index)}
              className={`
                h-1 flex-1 rounded-full transition-all duration-300
                ${index === activeIndex ? 'bg-primary' : 'bg-border'}
                ${index < activeIndex ? 'bg-primary/50' : ''}
                hover:bg-primary/70
              `}
              aria-label={`Przejdź do: ${option.name}`}
            />
          ))}
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden flex flex-col">
        {/* Step indicator */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Krok {activeIndex + 1} z {product.options.length}
            </span>
            {!activeOption.required && (
              <span className="text-xs text-muted-foreground bg-accent px-2 py-1 rounded">
                Opcjonalne
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-foreground">{activeOption.name}</h3>
          {activeOption.description && (
            <p className="text-sm text-muted-foreground">{activeOption.description}</p>
          )}
        </div>

        {/* Option selector with animation */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeOption.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <OptionSelector option={activeOption} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex-shrink-0 flex items-center justify-between pt-4 mt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={isFirst}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Wstecz
          </Button>

          <Button
            variant="primary"
            onClick={handleNext}
            disabled={isLast}
            className="gap-2"
          >
            Dalej
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});
