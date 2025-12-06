import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Truck, Palette, Sparkles, Phone, Smartphone, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { HeroSection } from '@/components/layout/HeroSection';

// Profesjonalne ikony SVG dla kategorii
const CategoryIcons = {
  custom: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Paleta malarska */}
      <defs>
        <linearGradient id="paletteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="34" rx="26" ry="22" fill="url(#paletteGrad)" />
      <ellipse cx="32" cy="34" rx="22" ry="18" fill="#FEF3C7" opacity="0.3" />
      {/* Otwór na kciuk */}
      <ellipse cx="20" cy="40" rx="6" ry="7" fill="#1a1a1a" />
      {/* Farby */}
      <circle cx="44" cy="28" r="5" fill="#EF4444" />
      <circle cx="36" cy="22" r="4" fill="#3B82F6" />
      <circle cx="26" cy="24" r="4" fill="#22C55E" />
      <circle cx="48" cy="38" r="4" fill="#A855F7" />
      <circle cx="38" cy="44" r="3.5" fill="#EC4899" />
      {/* Pędzel */}
      <rect x="50" y="8" width="4" height="18" rx="2" fill="#92400E" transform="rotate(25 52 17)" />
      <path d="M54 6 L58 4 L60 8 L56 12 Z" fill="#D97706" transform="rotate(25 57 9)" />
    </svg>
  ),
  ready: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Telefon */}
      <defs>
        <linearGradient id="phoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <rect x="16" y="6" width="32" height="52" rx="6" fill="#1F2937" />
      <rect x="18" y="12" width="28" height="40" rx="2" fill="url(#phoneGrad)" />
      {/* Siatka aplikacji */}
      <rect x="21" y="16" width="8" height="8" rx="2" fill="#FCD34D" />
      <rect x="32" y="16" width="8" height="8" rx="2" fill="#F472B6" />
      <rect x="21" y="27" width="8" height="8" rx="2" fill="#34D399" />
      <rect x="32" y="27" width="8" height="8" rx="2" fill="#A78BFA" />
      <rect x="21" y="38" width="8" height="8" rx="2" fill="#FB923C" />
      <rect x="32" y="38" width="8" height="8" rx="2" fill="#22D3EE" />
      {/* Dynamic Island */}
      <rect x="26" y="8" width="12" height="3" rx="1.5" fill="#000" />
    </svg>
  ),
  glass: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tarcza */}
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEE2E2" />
          <stop offset="50%" stopColor="#FECACA" />
          <stop offset="100%" stopColor="#FCA5A5" />
        </linearGradient>
        <linearGradient id="shieldInner" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
      </defs>
      <path d="M32 4 L54 14 L54 30 C54 44 44 54 32 60 C20 54 10 44 10 30 L10 14 Z" fill="url(#shieldGrad)" />
      <path d="M32 12 L48 20 L48 32 C48 42 40 50 32 54 C24 50 16 42 16 32 L16 20 Z" fill="url(#shieldInner)" />
      {/* Checkmark */}
      <path d="M24 32 L30 38 L42 26" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {/* Połysk */}
      <path d="M18 18 L22 22" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  ),
  film: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Folia nakładana na telefon */}
      <defs>
        <linearGradient id="filmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="phoneBase" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#374151" />
          <stop offset="100%" stopColor="#1F2937" />
        </linearGradient>
      </defs>
      {/* Telefon bazowy */}
      <rect x="18" y="8" width="28" height="48" rx="4" fill="url(#phoneBase)" />
      <rect x="20" y="14" width="24" height="36" rx="1" fill="#4B5563" />
      {/* Folia - przezroczysta warstwa unosząca się */}
      <g transform="translate(-4, -6)">
        <rect x="22" y="10" width="28" height="48" rx="4" fill="url(#filmGrad)" opacity="0.85" />
        {/* Efekt odbicia światła na folii */}
        <path d="M24 12 L38 12 L26 58 L24 58 Z" fill="white" opacity="0.3" />
        <path d="M42 12 L46 12 L46 20 L40 32 Z" fill="white" opacity="0.2" />
      </g>
      {/* Strzałka wskazująca nakładanie */}
      <path d="M50 28 L56 34 L50 40" stroke="#22D3EE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M50 28 L56 34 L50 40" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    </svg>
  ),
};

