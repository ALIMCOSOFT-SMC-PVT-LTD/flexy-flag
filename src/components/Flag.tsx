import React from 'react';
import { FlagProps } from '../types';
import { getFlagSvgSync, getCountryByCode } from '../utils/flagUtils';

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
  // Simplified version without hooks for testing
  const isVisible = !lazy; // Always visible for now
  const hasError = false; // No error handling for now

  // Calculate dimensions and styles
  // Note: ratio parsing for future use
  // const [ratioWidth, ratioHeight] = ratio.split(':').map(Number);

  let flagStyles: React.CSSProperties = {
    display: 'inline-block',
    overflow: 'hidden',
    aspectRatio: ratio,
  };

  // Handle sizing
  if (width) {
    flagStyles.width = width;
  } else if (size) {
    if (shape === 'circle' || shape === 'square') {
      flagStyles.width = size;
      flagStyles.height = size;
    } else {
      flagStyles.width = size;
    }
  } else {
    flagStyles.width = '100%';
  }

  if (height && shape !== 'circle' && shape !== 'square') {
    flagStyles.height = height;
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

  /**
   * Load SVG content and handle errors gracefully.
   */
  let svgContent: string | null = null;

  if (isVisible) {
    try {
      svgContent = getFlagSvgSync(code.toLowerCase());
    } catch (error) {
      // Set error state for fallback handling
      // Flag not found for country code: ${code}
    }
  }

  // Handle fallbacks
  if (hasError || !svgContent) {
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
    return null;
  }

  // SVG optimization for different shapes
  let optimizedSvg = svgContent;

  // Ensure proper viewBox for the aspect ratio
  const [ratioW, ratioH] = ratio.split(':').map(Number);
  optimizedSvg = optimizedSvg.replace(
    /viewBox="[^"]*"/,
    `viewBox="0 0 ${ratioW * 100} ${ratioH * 100}"`
  );

  // Add preserveAspectRatio for better scaling
  if (!optimizedSvg.includes('preserveAspectRatio')) {
    optimizedSvg = optimizedSvg.replace(
      '<svg',
      '<svg preserveAspectRatio="xMidYMid slice"'
    );
  }

  // Add title if provided
  if (title && !optimizedSvg.includes('<title>')) {
    optimizedSvg = optimizedSvg.replace('<svg', `<svg><title>${title}</title>`);
  }

  /**
   * Render the final flag component with optimized SVG content.
   * Includes comprehensive accessibility attributes and CSS classes for styling.
   */
  return (
    <div
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
