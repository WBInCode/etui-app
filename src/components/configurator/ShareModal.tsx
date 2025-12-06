import { memo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Share2 } from 'lucide-react';
import { useConfigStore, selectConfiguration, selectIsShareModalOpen } from '@/stores/useConfigStore';
import { generateShareUrl } from '@/lib/url-state';
import { Button } from '@/components/ui/Button';

export const ShareModal = memo(function ShareModal() {
  const isOpen = useConfigStore(selectIsShareModalOpen);
  const closeModal = useConfigStore((state) => state.closeShareModal);
  const configuration = useConfigStore(selectConfiguration);
  const [copied, setCopied] = useState(false);

  const shareUrl = generateShareUrl(configuration);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [shareUrl]);

  const handleNativeShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Moja konfiguracja Sneaker Pro X',
          text: 'Zobacz moją konfigurację butów!',
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or error
        console.error('Share failed:', err);
      }
    }
  }, [shareUrl]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-card border border-border rounded-2xl shadow-2xl p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">Udostępnij konfigurację</h2>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-lg hover:bg-accent transition-colors"
                  aria-label="Zamknij"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* URL display */}
              <div className="mb-6">
                <label className="block text-sm text-muted-foreground mb-2">
                  Link do Twojej konfiguracji:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground truncate"
                  />
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleCopy}
                    className="gap-2 min-w-[100px]"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Skopiowano
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Kopiuj
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Native share button (mobile) */}
              {'share' in navigator && (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleNativeShare}
                  className="w-full gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  Udostępnij
                </Button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});
