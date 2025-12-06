import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Smartphone, Shield, Droplets, Sparkles, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

// Popularne wyszukiwania
const popularSearches = [
  'iPhone 16',
  'iPhone 15',
  'Samsung Galaxy',
  'Etui silikonowe',
  'Szkło hartowane',
];

// Baza produktów/kategorii do wyszukiwania
const searchableItems = [
  // Telefony - iPhone
  { id: 'iphone-16-pro-max', name: 'iPhone 16 Pro Max', category: 'Zaprojektuj etui', path: '/configure', icon: Smartphone, tags: ['iphone', 'apple', 'etui', 'case', '16'] },
  { id: 'iphone-16-pro', name: 'iPhone 16 Pro', category: 'Zaprojektuj etui', path: '/configure', icon: Smartphone, tags: ['iphone', 'apple', 'etui', 'case', '16'] },
  { id: 'iphone-16', name: 'iPhone 16', category: 'Zaprojektuj etui', path: '/configure', icon: Smartphone, tags: ['iphone', 'apple', 'etui', 'case', '16'] },
  { id: 'iphone-15-pro-max', name: 'iPhone 15 Pro Max', category: 'Zaprojektuj etui', path: '/configure', icon: Smartphone, tags: ['iphone', 'apple', 'etui', 'case', '15'] },
  { id: 'iphone-15-pro', name: 'iPhone 15 Pro', category: 'Zaprojektuj etui', path: '/configure', icon: Smartphone, tags: ['iphone', 'apple', 'etui', 'case', '15'] },
  { id: 'iphone-15', name: 'iPhone 15', category: 'Zaprojektuj etui', path: '/configure', icon: Smartphone, tags: ['iphone', 'apple', 'etui', 'case', '15'] },
  { id: 'iphone-14-pro-max', name: 'iPhone 14 Pro Max', category: 'Zaprojektuj etui', path: '/configure', icon: Smartphone, tags: ['iphone', 'apple', 'etui', 'case', '14'] },
  { id: 'iphone-14-pro', name: 'iPhone 14 Pro', category: 'Zaprojektuj etui', path: '/configure', icon: Smartphone, tags: ['iphone', 'apple', 'etui', 'case', '14'] },
  { id: 'iphone-14', name: 'iPhone 14', category: 'Zaprojektuj etui', path: '/configure', icon: Smartphone, tags: ['iphone', 'apple', 'etui', 'case', '14'] },
  
  // Telefony - Samsung
  { id: 'samsung-s24-ultra', name: 'Samsung Galaxy S24 Ultra', category: 'Zaprojektuj etui', path: '/configure', icon: Smartphone, tags: ['samsung', 'galaxy', 'etui', 'case', 's24'] },
  { id: 'samsung-s24-plus', name: 'Samsung Galaxy S24+', category: 'Zaprojektuj etui', path: '/configure', icon: Smartphone, tags: ['samsung', 'galaxy', 'etui', 'case', 's24'] },
  { id: 'samsung-s24', name: 'Samsung Galaxy S24', category: 'Zaprojektuj etui', path: '/configure', icon: Smartphone, tags: ['samsung', 'galaxy', 'etui', 'case', 's24'] },
  { id: 'samsung-s23-ultra', name: 'Samsung Galaxy S23 Ultra', category: 'Zaprojektuj etui', path: '/configure', icon: Smartphone, tags: ['samsung', 'galaxy', 'etui', 'case', 's23'] },
  { id: 'samsung-a54', name: 'Samsung Galaxy A54', category: 'Zaprojektuj etui', path: '/configure', icon: Smartphone, tags: ['samsung', 'galaxy', 'etui', 'case', 'a54'] },
  
  // Telefony - Xiaomi
  { id: 'xiaomi-14-ultra', name: 'Xiaomi 14 Ultra', category: 'Zaprojektuj etui', path: '/configure', icon: Smartphone, tags: ['xiaomi', 'etui', 'case', '14'] },
  { id: 'xiaomi-14-pro', name: 'Xiaomi 14 Pro', category: 'Zaprojektuj etui', path: '/configure', icon: Smartphone, tags: ['xiaomi', 'etui', 'case', '14'] },
  { id: 'redmi-note-13', name: 'Redmi Note 13 Pro', category: 'Zaprojektuj etui', path: '/configure', icon: Smartphone, tags: ['xiaomi', 'redmi', 'etui', 'case', 'note'] },
  
  // Kategorie produktów
  { id: 'custom-cases', name: 'Zaprojektuj własne etui', category: 'Personalizacja', path: '/configure', icon: Sparkles, tags: ['etui', 'case', 'własne', 'personalizacja', 'custom', 'zaprojektuj'] },
  { id: 'ready-cases', name: 'Gotowe etui', category: 'Kategoria', path: '/ready-cases', icon: Smartphone, tags: ['etui', 'case', 'gotowe', 'sklep'] },
  { id: 'tempered-glass', name: 'Szkła hartowane', category: 'Ochrona ekranu', path: '/tempered-glass', icon: Shield, tags: ['szkło', 'hartowane', 'glass', 'ochrona', 'ekran', 'screen'] },
  { id: 'hydrogel-films', name: 'Folie hydrożelowe', category: 'Ochrona ekranu', path: '/hydrogel-films', icon: Droplets, tags: ['folia', 'hydrożelowa', 'hydrogel', 'ochrona', 'ekran', 'film'] },
  { id: 'new-products', name: 'Nowości', category: 'Kategoria', path: '/new', icon: Sparkles, tags: ['nowości', 'nowe', 'new'] },
  { id: 'bestsellers', name: 'Bestsellery', category: 'Kategoria', path: '/bestsellers', icon: TrendingUp, tags: ['bestseller', 'popularne', 'top'] },
  
  // Typy etui
  { id: 'silicone-case', name: 'Etui silikonowe', category: 'Typ produktu', path: '/ready-cases', icon: Smartphone, tags: ['etui', 'silikonowe', 'silikon', 'miękkie'] },
  { id: 'hard-case', name: 'Etui twarde', category: 'Typ produktu', path: '/ready-cases', icon: Shield, tags: ['etui', 'twarde', 'hard', 'plastik'] },
  { id: 'wallet-case', name: 'Etui z klapką', category: 'Typ produktu', path: '/ready-cases', icon: Smartphone, tags: ['etui', 'klapka', 'portfel', 'wallet', 'flip'] },
  
  // Strony informacyjne
  { id: 'how-it-works', name: 'Jak to działa', category: 'Informacje', path: '/how-it-works', icon: Sparkles, tags: ['jak', 'działa', 'pomoc', 'instrukcja'] },
  { id: 'faq', name: 'FAQ - Pytania i odpowiedzi', category: 'Informacje', path: '/faq', icon: Sparkles, tags: ['faq', 'pytania', 'pomoc', 'help'] },
  { id: 'contact', name: 'Kontakt', category: 'Informacje', path: '/contact', icon: Sparkles, tags: ['kontakt', 'pomoc', 'email', 'telefon'] },
  { id: 'returns', name: 'Zwroty i reklamacje', category: 'Informacje', path: '/returns', icon: Sparkles, tags: ['zwrot', 'reklamacja', 'oddać', 'wymiana'] },
];

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof searchableItems>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (!isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Delay adding listener to prevent immediate close
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Search logic
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const searchTerm = query.toLowerCase().trim();
    const words = searchTerm.split(/\s+/);

    const filtered = searchableItems.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(searchTerm);
      const categoryMatch = item.category.toLowerCase().includes(searchTerm);
      const tagsMatch = item.tags.some((tag) => 
        words.some((word) => tag.includes(word) || word.includes(tag))
      );
      
      // Multi-word matching (e.g., "iphone 16" matches both words)
      const allWordsMatch = words.every((word) =>
        item.name.toLowerCase().includes(word) ||
        item.tags.some((tag) => tag.includes(word))
      );

      return nameMatch || categoryMatch || tagsMatch || allWordsMatch;
    });

    // Sort by relevance - exact name matches first
    filtered.sort((a, b) => {
      const aExact = a.name.toLowerCase().startsWith(searchTerm) ? 0 : 1;
      const bExact = b.name.toLowerCase().startsWith(searchTerm) ? 0 : 1;
      return aExact - bExact;
    });

    setResults(filtered.slice(0, 8));
    setSelectedIndex(-1);
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      } else if (results.length > 0) {
        handleSelect(results[0]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleSelect = (item: typeof searchableItems[0]) => {
    navigate(item.path);
    onClose();
  };

  const handlePopularSearch = (term: string) => {
    setQuery(term);
    inputRef.current?.focus();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-visible pb-4 relative z-[100]"
        >
          <div className="relative max-w-2xl mx-auto">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Szukaj produktów, modeli telefonów..."
                className="w-full pl-12 pr-12 py-3.5 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Results Dropdown */}
            <AnimatePresence>
              {(results.length > 0 || query.length === 0) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-2xl overflow-hidden z-[200]"
                >
                  {/* Show popular searches when no query */}
                  {query.length < 2 && (
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                        Popularne wyszukiwania
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {popularSearches.map((term) => (
                          <button
                            key={term}
                            onClick={() => handlePopularSearch(term)}
                            className="px-3 py-1.5 text-sm bg-accent hover:bg-accent/80 text-foreground rounded-lg transition-colors"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Search results */}
                  {results.length > 0 && (
                    <div className="py-2">
                      {results.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleSelect(item)}
                            className={cn(
                              'w-full flex items-center gap-3 px-4 py-3 text-left transition-colors',
                              selectedIndex === index
                                ? 'bg-primary/10 text-primary'
                                : 'hover:bg-accent text-foreground'
                            )}
                          >
                            <div className={cn(
                              'w-10 h-10 rounded-lg flex items-center justify-center',
                              selectedIndex === index ? 'bg-primary/20' : 'bg-accent'
                            )}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">{item.name}</div>
                              <div className="text-sm text-muted-foreground">{item.category}</div>
                            </div>
                            <ArrowRight className={cn(
                              'w-4 h-4 transition-opacity',
                              selectedIndex === index ? 'opacity-100' : 'opacity-0'
                            )} />
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* No results */}
                  {query.length >= 2 && results.length === 0 && (
                    <div className="p-6 text-center">
                      <p className="text-muted-foreground">
                        Nie znaleziono wyników dla "{query}"
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Spróbuj wyszukać inną frazę
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
