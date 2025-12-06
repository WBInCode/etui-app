// Komponenty logo producentów telefonów używające Logo.dev CDN

// Klucz API Logo.dev
const LOGO_DEV_TOKEN = 'pk_Dq3xRMdJT2qj7Iv75RkcGQ';

// Mapowanie producentów na ich domeny
const brandDomains: Record<string, string> = {
  apple: 'apple.com',
  samsung: 'samsung.com',
  xiaomi: 'mi.com',
  huawei: 'huawei.com',
  oppo: 'oppo.com',
  vivo: 'vivo.com',
  realme: 'realme.com',
  oneplus: 'oneplus.com',
  motorola: 'motorola.com',
  google: 'google.com',
  honor: 'hihonor.com',
  sony: 'sony.com',
  nothing: 'nothing.tech',
  nokia: 'nokia.com',
  lg: 'lg.com',
  htc: 'htc.com',
  alcatel: 'alcatel-mobile.com',
  asus: 'asus.com',
};

// Komponent logo marki używający Logo.dev
interface BrandLogoProps {
  brandId: string;
  className?: string;
  size?: number;
}

export const BrandLogo = ({ brandId, className = "w-10 h-10", size = 128 }: BrandLogoProps) => {
  const domain = brandDomains[brandId];
  
  if (!domain) {
    return null;
  }

  // Logo.dev CDN URL z tokenem
  const logoUrl = `https://img.logo.dev/${domain}?token=${LOGO_DEV_TOKEN}&size=${size}&format=png`;

  return (
    <img
      src={logoUrl}
      alt={`${brandId} logo`}
      className={`${className} object-contain`}
      loading="lazy"
    />
  );
};

// Mapowanie dla kompatybilności - generuje komponenty dla każdej marki
export const brandLogos: Record<string, React.FC<{ className?: string }>> = Object.fromEntries(
  Object.keys(brandDomains).map((brandId) => [
    brandId,
    ({ className }: { className?: string }) => (
      <BrandLogo brandId={brandId} className={className} />
    ),
  ])
);

export { brandDomains };
