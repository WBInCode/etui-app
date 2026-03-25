import { motion } from 'framer-motion';
import { Heart, Leaf, Users, Award } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Pasja do designu',
    description: 'Każde etui to małe dzieło sztuki. Dbamy o każdy detal.',
  },
  {
    icon: Leaf,
    title: 'Ekologia',
    description: 'Używamy materiałów przyjaznych środowisku i minimalizujemy odpady.',
  },
  {
    icon: Users,
    title: 'Klient w centrum',
    description: 'Twoje zadowolenie jest naszym priorytetem. Słuchamy i reagujemy.',
  },
  {
    icon: Award,
    title: 'Jakość premium',
    description: 'Nie idziemy na kompromisy. Tylko najlepsze materiały.',
  },
];

const stats = [
  { value: '2,500+', label: 'Zadowolonych klientów' },
  { value: '15,000+', label: 'Wykonanych etui' },
  { value: '50+', label: 'Kombinacji kolorów' },
  { value: '4.9', label: 'Średnia ocena' },
];

export function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">O YourBrand</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Jesteśmy polską marką, która wierzy, że każdy zasługuje na coś unikalnego.
          </p>
        </motion.div>

        {/* Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-6">Nasza historia</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                YourBrand powstało w 2023 roku z prostej obserwacji: ludzie chcą wyrażać 
                siebie poprzez przedmioty, których używają na co dzień. Telefon jest z nami 
                24/7 – dlaczego więc nie sprawić, by był wyjątkowy?
              </p>
              <p>
                Zaczęliśmy od małego warsztatu w Krakowie. Dziś produkujemy tysiące 
                unikalnych etui miesięcznie, ale nadal każde z nich przechodzi przez 
                ręce naszych rzemieślników.
              </p>
              <p>
                Nasz konfigurator to efekt miesięcy pracy nad tym, by projektowanie 
                własnego etui było proste, intuicyjne i przyjemne. Wierzymy, że 
                technologia powinna służyć kreatywności.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-card border border-border rounded-3xl p-8 aspect-square flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎨</div>
                <p className="text-foreground font-medium">Kraków, Polska</p>
                <p className="text-muted-foreground text-sm">Tutaj tworzymy Twoje etui</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Nasze wartości</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-6 rounded-2xl border border-border text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-primary rounded-3xl p-12"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-primary-foreground mb-2">{stat.value}</div>
                <div className="text-primary-foreground/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
