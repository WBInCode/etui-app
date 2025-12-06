import { motion } from 'framer-motion';
import { Palette, Settings, CreditCard, Truck, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    icon: Palette,
    title: '1. Wybierz kolory i materiały',
    description: 'Zacznij od wyboru koloru głównego, materiału wykończenia i koloru ramki. Masz ponad 50 kombinacji do wyboru!',
  },
  {
    icon: Settings,
    title: '2. Dostosuj szczegóły',
    description: 'Dodaj wzory, wybierz styl ochrony aparatu i funkcjonalne dodatki jak MagSafe czy uchwyt.',
  },
  {
    icon: CreditCard,
    title: '3. Zamów i zapłać',
    description: 'Bezpieczna płatność przez Stripe, BLIK lub przelew. Akceptujemy wszystkie popularne metody płatności.',
  },
  {
    icon: Truck,
    title: '4. Otrzymaj w 2-3 dni',
    description: 'Twoje etui jest produkowane w Polsce. Wysyłka kurierem lub do paczkomatu.',
  },
];

const guarantees = [
  '2 lata gwarancji',
  '30 dni na zwrot',
  'Darmowa dostawa od 150 PLN',
  'Produkcja w Polsce',
  'Ekologiczne materiały',
  'Wsparcie 24/7',
];

export function HowItWorksPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">Jak to działa?</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Stworzenie własnego etui jest proste. Wystarczą 4 kroki!
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-6 mb-12 last:mb-0"
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
                <step.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guarantees */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl p-8 md:p-12 mb-16 overflow-hidden border border-border"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-card" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">
              Nasze gwarancje
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {guarantees.map((guarantee, index) => (
                <motion.div 
                  key={guarantee} 
                  className="flex items-center gap-3 bg-background/50 rounded-xl px-4 py-3 border border-border"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="w-7 h-7 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-background" />
                  </div>
                  <span className="text-foreground text-sm font-medium">{guarantee}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl p-12 md:p-16 overflow-hidden text-center border border-border"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-foreground via-gray-800 to-foreground" />
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
          
          {/* Animated orbs - subtle white */}
          <motion.div 
            className="absolute top-0 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-0 left-1/4 w-48 h-48 bg-white/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.08, 0.05] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          
          {/* Content */}
          <div className="relative z-10">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Podoba Ci się? Stwórz własne Etui już teraz!
            </motion.h2>
            <motion.p 
              className="text-gray-400 text-lg mb-8 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Dołącz do tysięcy zadowolonych klientów i zaprojektuj unikalne etui dla siebie lub bliskich
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/configure">
                <motion.button
                  className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-2xl bg-white text-gray-900 hover:bg-gray-100 transition-colors shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Otwórz konfigurator
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
