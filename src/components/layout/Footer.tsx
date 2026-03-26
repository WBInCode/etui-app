import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { siteConfig } from '@/site.config';

// Logo icon - stylized phone case
const BrandLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Phone case outline */}
    <rect x="5" y="2" width="14" height="20" rx="3" stroke="currentColor" strokeWidth="2" />
    {/* Inner screen area */}
    <rect x="7" y="5" width="10" height="14" rx="1" fill="currentColor" opacity="0.2" />
    {/* Stylized "C" design element */}
    <path 
      d="M14 9C14 9 13 8 11.5 8C9.5 8 8 9.5 8 12C8 14.5 9.5 16 11.5 16C13 16 14 15 14 15" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);

const footerLinks = {
  product: [
    { to: '/configure', label: 'Konfigurator' },
    { to: '/gallery', label: 'Galeria' },
    { to: '/how-it-works', label: 'Jak to działa?' },
  ],
  company: [
    { to: '/about', label: 'O nas' },
    { to: '/contact', label: 'Kontakt' },
    { to: '/faq', label: 'FAQ' },
  ],
  legal: [
    { to: '/terms', label: 'Regulamin' },
    { to: '/privacy', label: 'Polityka prywatności' },
    { to: '/returns', label: 'Zwroty' },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center">
                <BrandLogo className="w-5 h-5 text-background" />
              </div>
              <div>
                <span className="font-bold text-lg text-foreground">{siteConfig.name}</span>
                <span className="text-primary font-bold">.</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs mb-6">
              Projektuj unikalne etui na telefon. Wysoka jakość, polska produkcja, 
              ekspresowa dostawa.
            </p>
            <div className="flex gap-4">
              <button
                className="p-2 rounded-lg bg-accent hover:bg-primary/20 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </button>
              <button
                className="p-2 rounded-lg bg-accent hover:bg-primary/20 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button
                className="p-2 rounded-lg bg-accent hover:bg-primary/20 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Produkt</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Firma</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Prawne</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {siteConfig.name}. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex items-center gap-3">
            {/* Payment icons from Logo.dev */}
            {/* Dodaj tu ikony metod płatności — użyj Logo.dev z tokenem z .env lub własne SVG */}
            <img 
              src={`https://img.logo.dev/cardinalcommerce.com?token=${import.meta.env.VITE_LOGO_DEV_TOKEN}`} 
              alt="Visa" 
              className="h-8 rounded"
            />
            <img 
              src={`https://img.logo.dev/mastercard.com.au?token=${import.meta.env.VITE_LOGO_DEV_TOKEN}`} 
              alt="Mastercard" 
              className="h-8 rounded"
            />
            <img 
              src={`https://img.logo.dev/groupone.pl?token=${import.meta.env.VITE_LOGO_DEV_TOKEN}`} 
              alt="BLIK" 
              className="h-8 rounded"
            />
            <img 
              src={`https://img.logo.dev/przelewy24.pl?token=${import.meta.env.VITE_LOGO_DEV_TOKEN}`} 
              alt="Przelewy24" 
              className="h-8 rounded"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
