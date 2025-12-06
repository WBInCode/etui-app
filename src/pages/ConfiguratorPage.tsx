import { useUrlSync } from '@/hooks/useUrlSync';
import { ConfiguratorLayout } from '@/components/layout/ConfiguratorLayout';
import { ProductPreview } from '@/components/configurator/ProductPreview';
import { ConfigPanel } from '@/components/configurator/ConfigPanel';
import { PriceSummary } from '@/components/configurator/PriceSummary';
import { ShareModal } from '@/components/configurator/ShareModal';
import { ImageUploader } from '@/components/configurator/ImageUploader';

export function ConfiguratorPage() {
  useUrlSync();

  return (
    <>
      <ConfiguratorLayout
        preview={<ProductPreview />}
        panel={<ConfigPanel />}
        summary={<PriceSummary />}
        personalization={<ImageUploader />}
      />
      <ShareModal />
    </>
  );
}
