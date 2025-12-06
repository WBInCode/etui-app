import { memo } from 'react';
import { Share2, ShoppingCart } from 'lucide-react';
import { useConfigStore } from '@/stores/useConfigStore';
import { Button } from '@/components/ui/Button';

export const Header = memo(function Header() {
  const openShareModal = useConfigStore((state) => state.openShareModal);

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <div>
            <h1 className="font-bold text-foreground">Sneaker Studio</h1>
            <p className="text-xs text-muted-foreground">Konfigurator</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={openShareModal} className="gap-2">
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Udostępnij</span>
          </Button>
          <Button variant="primary" size="sm" className="gap-2">
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Dodaj do koszyka</span>
          </Button>
        </div>
      </div>
    </header>
  );
});
