// Main component export
export { Flag } from './components/Flag';

// Type exports
export type {
  FlagProps,
  FlagShape,
  AspectRatio,
  FlagFallback,
  Country,
  FlagData,
} from './types';

// Utility exports
export {
  getAllCountries,
  getCountryByCode,
  getCountryByName,
  getFlagByNationality,
  searchCountries,
  flagExists,
  getFlagSvgSync,
} from './utils/flagUtils';

// Data exports
export { countries } from './data/countries';
