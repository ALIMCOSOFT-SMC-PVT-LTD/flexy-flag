#!/usr/bin/env node

// Quick flag test script to verify SVG generation
const {
  getFlagSvgSync,
  getAllCountries,
  searchCountries,
  flagExists,
  getCountryByCode,
} = require('./dist/index.js');

console.log('🏁 Testing Flexi-Flags Package\n');

// Test 1: Check if common flags exist
console.log('1. Testing Flag Existence:');
const testCodes = [
  'US',
  'GB',
  'CA',
  'DE',
  'FR',
  'JP',
  'IN',
  'BR',
  'AU',
  'CH',
  'PK',
  'ZW',
];

testCodes.forEach(code => {
  const exists = flagExists(code);
  const country = getCountryByCode(code);
  console.log(
    `   ${code}: ${exists ? '✅ Available' : '❌ Missing'} - ${country?.name || 'Unknown'}`
  );
});

console.log('\n2. Testing SVG Generation:');
// Test 2: Generate some SVGs and check they're valid
const flagsToTest = ['US', 'PK', 'ZW']; // Mix of embedded, real country, and placeholder

flagsToTest.forEach(code => {
  try {
    const svg = getFlagSvgSync(code);
    const isValid = svg.includes('<svg') && svg.includes('</svg>');
    const isEmbedded = svg.includes('viewBox="0 0 300 200"');
    const isPlaceholder =
      svg.includes('viewBox="0 0 400 300"') &&
      svg.includes('text-anchor="middle"');

    let type = 'Unknown';
    if (isEmbedded) type = '🎨 Embedded SVG';
    else if (isPlaceholder) type = '📝 Placeholder';
    else type = '📄 Asset SVG';

    console.log(`   ${code}: ${isValid ? '✅' : '❌'} Valid SVG - ${type}`);
    console.log(`        Length: ${svg.length} characters`);
  } catch (error) {
    console.log(`   ${code}: ❌ Error - ${error.message}`);
  }
});

console.log('\n3. Testing Search Functionality:');
// Test 3: Search functionality
const searchTests = [
  { query: 'United', expected: 'United States, United Kingdom' },
  { query: 'US', expected: 'United States' },
  { query: 'Pak', expected: 'Pakistan' },
];

searchTests.forEach(test => {
  const results = searchCountries(test.query, 3);
  console.log(`   Search "${test.query}": Found ${results.length} results`);
  results.forEach((country, i) => {
    console.log(`     ${i + 1}. ${country.name} (${country.iso})`);
  });
});

console.log('\n4. Package Statistics:');
const allCountries = getAllCountries();
console.log(`   📊 Total Countries: ${allCountries.length}`);
console.log(
  `   🎨 Embedded Flags: ${testCodes.filter(c => flagExists(c) && ['US', 'GB', 'CA', 'DE', 'FR', 'JP', 'IN', 'BR', 'AU', 'CH'].includes(c)).length}`
);
console.log(
  `   📝 Placeholder Flags: ${allCountries.length - 10} (auto-generated)`
);

console.log('\n5. Sample SVG Preview (US Flag):');
try {
  const usFlag = getFlagSvgSync('US');
  console.log('   📄 US Flag SVG (first 200 chars):');
  console.log(`   ${usFlag.substring(0, 200)}...`);
} catch (error) {
  console.log(`   ❌ Error generating US flag: ${error.message}`);
}

console.log(
  '\n🎯 Test Complete! All flags should render properly in your React components.'
);