// Kategorie produktów
const categories = [
  {
    id: 'custom' as const,
    title: 'Zaprojektuj własne etui',
    description: 'Stwórz unikalne etui w naszym konfiguratorze',
    icon: Sparkles,
    link: '/configure',
    featured: true,
    IconComponent: CategoryIcons.custom,
    gradient: 'from-amber-500/20 via-orange-500/10 to-yellow-500/20',
    hoverGradient: 'group-hover:from-amber-500/30 group-hover:via-orange-500/20 group-hover:to-yellow-500/30',
  },
  {
    id: 'ready' as const,
    title: 'Gotowe etui',
    description: 'Wybierz z gotowych projektów',
    icon: Phone,
    link: '/ready-cases',
    IconComponent: CategoryIcons.ready,
    gradient: 'from-blue-500/20 via-indigo-500/10 to-cyan-500/20',
    hoverGradient: 'group-hover:from-blue-500/30 group-hover:via-indigo-500/20 group-hover:to-cyan-500/30',
  },
  {
    id: 'glass' as const,
    title: 'Szkła hartowane',
    description: 'Ochrona ekranu premium',
    icon: Shield,
    link: '/tempered-glass',
    IconComponent: CategoryIcons.glass,
    gradient: 'from-red-500/20 via-rose-500/10 to-pink-500/20',
    hoverGradient: 'group-hover:from-red-500/30 group-hover:via-rose-500/20 group-hover:to-pink-500/30',
  },
  {
    id: 'film' as const,
    title: 'Folie hydrożelowe',
    description: 'Niewidoczna ochrona',
    icon: Smartphone,
    link: '/hydrogel-films',
    IconComponent: CategoryIcons.film,
    gradient: 'from-purple-500/20 via-fuchsia-500/10 to-cyan-500/20',
    hoverGradient: 'group-hover:from-purple-500/30 group-hover:via-fuchsia-500/20 group-hover:to-cyan-500/30',
  },
];

// Popularne telefony
const popularPhones = [
  { name: 'iPhone 15 Pro Max', count: 245 },
  { name: 'iPhone 15 Pro', count: 198 },
  { name: 'iPhone 15', count: 176 },
  { name: 'Samsung Galaxy S24 Ultra', count: 156 },
  { name: 'Samsung Galaxy S24', count: 134 },
  { name: 'iPhone 14 Pro', count: 112 },
];

// Bestsellery z profesjonalnymi danymi
const bestsellers = [
  { 
    id: 1, 
    name: 'Etui MagSafe Pro', 
    description: 'Silikonowe etui z MagSafe',
    price: 129, 
    oldPrice: 159, 
    tag: 'Bestseller',
    rating: 4.9,
    reviews: 234,
    image: 'magsafe'
  },
  { 
    id: 2, 
    name: 'Classic Clear', 
    description: 'Przezroczyste etui ochronne',
    price: 79, 
    tag: 'Popularne',
    rating: 4.7,
    reviews: 189,
    image: 'clear'
  },
  { 
    id: 3, 
    name: 'Leather Premium', 
    description: 'Skórzane etui premium',
    price: 179, 
    tag: 'Nowość',
    rating: 5.0,
    reviews: 56,
    image: 'leather'
  },
  { 
    id: 4, 
    name: 'Soft Touch Matte', 
    description: 'Matowe wykończenie soft-touch',
    price: 99, 
    oldPrice: 119, 
    tag: '-17%',
    rating: 4.8,
    reviews: 312,
    image: 'matte'
  },
];

// Cechy
const features = [
  { icon: Truck, title: 'Darmowa dostawa', description: 'Od 150 PLN' },
  { icon: Shield, title: '2 lata gwarancji', description: 'Na wszystkie produkty' },
  { icon: Palette, title: '50+ kolorów', description: 'Do personalizacji' },
];

