import { memo, type ReactNode, useState, useMemo } from 'react';
import { useConfigStore, selectPhoneSelection } from '@/stores/useConfigStore';
import { Smartphone, ChevronLeft, Palette, ImageIcon, Ruler } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPhoneDimensions, getPhoneSizeCategory, getSizeCategoryName } from '@/data/phoneDimensions';

interface ConfiguratorLayoutProps {
  preview: ReactNode;
  panel: ReactNode;
  summary: ReactNode;
  personalization?: ReactNode;
}

export const ConfiguratorLayout = memo(function ConfiguratorLayout({
  preview,
  panel,
  summary,
  personalization,
}: ConfiguratorLayoutProps) {
  const phoneSelection = useConfigStore(selectPhoneSelection);
  const [activeTab, setActiveTab] = useState<'design' | 'personalize'>('design');

  // Get phone dimensions info
  const phoneDimensionsInfo = useMemo(() => {
    if (!phoneSelection?.model) return null;
    const dims = getPhoneDimensions(phoneSelection.model);
    const sizeCategory = getPhoneSizeCategory(phoneSelection.model);
    const sizeName = getSizeCategoryName(sizeCategory);
    return { dims, sizeName };
  }, [phoneSelection?.model]);

  return (
    <div className="min-h-[calc(100vh-4rem)] container mx-auto px-4 py-6">
      {/* Phone selection header */}
      {phoneSelection && (
        <div className="mb-4 flex items-center justify-between bg-card/50 rounded-xl px-4 py-3">
          <div className="flex items-center gap-3">
            <Smartphone className="w-5 h-5 text-primary" />
            <div>
              <span className="text-sm text-muted-foreground">Projektujesz etui dla:</span>
              <p className="font-semibold text-foreground">
                {phoneSelection.manufacturerName} {phoneSelection.modelName}
                <span className="text-muted-foreground font-normal ml-2">
                  • {phoneSelection.caseTypeName}
                </span>
              </p>
              {phoneDimensionsInfo && (
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <Ruler className="w-3 h-3" />
                  {phoneDimensionsInfo.dims.height} × {phoneDimensionsInfo.dims.width} mm
                  <span className="mx-1">•</span>
                  {phoneDimensionsInfo.sizeName}
                </p>
              )}
            </div>
          </div>
          <Link
            to="/configure"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Zmień telefon
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
        {/* Preview Section - Left */}
        <div className="lg:col-span-5 flex items-center justify-center bg-card/30 rounded-2xl p-4 lg:p-8">
          {preview}
        </div>

        {/* Configuration Panel - Center */}
        <div className="lg:col-span-4 min-h-[500px] lg:min-h-0 flex flex-col">
          {/* Tabs */}
          {personalization && (
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setActiveTab('design')}
                className={`
                  flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium text-sm transition-all
                  ${activeTab === 'design' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card hover:bg-accent text-muted-foreground hover:text-foreground'}
                `}
              >
                <Palette className="w-4 h-4" />
                Wygląd etui
              </button>
              <button
                onClick={() => setActiveTab('personalize')}
                className={`
                  flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium text-sm transition-all
                  ${activeTab === 'personalize' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card hover:bg-accent text-muted-foreground hover:text-foreground'}
                `}
              >
                <ImageIcon className="w-4 h-4" />
                Twoja grafika
              </button>
            </div>
          )}
          
          {/* Tab content */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'design' ? panel : personalization}
          </div>
        </div>

        {/* Summary Section - Right */}
        <div className="lg:col-span-3">
          {summary}
        </div>
      </div>
    </div>
  );
});
