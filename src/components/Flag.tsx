import React, { useState, useEffect, useRef } from 'react';
import { FlagProps } from '../types';
import { getCountryByCode } from '../utils/flagUtils';
import { loadFlagSvg } from '../utils/dynamicFlagLoader';

export const Flag: React.FC<FlagProps> = ({
  code,
  shape = 'rectangle',
  ratio = '3:2',
  size,
  width,
  height,
  alt,
  style,
  className = '',
  lazy = false,
  fallback = 'none',
  title,
  ...props
}) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(!lazy);
  const flagRef = useRef<HTMLDivElement>(null);

  // Load SVG content asynchronously
  useEffect(() => {
    if (isVisible) {
      loadFlagSvg(code.toLowerCase())
        .then(svg => {
          setSvgContent(svg);
          setHasError(false);
        })
        .catch(() => {
          setHasError(true);
          setSvgContent(null);
        });
    }
  }, [code, isVisible]);

  // Simple lazy loading with timeout instead of complex IntersectionObserver
  useEffect(() => {
    if (!lazy) return;

    // Simple delay-based lazy loading - much more reliable
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Small delay to simulate lazy loading

    return () => clearTimeout(timer);
  }, [lazy]);

  // Parse ratio for proper CSS aspectRatio
  const parseRatio = (ratioString: string) => {
    if (ratioString === '1:1') return '1';
    if (ratioString === '3:2') return '3/2';
    if (ratioString === '4:3') return '4/3';
    if (ratioString === '16:9') return '16/9';
    return ratioString; // For custom ratios like "16:9"
  };

  // Calculate dimensions and styles
  // Note: ratio parsing for future use
  // const [ratioWidth, ratioHeight] = ratio.split(':').map(Number);

  let flagStyles: React.CSSProperties = {
    display: 'inline-block',
    overflow: 'hidden',
    lineHeight: 0, // Prevent extra spacing around SVG
    position: 'relative', // Help with scaling
  };

  // Handle sizing - be more explicit about dimensions
  if (width) {
    flagStyles.width = width;
  } else if (size) {
    if (shape === 'circle' || shape === 'square') {
      flagStyles.width = size;
      flagStyles.height = size;
      flagStyles.aspectRatio = '1';
    } else {
      flagStyles.width = size;
      flagStyles.aspectRatio = parseRatio(ratio);
    }
  } else {
    flagStyles.width = '100%';
    flagStyles.aspectRatio = parseRatio(ratio);
  }

  if (height && shape !== 'circle' && shape !== 'square') {
    flagStyles.height = height;
    // If both width/size and height are specified, don't use aspectRatio
    if (width || size) {
      delete flagStyles.aspectRatio;
    }
  }

  // Handle shapes
  switch (shape) {
    case 'circle':
      flagStyles.borderRadius = '50%';
      flagStyles.aspectRatio = '1';
      break;
    case 'rounded':
      flagStyles.borderRadius = '8px';
      break;
    case 'pill':
      flagStyles.borderRadius = '999px';
      break;
    case 'square':
      flagStyles.aspectRatio = '1';
      break;
    case 'rectangle':
    default:
      // Keep the aspect ratio already set above
      break;
  }

  // Merge custom styles
  if (style) {
    if (typeof style === 'string') {
      // Handle string styles by creating a style object
      const styleObj: React.CSSProperties = {};
      style.split(';').forEach(rule => {
        const [property, value] = rule.split(':').map(s => s.trim());
        if (property && value) {
          const camelCaseProperty = property.replace(/-([a-z])/g, (_, letter) =>
            letter.toUpperCase()
          );
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (styleObj as any)[camelCaseProperty] = value;
        }
      });
      flagStyles = { ...flagStyles, ...styleObj };
    } else {
      flagStyles = { ...flagStyles, ...style };
    }
  }

  // Get country metadata for accessibility and fallbacks
  const country = getCountryByCode(code.toLowerCase());

  // Handle fallbacks - prioritize SVG over emoji
  if (hasError || !svgContent) {
    // Only use emoji as a last resort if explicitly requested
    if (fallback === 'emoji' && country?.emoji) {
      return (
        <span
          style={flagStyles}
          className={`flexi-flag flexi-flag--emoji ${className}`}
          role='img'
          aria-label={alt || country.name}
          title={title}
          {...props}
        >
          {country.emoji}
        </span>
      );
    }
    // Return null instead of emoji for better SVG experience
    return null;
  }

  // SVG optimization for different shapes
  let optimizedSvg = svgContent;

  // Keep the original viewBox but ensure it's preserved - don't change it
  // The original SVG viewBox is designed to show the complete flag
  // Don't modify the viewBox as it's already correct for the flag design

  // Add preserveAspectRatio for proper scaling
  // Use 'none' for most flags, but preserve aspect ratio for flags with strokes
  let preserveAspectRatio = 'none';

  // For circles, use slice to crop properly
  if (shape === 'circle') {
    preserveAspectRatio = 'xMidYMid slice';
  }

  // For flags that use strokes (like US flag), preserve aspect ratio to maintain stroke width
  // BUT for US flag specifically, use 'none' to prevent scaling issues with stripes
  if (
    optimizedSvg.includes('stroke=') &&
    !optimizedSvg.includes('id="flag-icons-us"')
  ) {
    preserveAspectRatio =
      shape === 'circle' ? 'xMidYMid slice' : 'xMidYMid meet';
  }

  if (!optimizedSvg.includes('preserveAspectRatio')) {
    optimizedSvg = optimizedSvg.replace(
      '<svg',
      `<svg preserveAspectRatio="${preserveAspectRatio}"`
    );
  } else {
    // Replace existing preserveAspectRatio
    optimizedSvg = optimizedSvg.replace(
      /preserveAspectRatio="[^"]*"/g,
      `preserveAspectRatio="${preserveAspectRatio}"`
    );
  }

  // Ensure SVG scales properly to fill container
  // Remove any existing width/height attributes and add responsive ones
  // Use more specific regex to avoid removing stroke-width, markerWidth, etc.
  optimizedSvg = optimizedSvg.replace(/\s+width="[^"]*"/g, ' ');
  optimizedSvg = optimizedSvg.replace(/\s+height="[^"]*"/g, ' ');
  optimizedSvg = optimizedSvg.replace(
    '<svg',
    '<svg width="100%" height="100%"'
  );

  // For SVGs with strokes, ensure strokes scale proportionally
  if (optimizedSvg.includes('stroke=')) {
    // For flags with stripes (like US flag), don't add vector-effect
    // as it can interfere with proper stripe rendering and proportions
    // Only add vector-effect for flags with decorative strokes
    const hasStripes =
      optimizedSvg.includes('stroke-width') &&
      (optimizedSvg.includes('h640') || optimizedSvg.includes('h400'));

    if (!hasStripes) {
      // Add vector-effect to maintain stroke proportions during scaling
      optimizedSvg = optimizedSvg.replace(
        /stroke="/g,
        'vector-effect="non-scaling-stroke" stroke="'
      );
    }
  }

  // Add title if provided
  if (title && !optimizedSvg.includes('<title>')) {
    // Insert title as the first child element inside the SVG
    // This ensures proper SVG structure and accessibility
    optimizedSvg = optimizedSvg.replace(
      /<svg([^>]*)>/,
      `<svg$1><title>${title}</title>`
    );
  }

  /**
   * Render the final flag component with optimized SVG content.
   * Includes comprehensive accessibility attributes and CSS classes for styling.
   */
  return (
    <div
      ref={flagRef}
      style={flagStyles}
      className={`flexi-flag flexi-flag--${shape} flexi-flag--${code.toLowerCase()} ${className}`.trim()}
      role='img'
      aria-label={alt ?? country?.name ?? code}
      {...props}
      dangerouslySetInnerHTML={{ __html: optimizedSvg ?? '' }}
    />
  );
};

// Set display name for better debugging experience
Flag.displayName = 'Flag';
