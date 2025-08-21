import { countries } from '../data/countries';
import { Country } from '../types';
import { loadFlagSvg } from './flagLoader';

/**
 * Collection of high-quality SVG flag definitions for common countries.
 *
 * These are embedded directly for performance and to avoid external dependencies.
 * In a production environment, you might consider loading these from a CDN
 * or external asset files for better caching and reduced bundle size.
 *
 * @internal
 */
const simpleFlagSvgs: Record<string, string> = {
  us: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
    <rect width="300" height="200" fill="#B22234"/>
    <rect y="15" width="300" height="15" fill="#FFFFFF"/>
    <rect y="46" width="300" height="15" fill="#FFFFFF"/>
    <rect y="77" width="300" height="15" fill="#FFFFFF"/>
    <rect y="108" width="300" height="15" fill="#FFFFFF"/>
    <rect y="138" width="300" height="15" fill="#FFFFFF"/>
    <rect y="169" width="300" height="15" fill="#FFFFFF"/>
    <rect width="120" height="105" fill="#3C3B6E"/>
  </svg>`,
  gb: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
    <rect width="300" height="200" fill="#012169"/>
    <path d="M0,0 L300,200 M300,0 L0,200" stroke="#FFFFFF" stroke-width="20"/>
    <path d="M150,0 L150,200 M0,100 L300,100" stroke="#FFFFFF" stroke-width="40"/>
    <path d="M0,0 L300,200 M300,0 L0,200" stroke="#C8102E" stroke-width="12"/>
    <path d="M150,0 L150,200 M0,100 L300,100" stroke="#C8102E" stroke-width="24"/>
  </svg>`,
  ca: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
    <rect width="300" height="200" fill="#FFFFFF"/>
    <rect width="75" height="200" fill="#FF0000"/>
    <rect x="225" width="75" height="200" fill="#FF0000"/>
    <path d="M150,50 L130,80 L140,80 L120,100 L140,100 L150,150 L160,100 L180,100 L160,80 L170,80 Z" fill="#FF0000"/>
  </svg>`,
  de: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
    <rect width="300" height="67" fill="#000000"/>
    <rect y="67" width="300" height="66" fill="#DD0000"/>
    <rect y="133" width="300" height="67" fill="#FFCE00"/>
  </svg>`,
  fr: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
    <rect width="100" height="200" fill="#002654"/>
    <rect x="100" width="100" height="200" fill="#FFFFFF"/>
    <rect x="200" width="100" height="200" fill="#CE1126"/>
  </svg>`,
  jp: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
    <rect width="300" height="200" fill="#FFFFFF"/>
    <circle cx="150" cy="100" r="60" fill="#BC002D"/>
  </svg>`,
  in: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
    <rect width="300" height="67" fill="#FF9933"/>
    <rect y="67" width="300" height="66" fill="#FFFFFF"/>
    <rect y="133" width="300" height="67" fill="#138808"/>
    <circle cx="150" cy="100" r="20" fill="none" stroke="#000080" stroke-width="2"/>
    <g stroke="#000080" stroke-width="1">
      <line x1="130" y1="100" x2="170" y2="100"/>
      <line x1="150" y1="80" x2="150" y2="120"/>
    </g>
  </svg>`,
  br: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
    <rect width="300" height="200" fill="#009639"/>
    <path d="M30,100 L150,40 L270,100 L150,160 Z" fill="#FEDF00"/>
    <circle cx="150" cy="100" r="35" fill="#002776"/>
  </svg>`,
  au: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
    <rect width="300" height="200" fill="#012169"/>
    <rect width="120" height="100" fill="#012169"/>
    <path d="M0,0 L120,100 M120,0 L0,100" stroke="#FFFFFF" stroke-width="8"/>
    <path d="M60,0 L60,100 M0,50 L120,50" stroke="#FFFFFF" stroke-width="16"/>
    <path d="M0,0 L120,100 M120,0 L0,100" stroke="#C8102E" stroke-width="5"/>
    <path d="M60,0 L60,100 M0,50 L120,50" stroke="#C8102E" stroke-width="10"/>
    <g fill="#FFFFFF">
      <polygon points="190,30 195,45 210,45 198,55 203,70 190,60 177,70 182,55 170,45 185,45"/>
      <polygon points="220,80 223,87 232,87 225,92 228,99 220,94 212,99 215,92 208,87 217,87"/>
      <polygon points="250,120 253,127 262,127 255,132 258,139 250,134 242,139 245,132 238,127 247,127"/>
      <polygon points="180,140 183,147 192,147 185,152 188,159 180,154 172,159 175,152 168,147 177,147"/>
      <polygon points="240,60 243,67 252,67 245,72 248,79 240,74 232,79 235,72 228,67 237,67"/>
    </g>
  </svg>`,
  ch: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <rect width="200" height="200" fill="#FF0000"/>
    <rect x="65" y="40" width="70" height="120" fill="#FFFFFF"/>
    <rect x="40" y="65" width="120" height="70" fill="#FFFFFF"/>
  </svg>`,
};

