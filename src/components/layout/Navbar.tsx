import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/site.config';
import { Menu, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CartIcon } from '@/components/cart';
import { SearchBar } from './SearchBar';
import { UserMenu } from '@/components/auth';
import { Button } from '@/components/ui/Button';

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

// Social media icons as SVG components
const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const categories = [
  { to: '/configure', label: 'Zaprojektuj etui', icon: '🎨' },
  { to: '/ready-cases', label: 'Gotowe etui' },
  { to: '/tempered-glass', label: 'Szkła hartowane' },
  { to: '/hydrogel-films', label: 'Folie hydrożelowe' },
  { to: '/new', label: 'Nowości', badge: 'NEW' },
  { to: '/bestsellers', label: 'Bestsellery', badge: '🔥' },
];

const socialLinks = [
  { icon: InstagramIcon, href: '#', label: 'Instagram' },
  { icon: FacebookIcon, href: '#', label: 'Facebook' },
  { icon: TikTokIcon, href: '#', label: 'TikTok' },
  { icon: YouTubeIcon, href: '#', label: 'YouTube' },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      {/* Top Bar - Social Media | Logo | Actions */}
      <div className="">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Left - Social Media Icons */}
            <div className="flex items-center gap-1">
              {socialLinks.map((social) => (
                <button
                  key={social.label}
                  onClick={(e) => e.preventDefault()}
                  className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-accent transition-all"
                  aria-label={social.label}
                >
                  <social.icon />
                </button>
              ))}
            </div>

            {/* Center - Logo */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-foreground flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <BrandLogo className="w-6 h-6 text-background" />
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-2xl text-foreground">{siteConfig.name}</span>
                <span className="text-primary font-bold text-2xl">.</span>
              </div>
            </Link>

            {/* Right side actions */}
            <div className="flex items-center gap-1">
              {/* User menu */}
              <UserMenu />

              {/* Search button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2.5 rounded-xl hover:bg-accent transition-colors"
                aria-label="Szukaj"
              >
                <Search className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* Cart */}
              <CartIcon />

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl hover:bg-accent transition-colors"
                aria-label={isMobileMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-foreground" />
                ) : (
                  <Menu className="w-5 h-5 text-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* Search Bar - Expandable */}
          <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </div>
      </div>

      {/* Categories Bar - Desktop */}
      <nav className="hidden lg:block bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 h-14">
            {categories.map((category) => (
              <NavLink
                key={category.to}
                to={category.to}
                className={({ isActive }) =>
                  cn(
                    'relative px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground/80 hover:text-foreground hover:bg-accent'
                  )
                }
              >
                <span className="flex items-center gap-2">
                  {category.icon && <span>{category.icon}</span>}
                  {category.label}
                  {category.badge && (
                    <span className={cn(
                      'text-xs px-1.5 py-0.5 rounded-full',
                      category.badge === 'NEW' 
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-orange-500/20 text-orange-400'
                    )}>
                      {category.badge}
                    </span>
                  )}
                </span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-background border-b border-border"
          >
            <div className="container mx-auto px-4 py-4">
              {/* Categories */}
              <div className="space-y-1 mb-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider px-4 mb-2">
                  Kategorie
                </p>
                {categories.map((category) => (
                  <NavLink
                    key={category.to}
                    to={category.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                        isActive
                          ? 'text-primary bg-primary/10'
                          : 'text-foreground/80 hover:text-foreground hover:bg-accent'
                      )
                    }
                  >
                    <span className="flex items-center gap-2">
                      {category.icon && <span>{category.icon}</span>}
                      {category.label}
                    </span>
                    {category.badge && (
                      <span className={cn(
                        'text-xs px-2 py-0.5 rounded-full',
                        category.badge === 'NEW' 
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-orange-500/20 text-orange-400'
                      )}>
                        {category.badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-border my-4" />

              {/* Info links */}
              <div className="space-y-1 mb-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider px-4 mb-2">
                  Informacje
                </p>
                {[
                  { to: '/how-it-works', label: 'Jak to działa' },
                  { to: '/about', label: 'O nas' },
                  { to: '/faq', label: 'FAQ' },
                  { to: '/contact', label: 'Kontakt' },
                ].map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'block px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                        isActive
                          ? 'text-primary bg-primary/10'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>

              {/* Auth buttons - Mobile */}
              <div className="sm:hidden space-y-2 pt-4 border-t border-border">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" size="lg" className="w-full">
                    Zaloguj się
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="primary" size="lg" className="w-full">
                    Zarejestruj się
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
