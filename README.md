# @alimcosoft/flexy-flag

[![npm version](https://badge.fury.io/js/@alimcosoft%2Fflexy-flag.svg)](https://badge.fury.io/js/@alimcosoft%2Fflexy-flag)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dw/@alimcosoft/flexy-flag.svg)](https://www.npmjs.com/package/@alimcosoft/flexy-flag)

> 🚀 A modern React component library for displaying beautiful country flags with intelligent scaling and flexible shapes.

**272+ authentic SVG flags** • **Smart scaling** • **Multiple shapes** • **TypeScript ready** • **Ultra-fast CDN delivery**

## ✨ Features

- 🎨 **Real SVG Assets** - Authentic flag designs with accurate colors (not simplified recreations)
- 📏 **Smart Scaling** - Flags automatically scale to fill containers perfectly without cropping  
- 🔷 **Shape Flexibility** - Rectangle, circle, square, rounded, pill shapes with optimized rendering
- ⚡ **CDN Optimized** - Dynamic loading from Vercel Edge Network for ultra-fast delivery
- 📦 **Tiny Bundle** - Only 113KB package size with on-demand SVG loading
- ♿ **Accessible** - Built-in ARIA labels and screen reader support
- 🔍 **Search & Filter** - Utility functions to find countries by code, name, or nationality

## 🚀 Quick Start

```bash
npm install @alimcosoft/flexy-flag
```

```tsx
import { Flag } from '@alimcosoft/flexy-flag';

function App() {
  return (
    <div>
      <Flag code="us" size="48px" />
      <Flag code="gb" shape="circle" size="32px" />
      <Flag code="ca" shape="rounded" ratio="1:1" size="40px" />
    </div>
  );
}
```

## 📋 API Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `code` | `string` | **required** | ISO alpha-2 country code (e.g., 'us', 'fr') |
| `shape` | `'rectangle' \| 'square' \| 'circle' \| 'rounded' \| 'pill'` | `'rectangle'` | Shape of the flag container |
| `size` | `string` | - | Width/height (e.g., '24px', '2rem') |
| `ratio` | `'1:1' \| '3:2' \| '4:3' \| string` | `'3:2'` | Aspect ratio (supports custom ratios) |
| `lazy` | `boolean` | `false` | Enable lazy loading |
| `fallback` | `'emoji' \| 'none'` | `'none'` | Fallback if SVG fails to load |


## 🎯 Examples

### Different Shapes
```tsx
<Flag code="jp" shape="rectangle" size="48px" />
<Flag code="jp" shape="circle" size="48px" />  
<Flag code="jp" shape="rounded" size="48px" />
```

### Custom Styling
```tsx
<Flag
  code="fr"
  size="64px"
  shape="rounded"
  style={{
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    border: '2px solid #333'
  }}
/>
```

### Country Search
```tsx
import { Flag, searchCountries } from '@alimcosoft/flexy-flag';

function CountryPicker() {
  const [query, setQuery] = useState('');
  const results = searchCountries(query, 10);

  return (
    <div>
      <input 
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search countries..."
      />
      
      {results.map(country => (
        <div key={country.iso}>
          <Flag code={country.iso} size="32px" shape="circle" />
          <span>{country.name}</span>
        </div>
      ))}
    </div>
  );
}
```

## 🛠️ Utility Functions

```tsx
import { 
  getAllCountries, 
  getCountryByCode, 
  searchCountries,
  flagExists 
} from '@alimcosoft/flexy-flag';

const allCountries = getAllCountries();
const usa = getCountryByCode('US'); 
const results = searchCountries('united', 5);
const hasFlag = flagExists('GB');
```

## ⚡ Performance & CDN

- **Global CDN**: Flags served via Vercel Edge Network for sub-100ms loading
- **Smart Caching**: Automatic client-side caching with intelligent fallbacks
- **Tree Shaking**: Import only what you need
- **Lazy Loading**: Optional IntersectionObserver support for large lists

## 🎨 Framework Integration

### Next.js
```tsx
import dynamic from 'next/dynamic';

const Flag = dynamic(() => import('@alimcosoft/flexy-flag').then(m => m.Flag), {
  ssr: false
});
```

### With Form Libraries
```tsx
import Select from 'react-select';
import { Flag, getAllCountries } from '@alimcosoft/flexy-flag';

const countryOptions = getAllCountries().map(country => ({
  value: country.iso,
  label: country.name,
  flag: <Flag code={country.iso} size="20px" shape="circle" />
}));
```

## 📊 TypeScript Support

Full TypeScript support with comprehensive type definitions:

```tsx
import type { FlagProps, Country } from '@alimcosoft/flexy-flag';

const flagConfig: FlagProps = {
  code: 'us',
  shape: 'circle', 
  size: '48px'
};
```

## 🌐 Browser Support

- Modern browsers with ES2015+ support
- React 16.8+ (hooks required)
- SSR frameworks (Next.js, Gatsby, etc.)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

MIT © [Hassan Sattar](https://github.com/ALIMCOSOFT-SMC-PVT-LTD)

---

<div align="center">

**[Documentation](https://github.com/ALIMCOSOFT-SMC-PVT-LTD/flexy-flag)** • 
**[Examples](https://github.com/ALIMCOSOFT-SMC-PVT-LTD/flexy-flag/tree/main/examples)** • 
**[Changelog](https://github.com/ALIMCOSOFT-SMC-PVT-LTD/flexy-flag/releases)**

Made with ❤️ by the Alimcosoft team

</div>
