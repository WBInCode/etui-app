import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const filters = ['Wszystkie', 'Matowe', 'Błyszczące', 'Skórzane', 'Carbon'];

const galleryItems = [
  { id: 1, color: '#1a1a1a', material: 'Matowe', pattern: 'none', name: 'Midnight Black' },
  { id: 2, color: '#FFFFFF', material: 'Błyszczące', pattern: 'none', name: 'Pure White' },
  { id: 3, color: '#DC2626', material: 'Matowe', pattern: 'geometric', name: 'Ruby Geo' },
  { id: 4, color: '#2563EB', material: 'Matowe', pattern: 'stripes', name: 'Ocean Stripes' },
  { id: 5, color: '#16A34A', material: 'Skórzane', pattern: 'none', name: 'Forest Leather' },
  { id: 6, color: '#9333EA', material: 'Błyszczące', pattern: 'marble', name: 'Purple Marble' },
  { id: 7, color: '#F59E0B', material: 'Matowe', pattern: 'gradient', name: 'Sunset Glow' },
  { id: 8, color: '#EC4899', material: 'Błyszczące', pattern: 'dots', name: 'Pink Dots' },
  { id: 9, color: '#1e3a5f', material: 'Carbon', pattern: 'none', name: 'Navy Carbon' },
  { id: 10, color: '#800020', material: 'Skórzane', pattern: 'none', name: 'Burgundy Classic' },
  { id: 11, color: '#87CEEB', material: 'Matowe', pattern: 'none', name: 'Sky Blue' },
  { id: 12, color: '#FFD700', material: 'Błyszczące', pattern: 'none', name: 'Gold Rush' },
];

export function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('Wszystkie');

  const filteredItems = activeFilter === 'Wszystkie'
    ? galleryItems
    : galleryItems.filter(item => item.material === activeFilter);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">Galeria projektów</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Zainspiruj się projektami naszych klientów. Kliknij na dowolny projekt, 
            aby stworzyć podobny w konfiguratorze.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <Filter className="w-5 h-5 text-muted-foreground mr-2" />
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                activeFilter === filter
                  ? 'bg-primary text-white'
                  : 'bg-card hover:bg-accent text-muted-foreground'
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <div
                className="aspect-[3/4] rounded-2xl overflow-hidden mb-3 relative"
                style={{ backgroundColor: item.color }}
              >
                {/* Phone case SVG */}
                <svg viewBox="0 0 300 450" className="w-full h-full p-6">
                  <rect
                    x="50"
                    y="50"
                    width="200"
                    height="350"
                    rx="35"
                    fill={item.color}
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="2"
                  />
                  <rect x="155" y="70" width="80" height="100" rx="20" fill="rgba(0,0,0,0.2)" />
                  <circle cx="180" cy="100" r="18" fill="#1a1a1a" />
                  <circle cx="215" cy="100" r="14" fill="#1a1a1a" />
                  <circle cx="180" cy="140" r="14" fill="#1a1a1a" />
                  <circle cx="215" cy="140" r="8" fill="#FFEB99" />
                </svg>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="primary" size="sm">
                    Stwórz podobne
                  </Button>
                </div>
              </div>

              <h3 className="font-medium text-foreground">{item.name}</h3>
              <p className="text-sm text-muted-foreground">{item.material}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
