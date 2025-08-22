# Assets Directory

## 📁 Flag SVGs

Place your 4:3 aspect ratio flag SVG files in the `flags/` directory using the following naming convention:

### File Naming Convention

- Use **lowercase** ISO 3166-1 alpha-2 country codes
- File extension: `.svg`
- Examples:
  - `us.svg` - United States
  - `gb.svg` - United Kingdom
  - `de.svg` - Germany
  - `fr.svg` - France

### SVG Requirements

#### Viewport & Dimensions

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <!-- Flag content -->
</svg>
```

- **ViewBox**: `0 0 400 300` (4:3 aspect ratio)
- **Width**: 400 units
- **Height**: 300 units

#### Optimization Guidelines

- Remove unnecessary metadata
- Use simple color values (hex codes preferred)
- Minimize path complexity where possible
- No embedded fonts or external references
- Keep file size under 10KB per flag

#### Quality Standards

- Vector-based graphics only
- Clean, geometric shapes
- Accurate color representation
- Scalable to any size
- Cross-browser compatible

### Directory Structure

```
src/assets/
├── flags/
│   ├── ad.svg  # Andorra
│   ├── ae.svg  # United Arab Emirates
│   ├── af.svg  # Afghanistan
│   ├── ag.svg  # Antigua and Barbuda
│   ├── ...
│   ├── us.svg  # United States
│   ├── uy.svg  # Uruguay
│   ├── uz.svg  # Uzbekistan
│   └── zw.svg  # Zimbabwe
└── README.md   # This file
```

### Loading Behavior

The flag loader will:

1. **First**: Try to load the SVG file from `flags/{code}.svg`
2. **Fallback**: Generate a colored placeholder with country code
3. **Cache**: Store loaded SVGs in memory for performance
4. **Error**: Throw error for invalid country codes

### Performance Considerations

- SVGs are loaded **on-demand** (not bundled by default)
- **Caching** prevents duplicate loads
- **Tree-shaking** only includes used flags in builds
- **Lazy loading** defers loading until flag is visible

### Example Usage

```typescript
import { getFlagSvg, preloadFlags } from 'flexy-flag';

// Load single flag (async)
const usSvg = await getFlagSvg('US');

// Preload common flags
await preloadFlags(['US', 'GB', 'DE', 'FR', 'JP']);

// Sync loading (uses embedded/placeholder)
const gbSvg = getFlagSvgSync('GB');
```

### Adding New Flags

1. Place SVG file in `flags/` directory
2. Use correct naming convention (lowercase ISO code)
3. Verify 4:3 aspect ratio
4. Test loading with `getFlagSvg('XX')`
5. No code changes needed - automatically available!

### Missing Flags

If a flag SVG doesn't exist:

- A colorful placeholder will be generated
- Placeholder shows the country code
- No errors thrown (graceful degradation)
- Consider contributing the missing flag!

---

## 🎨 Other Assets

Future asset types can be added here:

- `icons/` - UI icons
- `images/` - Static images
- `fonts/` - Custom fonts

Keep assets organized by type and follow consistent naming conventions.
