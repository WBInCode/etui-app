import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/components/layout/RootLayout';

// Eager-load critical pages
import { HomePage } from '@/pages/HomePage';
import { ConfiguratorPage } from '@/pages/ConfiguratorPage';
import { SelectPhonePage } from '@/pages/SelectPhonePage';

// Lazy-load secondary pages
const GalleryPage = lazy(() => import('@/pages/GalleryPage').then(m => ({ default: m.GalleryPage })));
const HowItWorksPage = lazy(() => import('@/pages/HowItWorksPage').then(m => ({ default: m.HowItWorksPage })));
const AboutPage = lazy(() => import('@/pages/AboutPage').then(m => ({ default: m.AboutPage })));
const FAQPage = lazy(() => import('@/pages/FAQPage').then(m => ({ default: m.FAQPage })));
const ContactPage = lazy(() => import('@/pages/ContactPage').then(m => ({ default: m.ContactPage })));
const TermsPage = lazy(() => import('@/pages/TermsPage').then(m => ({ default: m.TermsPage })));
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const ReturnsPage = lazy(() => import('@/pages/ReturnsPage').then(m => ({ default: m.ReturnsPage })));
const AccountPage = lazy(() => import('@/pages/AccountPage').then(m => ({ default: m.AccountPage })));
const CheckoutPage = lazy(() => import('@/pages/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

function LazyPage({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    }>
      {children}
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'configure',
        element: <SelectPhonePage />,
      },
      {
        path: 'configure/editor',
        element: <ConfiguratorPage />,
      },
      {
        path: 'gallery',
        element: <LazyPage><GalleryPage /></LazyPage>,
      },
      {
        path: 'how-it-works',
        element: <LazyPage><HowItWorksPage /></LazyPage>,
      },
      {
        path: 'about',
        element: <LazyPage><AboutPage /></LazyPage>,
      },
      {
        path: 'faq',
        element: <LazyPage><FAQPage /></LazyPage>,
      },
      {
        path: 'contact',
        element: <LazyPage><ContactPage /></LazyPage>,
      },
      // Checkout
      {
        path: 'checkout',
        element: <LazyPage><CheckoutPage /></LazyPage>,
      },
      // Account pages
      {
        path: 'account',
        element: <LazyPage><AccountPage /></LazyPage>,
      },
      {
        path: 'account/orders',
        element: <LazyPage><AccountPage /></LazyPage>,
      },
      {
        path: 'account/favorites',
        element: <LazyPage><AccountPage /></LazyPage>,
      },
      {
        path: 'account/settings',
        element: <LazyPage><AccountPage /></LazyPage>,
      },
      {
        path: 'account/security',
        element: <LazyPage><AccountPage /></LazyPage>,
      },
      // Category pages
      {
        path: 'ready-cases',
        element: <CategoryPage 
          title="Gotowe etui" 
          description="Wybierz z naszej kolekcji gotowych projektów"
          category="ready"
        />,
      },
      {
        path: 'tempered-glass',
        element: <CategoryPage 
          title="Szkła hartowane" 
          description="Maksymalna ochrona ekranu Twojego telefonu"
          category="glass"
        />,
      },
      {
        path: 'hydrogel-films',
        element: <CategoryPage 
          title="Folie hydrożelowe" 
          description="Niewidoczna ochrona, pełna czułość dotyku"
          category="film"
        />,
      },
      {
        path: 'new',
        element: <CategoryPage 
          title="Nowości" 
          description="Sprawdź najnowsze produkty w naszej ofercie"
          category="new"
        />,
      },
      {
        path: 'bestsellers',
        element: <CategoryPage 
          title="Bestsellery" 
          description="Najpopularniejsze produkty wybierane przez klientów"
          category="bestseller"
        />,
      },
      // Auth pages
      {
        path: 'login',
        element: <PlaceholderPage title="Logowanie" description="Wkrótce dostępne" />,
      },
      {
        path: 'register',
        element: <PlaceholderPage title="Rejestracja" description="Wkrótce dostępne" />,
      },
      // Other pages
      {
        path: 'cart',
        element: <PlaceholderPage title="Koszyk" description="Wkrótce dostępny" />,
      },
      {
        path: 'terms',
        element: <LazyPage><TermsPage /></LazyPage>,
      },
      {
        path: 'privacy',
        element: <LazyPage><PrivacyPage /></LazyPage>,
      },
      {
        path: 'returns',
        element: <LazyPage><ReturnsPage /></LazyPage>,
      },
      {
        path: '*',
        element: <LazyPage><NotFoundPage /></LazyPage>,
      },
    ],
  },
]);

// Placeholder component for future pages
function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

