import {
  getAllCountries,
  getCountryByCode,
  getCountryByName,
  getFlagByNationality,
  searchCountries,
  flagExists,
  getFlagSvgSync,
} from '../flagUtils';

describe('flagUtils', () => {
  describe('getAllCountries', () => {
    test('returns array of countries', () => {
      const countries = getAllCountries();
      expect(Array.isArray(countries)).toBe(true);
      expect(countries.length).toBeGreaterThan(0);
      expect(countries[0]).toHaveProperty('iso');
      expect(countries[0]).toHaveProperty('name');
    });
  });

  describe('getCountryByCode', () => {
    test('finds country by valid ISO code', () => {
      const country = getCountryByCode('US');
      expect(country).toBeDefined();
      expect(country?.name).toBe('United States');
      expect(country?.iso).toBe('US');
    });

    test('finds country by lowercase ISO code', () => {
      const country = getCountryByCode('us');
      expect(country).toBeDefined();
      expect(country?.iso).toBe('US');
    });

    test('returns undefined for invalid code', () => {
      const country = getCountryByCode('INVALID');
      expect(country).toBeUndefined();
    });
  });

  describe('getCountryByName', () => {
    test('finds country by exact name', () => {
      const country = getCountryByName('United States');
      expect(country).toBeDefined();
      expect(country?.iso).toBe('US');
    });

    test('finds country by partial name', () => {
      const country = getCountryByName('United');
      expect(country).toBeDefined();
    });

    test('is case insensitive', () => {
      const country = getCountryByName('united states');
      expect(country).toBeDefined();
      expect(country?.iso).toBe('US');
    });

    test('returns undefined for non-existent name', () => {
      const country = getCountryByName('Atlantis');
      expect(country).toBeUndefined();
    });
  });

  describe('getFlagByNationality', () => {
    test('finds country by nationality', () => {
      const country = getFlagByNationality('American');
      expect(country).toBeDefined();
      expect(country?.iso).toBe('US');
    });

    test('is case insensitive', () => {
      const country = getFlagByNationality('american');
      expect(country).toBeDefined();
      expect(country?.iso).toBe('US');
    });

    test('returns undefined for unknown nationality', () => {
      const country = getFlagByNationality('Martian');
      expect(country).toBeUndefined();
    });
  });

  describe('searchCountries', () => {
    test('searches by country name', () => {
      const results = searchCountries('United');
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].name).toContain('United');
    });

    test('searches by country code', () => {
      const results = searchCountries('US');
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].iso).toBe('US');
    });

    test('limits results', () => {
      const results = searchCountries('a', 5);
      expect(results.length).toBeLessThanOrEqual(5);
    });

    test('returns empty array for no matches', () => {
      const results = searchCountries('xyz123');
      expect(results).toEqual([]);
    });
  });

  describe('flagExists', () => {
    test('returns true for existing flags', () => {
      expect(flagExists('US')).toBe(true);
      expect(flagExists('us')).toBe(true);
      expect(flagExists('GB')).toBe(true);
    });

    test('returns true for countries without SVG but in data', () => {
      expect(flagExists('ZW')).toBe(true); // Zimbabwe exists in data
    });

    test('returns false for non-existent flags', () => {
      expect(flagExists('INVALID')).toBe(false);
    });
  });

  describe('getFlagSvgSync', () => {
    test('returns SVG for existing flags', () => {
      const svg = getFlagSvgSync('US');
      expect(svg).toContain('<svg');
      expect(svg).toContain('</svg>');
    });

    test('returns placeholder SVG for countries without specific SVG', () => {
      const svg = getFlagSvgSync('ZW');
      expect(svg).toContain('<svg');
      expect(svg).toContain('ZW'); // Should contain country code
    });

    test('throws error for invalid country codes', () => {
      expect(() => getFlagSvgSync('INVALID')).toThrow();
    });

    test('is case insensitive', () => {
      const svg1 = getFlagSvgSync('US');
      const svg2 = getFlagSvgSync('us');
      expect(svg1).toBe(svg2);
    });
  });
});
