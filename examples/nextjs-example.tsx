import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { getAllCountries, searchCountries } from 'flexy-flag';

// Dynamic import for SSR safety
const Flag = dynamic(() => import('flexy-flag').then(mod => mod.Flag), {
  ssr: false,
});

/**
 * Next.js example component demonstrating flexy-flag usage.
 * Shows various flag shapes, search functionality, and SSR compatibility.
 *
 * @returns JSX element with interactive flag components.
 */
export default function NextJSExample() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('US');

  const countries = searchQuery
    ? searchCountries(searchQuery, 10)
    : getAllCountries().slice(0, 20);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>flexy-flag Next.js Example</h1>

      <div style={{ marginBottom: '30px' }}>
        <h2>Selected Country</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Flag code={selectedCountry} size='64px' shape='rounded' />
          <div>
            <h3>{countries.find(c => c.iso === selectedCountry)?.name}</h3>
            <p>Code: {selectedCountry}</p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>Search Countries</h2>
        <input
          type='text'
          placeholder='Search countries...'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '100%',
            maxWidth: '300px',
          }}
        />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>Country List</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '12px',
          }}
        >
          {countries.map(country => (
            <div
              key={country.iso}
              onClick={() => setSelectedCountry(country.iso)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px',
                border: '1px solid #eee',
                borderRadius: '4px',
                cursor: 'pointer',
                backgroundColor:
                  selectedCountry === country.iso ? '#f0f8ff' : 'white',
                transition: 'background-color 0.2s',
              }}
            >
              <Flag code={country.iso} size='24px' shape='rounded' lazy />
              <span style={{ fontSize: '14px' }}>{country.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>Flag Shapes Demo</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {['rectangle', 'square', 'circle', 'rounded', 'pill'].map(shape => (
            <div key={shape} style={{ textAlign: 'center' }}>
              <Flag
                code={selectedCountry}
                shape={
                  shape as
                    | 'rectangle'
                    | 'square'
                    | 'circle'
                    | 'rounded'
                    | 'pill'
                }
                size='48px'
                style={{ marginBottom: '8px' }}
              />
              <p style={{ fontSize: '12px', margin: 0 }}>{shape}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
