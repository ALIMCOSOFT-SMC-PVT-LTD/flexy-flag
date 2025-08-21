# Contributing to Flexi-Flags

Thank you for your interest in contributing to Flexi-Flags! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Testing Guidelines](#testing-guidelines)
- [Adding New Flags](#adding-new-flags)

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Be respectful, inclusive, and constructive in all interactions.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/flexi-flags.git
   cd flexi-flags
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up Husky** (git hooks):
   ```bash
   npm run prepare
   ```

## Development Setup

### Prerequisites

- Node.js 18+
- npm 8+
- Git

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build the package
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate coverage report
- `npm run lint` - Lint code
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code with Prettier
- `npm run typecheck` - Check TypeScript types
- `npm run validate` - Run all checks (lint, format, typecheck, test)

## Coding Standards

### TypeScript

- Use TypeScript for all source code
- Provide proper type annotations
- Avoid `any` types when possible
- Use strict mode settings

### Code Style

- **Prettier** handles formatting automatically
- **ESLint** enforces code quality rules
- Use **camelCase** for variables and functions
- Use **PascalCase** for components and types
- Use **kebab-case** for file names

### Documentation

All public functions and components must have comprehensive **JSDoc** documentation:

````typescript
/**
 * Brief description of the function.
 *
 * Longer description providing context and usage information.
 *
 * @example
 * ```typescript
 * const result = myFunction('example');
 * console.log(result); // Expected output
 * ```
 *
 * @param paramName - Description of the parameter
 * @returns Description of return value
 *
 * @public
 */
export function myFunction(paramName: string): ReturnType {
  // Implementation
}
````

### File Organization

```
src/
├── components/     # React components
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
├── data/           # Static data files
└── __tests__/      # Test files (co-located with source)
```

## Commit Convention

We use **Conventional Commits** specification. Commits will be automatically validated by Husky hooks.

### Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks
- `ci:` - CI/CD changes
- `build:` - Build system changes
- `perf:` - Performance improvements

### Examples

```bash
feat: add circle shape support for flags
fix: resolve aspect ratio calculation for custom ratios
docs: update README with new API examples
test: add comprehensive tests for Flag component
```

## Pull Request Process

1. **Create a feature branch** from `main`:

   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes** following the coding standards

3. **Run validation** before committing:

   ```bash
   npm run validate
   ```

4. **Commit with conventional format**:

   ```bash
   git commit -m "feat: your descriptive commit message"
   ```

5. **Push your branch**:

   ```bash
   git push origin feat/your-feature-name
   ```

6. **Create a Pull Request** on GitHub with:
   - Clear description of changes
   - References to related issues
   - Screenshots for visual changes
   - Updated documentation if needed

### PR Requirements

- ✅ All tests pass
- ✅ Code coverage maintained
- ✅ Linting passes
- ✅ TypeScript compilation succeeds
- ✅ Documentation updated
- ✅ Conventional commits used

## Testing Guidelines

### Test Structure

- Use **Jest** for unit testing
- Use **React Testing Library** for component testing
- Co-locate tests with source files
- Use descriptive test names

### Example Test

```typescript
describe('Flag Component', () => {
  test('renders US flag with default props', () => {
    render(<Flag code="US" />);
    const flagElement = screen.getByRole('img');
    expect(flagElement).toBeInTheDocument();
    expect(flagElement).toHaveClass('flexi-flag--us');
  });

  test('applies custom size correctly', () => {
    render(<Flag code="GB" size="48px" />);
    const flagElement = screen.getByRole('img');
    expect(flagElement).toHaveStyle({ width: '48px' });
  });
});
```

### Coverage Goals

- Maintain **>90%** code coverage
- Test all public API functions
- Test edge cases and error conditions
- Test accessibility features

## Adding New Flags

### High-Quality SVG Flags

To add a new high-quality SVG flag:

1. **Add SVG to `simpleFlagSvgs`** in `src/utils/flagUtils.ts`:

   ```typescript
   const simpleFlagSvgs: Record<string, string> = {
     // ... existing flags
     newcountry: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
       <!-- SVG content -->
     </svg>`,
   };
   ```

2. **Follow SVG guidelines**:
   - Use `viewBox="0 0 300 200"` for consistency
   - Use proper aspect ratios
   - Optimize SVG code (remove unnecessary elements)
   - Use web-safe colors
   - Ensure accessibility

3. **Add tests** for the new flag:
   ```typescript
   test('renders NewCountry flag correctly', () => {
     render(<Flag code="NC" />);
     expect(screen.getByRole('img')).toBeInTheDocument();
   });
   ```

### Country Data

Country data is automatically included if the ISO code exists in `src/data/countries.ts`. Placeholder flags are generated automatically for countries without custom SVGs.

## Issue Reporting

When reporting issues:

- Use the issue templates
- Provide minimal reproduction examples
- Include environment details
- Add relevant labels

## Questions?

- **Discussions**: Use GitHub Discussions for questions
- **Issues**: Use GitHub Issues for bugs and feature requests
- **Security**: Email security@example.com for security concerns

Thank you for contributing! 🚀
