# Flexi-Flags

[![npm version](https://badge.fury.io/js/flexi-flags.svg)](https://badge.fury.io/js/flexi-flags) [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![Downloads](https://img.shields.io/npm/dw/flexi-flags.svg)](https://www.npmjs.com/package/flexi-flags)

A modern, flexible NPM package for displaying country flags in SVG format. Supports all 195 UN countries plus extras like EU, UN, and Kosovo. Key differentiators include customizable shapes (rectangle, square, circle, rounded, pill), aspect ratios, sizes, and styles.

Unlike other packages (e.g., `country-flag-icons` or `react-country-flag`), Flexi-Flags offers easy shape transformations, tree-shaking, lazy loading support, and built-in accessibility.

## Features

- **Comprehensive Coverage**: 250+ flags based on ISO 3166-1, sourced from high-quality SVGs
- **Flexible Shapes**: Rectangle, square, circle, rounded, pill
- **Custom Aspect Ratios**: 1:1, 3:2, 4:3, or any custom ratio
- **Any Size**: Prop-based sizing (e.g., `24px`, `2em`) or full-width
- **Styling Freedom**: Borders, shadows, animations, color overrides
- **Performance**: Tree-shakable, lazy loading via IntersectionObserver
- **Accessibility**: Built-in `aria-label`, `title`, and role attributes
- **SSR-Safe**: Works perfectly with Next.js and other SSR frameworks
- **TypeScript**: Full TypeScript support with comprehensive types
- **Utilities**: Search, filter, and find countries by code, name, or nationality

## Installation

```bash
npm install flexi-flags
```

For React projects, ensure you have React 16+ installed.

## Quick Start

```tsx
import React from 'react';
import { Flag } from 'flexi-flags';

const App = () => (
  <div>
    <Flag code='us' size='48px' />
    <Flag code='gb' shape='circle' size='32px' />
    <Flag code='ca' shape='rounded' ratio='1:1' size='40px' />
  </div>
);

export default App;
```

## API Reference

### Flag Component Props

| Prop        | Type                                                         | Default       | Description                                                                   |
| ----------- | ------------------------------------------------------------ | ------------- | ----------------------------------------------------------------------------- |
| `code`      | `string` (required)                                          | -             | ISO alpha-2 country code (e.g., 'us', 'fr'). Case-insensitive.                |
| `shape`     | `'rectangle' \| 'square' \| 'circle' \| 'rounded' \| 'pill'` | `'rectangle'` | Shape of the flag container.                                                  |
| `ratio`     | `'1:1' \| '3:2' \| '4:3' \| string`                          | `'3:2'`       | Aspect ratio. Can be standard ratios or custom (e.g., '5:3').                 |
| `size`      | `string`                                                     | -             | Width/height (e.g., '24px', '2rem'). For circle/square, sets both dimensions. |
| `width`     | `string`                                                     | -             | Explicit width. Overrides `size` if provided.                                 |
| `height`    | `string`                                                     | -             | Explicit height. Usually not needed with `ratio`.                             |
| `style`     | `React.CSSProperties \| string`                              | -             | Custom styles as object or string.                                            |
| `alt`       | `string`                                                     | Country name  | Accessibility text. Defaults to full country name.                            |
| `className` | `string`                                                     | -             | CSS class for styling.                                                        |
| `lazy`      | `boolean`                                                    | `false`       | Enable lazy loading using IntersectionObserver.                               |
| `fallback`  | `'emoji' \| 'none'`                                          | `'none'`      | Fallback if SVG fails. 'emoji' shows Unicode flag emoji.                      |
| `title`     | `string`                                                     | -             | Tooltip title for the flag.                                                   |

## Examples

### Basic Shapes

```tsx
<Flag code="us" shape="rectangle" size="48px" />
<Flag code="us" shape="square" size="48px" />
<Flag code="us" shape="circle" size="48px" />
<Flag code="us" shape="rounded" size="48px" />
<Flag code="us" shape="pill" size="48px" />
```

### Custom Styling

```tsx
<Flag
  code='fr'
  size='64px'
  shape='rounded'
  style={{
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    border: '2px solid #333',
    transition: 'transform 0.3s',
  }}
  className='hover:scale-110'
/>
```

### Lazy Loading for Performance

```tsx
<Flag code='ca' size='32px' lazy />
```

### Next.js SSR Example

```tsx
import dynamic from 'next/dynamic';

const Flag = dynamic(() => import('flexi-flags').then(mod => mod.Flag), {
  ssr: false,
});

export default function MyPage() {
  return <Flag code='au' size='48px' />;
}
```

### Country Search and Selection

```tsx
import { useState } from 'react';
import { Flag, searchCountries } from 'flexi-flags';

function CountryPicker() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('us');

  const results = searchCountries(query, 10);

  return (
    <div>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder='Search countries...'
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '8px',
        }}
      >
        {results.map(country => (
          <div
            key={country.iso}
            onClick={() => setSelected(country.iso)}
            style={{ cursor: 'pointer', textAlign: 'center' }}
          >
            <Flag code={country.iso} size='32px' shape='rounded' />
            <p>{country.name}</p>
          </div>
        ))}
      </div>

      <div>
        <h3>Selected:</h3>
        <Flag code={selected} size='64px' shape='circle' />
      </div>
    </div>
  );
}
```

## Utility Functions

```tsx
import {
  getAllCountries,
  getCountryByCode,
  searchCountries,
  flagExists,
} from 'flexi-flags';

// Get all countries
const allCountries = getAllCountries();

// Find specific country
const usa = getCountryByCode('US');

// Search countries
const results = searchCountries('united', 5);

// Check if flag exists
const hasFlag = flagExists('GB');
```

## Advanced Usage

### Custom Animations

Add CSS animations to create engaging flag interactions:

```css
.waving-flag {
  animation: wave 2s infinite;
}

@keyframes wave {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}
```

```tsx
<Flag code='jp' className='waving-flag' size='48px' />
```

### Integration with Form Libraries

```tsx
import { Flag, getAllCountries } from 'flexi-flags';
import Select from 'react-select';

const countryOptions = getAllCountries().map(country => ({
  value: country.iso,
  label: country.name,
  flag: <Flag code={country.iso} size='20px' shape='circle' />,
}));

const CustomOption = ({ innerProps, label, data }) => (
  <div
    {...innerProps}
    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
  >
    {data.flag}
    {label}
  </div>
);

<Select options={countryOptions} components={{ Option: CustomOption }} />;
```

## TypeScript Support

Flexi-Flags is built with TypeScript and includes comprehensive type definitions:

```tsx
import type { FlagProps, FlagShape, Country } from 'flexi-flags';

const customFlag: FlagProps = {
  code: 'us',
  shape: 'circle',
  size: '48px',
};
```

## Performance Tips

- Use `lazy` prop for long lists of flags
- Leverage tree-shaking by importing only what you need
- Combine with `React.memo` for frequently re-rendered flag lists
- Use appropriate `shape` and `size` combinations for your UI

## Browser Support

- Modern browsers with ES2015+ support
- React 16.8+ (hooks support required)
- SSR frameworks like Next.js, Gatsby

## Contributing

Contributions are welcome! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT © [Your Name](https://github.com/yourusername)

---

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build package
npm run build

# Run example in development
npm run dev
```

For more examples and documentation, visit our [GitHub repository](https://github.com/yourusername/flexi-flags).
