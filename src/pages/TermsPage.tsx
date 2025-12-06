import { motion } from 'framer-motion';

const sections = [
  {
    title: '1. Postanowienia ogólne',
    content: `
      1.1. Niniejszy Regulamin określa zasady korzystania ze sklepu internetowego CaseStudio, dostępnego pod adresem casestudio.pl.
      
      1.2. Właścicielem sklepu jest CaseStudio Sp. z o.o. z siedzibą w Warszawie, ul. Przykładowa 123, 00-001 Warszawa, NIP: 1234567890, REGON: 123456789.
      
      1.3. Kontakt ze sklepem możliwy jest poprzez e-mail: kontakt@casestudio.pl lub telefonicznie: +48 123 456 789.
      
      1.4. Korzystanie ze sklepu oznacza akceptację niniejszego Regulaminu.
    `,
  },
  {
    title: '2. Definicje',
    content: `
      2.1. Sklep - sklep internetowy CaseStudio dostępny pod adresem casestudio.pl.
      
      2.2. Klient - osoba fizyczna, prawna lub jednostka organizacyjna dokonująca zakupów w Sklepie.
      
      2.3. Produkt - towar dostępny w Sklepie, w szczególności etui na telefon, szkła hartowane i folie ochronne.
      
      2.4. Zamówienie - oświadczenie woli Klienta zmierzające do zawarcia umowy sprzedaży Produktu.
      
      2.5. Konfigurator - narzędzie umożliwiające personalizację Produktów.
    `,
  },
  {
    title: '3. Składanie zamówień',
    content: `
      3.1. Zamówienia można składać 24 godziny na dobę, 7 dni w tygodniu.
      
      3.2. W celu złożenia zamówienia należy:
      - wybrać Produkt i ewentualnie go spersonalizować w Konfiguratorze,
      - dodać Produkt do koszyka,
      - wypełnić formularz zamówienia,
      - wybrać sposób dostawy i płatności,
      - potwierdzić zamówienie.
      
      3.3. Po złożeniu zamówienia Klient otrzymuje potwierdzenie na podany adres e-mail.
      
      3.4. Umowa sprzedaży zostaje zawarta z chwilą potwierdzenia przyjęcia zamówienia przez Sklep.
    `,
  },
  {
    title: '4. Ceny i płatności',
    content: `
      4.1. Ceny Produktów podane są w złotych polskich (PLN) i zawierają podatek VAT.
      
      4.2. Cena podana przy Produkcie jest wiążąca w chwili składania zamówienia.
      
      4.3. Dostępne formy płatności:
      - płatność online (Przelewy24, BLIK, karty płatnicze),
      - płatność przy odbiorze (za pobraniem).
      
      4.4. W przypadku personalizacji Produktu doliczana jest opłata:
      - własna grafika: +15 PLN,
      - własny tekst: +5 PLN.
    `,
  },
  {
    title: '5. Dostawa',
    content: `
      5.1. Dostawa realizowana jest na terenie Polski.
      
      5.2. Czas realizacji zamówienia wynosi 2-5 dni roboczych.
      
      5.3. Koszty dostawy:
      - kurier DPD/InPost: 14,99 PLN,
      - paczkomat InPost: 11,99 PLN,
      - darmowa dostawa przy zamówieniach powyżej 150 PLN.
      
      5.4. Produkty personalizowane mogą wymagać dodatkowego czasu realizacji (1-2 dni robocze).
    `,
  },
  {
    title: '6. Prawo odstąpienia od umowy',
    content: `
      6.1. Klient ma prawo odstąpić od umowy w terminie 30 dni bez podania przyczyny.
      
      6.2. Termin do odstąpienia wygasa po upływie 30 dni od dnia otrzymania Produktu.
      
      6.3. Aby skorzystać z prawa odstąpienia, należy poinformować Sklep o swojej decyzji drogą mailową lub listowną.
      
      6.4. WAŻNE: Prawo odstąpienia nie przysługuje w przypadku Produktów personalizowanych (z własną grafiką lub tekstem), zgodnie z art. 38 pkt 3 ustawy o prawach konsumenta.
    `,
  },
  {
    title: '7. Reklamacje i gwarancja',
    content: `
      7.1. Sklep udziela 2-letniej gwarancji na wszystkie Produkty.
      
      7.2. Reklamację można złożyć drogą mailową na adres: reklamacje@casestudio.pl.
      
      7.3. Reklamacja zostanie rozpatrzona w terminie 14 dni od jej otrzymania.
      
      7.4. W przypadku uznanej reklamacji Klient ma prawo do:
      - wymiany Produktu na nowy,
      - naprawy Produktu,
      - zwrotu pieniędzy.
    `,
  },
  {
    title: '8. Postanowienia końcowe',
    content: `
      8.1. Sklep zastrzega sobie prawo do zmiany Regulaminu.
      
      8.2. O zmianach Regulaminu Klienci zostaną poinformowani drogą mailową.
      
      8.3. W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy prawa polskiego.
      
      8.4. Wszelkie spory będą rozstrzygane przez właściwe sądy powszechne.
      
      8.5. Regulamin wchodzi w życie z dniem 1 stycznia 2025 roku.
    `,
  },
];

export function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">Regulamin</h1>
          <p className="text-muted-foreground">
            Ostatnia aktualizacja: 1 stycznia 2025
          </p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold text-foreground mb-4">
                {section.title}
              </h2>
              <div className="text-muted-foreground whitespace-pre-line text-sm leading-relaxed">
                {section.content.trim()}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-sm text-muted-foreground"
        >
          <p>
            W razie pytań dotyczących Regulaminu prosimy o kontakt:{' '}
            <a href="mailto:kontakt@casestudio.pl" className="text-primary hover:underline">
              kontakt@casestudio.pl
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
