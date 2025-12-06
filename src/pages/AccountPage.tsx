import { Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Package, Heart, Settings, LogOut, ChevronRight, Shield } from 'lucide-react';
import { useAuthStore } from '@/stores/useAuthStore';
import { Button } from '@/components/ui/Button';

export function AccountPage() {
  const { user, isAuthenticated, logout } = useAuthStore();

  // Redirect to home if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();

  const menuItems = [
    {
      icon: Package,
      label: 'Moje zamówienia',
      description: 'Historia i status zamówień',
      href: '/account/orders',
    },
    {
      icon: Heart,
      label: 'Ulubione projekty',
      description: 'Twoje zapisane projekty etui',
      href: '/account/favorites',
    },
    {
      icon: Settings,
      label: 'Ustawienia konta',
      description: 'Dane osobowe, hasło, preferencje',
      href: '/account/settings',
    },
    {
      icon: Shield,
      label: 'Bezpieczeństwo',
      description: 'Dwuetapowa weryfikacja, sesje',
      href: '/account/security',
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            {/* Avatar */}
            <div className="mb-6">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-primary/20"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold mx-auto">
                  {initials}
                </div>
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Cześć, {user.firstName}!
            </h1>
            <p className="text-muted-foreground">
              Zarządzaj swoim kontem i zamówieniami
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-4 mb-12"
          >
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-primary mb-1">0</p>
              <p className="text-sm text-muted-foreground">Zamówień</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-primary mb-1">0</p>
              <p className="text-sm text-muted-foreground">Ulubionych</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-primary mb-1">0 zł</p>
              <p className="text-sm text-muted-foreground">Oszczędności</p>
            </div>
          </motion.div>

          {/* Menu Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3 mb-8"
          >
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/50 hover:bg-accent/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </motion.div>

          {/* Logout Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              variant="outline"
              onClick={logout}
              className="w-full justify-center gap-2 text-red-500 border-red-500/20 hover:bg-red-500/10 hover:border-red-500/50"
            >
              <LogOut className="w-5 h-5" />
              Wyloguj się
            </Button>
          </motion.div>

          {/* Account Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 p-6 bg-accent/30 border border-border rounded-xl"
          >
            <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Informacje o koncie
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">{user.email}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Imię i nazwisko</p>
                <p className="font-medium text-foreground">
                  {user.firstName} {user.lastName}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Data rejestracji</p>
                <p className="font-medium text-foreground">
                  {new Date(user.createdAt).toLocaleDateString('pl-PL', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Status konta</p>
                <p className="font-medium text-green-500">Aktywne</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
