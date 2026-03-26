import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Package, RotateCcw, Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/site.config';

const steps = [
  {
    step: 1,
    title: 'Zgłoś zwrot',
    description: `Wypełnij formularz zwrotu online lub wyślij e-mail na adres ${siteConfig.email.returns}`,
    icon: RotateCcw,
  },
  {
    step: 2,
    title: 'Otrzymaj potwierdzenie',
    description: 'W ciągu 24h otrzymasz e-mail z instrukcją i etykietą zwrotną',
    icon: CheckCircle,
  },
  {
    step: 3,
    title: 'Wyślij paczkę',
    description: 'Zapakuj produkt i nadaj paczkę za pomocą otrzymanej etykiety (bezpłatnie)',
    icon: Package,
  },
  {
    step: 4,
    title: 'Odbierz zwrot pieniędzy',
    description: 'Po otrzymaniu paczki zwrócimy pieniądze w ciągu 5 dni roboczych',
    icon: Clock,
  },
];

const conditions = [
  {
    title: 'Co można zwrócić',
    items: [
      'Produkty nieużywane, w oryginalnym opakowaniu',
      'Produkty zakupione maksymalnie 30 dni temu',
      'Produkty z kompletnym wyposażeniem',
      'Produkty bez śladów użytkowania',
    ],
    icon: CheckCircle,
    iconColor: 'text-green-500',
  },
  {
    title: 'Czego nie można zwrócić',
    items: [
      'Produkty personalizowane (z własną grafiką/tekstem)',
      'Folie hydrożelowe po odklejeniu z podkładu',
      'Produkty uszkodzone z winy klienta',
      'Produkty bez paragonu lub faktury',
    ],
    icon: XCircle,
    iconColor: 'text-red-500',
  },
];

export function ReturnsPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">Zwroty i wymiana</h1>
          <p className="text-muted-foreground text-lg">
            30 dni na zwrot bez podania przyczyny
          </p>
        </motion.div>

        {/* Highlight box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-2xl p-8 mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-foreground">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-medium">30 dni na zwrot</span>
            </div>
            <div className="w-px h-6 bg-border hidden sm:block" />
            <div className="flex items-center gap-2 text-foreground">
              <Package className="w-5 h-5 text-primary" />
              <span className="font-medium">Darmowa wysyłka zwrotna</span>
            </div>
            <div className="w-px h-6 bg-border hidden sm:block" />
            <div className="flex items-center gap-2 text-foreground">
              <RotateCcw className="w-5 h-5 text-primary" />
              <span className="font-medium">Szybki zwrot pieniędzy</span>
            </div>
          </div>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Jak zwrócić produkt?
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="relative bg-card border border-border rounded-2xl p-6 text-center"
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm">
                  {step.step}
                </div>
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Conditions */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {conditions.map((condition, index) => (
            <motion.div
              key={condition.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <condition.icon className={`w-6 h-6 ${condition.iconColor}`} />
                <h3 className="text-lg font-semibold text-foreground">{condition.title}</h3>
              </div>
              <ul className="space-y-2">
                {condition.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-muted-foreground flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Important notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 mb-12"
        >
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Ważne informacje</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Produkty personalizowane (z własną grafiką lub tekstem) nie podlegają zwrotowi zgodnie z art. 38 pkt 3 ustawy o prawach konsumenta.</li>
                <li>• Zwrot pieniędzy następuje tą samą metodą, jaką dokonano płatności.</li>
                <li>• W przypadku wymiany na inny rozmiar/model, różnica w cenie zostanie rozliczona.</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Potrzebujesz pomocy ze zwrotem?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={`mailto:${siteConfig.email.returns}`}>
              <Button variant="primary" size="lg">
                Napisz do nas
              </Button>
            </a>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Formularz kontaktowy
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Odpowiadamy w ciągu 24 godzin
          </p>
        </motion.div>
      </div>
    </div>
  );
}
