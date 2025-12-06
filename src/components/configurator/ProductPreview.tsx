import { memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  useConfigStore, 
  selectConfiguration, 
  selectProduct,
  selectUploadedImage,
  selectImageTransform,
  selectImageFillMode,
  selectCustomText,
  selectTextColor,
  selectTextSize,
  selectTextPosition,
  selectPhoneSelection
} from '@/stores/useConfigStore';
import { getPhoneDimensions, REFERENCE_PHONE } from '@/data/phoneDimensions';

/**
 * Phone Case visualization using SVG
 * Top-down view of a phone case
 */
export const ProductPreview = memo(function ProductPreview() {
  const configuration = useConfigStore(selectConfiguration);
  const product = useConfigStore(selectProduct);
  const uploadedImage = useConfigStore(selectUploadedImage);
  const imageTransform = useConfigStore(selectImageTransform);
  const imageFillMode = useConfigStore(selectImageFillMode);
  const customText = useConfigStore(selectCustomText);
  const textColor = useConfigStore(selectTextColor);
  const textSize = useConfigStore(selectTextSize);
  const textPosition = useConfigStore(selectTextPosition);
  const phoneSelection = useConfigStore(selectPhoneSelection);

  // Calculate phone dimensions and scaling
  const phoneDims = useMemo(() => {
    const modelId = phoneSelection?.model || '';
    const dimensions = getPhoneDimensions(modelId);
    
    // Calculate scale relative to reference phone
    const heightScale = dimensions.height / REFERENCE_PHONE.height;
    const widthScale = dimensions.width / REFERENCE_PHONE.width;
    
    // Base SVG dimensions (reference phone)
    const baseWidth = 200;
    const baseHeight = 350;
    
    // Scaled dimensions
    const scaledWidth = Math.round(baseWidth * widthScale);
    const scaledHeight = Math.round(baseHeight * heightScale);
    
    // Center offset in viewBox
    const offsetX = (300 - scaledWidth) / 2;
    const offsetY = (450 - scaledHeight) / 2;
    
    // Corner radius scales with size
    const cornerRadius = Math.round(35 * Math.min(widthScale, heightScale));
    
    return {
      dimensions,
      heightScale,
      widthScale,
      width: scaledWidth,
      height: scaledHeight,
      offsetX,
      offsetY,
      cornerRadius,
      innerWidth: scaledWidth - 10,
      innerHeight: scaledHeight - 10,
      innerOffsetX: offsetX + 5,
      innerOffsetY: offsetY + 5,
      innerCornerRadius: Math.round(32 * Math.min(widthScale, heightScale)),
      centerX: 150,
      centerY: 225,
    };
  }, [phoneSelection?.model]);

  // Get configuration values
  const config = useMemo(() => {
    const getColorForOption = (optionId: string): string => {
      const option = product.options.find((o) => o.id === optionId);
      if (!option) return '#CCCCCC';

      const valueId = configuration[optionId];
      const value = option.values.find((v) => v.id === valueId);

      return value?.color || '#CCCCCC';
    };

    const getValueId = (optionId: string): string => {
      return configuration[optionId] || '';
    };

    const caseColor = getColorForOption('case-color');
    const frameColorValue = getColorForOption('frame-color');
    
    return {
      caseColor,
      frameColor: frameColorValue === 'inherit' ? caseColor : frameColorValue,
      material: getValueId('material'),
      pattern: getValueId('pattern'),
      cameraStyle: getValueId('camera-style'),
      extras: getValueId('extras'),
    };
  }, [configuration, product.options]);

  // Generate pattern based on selection
  const patternElement = useMemo(() => {
    const patternColor = adjustColorBrightness(config.caseColor, -20);
    
    switch (config.pattern) {
      case 'geometric':
        return (
          <g opacity="0.3">
            {[...Array(6)].map((_, i) => (
              <polygon
                key={i}
                points={`${80 + (i % 3) * 50},${120 + Math.floor(i / 3) * 80} ${105 + (i % 3) * 50},${80 + Math.floor(i / 3) * 80} ${130 + (i % 3) * 50},${120 + Math.floor(i / 3) * 80} ${105 + (i % 3) * 50},${160 + Math.floor(i / 3) * 80}`}
                fill="none"
                stroke={patternColor}
                strokeWidth="1.5"
              />
            ))}
          </g>
        );
      case 'stripes':
        return (
          <g opacity="0.2">
            {[...Array(8)].map((_, i) => (
              <line
                key={i}
                x1="60"
                y1={80 + i * 35}
                x2="240"
                y2={80 + i * 35}
                stroke={patternColor}
                strokeWidth="8"
              />
            ))}
          </g>
        );
      case 'dots':
        return (
          <g opacity="0.25">
            {[...Array(35)].map((_, i) => (
              <circle
                key={i}
                cx={75 + (i % 7) * 28}
                cy={90 + Math.floor(i / 7) * 45}
                r="6"
                fill={patternColor}
              />
            ))}
          </g>
        );
      case 'marble':
        return (
          <g opacity="0.15">
            <path
              d="M60 100 Q100 150 80 200 Q120 250 60 300 M150 80 Q180 130 160 180 Q200 220 170 280 M220 90 Q250 140 230 200 Q260 250 240 320"
              fill="none"
              stroke={patternColor}
              strokeWidth="3"
            />
          </g>
        );
      case 'gradient':
        return (
          <defs>
            <linearGradient id="caseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={config.caseColor} />
              <stop offset="100%" stopColor={adjustColorBrightness(config.caseColor, -40)} />
            </linearGradient>
          </defs>
        );
      default:
        return null;
    }
  }, [config.pattern, config.caseColor]);

  // Material texture overlay
  const materialOverlay = useMemo(() => {
    switch (config.material) {
      case 'glossy':
        return (
          <ellipse
            cx="150"
            cy="180"
            rx="60"
            ry="120"
            fill="url(#glossyShine)"
            opacity="0.3"
          />
        );
      case 'frosted':
        return (
          <rect
            x="55"
            y="55"
            width="190"
            height="335"
            rx="30"
            fill="url(#frostedTexture)"
            opacity="0.2"
          />
        );
      case 'carbon':
        return (
          <g opacity="0.15">
            {[...Array(20)].map((_, i) => (
              <g key={i}>
                <line
                  x1={60 + (i % 10) * 20}
                  y1="60"
                  x2={60 + (i % 10) * 20}
                  y2="385"
                  stroke="#000"
                  strokeWidth="1"
                />
                <line
                  x1="55"
                  y1={60 + i * 17}
                  x2="245"
                  y2={60 + i * 17}
                  stroke="#000"
                  strokeWidth="0.5"
                />
              </g>
            ))}
          </g>
        );
      case 'leather':
        return (
          <rect
            x="55"
            y="55"
            width="190"
            height="335"
            rx="30"
            fill="url(#leatherTexture)"
            opacity="0.1"
          />
        );
      default:
        return null;
    }
  }, [config.material]);

  return (
    <div className="relative w-full aspect-[3/4] max-w-sm mx-auto">
      {/* Background glow effect - white glow for dark cases */}
      <div
        className="absolute inset-0 rounded-[60px] blur-3xl transition-colors duration-500 scale-90"
        style={{ 
          backgroundColor: isColorDark(config.caseColor) ? '#ffffff' : config.caseColor,
          opacity: isColorDark(config.caseColor) ? 0.15 : 0.30
        }}
      />

      {/* SVG Phone Case Visualization */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          <motion.svg
            key={`${config.caseColor}-${config.pattern}-${config.material}`}
            viewBox="0 0 300 450"
            className="w-full h-full drop-shadow-2xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Definitions */}
            <defs>
              {/* Glossy shine gradient */}
              <radialGradient id="glossyShine" cx="30%" cy="30%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </radialGradient>

              {/* Frosted texture */}
              <filter id="frostedTexture">
                <feTurbulence baseFrequency="0.9" numOctaves="4" result="noise" />
                <feDiffuseLighting in="noise" lightingColor="white" surfaceScale="1">
                  <feDistantLight azimuth="45" elevation="60" />
                </feDiffuseLighting>
              </filter>

              {/* Leather texture */}
              <filter id="leatherTexture">
                <feTurbulence baseFrequency="0.04" numOctaves="3" result="noise" />
                <feDiffuseLighting in="noise" lightingColor="#8B4513" surfaceScale="2">
                  <feDistantLight azimuth="45" elevation="60" />
                </feDiffuseLighting>
              </filter>

              {/* Drop shadow for depth */}
              <filter id="caseShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="8" floodOpacity="0.3" />
              </filter>
            </defs>

            {/* Pattern gradient if selected */}
            {config.pattern === 'gradient' && patternElement}

            {/* Main case body */}
            <motion.rect
              x={phoneDims.offsetX}
              y={phoneDims.offsetY}
              width={phoneDims.width}
              height={phoneDims.height}
              rx={phoneDims.cornerRadius}
              fill={config.pattern === 'gradient' ? 'url(#caseGradient)' : config.caseColor}
              filter="url(#caseShadow)"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Frame/border */}
            <rect
              x={phoneDims.offsetX}
              y={phoneDims.offsetY}
              width={phoneDims.width}
              height={phoneDims.height}
              rx={phoneDims.cornerRadius}
              fill="none"
              stroke={config.frameColor}
              strokeWidth="4"
            />

            {/* Pattern overlay */}
            {config.pattern !== 'gradient' && patternElement}

            {/* Material overlay */}
            {materialOverlay}

            {/* Custom image overlay */}
            {uploadedImage && (
              <g clipPath="url(#caseClipPath)">
                <defs>
                  <clipPath id="caseClipPath">
                    <rect 
                      x={phoneDims.innerOffsetX} 
                      y={phoneDims.innerOffsetY} 
                      width={phoneDims.innerWidth} 
                      height={phoneDims.innerHeight} 
                      rx={phoneDims.innerCornerRadius} 
                    />
                  </clipPath>
                </defs>
                {/* Renderowanie obrazka w zależności od trybu */}
                {imageFillMode === 'cover' && (
                  <image
                    href={uploadedImage.url}
                    x={phoneDims.innerOffsetX}
                    y={phoneDims.innerOffsetY}
                    width={phoneDims.innerWidth}
                    height={phoneDims.innerHeight}
                    preserveAspectRatio="xMidYMid slice"
                    opacity="0.95"
                  />
                )}
                {imageFillMode === 'fill' && (
                  <image
                    href={uploadedImage.url}
                    x={phoneDims.innerOffsetX}
                    y={phoneDims.innerOffsetY}
                    width={phoneDims.innerWidth}
                    height={phoneDims.innerHeight}
                    preserveAspectRatio="none"
                    opacity="0.95"
                  />
                )}
                {imageFillMode === 'contain' && (
                  <image
                    href={uploadedImage.url}
                    x={phoneDims.innerOffsetX}
                    y={phoneDims.innerOffsetY + phoneDims.innerHeight * 0.15}
                    width={phoneDims.innerWidth}
                    height={phoneDims.innerHeight * 0.7}
                    preserveAspectRatio="xMidYMid meet"
                    opacity="0.95"
                  />
                )}
                {imageFillMode === 'custom' && (
                  <image
                    href={uploadedImage.url}
                    x={phoneDims.centerX - 75 * imageTransform.scale + imageTransform.x}
                    y={phoneDims.centerY - 75 * imageTransform.scale + imageTransform.y}
                    width={150 * imageTransform.scale}
                    height={150 * imageTransform.scale}
                    preserveAspectRatio="xMidYMid slice"
                    transform={`rotate(${imageTransform.rotation}, ${phoneDims.centerX + imageTransform.x}, ${phoneDims.centerY + imageTransform.y})`}
                    opacity="0.9"
                  />
                )}
              </g>
            )}

            {/* Custom text overlay with word wrap */}
            {customText && (
              <foreignObject
                x={phoneDims.innerOffsetX + 5 + textPosition.x}
                y={phoneDims.innerOffsetY + phoneDims.innerHeight * 0.35 + textPosition.y}
                width={phoneDims.innerWidth - 10}
                height={phoneDims.innerHeight * 0.5}
              >
                <div
                  style={{
                    width: `${phoneDims.innerWidth - 10}px`,
                    maxWidth: `${phoneDims.innerWidth - 10}px`,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: textColor,
                    fontSize: `${textSize * 0.6 * phoneDims.widthScale}px`,
                    fontWeight: 'bold',
                    wordBreak: 'break-all',
                    wordWrap: 'break-word',
                    overflowWrap: 'anywhere',
                    whiteSpace: 'pre-wrap',
                    lineHeight: 1.2,
                    overflow: 'hidden',
                    textShadow: textColor === '#FFFFFF' ? '0 1px 3px rgba(0,0,0,0.7)' : 'none',
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))',
                  }}
                >
                  {customText}
                </div>
              </foreignObject>
            )}

            {/* Camera cutout area */}
            <g transform={`translate(${phoneDims.offsetX + phoneDims.width * 0.52}, ${phoneDims.offsetY + 20}) scale(${phoneDims.widthScale})`}>
              {/* Camera bump/protection */}
              <rect
                x="0"
                y="0"
                width="80"
                height="100"
                rx="20"
                fill={adjustColorBrightness(config.caseColor, -15)}
                stroke={config.frameColor}
                strokeWidth="2"
              />

              {/* Camera lenses */}
              <g>
                {/* Main camera */}
                <circle cx="25" cy="30" r="18" fill="#1a1a1a" />
                <circle cx="25" cy="30" r="14" fill="#0a0a0a" />
                <circle cx="25" cy="30" r="8" fill="#2a2a4a" />
                <circle cx="21" cy="26" r="3" fill="#4a4a6a" opacity="0.6" />

                {/* Secondary camera */}
                <circle cx="60" cy="30" r="14" fill="#1a1a1a" />
                <circle cx="60" cy="30" r="10" fill="#0a0a0a" />
                <circle cx="60" cy="30" r="6" fill="#2a2a4a" />
                <circle cx="57" cy="27" r="2" fill="#4a4a6a" opacity="0.6" />

                {/* Third camera */}
                <circle cx="25" cy="70" r="14" fill="#1a1a1a" />
                <circle cx="25" cy="70" r="10" fill="#0a0a0a" />
                <circle cx="25" cy="70" r="6" fill="#2a2a4a" />
                <circle cx="22" cy="67" r="2" fill="#4a4a6a" opacity="0.6" />

                {/* Flash */}
                <circle cx="60" cy="70" r="8" fill="#FFF9E6" />
                <circle cx="60" cy="70" r="5" fill="#FFEB99" />

                {/* Camera style additions */}
                {config.cameraStyle === 'metal-ring' && (
                  <>
                    <circle cx="25" cy="30" r="20" fill="none" stroke={config.frameColor} strokeWidth="2" />
                    <circle cx="60" cy="30" r="16" fill="none" stroke={config.frameColor} strokeWidth="2" />
                    <circle cx="25" cy="70" r="16" fill="none" stroke={config.frameColor} strokeWidth="2" />
                  </>
                )}

                {config.cameraStyle === 'sapphire' && (
                  <>
                    <circle cx="25" cy="30" r="16" fill="none" stroke="#87CEEB" strokeWidth="1" opacity="0.5" />
                    <circle cx="60" cy="30" r="12" fill="none" stroke="#87CEEB" strokeWidth="1" opacity="0.5" />
                    <circle cx="25" cy="70" r="12" fill="none" stroke="#87CEEB" strokeWidth="1" opacity="0.5" />
                  </>
                )}
              </g>
            </g>

            {/* Side buttons (right side) */}
            <g fill={config.frameColor}>
              {/* Power button */}
              <rect 
                x={phoneDims.offsetX + phoneDims.width} 
                y={phoneDims.offsetY + phoneDims.height * 0.22} 
                width="6" 
                height={45 * phoneDims.heightScale} 
                rx="2" 
              />
            </g>

            {/* Volume buttons (left side) */}
            <g fill={config.frameColor}>
              <rect 
                x={phoneDims.offsetX - 6} 
                y={phoneDims.offsetY + phoneDims.height * 0.18} 
                width="6" 
                height={25 * phoneDims.heightScale} 
                rx="2" 
              />
              <rect 
                x={phoneDims.offsetX - 6} 
                y={phoneDims.offsetY + phoneDims.height * 0.28} 
                width="6" 
                height={50 * phoneDims.heightScale} 
                rx="2" 
              />
            </g>

            {/* Mute switch */}
            <rect 
              x={phoneDims.offsetX - 6} 
              y={phoneDims.offsetY + phoneDims.height * 0.1} 
              width="6" 
              height={15 * phoneDims.heightScale} 
              rx="2" 
              fill={config.frameColor} 
            />

            {/* Charging port cutout */}
            <rect
              x={phoneDims.centerX - 20}
              y={phoneDims.offsetY + phoneDims.height - 6}
              width="40"
              height="8"
              rx="4"
              fill={adjustColorBrightness(config.caseColor, -30)}
            />

            {/* Speaker grilles */}
            <g fill={adjustColorBrightness(config.caseColor, -30)}>
              <circle cx={phoneDims.centerX - 50} cy={phoneDims.offsetY + phoneDims.height - 2} r="3" />
              <circle cx={phoneDims.centerX - 38} cy={phoneDims.offsetY + phoneDims.height - 2} r="3" />
              <circle cx={phoneDims.centerX + 38} cy={phoneDims.offsetY + phoneDims.height - 2} r="3" />
              <circle cx={phoneDims.centerX + 50} cy={phoneDims.offsetY + phoneDims.height - 2} r="3" />
            </g>

            {/* MagSafe ring (if selected) */}
            {config.extras === 'magsafe' && (
              <circle
                cx={phoneDims.centerX}
                cy={phoneDims.centerY + 45 * phoneDims.heightScale}
                r={45 * Math.min(phoneDims.widthScale, phoneDims.heightScale)}
                fill="none"
                stroke={adjustColorBrightness(config.caseColor, -20)}
                strokeWidth="8"
                opacity="0.4"
              />
            )}

            {/* Ring holder (if selected) */}
            {config.extras === 'ring' && (
              <g>
                <ellipse 
                  cx={phoneDims.centerX} 
                  cy={phoneDims.centerY + 75 * phoneDims.heightScale} 
                  rx={20 * phoneDims.widthScale} 
                  ry="8" 
                  fill={config.frameColor} 
                />
                <rect 
                  x={phoneDims.centerX - 5} 
                  y={phoneDims.centerY + 55 * phoneDims.heightScale} 
                  width="10" 
                  height="20" 
                  rx="2" 
                  fill={config.frameColor} 
                />
              </g>
            )}

            {/* Card slot (if selected) */}
            {config.extras === 'card-slot' && (
              <rect
                x={phoneDims.centerX - 40 * phoneDims.widthScale}
                y={phoneDims.centerY + 55 * phoneDims.heightScale}
                width={80 * phoneDims.widthScale}
                height={50 * phoneDims.heightScale}
                rx="8"
                fill="none"
                stroke={adjustColorBrightness(config.caseColor, -20)}
                strokeWidth="2"
                strokeDasharray="4 2"
              />
            )}

            {/* Lanyard hole (if selected) */}
            {config.extras === 'lanyard' && (
              <circle
                cx={phoneDims.offsetX + 30}
                cy={phoneDims.offsetY + phoneDims.height - 20}
                r="6"
                fill={adjustColorBrightness(config.caseColor, -30)}
              />
            )}

            {/* Kickstand (if selected) */}
            {config.extras === 'kickstand' && (
              <rect
                x={phoneDims.centerX - 50 * phoneDims.widthScale}
                y={phoneDims.centerY + 35 * phoneDims.heightScale}
                width={100 * phoneDims.widthScale}
                height="15"
                rx="3"
                fill={config.frameColor}
                opacity="0.8"
              />
            )}
          </motion.svg>
        </AnimatePresence>
      </motion.div>
    </div>
  );
});

/**
 * Adjust color brightness
 */
function adjustColorBrightness(hex: string, percent: number): string {
  if (!hex || hex === 'inherit') return '#888888';
  
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse RGB
  const num = parseInt(hex, 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + percent));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + percent));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + percent));
  
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

/**
 * Check if a color is dark (for glow effect)
 */
function isColorDark(hex: string): boolean {
  if (!hex || hex === 'inherit') return false;
  
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse RGB
  const num = parseInt(hex, 16);
  const r = (num >> 16) & 0xFF;
  const g = (num >> 8) & 0xFF;
  const b = num & 0xFF;
  
  // Calculate luminance (perceived brightness)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance < 0.4;
}