/**
 * Retrieves the complete list of all available countries with their metadata.
 *
 * This function returns all countries supported by the flexi-flags package,
 * including their ISO codes, full names, and emoji representations where available.
 *
 * @example
 * ```typescript
 * const allCountries = getAllCountries();
 * console.log(`Total countries: ${allCountries.length}`);
 *
 * // Filter for countries starting with 'A'
 * const aCountries = allCountries.filter(c => c.name.startsWith('A'));
 * ```
 *
 * @returns Array of all available country objects.
 *
 * @public
 */
export function getAllCountries(): Country[] {
  return countries;
}

/**
 * Finds a country by its ISO 3166-1 alpha-2 code.
 *
 * Performs a case-insensitive search for the specified country code.
 * Returns undefined if no matching country is found.
 *
 * @example
 * ```typescript
 * const usa = getCountryByCode('US');
 * console.log(usa?.name); // 'United States'
 *
 * const uk = getCountryByCode('gb'); // Case insensitive
 * console.log(uk?.name); // 'United Kingdom'
 *
 * const invalid = getCountryByCode('XX');
 * console.log(invalid); // undefined
 * ```
 *
 * @param code - ISO 3166-1 alpha-2 country code (e.g., 'US', 'GB').
 * @returns Country object if found, undefined otherwise.
 *
 * @public
 */
export function getCountryByCode(code: string): Country | undefined {
  return countries.find(
    country => country.iso.toLowerCase() === code.toLowerCase()
  );
}

/**
 * Finds a country by performing a fuzzy search on country names.
 *
 * Searches for countries where the provided name partially matches
 * the country's full name (case-insensitive). Returns the first match found.
 *
 * @example
 * ```typescript
 * const usa = getCountryByName('United States');
 * const uk = getCountryByName('united kingdom');
 * const partial = getCountryByName('United'); // May return 'United States' or 'United Kingdom'
 * ```
 *
 * @param name - Full or partial country name to search for.
 * @returns First matching country object, or undefined if no match found.
 *
 * @public
 */
export function getCountryByName(name: string): Country | undefined {
  const searchName = name.toLowerCase();
  return countries.find(
    country =>
      country.name.toLowerCase().includes(searchName) ||
      searchName.includes(country.name.toLowerCase())
  );
}

/**
 * Checks whether a flag is available for the specified country code.
 *
 * This function determines if we have either a custom SVG flag or
 * if the country exists in our database (which would generate a placeholder flag).
 *
 * @example
 * ```typescript
 * console.log(flagExists('US')); // true - has custom SVG
 * console.log(flagExists('ZW')); // true - generates placeholder
 * console.log(flagExists('XX')); // false - invalid code
 * ```
 *
 * @param code - ISO 3166-1 alpha-2 country code to check.
 * @returns True if a flag can be displayed for this country, false otherwise.
 *
 * @public
 */
export function flagExists(code: string): boolean {
  return (
    code.toLowerCase() in simpleFlagSvgs ||
    countries.some(country => country.iso.toLowerCase() === code.toLowerCase())
  );
}

/**
 * Retrieves the SVG markup for a country flag.
 *
 * This function loads SVG flags from the assets directory with fallback support.
 * If no SVG file exists, it generates a placeholder. For invalid country codes,
 * it throws an error.
 *
 * @example
 * ```typescript
 * try {
 *   const usSvg = await getFlagSvg('US'); // Returns US flag SVG from assets
 *   const zwSvg = await getFlagSvg('ZW'); // Returns placeholder if no file exists
 * } catch (error) {
 *   console.error('Invalid country code');
 * }
 * ```
 *
 * @param code - ISO 3166-1 alpha-2 country code.
 * @returns Promise that resolves to SVG markup string for the flag.
 * @throws Error when country code is invalid or not supported.
 *
 * @public
 */
export async function getFlagSvg(code: string): Promise<string> {
  const lowerCode = code.toLowerCase();

  // Check if country exists in our database
  const country = getCountryByCode(lowerCode);
  if (!country) {
    throw new Error(`Flag not found for country code: ${code}`);
  }

  try {
    // Load SVG from assets directory with caching
    return await loadFlagSvg(lowerCode);
  } catch (error) {
    throw new Error(`Failed to load flag for country code: ${code}`);
  }
}

