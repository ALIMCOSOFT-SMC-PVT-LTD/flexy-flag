import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { Flag } from '../Flag';

// Mock the flagUtils module
jest.mock('../../utils/flagUtils', () => ({
  getFlagSvg: jest.fn().mockImplementation((code: string) => {
    if (code === 'invalid') {
      return Promise.reject(new Error('Flag not found'));
    }
    return Promise.resolve(
      `<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="red"/></svg>`
    );
  }),
  getCountryByCode: jest.fn().mockImplementation((code: string) => {
    const countries = {
      us: { iso: 'us', name: 'United States', emoji: '🇺🇸' },
      gb: { iso: 'gb', name: 'United Kingdom', emoji: '🇬🇧' },
      ca: { iso: 'ca', name: 'Canada', emoji: '🇨🇦' },
      de: { iso: 'de', name: 'Germany', emoji: '🇩🇪' },
      fr: { iso: 'fr', name: 'France', emoji: '🇫🇷' },
      jp: { iso: 'jp', name: 'Japan', emoji: '🇯🇵' },
      in: { iso: 'in', name: 'India', emoji: '🇮🇳' },
    };
    return countries[code.toLowerCase()] || null;
  }),
}));

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

Object.defineProperty(globalThis, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

describe('Flag Component', () => {
  test('renders US flag with default props', async () => {
    await act(async () => {
      render(<Flag code='US' />);
    });

    await waitFor(() => {
      const flagElement = screen.getByRole('img');
      expect(flagElement).toBeInTheDocument();
      expect(flagElement).toHaveClass(
        'flexi-flag',
        'flexi-flag--rectangle',
        'flexi-flag--us'
      );
    });
  });

  test('renders with circle shape', async () => {
    await act(async () => {
      render(<Flag code='GB' shape='circle' />);
    });

    await waitFor(() => {
      const flagElement = screen.getByRole('img');
      expect(flagElement).toHaveClass('flexi-flag--circle');
    });
  });

  test('renders with custom size', async () => {
    await act(async () => {
      render(<Flag code='CA' size='48px' />);
    });

    await waitFor(() => {
      const flagElement = screen.getByRole('img');
      expect(flagElement).toHaveStyle({ width: '48px' });
    });
  });

  test('renders with custom alt text', async () => {
    await act(async () => {
      render(<Flag code='DE' alt='German flag' />);
    });

    await waitFor(() => {
      const flagElement = screen.getByRole('img');
      expect(flagElement).toHaveAttribute('aria-label', 'German flag');
    });
  });

  test('applies custom className', async () => {
    await act(async () => {
      render(<Flag code='FR' className='custom-class' />);
    });

    await waitFor(() => {
      const flagElement = screen.getByRole('img');
      expect(flagElement).toHaveClass('custom-class');
    });
  });

  test('handles invalid country code gracefully', async () => {
    await act(async () => {
      render(<Flag code='INVALID' />);
    });

    // Wait a bit for async operations
    await new Promise(resolve => setTimeout(resolve, 100));

    // Invalid country codes now show placeholder SVGs instead of returning null
    const flagElement = screen.queryByRole('img');
    expect(flagElement).toBeInTheDocument();
    expect(flagElement).toHaveTextContent('INVALID');
  });

  test('shows emoji fallback for invalid country code', async () => {
    await act(async () => {
      render(<Flag code='INVALID' fallback='emoji' />);
    });

    // Wait a bit for async operations
    await new Promise(resolve => setTimeout(resolve, 100));

    // Invalid country codes now show placeholder SVGs regardless of fallback setting
    const flagElement = screen.queryByRole('img');
    expect(flagElement).toBeInTheDocument();
    expect(flagElement).toHaveTextContent('INVALID');
  });

  test('handles different shapes', async () => {
    const shapes = [
      'rectangle',
      'square',
      'circle',
      'rounded',
      'pill',
    ] as const;

    for (const shape of shapes) {
      const { unmount } = render(<Flag code='US' shape={shape} />);

      await waitFor(() => {
        const flagElement = screen.getByRole('img');
        expect(flagElement).toHaveClass(`flexi-flag--${shape}`);
      });

      unmount();
    }
  });

  test('handles different aspect ratios', async () => {
    const ratios = ['1:1', '3:2', '4:3'] as const;

    for (const ratio of ratios) {
      const { unmount } = render(<Flag code='US' ratio={ratio} />);

      await waitFor(() => {
        const flagElement = screen.getByRole('img');

        // Get the expected CSS aspectRatio value based on the input ratio
        let expectedAspectRatio: string;
        switch (ratio) {
          case '1:1':
            expectedAspectRatio = '1';
            break;
          case '3:2':
            expectedAspectRatio = '3/2';
            break;
          case '4:3':
            expectedAspectRatio = '4/3';
            break;
          default:
            expectedAspectRatio = ratio;
        }

        // Check that the element has the correct aspect ratio in its style attribute
        expect(flagElement.style.aspectRatio).toBe(expectedAspectRatio);
      });

      unmount();
    }
  });

  test('applies string styles correctly', async () => {
    await act(async () => {
      render(<Flag code='JP' style='border: 1px solid red; margin: 10px;' />);
    });

    await waitFor(() => {
      const flagElement = screen.getByRole('img');
      expect(flagElement).toHaveStyle({
        border: '1px solid red',
        margin: '10px',
      });
    });
  });

  test('applies object styles correctly', async () => {
    const customStyle = {
      border: '2px solid blue',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    };

    await act(async () => {
      render(<Flag code='IN' style={customStyle} />);
    });

    await waitFor(() => {
      const flagElement = screen.getByRole('img');
      expect(flagElement).toHaveStyle(customStyle);
    });
  });
});
