import { countries } from '../data/countries';
import { Country } from '../types';
import { loadFlagSvg } from './dynamicFlagLoader';

/**
 * Retrieves the complete list of all available countries with their metadata.
 *
 * This function returns all countries supported by the @alimcosoft/flexy-flag package,
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
  // A flag exists if the country exists in our database
  // Real SVGs will be loaded from assets, placeholders generated for missing ones
  return countries.some(
    country => country.iso.toLowerCase() === code.toLowerCase()
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
 * Generates colorful placeholders for all countries since all real SVGs
 * are now loaded via the async getFlagSvg function.
 *
 * @param code - ISO 3166-1 alpha-2 country code.
 * @returns SVG markup string for a placeholder flag.
 * @throws Error when country code is invalid or not supported.
 *
 * @public
 * @deprecated Use getFlagSvg (async version) for real SVG flags from assets.
 */
export function getFlagSvgSync(code: string): string {
  const lowerCode = code.toLowerCase();

  // For now, we'll generate a placeholder - the async version handles real SVGs
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
