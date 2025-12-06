import { memo, useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Image as ImageIcon, ZoomIn, ZoomOut, RotateCw, Move, Type, Trash2, Maximize, Minimize, Square, Settings2, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { 
  useConfigStore, 
  selectUploadedImage, 
  selectImageTransform,
  selectImageFillMode,
  selectCustomText,
  selectTextColor,
  selectTextSize,
  selectTextPosition,
  type ImageFillMode
} from '@/stores/useConfigStore';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

// Image quality warnings
interface ImageQualityInfo {
  isGoodQuality: boolean;
  warnings: string[];
  tips: string[];
}

function analyzeImageQuality(width: number, height: number): ImageQualityInfo {
  const longerSide = Math.max(width, height);
  const warnings: string[] = [];
  const tips: string[] = [];
  
  if (longerSide < 800) {
    warnings.push('Bardzo niska rozdzielczość - wydruk może być rozmyty');
  } else if (longerSide < 1200) {
    warnings.push('Niska rozdzielczość - zalecamy większy plik');
  } else if (longerSide < 1800) {
    tips.push('Akceptowalna jakość, ale większa rozdzielczość da lepszy efekt');
  }
  
  return {
    isGoodQuality: longerSide >= 1800,
    warnings,
    tips,
  };
}

const fillModeOptions: { id: ImageFillMode; name: string; description: string; icon: React.ReactNode }[] = [
  { id: 'contain', name: 'Dopasuj', description: 'Cała grafika widoczna', icon: <Minimize className="w-4 h-4" /> },
  { id: 'cover', name: 'Wypełnij', description: 'Pokryj całe etui', icon: <Maximize className="w-4 h-4" /> },
  { id: 'fill', name: 'Rozciągnij', description: 'Rozciągnij do krawędzi', icon: <Square className="w-4 h-4" /> },
  { id: 'custom', name: 'Własne', description: 'Ręczna kontrola', icon: <Settings2 className="w-4 h-4" /> },
];

export const ImageUploader = memo(function ImageUploader() {
  const uploadedImage = useConfigStore(selectUploadedImage);
  const imageTransform = useConfigStore(selectImageTransform);
  const imageFillMode = useConfigStore(selectImageFillMode);
  const customText = useConfigStore(selectCustomText);
  const textColor = useConfigStore(selectTextColor);
  const textSize = useConfigStore(selectTextSize);
  const textPosition = useConfigStore(selectTextPosition);
  
  const setUploadedImage = useConfigStore((state) => state.setUploadedImage);
  const setImageTransform = useConfigStore((state) => state.setImageTransform);
  const setImageFillMode = useConfigStore((state) => state.setImageFillMode);
  const setCustomText = useConfigStore((state) => state.setCustomText);
  const setTextColor = useConfigStore((state) => state.setTextColor);
  const setTextSize = useConfigStore((state) => state.setTextSize);
  const setTextPosition = useConfigStore((state) => state.setTextPosition);
  const clearCustomization = useConfigStore((state) => state.clearCustomization);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState<'image' | 'text'>('image');

  // Analyze uploaded image quality
  const imageQuality = uploadedImage 
    ? analyzeImageQuality(uploadedImage.width, uploadedImage.height) 
    : null;

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Proszę wybrać plik graficzny (JPG, PNG, GIF, WebP)');
      return;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      alert('Plik jest za duży. Maksymalny rozmiar to 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setUploadedImage({
          id: crypto.randomUUID(),
          url: e.target?.result as string,
          name: file.name,
          width: img.width,
          height: img.height,
        });
        // Reset transform when new image is uploaded
        setImageTransform({ x: 0, y: 0, scale: 1, rotation: 0 });
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, [setUploadedImage, setImageTransform]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleRemoveImage = useCallback(() => {
    setUploadedImage(null);
    setImageTransform({ x: 0, y: 0, scale: 1, rotation: 0 });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [setUploadedImage, setImageTransform]);

  const adjustScale = useCallback((delta: number) => {
    const newScale = Math.max(0.1, Math.min(3, imageTransform.scale + delta));
    setImageTransform({ scale: newScale });
  }, [imageTransform.scale, setImageTransform]);

  const adjustRotation = useCallback((delta: number) => {
    setImageTransform({ rotation: (imageTransform.rotation + delta) % 360 });
  }, [imageTransform.rotation, setImageTransform]);

  const adjustPosition = useCallback((dx: number, dy: number) => {
    setImageTransform({ 
      x: imageTransform.x + dx, 
      y: imageTransform.y + dy 
    });
  }, [imageTransform.x, imageTransform.y, setImageTransform]);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <h3 className="text-lg font-semibold text-foreground">Personalizacja</h3>
        <p className="text-sm text-muted-foreground">
          Dodaj własną grafikę lub tekst na etui
        </p>
        
        {/* Pricing info */}
        <div className="flex gap-3 mt-2 text-xs">
          <span className="text-muted-foreground">
            Własna grafika: <span className="text-primary font-semibold">+15 zł</span>
          </span>
          <span className="text-muted-foreground">
            Własny tekst: <span className="text-primary font-semibold">+5 zł</span>
          </span>
        </div>
        
        {/* Tabs */}
        <div className="flex gap-2 mt-3">
          <Button
            variant={activeTab === 'image' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('image')}
            className="flex-1 gap-2"
          >
            <ImageIcon className="w-4 h-4" />
            Grafika
          </Button>
          <Button
            variant={activeTab === 'text' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('text')}
            className="flex-1 gap-2"
          >
            <Type className="w-4 h-4" />
            Tekst
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'image' ? (
            <motion.div
              key="image-tab"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-4"
            >
              {/* Upload area */}
              {!uploadedImage ? (
                <>
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                    className={`
                      relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer
                      transition-all duration-200
                      ${isDragging 
                        ? 'border-primary bg-primary/5 scale-[1.02]' 
                        : 'border-border hover:border-primary/50 hover:bg-accent/50'
                      }
                    `}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/gif,image/webp,image/bmp"
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    
                    <Upload className={`w-10 h-10 mx-auto mb-3 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
                    
                    <p className="font-medium text-foreground">
                      {isDragging ? 'Upuść tutaj!' : 'Przeciągnij zdjęcie lub kliknij'}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      JPG, PNG, BMP, WebP • max 10MB
                    </p>
                  </div>

                  {/* Important tips - always visible */}
                  <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 space-y-2.5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-amber-600 dark:text-amber-400">
                      <AlertTriangle className="w-4 h-4" />
                      Zanim wgrasz grafikę
                    </div>
                    <ul className="space-y-2 text-xs text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold mt-0.5">📷</span>
                        <span>
                          <strong className="text-foreground">Jakość pliku:</strong> Im wyższa rozdzielczość, tym ostrzejszy nadruk. 
                          Unikaj zdjęć z Facebooka/Messengera (są mocno kompresowane). 
                          Jeśli zobaczysz ostrzeżenie – podmień plik!
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold mt-0.5">📐</span>
                        <span>
                          <strong className="text-foreground">Wycięcia na aparat:</strong> Spójrz na podgląd etui. 
                          Jeśli twarz lub ważny tekst nachodzi na otwory aparatu – przesuń grafikę!
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold mt-0.5">🎨</span>
                        <span>
                          <strong className="text-foreground">Kolory:</strong> Ekran świeci (RGB), a my drukujemy farbą (CMYK). 
                          Gotowe etui może być minimalnie ciemniejsze niż na podświetlonym ekranie.
                        </span>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  {/* Preview */}
                  <div className="relative rounded-xl overflow-hidden bg-accent/30">
                    <img
                      src={uploadedImage.url}
                      alt={uploadedImage.name}
                      className="w-full h-36 object-contain"
                    />
                    <button
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* File info with quality badge */}
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm text-muted-foreground truncate flex-1">
                      {uploadedImage.name} ({uploadedImage.width}×{uploadedImage.height}px)
                    </p>
                    
                    {/* Quality badge - moved outside image */}
                    {imageQuality && (
                      <span className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${
                        imageQuality.isGoodQuality 
                          ? 'bg-green-500/15 text-green-600 dark:text-green-400 ring-1 ring-green-500/30' 
                          : imageQuality.warnings.length > 0 
                            ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/30'
                            : 'bg-blue-500/15 text-blue-600 dark:text-blue-400 ring-1 ring-blue-500/30'
                      }`}>
                        {imageQuality.isGoodQuality ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" />
                            Dobra jakość
                          </>
                        ) : imageQuality.warnings.length > 0 ? (
                          <>
                            <AlertTriangle className="w-3 h-3" />
                            Niska jakość
                          </>
                        ) : (
                          <>
                            <Info className="w-3 h-3" />
                            OK
                          </>
                        )}
                      </span>
                    )}
                  </div>
                  
                  {/* Quality warnings/tips */}
                  {imageQuality && (imageQuality.warnings.length > 0 || imageQuality.tips.length > 0) && (
                    <div className={`p-2.5 rounded-lg text-xs ${
                      imageQuality.warnings.length > 0 
                        ? 'bg-amber-500/10 border border-amber-500/20' 
                        : 'bg-blue-500/10 border border-blue-500/20'
                    }`}>
                      {imageQuality.warnings.map((warning, i) => (
                        <div key={i} className="flex items-start gap-2 text-amber-600 dark:text-amber-400">
                          <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                          <span>{warning}</span>
                        </div>
                      ))}
                      {imageQuality.tips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-2 text-blue-600 dark:text-blue-400">
                          <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Fill mode selector */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Tryb wyświetlania
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {fillModeOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setImageFillMode(option.id)}
                          className={`
                            p-2 rounded-lg border text-left transition-all
                            ${imageFillMode === option.id 
                              ? 'border-primary bg-primary/10 text-primary' 
                              : 'border-border hover:border-primary/50 text-foreground'}
                          `}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {option.icon}
                            <span className="text-sm font-medium">{option.name}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{option.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Transform controls - only show for 'custom' mode */}
                  {imageFillMode === 'custom' && (
                    <div className="space-y-3 pt-2 border-t border-border">
                      {/* Scale */}
                      <div>
                        <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                          <ZoomIn className="w-4 h-4" />
                          Rozmiar: {Math.round(imageTransform.scale * 100)}%
                        </label>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => adjustScale(-0.1)}
                            disabled={imageTransform.scale <= 0.1}
                          >
                            <ZoomOut className="w-4 h-4" />
                          </Button>
                          <input
                            type="range"
                            min="10"
                            max="300"
                            value={imageTransform.scale * 100}
                            onChange={(e) => setImageTransform({ scale: Number(e.target.value) / 100 })}
                            className="flex-1"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => adjustScale(0.1)}
                            disabled={imageTransform.scale >= 3}
                          >
                            <ZoomIn className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Rotation */}
                      <div>
                        <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                          <RotateCw className="w-4 h-4" />
                          Obrót: {imageTransform.rotation}°
                        </label>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => adjustRotation(-45)}
                          >
                            -45°
                          </Button>
                          <input
                            type="range"
                            min="0"
                            max="360"
                            value={imageTransform.rotation}
                            onChange={(e) => setImageTransform({ rotation: Number(e.target.value) })}
                            className="flex-1"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => adjustRotation(45)}
                          >
                            +45°
                          </Button>
                        </div>
                      </div>

                      {/* Position */}
                      <div>
                        <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                          <Move className="w-4 h-4" />
                          Pozycja
                        </label>
                        <div className="grid grid-cols-3 gap-1 w-32 mx-auto">
                          <div />
                          <Button variant="outline" size="sm" onClick={() => adjustPosition(0, -10)}>↑</Button>
                          <div />
                          <Button variant="outline" size="sm" onClick={() => adjustPosition(-10, 0)}>←</Button>
                          <Button variant="outline" size="sm" onClick={() => setImageTransform({ x: 0, y: 0 })}>⌂</Button>
                          <Button variant="outline" size="sm" onClick={() => adjustPosition(10, 0)}>→</Button>
                          <div />
                          <Button variant="outline" size="sm" onClick={() => adjustPosition(0, 10)}>↓</Button>
                          <div />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Change image button */}
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4" />
                    Zmień grafikę
                  </Button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="text-tab"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              {/* Text input */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Twój tekst
                </label>
                <textarea
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Wpisz tekst na etui..."
                  maxLength={50}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {customText.length}/50 znaków
                </p>
              </div>

              {/* Text tips */}
              <div className="p-2.5 rounded-lg bg-accent/30 border border-border">
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <p>
                    Tekst zostanie umieszczony na środku etui. Użyj strzałek poniżej, aby dostosować pozycję. 
                    Unikaj umieszczania tekstu przy krawędziach.
                  </p>
                </div>
              </div>

              {/* Text color */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Kolor tekstu
                </label>
                <div className="flex gap-2 flex-wrap">
                  {['#FFFFFF', '#000000', '#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181', '#AA96DA'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setTextColor(color)}
                      className={`
                        w-8 h-8 rounded-full border-2 transition-all
                        ${textColor === color ? 'border-primary scale-110' : 'border-transparent'}
                      `}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-8 h-8 rounded-full cursor-pointer"
                  />
                </div>
              </div>

              {/* Text size */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Rozmiar tekstu: {textSize}px
                </label>
                <input
                  type="range"
                  min="12"
                  max="48"
                  value={textSize}
                  onChange={(e) => setTextSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Text position */}
              {customText && (
                <div>
                  <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                    <Move className="w-4 h-4" />
                    Pozycja tekstu
                  </label>
                  <div className="grid grid-cols-3 gap-1 w-32 mx-auto">
                    <div />
                    <Button variant="outline" size="sm" onClick={() => setTextPosition({ y: textPosition.y - 15 })}>↑</Button>
                    <div />
                    <Button variant="outline" size="sm" onClick={() => setTextPosition({ x: textPosition.x - 15 })}>←</Button>
                    <Button variant="outline" size="sm" onClick={() => setTextPosition({ x: 0, y: 0 })}>⌂</Button>
                    <Button variant="outline" size="sm" onClick={() => setTextPosition({ x: textPosition.x + 15 })}>→</Button>
                    <div />
                    <Button variant="outline" size="sm" onClick={() => setTextPosition({ y: textPosition.y + 15 })}>↓</Button>
                    <div />
                  </div>
                </div>
              )}

              {/* Preview */}
              {customText && (
                <div className="p-4 rounded-lg bg-accent/30 text-center">
                  <span
                    style={{ 
                      color: textColor, 
                      fontSize: `${textSize}px`,
                      textShadow: textColor === '#FFFFFF' ? '0 1px 2px rgba(0,0,0,0.5)' : 'none'
                    }}
                    className="font-medium break-words"
                  >
                    {customText}
                  </span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Clear all button */}
        {(uploadedImage || customText) && (
          <Button
            variant="ghost"
            className="w-full mt-4 gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={clearCustomization}
          >
            <Trash2 className="w-4 h-4" />
            Wyczyść personalizację
          </Button>
        )}
      </CardContent>
    </Card>
  );
});