// Category page component
function CategoryPage({ 
  title, 
  description, 
  category 
}: { 
  title: string; 
  description: string; 
  category: string;
}) {
  // Sample products for each category
  const products = getCategoryProducts(category);

  // Get product type for SVG rendering
  const getProductSvg = (_product: ReturnType<typeof getCategoryProducts>[0], index: number) => {
    const caseColors = ['fill-neutral-900', 'fill-blue-600', 'fill-emerald-600', 'fill-orange-500', 'fill-rose-400', 'fill-purple-600', 'fill-neutral-100', 'fill-red-600'];
    const colorClass = caseColors[index % caseColors.length];
    
    if (category === 'glass') {
      // Tempered glass SVG
      return (
        <svg viewBox="0 0 100 140" className="w-20 h-28 drop-shadow-lg">
          <rect x="15" y="10" width="70" height="120" rx="8" className="fill-neutral-800" />
          <rect x="18" y="15" width="64" height="110" rx="6" className="fill-neutral-900" />
          <rect x="20" y="18" width="60" height="104" rx="4" className="fill-neutral-700/50" />
          <rect x="20" y="18" width="60" height="104" rx="4" className="fill-white/20" />
          <text x="50" y="75" textAnchor="middle" className="fill-white text-[8px] font-bold">9H</text>
        </svg>
      );
    }
    
    if (category === 'film') {
      // Hydrogel film SVG
      return (
        <svg viewBox="0 0 100 140" className="w-20 h-28 drop-shadow-lg">
          <rect x="15" y="10" width="70" height="120" rx="8" className="fill-neutral-800" />
          <rect x="18" y="15" width="64" height="110" rx="6" className="fill-neutral-900" />
          <rect x="20" y="18" width="60" height="104" rx="4" className="fill-blue-400/30" />
          <path d="M25 30 L75 30 L70 50 L30 50 Z" className="fill-white/40" />
        </svg>
      );
    }
    
    // Regular case SVG
    return (
      <svg viewBox="0 0 100 140" className="w-20 h-28 drop-shadow-lg">
        <rect x="10" y="5" width="80" height="130" rx="12" className={colorClass} />
        <rect x="15" y="12" width="70" height="116" rx="8" className="fill-black/20" />
        <rect x="25" y="18" width="30" height="30" rx="6" className="fill-neutral-900/30" />
        <circle cx="35" cy="28" r="6" className="fill-neutral-900/50" />
        <circle cx="48" cy="28" r="6" className="fill-neutral-900/50" />
        <circle cx="35" cy="41" r="6" className="fill-neutral-900/50" />
      </svg>
    );
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">{title}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-square relative bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center p-6">
                <div className="group-hover:scale-105 transition-transform duration-300">
                  {getProductSvg(product, index)}
                </div>
                {product.tag && (
                  <span className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-full ${
                    product.tag === 'NOWOŚĆ' ? 'bg-green-500 text-white' :
                    product.tag === 'Bestseller' ? 'bg-orange-500 text-white' :
                    'bg-blue-500 text-white'
                  }`}>
                    {product.tag}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{product.subtitle}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-foreground">{product.price} zł</span>
                    {product.oldPrice && (
                      <span className="text-sm text-muted-foreground line-through">{product.oldPrice} zł</span>
                    )}
                  </div>
                  <button className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary hover:text-white flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function getCategoryProducts(category: string) {
  const baseProducts = [
    { id: 1, name: 'Classic Black', subtitle: 'iPhone 15 Pro', price: 79, color: '#1a1a1a', tag: '' as string },
    { id: 2, name: 'Ocean Blue', subtitle: 'iPhone 15', price: 79, color: '#2563EB', tag: '' },
    { id: 3, name: 'Forest Green', subtitle: 'iPhone 14 Pro', price: 69, oldPrice: 89, color: '#16A34A', tag: '' },
    { id: 4, name: 'Sunset Orange', subtitle: 'Samsung S24', price: 79, color: '#EA580C', tag: '' },
    { id: 5, name: 'Rose Gold', subtitle: 'iPhone 15 Pro Max', price: 99, color: '#B76E79', tag: '' },
    { id: 6, name: 'Midnight Purple', subtitle: 'iPhone 14', price: 69, color: '#9333EA', tag: '' },
    { id: 7, name: 'Arctic White', subtitle: 'Samsung S23', price: 79, color: '#F8FAFC', tag: '' },
    { id: 8, name: 'Cherry Red', subtitle: 'iPhone 15', price: 79, color: '#DC2626', tag: '' },
  ];

  if (category === 'glass') {
    return baseProducts.slice(0, 6).map(p => ({
      ...p,
      name: `Szkło 9H ${p.subtitle}`,
      subtitle: 'Full Cover',
      price: 49,
      oldPrice: undefined,
      color: '#E5E7EB',
      tag: '',
    }));
  }

  if (category === 'film') {
    return baseProducts.slice(0, 6).map(p => ({
      ...p,
      name: `Folia Hydrogel ${p.subtitle}`,
      subtitle: 'Self-healing',
      price: 39,
      oldPrice: undefined,
      color: '#DBEAFE',
      tag: '',
    }));
  }

  if (category === 'new') {
    return baseProducts.slice(0, 4).map((p, i) => ({
      ...p,
      subtitle: p.subtitle,
      tag: i === 0 ? 'NOWOŚĆ' : '',
    }));
  }

  if (category === 'bestseller') {
    return baseProducts.map((p, i) => ({
      ...p,
      subtitle: p.subtitle,
      tag: i < 3 ? 'Bestseller' : '',
    }));
  }

  return baseProducts;
}