export function HomePage() {
  // Inicjalizacja stanu z sessionStorage - banner wraca po zamknięciu przeglądarki
  const [showPromoBanner, setShowPromoBanner] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('promo-banner-dismissed') !== 'true';
    }
    return true;
  });

  const dismissBanner = () => {
    setShowPromoBanner(false);
    sessionStorage.setItem('promo-banner-dismissed', 'true');
  };

  return (
    <div className="min-h-screen">
      {/* Top Banner */}
      {showPromoBanner && (
        <motion.div
          initial={false}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-primary"
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-center relative">
              <p className="text-center text-primary-foreground text-sm font-medium">
                🎄 Świąteczna promocja! <span className="font-bold">-20%</span> na wszystkie etui z kodem: <span className="font-bold">XMAS2025</span>
              </p>
              <button
                onClick={dismissBanner}
                className="absolute right-0 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                aria-label="Zamknij powiadomienie"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <HeroSection />

      {/* Features Bar */}
      <section className="py-8 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center justify-center gap-4 py-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{feature.title}</div>
                  <div className="text-sm text-muted-foreground">{feature.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Odkryj nasze produkty
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Wybierz kategorię i znajdź idealne akcesorium dla swojego telefonu
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link to={category.link}>
                  <motion.div 
                    className={`group relative p-8 rounded-3xl border transition-all duration-500 h-full overflow-hidden ${
                      category.featured 
                        ? 'bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground border-primary shadow-lg shadow-primary/25' 
                        : 'bg-card border-border hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10'
                    }`}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Animated background gradient */}
                    {!category.featured && (
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} ${category.hoverGradient} transition-all duration-500 opacity-0 group-hover:opacity-100`} />
                    )}
                    
                    {/* Floating particles effect for featured */}
                    {category.featured && (
                      <>
                        <motion.div 
                          className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full"
                          animate={{ y: [0, -10, 0], opacity: [0.3, 0.7, 0.3] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div 
                          className="absolute bottom-8 right-8 w-3 h-3 bg-white/20 rounded-full"
                          animate={{ y: [0, -15, 0], opacity: [0.2, 0.5, 0.2] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        />
                        <motion.div 
                          className="absolute top-12 left-6 w-1.5 h-1.5 bg-white/40 rounded-full"
                          animate={{ y: [0, -8, 0], opacity: [0.4, 0.8, 0.4] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        />
                      </>
                    )}

                    {/* Icon with animation */}
                    <motion.div 
                      className="relative w-20 h-20 mb-6"
                      whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <category.IconComponent className="w-full h-full" />
                    </motion.div>

                    <div className="relative">
                      <h3 className={`text-xl font-bold mb-2 ${category.featured ? '' : 'text-foreground'}`}>
                        {category.title}
                      </h3>
                      <p className={`text-sm mb-4 ${category.featured ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                        {category.description}
                      </p>
                      <motion.div 
                        className={`flex items-center gap-2 text-sm font-medium ${
                          category.featured ? '' : 'text-primary'
                        }`}
                      >
                        <span>Odkryj</span>
                        <motion.div
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                          className="inline-flex"
                        >
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Shine effect on hover */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
                    />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Jak to działa?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Stworzenie własnego etui to tylko 4 proste kroki
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: 'Wybierz telefon',
                description: 'Znajdź swój model telefonu spośród ponad 500 obsługiwanych urządzeń',
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="6" y="2" width="12" height="20" rx="2" />
                    <line x1="10" y1="18" x2="14" y2="18" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                step: 2,
                title: 'Zaprojektuj etui',
                description: 'Dodaj własne zdjęcie, tekst lub wybierz z gotowych wzorów',
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v2m0 16v2M2 12h2m16 0h2" strokeLinecap="round" />
                    <path d="M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                step: 3,
                title: 'Podgląd 3D',
                description: 'Zobacz jak będzie wyglądać Twoje etui w czasie rzeczywistym',
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                ),
              },
              {
                step: 4,
                title: 'Zamów i odbierz',
                description: 'Zapłać wygodnie online i otrzymaj przesyłkę w 2-3 dni robocze',
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="1" y="6" width="22" height="12" rx="2" />
                    <path d="M1 10h22" />
                    <path d="M6 14h4" strokeLinecap="round" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative"
              >
                {/* Connector line */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-primary/50 to-transparent" />
                )}
                
                <motion.div
                  className="relative bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all group"
                  whileHover={{ y: -5 }}
                >
                  {/* Step number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {item.step}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {item.icon}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/configure">
              <Button size="lg" className="gap-2">
                Rozpocznij teraz
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                Bestsellery 🔥
              </h2>
              <p className="text-muted-foreground">Najczęściej wybierane produkty</p>
            </div>
            <Link to="/bestsellers" className="hidden sm:block">
              <Button variant="outline" className="gap-2">
                Zobacz wszystkie
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestsellers.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-background rounded-2xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                  {/* Product image */}
                  <div className="aspect-square relative bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 p-6 flex items-center justify-center">
                    {/* Phone case SVG illustration */}
                    <div className="relative w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <svg viewBox="0 0 100 140" className="w-20 h-28 sm:w-24 sm:h-36 drop-shadow-lg">
                        {/* Case body */}
                        <rect 
                          x="10" y="5" width="80" height="130" rx="12" 
                          className={`${
                            product.image === 'magsafe' ? 'fill-neutral-900' :
                            product.image === 'clear' ? 'fill-white/80 stroke-neutral-300' :
                            product.image === 'leather' ? 'fill-amber-800' :
                            'fill-blue-600'
                          }`}
                          strokeWidth={product.image === 'clear' ? 2 : 0}
                        />
                        {/* Inner phone screen area */}
                        <rect 
                          x="15" y="12" width="70" height="116" rx="8" 
                          className={`${
                            product.image === 'clear' ? 'fill-neutral-800' : 'fill-black/20'
                          }`}
                        />
                        {/* Camera cutout */}
                        <rect x="25" y="18" width="30" height="30" rx="6" className="fill-neutral-900/30" />
                        <circle cx="35" cy="28" r="6" className="fill-neutral-900/50" />
                        <circle cx="48" cy="28" r="6" className="fill-neutral-900/50" />
                        <circle cx="35" cy="41" r="6" className="fill-neutral-900/50" />
                        {/* MagSafe ring for magsafe case */}
                        {product.image === 'magsafe' && (
                          <circle cx="50" cy="85" r="20" className="fill-none stroke-neutral-600" strokeWidth="3" />
                        )}
                      </svg>
                    </div>
                    {/* Tag */}
                    <span className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-full ${
                      product.tag === 'Bestseller' ? 'bg-orange-500 text-white' :
                      product.tag === 'Nowość' ? 'bg-green-500 text-white' :
                      product.tag === 'Popularne' ? 'bg-blue-500 text-white' :
                      'bg-red-500 text-white'
                    }`}>
                      {product.tag}
                    </span>
                  </div>
                  {/* Product info */}
                  <div className="p-4 sm:p-5">
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-neutral-300 dark:text-neutral-600'}`}
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>
                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg sm:text-xl font-bold text-foreground">{product.price} zł</span>
                        {product.oldPrice && (
                          <span className="text-sm text-muted-foreground line-through">{product.oldPrice} zł</span>
                        )}
                      </div>
                      <button className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary hover:text-white flex items-center justify-center transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link to="/bestsellers">
              <Button variant="outline" className="gap-2">
                Zobacz wszystkie
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Phones Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Wybierz swój model telefonu
            </h2>
            <p className="text-muted-foreground text-lg">
              Mamy akcesoria do najpopularniejszych modeli
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularPhones.map((phone, index) => {
              // Determine brand for icon styling
              const isApple = phone.name.toLowerCase().includes('iphone');
              const isSamsung = phone.name.toLowerCase().includes('samsung');
              
              return (
                <motion.div
                  key={phone.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link to={`/ready-cases?phone=${encodeURIComponent(phone.name)}`}>
                    <motion.div 
                      className="relative bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-all group overflow-hidden"
                      whileHover={{ y: -5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Subtle gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Phone icon */}
                      <div className="relative mb-4 flex justify-center">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                          isApple 
                            ? 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 group-hover:from-gray-200 group-hover:to-gray-300 dark:group-hover:from-gray-700 dark:group-hover:to-gray-600' 
                            : isSamsung
                              ? 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 group-hover:from-blue-100 group-hover:to-blue-200 dark:group-hover:from-blue-900 dark:group-hover:to-blue-800'
                              : 'bg-gradient-to-br from-primary/10 to-primary/20 group-hover:from-primary/20 group-hover:to-primary/30'
                        }`}>
                          <svg className={`w-7 h-7 transition-colors ${
                            isApple 
                              ? 'text-gray-700 dark:text-gray-300' 
                              : isSamsung 
                                ? 'text-blue-600 dark:text-blue-400'
                                : 'text-primary'
                          }`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="6" y="2" width="12" height="20" rx="2" />
                            <line x1="10" y1="18" x2="14" y2="18" strokeLinecap="round" />
                            <rect x="8" y="4" width="8" height="12" rx="1" fill="currentColor" opacity="0.1" />
                          </svg>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors line-clamp-2 min-h-[2.5rem]">
                          {phone.name}
                        </div>
                        <div className="text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          {phone.count} produktów
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="relative rounded-3xl p-12 lg:p-16 text-center overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
            
            {/* Animated gradient orbs */}
            <motion.div 
              className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.15, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
            
            {/* Content */}
            <div className="relative z-10">
              <motion.h2 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Stwórz swoje wymarzone etui
              </motion.h2>
              <motion.p 
                className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Konfigurator online pozwoli Ci zaprojektować etui idealne dla Ciebie. 
                Wybierz kolory, materiały i dodatki – my zajmiemy się resztą!
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Link to="/configure">
                  <motion.button
                    className="group relative inline-flex items-center gap-3 px-10 py-4 text-lg font-semibold rounded-2xl bg-white text-gray-900 hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Rozpocznij projektowanie
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