/**
 * Synchronous version of getFlagSvg for backward compatibility.
 *
 * Uses embedded SVGs for common countries, generates placeholders for others.
 * For production use with actual SVG files, use the async getFlagSvg instead.
 *
 * @param code - ISO 3166-1 alpha-2 country code.
 * @returns SVG markup string for the flag.
 * @throws Error when country code is invalid or not supported.
 *
 * @public
 * @deprecated Use getFlagSvg (async version) for better performance with real SVG files.
 */
export function getFlagSvgSync(code: string): string {
  const lowerCode = code.toLowerCase();

  // Return embedded SVG if available
  if (simpleFlagSvgs[lowerCode]) {
    return simpleFlagSvgs[lowerCode];
  }

  // Generate a placeholder SVG if country exists
  const country = getCountryByCode(lowerCode);
  if (country) {
    const colors = [
      '#FF6B6B',
      '#4ECDC4',
      '#45B7D1',
      '#96CEB4',
      '#FFEAA7',
      '#DDA0DD',
    ];
    const colorIndex = lowerCode.charCodeAt(0) % colors.length;
    const color = colors[colorIndex];

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
      <rect width="400" height="300" fill="${color}"/>
      <text x="200" y="150" text-anchor="middle" dominant-baseline="middle" 
            fill="white" font-family="Arial, sans-serif" font-size="32" font-weight="bold">
        ${lowerCode.toUpperCase()}
      </text>
    </svg>`;
  }

  throw new Error(`Flag not found for country code: ${code}`);
}

/**
 * Finds a country by nationality descriptor (e.g., "American" -> United States).
 *
 * Provides a convenient way to lookup countries using common nationality terms
 * instead of ISO codes. Supports common nationalities with plans to expand
 * the mapping over time.
 *
 * @example
 * ```typescript
 * const usa = getFlagByNationality('American');
 * const uk = getFlagByNationality('British');
 * const germany = getFlagByNationality('German');
 *
 * console.log(usa?.name); // 'United States'
 * console.log(uk?.iso);   // 'GB'
 * ```
 *
 * @param nationality - Nationality descriptor (e.g., 'American', 'British').
 * @returns Country object if nationality is recognized, undefined otherwise.
 *
 * @public
 */
export function getFlagByNationality(nationality: string): Country | undefined {
  // Mapping of common nationality terms to ISO country codes
  const nationalityMap: Record<string, string> = {
    american: 'us',
    british: 'gb',
    english: 'gb',
    canadian: 'ca',
    german: 'de',
    french: 'fr',
    japanese: 'jp',
    indian: 'in',
    brazilian: 'br',
    australian: 'au',
    swiss: 'ch',
    // Additional mappings can be added here as needed
  };

  const code = nationalityMap[nationality.toLowerCase()];
  return code ? getCountryByCode(code) : undefined;
}

/**
 * Performs an intelligent search across country names and ISO codes.
 *
 * Searches both country names and ISO codes simultaneously, returning results
 * sorted by relevance. Exact matches appear first, followed by prefix matches,
 * then partial matches, all sorted alphabetically within each group.
 *
 * @example
 * ```typescript
 * // Search by country name
 * const unitedCountries = searchCountries('United', 5);
 *
 * // Search by ISO code
 * const usResults = searchCountries('US');
 *
 * // Search with custom limit
 * const results = searchCountries('stan', 3);
 * ```
 *
 * @param query - Search term to match against country names or ISO codes.
 * @param limit - Maximum number of results to return (default: 10).
 * @returns Array of matching countries, sorted by relevance.
 *
 * @public
 */
export function searchCountries(query: string, limit = 10): Country[] {
  const searchQuery = query.toLowerCase();

  // Filter countries that match the query in name or ISO code
  const results = countries.filter(
    country =>
      country.name.toLowerCase().includes(searchQuery) ||
      country.iso.toLowerCase().includes(searchQuery)
  );

  // Sort results by relevance for better user experience
  results.sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    const aCode = a.iso.toLowerCase();
    const bCode = b.iso.toLowerCase();

    // Priority 1: Exact matches (highest relevance)
    if (aName === searchQuery || aCode === searchQuery) return -1;
    if (bName === searchQuery || bCode === searchQuery) return 1;

    // Priority 2: Prefix matches (medium relevance)
    if (aName.startsWith(searchQuery) || aCode.startsWith(searchQuery))
      return -1;
    if (bName.startsWith(searchQuery) || bCode.startsWith(searchQuery))
      return 1;

    // Priority 3: Alphabetical order for remaining matches
    return aName.localeCompare(bName);
  });

  return results.slice(0, limit);
}
