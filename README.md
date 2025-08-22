# @alimcosoft/flexy-flag

[![npm version](https://badge.fury.io/js/@alimcosoft%2Fflexy-flag.svg)](https://badge.fury.io/js/@alimcosoft%2Fflexy-flag) [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![Downloads](https://img.shields.io/npm/dw/@alimcosoft/flexy-flag.svg)](https://www.npmjs.com/package/@alimcosoft/flexy-flag)

A modern, flexible React component library for displaying country flags using authentic, high-quality SVG assets. Features 272+ real flag designs with intelligent scaling, shape transformations, and perfect rendering across all container sizes.

**Key differentiators:**

- ✅ **Real SVG Assets**: Authentic flag designs with accurate colors (not simplified recreations)
- ✅ **Smart Scaling**: Flags automatically scale to fill containers perfectly without cropping
- ✅ **Stroke-Aware**: Special handling for flags with stripes (like USA) to preserve visual accuracy
- ✅ **Shape Flexibility**: Circle, square, rounded, pill shapes with optimized rendering
- ✅ **CDN Optimized**: Dynamic loading from Vercel Edge Network for ultra-fast delivery
- ✅ **Tiny Bundle**: 113KB package (94% smaller) with on-demand SVG loading

## Features

- **Real SVG Flags**: 272+ authentic, high-quality SVG flags with accurate colors and designs
- **Flexible Shapes**: Rectangle, square, circle, rounded, pill with optimized rendering
- **Perfect Scaling**: Intelligent SVG optimization ensures flags fill containers without distortion
- **Custom Aspect Ratios**: 1:1, 3:2, 4:3, or any custom ratio with automatic aspect preservation
- **Any Size**: Responsive sizing that adapts perfectly to any container dimensions
- **Smart Rendering**: Automatic detection of stroke-based flags (like USA) for proper stripe rendering
- **Performance**: Dynamic CDN loading with intelligent caching and tree-shaking support
- **Accessibility**: Built-in `aria-label`, `title`, and role attributes with screen reader support
- **SSR-Safe**: Works perfectly with Next.js, Vite, and all modern React frameworks
- **TypeScript**: Full TypeScript support with comprehensive type definitions
- **Utilities**: Search, filter, and find countries by code, name, or nationality

## Installation

```bash
npm install @alimcosoft/flexy-flag
```

For React projects, ensure you have React 16+ installed.

## Quick Start

```tsx
import React from 'react';
import { Flag } from '@alimcosoft/flexy-flag';

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

const Flag = dynamic(
  () => import('@alimcosoft/flexy-flag').then(mod => mod.Flag),
  {
    ssr: false,
  }
);

export default function MyPage() {
  return <Flag code='au' size='48px' />;
}
```

### Country Search and Selection

```tsx
import { useState } from 'react';
import { Flag, searchCountries } from '@alimcosoft/flexy-flag';

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
} from '@alimcosoft/flexy-flag';

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
import { Flag, getAllCountries } from '@alimcosoft/flexy-flag';
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

## CDN Architecture

@alimcosoft/flexy-flag uses a high-performance CDN architecture for optimal loading:

- **SVG Assets**: Hosted on Vercel Edge Network at `https://flexy-flag.vercel.app/flags/`
- **Global Distribution**: Ultra-fast delivery via Vercel's global CDN
- **Smart Caching**: Automatic client-side caching with fallback placeholders
- **Small Bundle**: Only 113KB package size (SVGs load dynamically)

### CDN Benefits:

- ⚡ **Lightning Fast**: Sub-100ms flag loading globally
- 📦 **Tiny Package**: 94% smaller than bundled alternatives
- 🌍 **Global CDN**: Vercel's edge network for worldwide speed
- 🔄 **Smart Fallbacks**: Colored placeholders if CDN unavailable

## TypeScript Support

@alimcosoft/flexy-flag is built with TypeScript and includes comprehensive type definitions:

```tsx
import type { FlagProps, FlagShape, Country } from '@alimcosoft/flexy-flag';

const customFlag: FlagProps = {
  code: 'us',
  shape: 'circle',
  size: '48px',
};
```

## Technical Architecture

### SVG Optimization

- **Static Bundle**: All 272+ SVGs are statically imported and bundled for reliable access
- **Smart Scaling**: Automatic `preserveAspectRatio` optimization based on flag content
- **Stroke Detection**: Special handling for stroke-based flags (USA stripes, etc.) to prevent distortion
- **Container Fitting**: Flags intelligently scale to fill containers without cropping

### Performance Features

- **Tree Shaking**: Import only the components and utilities you need
- **Lazy Loading**: Optional IntersectionObserver-based lazy loading
- **SVG Caching**: Built-in caching prevents duplicate SVG processing
- **Bundle Optimization**: Rollup-optimized build with proper externalization

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

MIT © [Hassan Sattar](https://github.com/ALIMCOSOFT-SMC-PVT-LTD)

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

## 🚀 Custom CDN Deployment

Want to host flags on your own CDN? Use our deployment scripts:

### GitHub Pages

```bash
./deploy-flags.sh
# Follow the prompts to deploy to GitHub Pages
```

### Vercel

```bash
./setup-vercel-cdn.sh
# Creates a Vercel-ready project with your flags
```

These scripts help you set up your own flag CDN for maximum control and performance.

For more examples and documentation, visit our [GitHub repository](https://github.com/ALIMCOSOFT-SMC-PVT-LTD/flexy-flag).
