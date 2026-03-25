import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqCategories = [
  {
    name: 'Zamówienia',
    questions: [
      {
        q: 'Jak długo trwa realizacja zamówienia?',
        a: 'Produkcja Twojego etui zajmuje 24 godziny. Następnie wysyłamy je kurierem lub do paczkomatu. Całkowity czas dostawy to 2-3 dni robocze.',
      },
      {
        q: 'Jakie metody płatności akceptujecie?',
        a: 'Akceptujemy płatności kartą (Visa, Mastercard), BLIK, szybkie przelewy przez Przelewy24 oraz tradycyjne przelewy bankowe.',
      },
      {
        q: 'Czy mogę zmienić lub anulować zamówienie?',
        a: 'Tak, możesz zmienić lub anulować zamówienie w ciągu 2 godzin od złożenia. Po tym czasie rozpoczynamy produkcję.',
      },
      {
        q: 'Czy wysyłacie za granicę?',
        a: 'Tak! Wysyłamy do wszystkich krajów UE. Czas dostawy to 5-7 dni roboczych. Koszty wysyłki zależą od kraju.',
      },
    ],
  },
  {
    name: 'Produkty',
    questions: [
      {
        q: 'Do jakich modeli telefonów pasują wasze etui?',
        a: 'Obecnie oferujemy etui dla iPhone 12, 13, 14, 15 i 16 (wszystkie wersje), oraz Samsung Galaxy S23 i S24. Stale rozszerzamy ofertę!',
      },
      {
        q: 'Z jakich materiałów są wykonane etui?',
        a: 'Używamy wysokiej jakości polikarbonu, TPU, ekologicznej skóry i włókna węglowego. Wszystkie materiały są testowane pod kątem wytrzymałości.',
      },
      {
        q: 'Czy etui chroni przed upadkiem?',
        a: 'Tak! Nasze etui przeszły testy upadku z wysokości 2 metrów. Podniesione krawędzie chronią ekran i aparat.',
      },
      {
        q: 'Czy mogę zamówić etui z własnym zdjęciem?',
        a: 'Obecnie nie oferujemy druku zdjęć, ale pracujemy nad tą funkcją! Zapisz się do newslettera, żeby być na bieżąco.',
      },
    ],
  },
  {
    name: 'Zwroty i reklamacje',
    questions: [
      {
        q: 'Jak mogę zwrócić produkt?',
        a: 'Masz 30 dni na zwrot nieużywanego produktu. Skontaktuj się z nami przez formularz kontaktowy, a wyślemy etykietę zwrotną.',
      },
      {
        q: 'Co obejmuje gwarancja?',
        a: 'Gwarancja obejmuje wady materiałowe i produkcyjne przez 2 lata. Nie obejmuje uszkodzeń mechanicznych i normalnego zużycia.',
      },
      {
        q: 'Ile trwa rozpatrzenie reklamacji?',
        a: 'Reklamacje rozpatrujemy w ciągu 3 dni roboczych. W przypadku uznania reklamacji, wysyłamy nowe etui lub zwracamy pieniądze.',
      },
    ],
  },
  {
    name: 'Konto i dane',
    questions: [
      {
        q: 'Czy muszę zakładać konto, żeby zamówić?',
        a: 'Nie, możesz zamówić jako gość. Jednak konto pozwala śledzić zamówienia i zapisywać projekty.',
      },
      {
        q: 'Jak mogę usunąć swoje konto?',
        a: 'Skontaktuj się z nami przez formularz kontaktowy lub napisz na support@yourbrand.pl. Usuniemy Twoje dane w ciągu 7 dni.',
      },
      {
        q: 'Czy moje dane są bezpieczne?',
        a: 'Tak! Używamy szyfrowania SSL, a płatności obsługuje certyfikowany operator Stripe. Nie przechowujemy danych kart.',
      },
    ],
  },
];

export function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredCategories = faqCategories.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (q) =>
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.questions.length > 0);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Często zadawane pytania
          </h1>
          <p className="text-muted-foreground mb-8">
            Znajdź odpowiedzi na najczęstsze pytania
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Szukaj pytania..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h2 className="text-xl font-semibold text-foreground mb-4">
                {category.name}
              </h2>
              <div className="space-y-3">
                {category.questions.map((item, index) => {
                  const itemId = `${category.name}-${index}`;
                  const isOpen = openItems.includes(itemId);

                  return (
                    <div
                      key={itemId}
                      className="bg-card border border-border rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left"
                      >
                        <span className="font-medium text-foreground pr-4">{item.q}</span>
                        <ChevronDown
                          className={cn(
                            'w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform',
                            isOpen && 'rotate-180'
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="px-6 pb-4 text-muted-foreground">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Still have questions? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-card rounded-2xl p-8"
        >
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Nie znalazłeś odpowiedzi?
          </h3>
          <p className="text-muted-foreground mb-4">
            Skontaktuj się z nami – odpowiemy w ciągu 24 godzin!
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-hover transition-colors"
          >
            Napisz do nas
          </a>
        </motion.div>
      </div>
    </div>
  );
}
