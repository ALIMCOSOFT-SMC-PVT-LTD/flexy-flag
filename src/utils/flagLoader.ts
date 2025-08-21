/**
 * Dynamic flag SVG loader utility.
 *
 * This module handles loading SVG flags from the assets directory.
 * SVGs are loaded dynamically to enable tree-shaking and reduce bundle size.
 *
 * @internal
 */

/**
 * Cache for loaded SVG content to avoid multiple file reads.
 */
const svgCache = new Map<string, string>();

/**
 * Dynamically imports an SVG flag file.
 *
 * @param countryCode - ISO 3166-1 alpha-2 country code in lowercase.
 * @returns Promise that resolves to SVG content string.
 */
async function importSvgFlag(countryCode: string): Promise<string> {
  try {
    // Dynamic import of SVG file
    const svgModule = await import(`../assets/flags/${countryCode}.svg`);
    return svgModule.default;
  } catch (error) {
    throw new Error(`SVG flag not found for country code: ${countryCode}`);
  }
}

/**
 * Loads SVG flag content with caching support.
 *
 * First checks cache, then attempts to load from assets.
 * Falls back to generating a placeholder if SVG file doesn't exist.
 *
 * @param countryCode - ISO 3166-1 alpha-2 country code (case-insensitive).
 * @returns Promise that resolves to SVG content string.
 *
 * @internal
 */
export async function loadFlagSvg(countryCode: string): Promise<string> {
  const lowerCode = countryCode.toLowerCase();

  // Check cache first
  if (svgCache.has(lowerCode)) {
    return svgCache.get(lowerCode)!;
  }

  try {
    // Attempt to load SVG from assets
    const svgContent = await importSvgFlag(lowerCode);

    // Cache the result
    svgCache.set(lowerCode, svgContent);
    return svgContent;
  } catch (error) {
    // Generate placeholder SVG if file doesn't exist
    const placeholderSvg = generatePlaceholderSvg(lowerCode);
    svgCache.set(lowerCode, placeholderSvg);
    return placeholderSvg;
  }
}

/**
 * Generates a colorful placeholder SVG for countries without flag files.
 *
 * @param countryCode - ISO country code in lowercase.
 * @returns SVG markup string for placeholder flag.
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
 *
 * @param countryCodes - Array of country codes to preload.
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
 * Clears the SVG cache (useful for testing or memory management).
 *
 * @internal
 */
export function clearFlagCache(): void {
  svgCache.clear();
}
