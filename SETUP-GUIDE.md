# SVG Flags Setup Guide

## 📥 **Where to Place Your SVG Files**

Place all your 4:3 aspect ratio SVG flag files in:

```
src/assets/flags/
├── ad.svg    # Andorra
├── ae.svg    # United Arab Emirates
├── af.svg    # Afghanistan
├── us.svg    # United States
├── gb.svg    # United Kingdom
└── ...       # All your country SVGs
```

## 📋 **File Requirements**

### Naming Convention

- **Lowercase** ISO 3166-1 alpha-2 country codes
- Example: `us.svg`, `gb.svg`, `de.svg`

### SVG Format

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <!-- Your flag content here -->
</svg>
```

**Important:**

- ViewBox: `0 0 400 300` (4:3 aspect ratio)
- Width: 400 units, Height: 300 units
- Keep files under 10KB each

## 🚀 **Usage Examples**

### Basic Usage (Sync - Current)

```tsx
import { Flag } from 'flexy-flag';

// Works immediately with embedded flags + placeholders
<Flag code="US" size="48px" />
<Flag code="GB" shape="circle" size="32px" />
```

### Advanced Usage (Async - With Real SVGs)

```tsx
import { getFlagSvg, preloadFlags } from 'flexy-flag';

// Load individual flag
const usSvg = await getFlagSvg('US');

// Preload common flags for better performance
await preloadFlags(['US', 'GB', 'DE', 'FR', 'JP']);

// Use in component
function AsyncFlag({ code }) {
  const [svg, setSvg] = useState('');

  useEffect(() => {
    getFlagSvg(code).then(setSvg);
  }, [code]);

  return <div dangerouslySetInnerHTML={{ __html: svg }} />;
}
```

## 🔄 **Loading Behavior**

1. **Real SVG exists** → Loads from `assets/flags/xx.svg`
2. **No SVG file** → Generates colorful placeholder with country code
3. **Invalid country** → Throws error
4. **Caching** → SVGs cached in memory after first load

## ⚡ **Performance Features**

- **Tree-shaking**: Only used flags included in build
- **Lazy loading**: Flags load when visible (if `lazy={true}`)
- **Caching**: No duplicate loads
- **On-demand**: SVGs loaded as needed, not bundled

## 🛠 **Migration Path**

### Current (Works Now)

```tsx
// Uses embedded SVGs + placeholders
<Flag code='US' size='48px' />
```

### With Your SVGs (After placing files)

```tsx
// Same API, but loads real SVGs automatically!
<Flag code='US' size='48px' />
```

### Advanced (Async API)

```tsx
// For fine-grained control
const svg = await getFlagSvg('US');
```

## 📝 **Checklist**

- [ ] Place SVG files in `src/assets/flags/`
- [ ] Use lowercase ISO codes (e.g., `us.svg`)
- [ ] Ensure 4:3 aspect ratio (`viewBox="0 0 400 300"`)
- [ ] Test with: `getFlagSvg('US')`
- [ ] Files automatically work with existing Flag component
- [ ] No code changes needed!

## 🎯 **Ready to Go!**

Your project structure is already set up. Simply:

1. **Copy your SVG files** to `src/assets/flags/`
2. **Rename them** to lowercase ISO codes (e.g., `us.svg`)
3. **Use the Flag component** as normal - it will automatically use your SVGs!

```tsx
// This will now use your real SVG files!
<Flag code='FR' shape='rounded' size='64px' />
```

The system gracefully handles missing files with colorful placeholders, so you can add flags incrementally.
