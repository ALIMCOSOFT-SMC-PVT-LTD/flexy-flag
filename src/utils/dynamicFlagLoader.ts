/**
 * Dynamic flag SVG loader utility.
 *
 * This module handles loading SVG flags from external CDN sources.
 * SVGs are loaded on-demand to keep bundle size minimal.
 */

/**
 * Cache for loaded SVG content to avoid multiple network requests.
 */
const svgCache = new Map<string, string>();

/**
 * Base URL for flag SVGs on CDN.
 * You can host these on GitHub Pages, jsDelivr, or any CDN.
 */
const CDN_BASE_URL =
  'https://cdn.jsdelivr.net/npm/@alimcosoft/flexy-flag@latest/src/assets/flags';

/**
 * Loads SVG flag content from CDN with caching support.
 *
 * @param countryCode - ISO 3166-1 alpha-2 country code (case-insensitive).
 * @returns Promise that resolves to SVG content string.
 */
export async function loadFlagSvg(countryCode: string): Promise<string> {
  const lowerCode = countryCode.toLowerCase();

  // Check cache first
  if (svgCache.has(lowerCode)) {
    return svgCache.get(lowerCode)!;
  }

  try {
    // Load SVG from CDN
    const response = await fetch(`${CDN_BASE_URL}/${lowerCode}.svg`);

    if (!response.ok) {
      throw new Error(`Failed to load flag: ${response.status}`);
    }

    const svgContent = await response.text();

    // Cache the result
    svgCache.set(lowerCode, svgContent);
    return svgContent;
  } catch (error) {
    // Generate placeholder SVG if fetch fails
    const placeholderSvg = generatePlaceholderSvg(lowerCode);
    svgCache.set(lowerCode, placeholderSvg);
    return placeholderSvg;
  }
}

/**
 * Generates a colorful placeholder SVG for countries without flag files.
 * @param countryCode - The ISO 3166-1 alpha-2 country code.
 * @returns SVG markup string for the placeholder flag.
 */
function generatePlaceholderSvg(countryCode: string): string {
  const colors = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#96CEB4',
    '#FFEAA7',
    '#DDA0DD',
  ];

  const colorIndex = countryCode.charCodeAt(0) % colors.length;
  const color = colors[colorIndex];

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
    <rect width="400" height="300" fill="${color}"/>
    <text 
      x="200" 
      y="150" 
      text-anchor="middle" 
      dominant-baseline="middle" 
      fill="white" 
      font-family="Arial, sans-serif" 
      font-size="32" 
      font-weight="bold"
    >
      ${countryCode.toUpperCase()}
    </text>
  </svg>`;
}

/**
 * Preloads commonly used flags for better performance.
 * @param countryCodes - Array of ISO 3166-1 alpha-2 country codes to preload.
 */
export async function preloadFlags(countryCodes: string[]): Promise<void> {
  const loadPromises = countryCodes.map(code =>
    loadFlagSvg(code).catch(() => {
      // Ignore errors for missing flags
    })
  );

  await Promise.all(loadPromises);
}

/**
 * Clears the SVG cache.
 */
export function clearFlagCache(): void {
  svgCache.clear();
}
