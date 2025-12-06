import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, Settings, ShoppingBag, Heart, ChevronDown } from 'lucide-react';
import { useAuthStore } from '@/stores/useAuthStore';
import { Button } from '@/components/ui/Button';

export function UserMenu() {
  const { user, isAuthenticated, logout, openLoginModal } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isAuthenticated || !user) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => openLoginModal('login')}
        className="flex items-center gap-2"
      >
        <User className="w-5 h-5" />
        <span className="hidden sm:inline">Zaloguj się</span>
      </Button>
    );
  }

  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-accent transition-colors"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
            {initials}
          </div>
        )}
        <span className="hidden sm:block text-sm font-medium text-foreground">
          {user.firstName}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-64 bg-background border border-border rounded-xl shadow-lg overflow-hidden z-50"
          >
            {/* User info */}
            <div className="px-4 py-3 border-b border-border bg-accent/30">
              <p className="font-medium text-foreground">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm text-muted-foreground truncate">{user.email}</p>
            </div>

            {/* Menu items */}
            <div className="py-2">
              <Link
                to="/account/orders"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-foreground hover:bg-accent transition-colors"
              >
                <ShoppingBag className="w-5 h-5 text-muted-foreground" />
                <span>Moje zamówienia</span>
              </Link>
              <Link
                to="/account/favorites"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-foreground hover:bg-accent transition-colors"
              >
                <Heart className="w-5 h-5 text-muted-foreground" />
                <span>Ulubione</span>
              </Link>
              <Link
                to="/account/settings"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-foreground hover:bg-accent transition-colors"
              >
                <Settings className="w-5 h-5 text-muted-foreground" />
                <span>Ustawienia konta</span>
              </Link>
            </div>

            {/* Logout */}
            <div className="border-t border-border py-2">
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-2.5 w-full text-left text-red-500 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Wyloguj się</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
