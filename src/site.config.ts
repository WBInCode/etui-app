// ============================================
// SITE CONFIGURATION
// ============================================
// Replace these values with your own brand info.
// This is the single source of truth for all
// placeholder / brand data used across the app.
// ============================================

export const siteConfig = {
  /** Brand / company name */
  name: 'YourBrand',

  /** Short tagline shown in meta & hero */
  tagline: 'Konfigurator etui na telefon',

  /** Public-facing domain (no protocol) */
  domain: 'yourbrand.pl',

  /** Full URL with protocol */
  url: 'https://yourbrand.pl',

  /** Contact emails */
  email: {
    general: 'kontakt@yourbrand.pl',
    support: 'support@yourbrand.pl',
    returns: 'zwroty@yourbrand.pl',
    complaints: 'reklamacje@yourbrand.pl',
    data: 'dane@yourbrand.pl',
  },

  /** Phone number */
  phone: '+48 000 000 000',

  /** Physical address */
  address: {
    street: 'ul. Twoja Ulica 1',
    city: 'Warszawa',
    zip: '00-001',
    /** Full one-liner */
    full: 'ul. Twoja Ulica 1, 00-001 Warszawa',
  },

  /** Company legal info */
  legal: {
    companyName: 'YourBrand Sp. z o.o.',
    nip: '0000000000',
    regon: '000000000',
  },

  /** Social media links (empty = hidden) */
  social: {
    facebook: '',
    instagram: '',
    twitter: '',
    tiktok: '',
  },

  /** Demo account credentials shown in login modal */
  demo: {
    email: 'demo@yourbrand.pl',
    password: 'demo123',
  },
} as const;

export type SiteConfig = typeof siteConfig;
