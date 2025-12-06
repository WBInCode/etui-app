import { motion } from 'framer-motion';

const sections = [
  {
    title: '1. Administrator danych',
    content: `
      Administratorem Twoich danych osobowych jest CaseStudio Sp. z o.o. z siedzibą w Warszawie, ul. Przykładowa 123, 00-001 Warszawa.
      
      Kontakt z administratorem:
      - E-mail: dane@casestudio.pl
      - Telefon: +48 123 456 789
      - Adres: ul. Przykładowa 123, 00-001 Warszawa
    `,
  },
  {
    title: '2. Jakie dane zbieramy',
    content: `
      Zbieramy następujące kategorie danych:
      
      Dane podawane przez Ciebie:
      - Imię i nazwisko
      - Adres e-mail
      - Numer telefonu
      - Adres dostawy
      - Dane do faktury (opcjonalnie)
      
      Dane zbierane automatycznie:
      - Adres IP
      - Typ przeglądarki
      - Czas spędzony na stronie
      - Odwiedzane podstrony
      - Pliki cookies (patrz sekcja 7)
    `,
  },
  {
    title: '3. Cel przetwarzania danych',
    content: `
      Twoje dane przetwarzamy w celu:
      
      - Realizacji zamówień i dostaw (podstawa: umowa)
      - Obsługi reklamacji i zwrotów (podstawa: umowa)
      - Wystawiania faktur (podstawa: obowiązek prawny)
      - Wysyłki newslettera (podstawa: zgoda)
      - Prowadzenia statystyk (podstawa: uzasadniony interes)
      - Marketingu bezpośredniego (podstawa: uzasadniony interes lub zgoda)
    `,
  },
  {
    title: '4. Okres przechowywania danych',
    content: `
      Twoje dane przechowujemy przez okres:
      
      - Dane zamówień: 5 lat od realizacji (wymogi podatkowe)
      - Dane do reklamacji: 2 lata od zakupu
      - Dane marketingowe: do wycofania zgody
      - Dane z cookies: maksymalnie 12 miesięcy
      
      Po upływie tych okresów dane są usuwane lub anonimizowane.
    `,
  },
  {
    title: '5. Twoje prawa',
    content: `
      Przysługują Ci następujące prawa:
      
      - Prawo dostępu do danych - możesz uzyskać kopię swoich danych
      - Prawo do sprostowania - możesz poprawić nieprawidłowe dane
      - Prawo do usunięcia ("bycie zapomnianym") - możesz żądać usunięcia danych
      - Prawo do ograniczenia przetwarzania
      - Prawo do przenoszenia danych
      - Prawo do sprzeciwu wobec przetwarzania
      - Prawo do wycofania zgody w dowolnym momencie
      
      Aby skorzystać z tych praw, skontaktuj się z nami: dane@casestudio.pl
    `,
  },
  {
    title: '6. Udostępnianie danych',
    content: `
      Twoje dane mogą być udostępniane:
      
      - Firmom kurierskim (DPD, InPost) - w celu realizacji dostawy
      - Operatorom płatności (Przelewy24) - w celu realizacji płatności
      - Biuru rachunkowemu - w celu prowadzenia księgowości
      - Organom państwowym - gdy wymagają tego przepisy prawa
      
      Nie sprzedajemy Twoich danych osobowych podmiotom trzecim.
      Nie przekazujemy danych poza Europejski Obszar Gospodarczy.
    `,
  },
  {
    title: '7. Pliki cookies',
    content: `
      Nasza strona wykorzystuje pliki cookies:
      
      Niezbędne cookies:
      - Obsługa koszyka zakupowego
      - Zapamiętywanie sesji logowania
      - Bezpieczeństwo strony
      
      Analityczne cookies:
      - Google Analytics - analiza ruchu na stronie
      - Hotjar - analiza zachowań użytkowników
      
      Marketingowe cookies:
      - Facebook Pixel - remarketing
      - Google Ads - reklamy
      
      Możesz zarządzać cookies w ustawieniach przeglądarki.
    `,
  },
  {
    title: '8. Bezpieczeństwo danych',
    content: `
      Stosujemy odpowiednie środki techniczne i organizacyjne:
      
      - Szyfrowanie SSL/TLS
      - Bezpieczne przechowywanie haseł (haszowanie)
      - Regularne kopie zapasowe
      - Ograniczony dostęp do danych
      - Szkolenia pracowników z zakresu RODO
      
      W przypadku naruszenia bezpieczeństwa danych, poinformujemy Cię w ciągu 72 godzin.
    `,
  },
  {
    title: '9. Kontakt i skargi',
    content: `
      W sprawach związanych z ochroną danych osobowych możesz kontaktować się:
      
      E-mail: dane@casestudio.pl
      Telefon: +48 123 456 789
      
      Masz również prawo wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych:
      ul. Stawki 2, 00-193 Warszawa
      www.uodo.gov.pl
    `,
  },
];

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">Polityka prywatności</h1>
          <p className="text-muted-foreground">
            Ostatnia aktualizacja: 1 stycznia 2025
          </p>
        </motion.div>

        {/* RODO Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-primary/10 border border-primary/30 rounded-2xl p-6 mb-8"
        >
          <p className="text-foreground text-sm">
            <strong>Twoja prywatność jest dla nas ważna.</strong> Niniejsza polityka prywatności wyjaśnia, 
            jakie dane osobowe zbieramy, w jaki sposób je wykorzystujemy i jakie masz prawa zgodnie z RODO 
            (Rozporządzenie o Ochronie Danych Osobowych).
          </p>
        </motion.div>

        <div className="space-y-6">
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
            Pytania dotyczące prywatności?{' '}
            <a href="mailto:dane@casestudio.pl" className="text-primary hover:underline">
              dane@casestudio.pl
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
