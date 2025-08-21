import React from 'react';
import { render, screen } from '@testing-library/react';
import { Flag } from '../Flag';

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
  test('renders US flag with default props', () => {
    render(<Flag code='US' />);
    const flagElement = screen.getByRole('img');
    expect(flagElement).toBeInTheDocument();
    expect(flagElement).toHaveClass(
      'flexi-flag',
      'flexi-flag--rectangle',
      'flexi-flag--us'
    );
  });

  test('renders with circle shape', () => {
    render(<Flag code='GB' shape='circle' />);
    const flagElement = screen.getByRole('img');
    expect(flagElement).toHaveClass('flexi-flag--circle');
  });

  test('renders with custom size', () => {
    render(<Flag code='CA' size='48px' />);
    const flagElement = screen.getByRole('img');
    expect(flagElement).toHaveStyle({ width: '48px' });
  });

  test('renders with custom alt text', () => {
    render(<Flag code='DE' alt='German flag' />);
    const flagElement = screen.getByRole('img');
    expect(flagElement).toHaveAttribute('aria-label', 'German flag');
  });

  test('applies custom className', () => {
    render(<Flag code='FR' className='custom-class' />);
    const flagElement = screen.getByRole('img');
    expect(flagElement).toHaveClass('custom-class');
  });

  test('handles invalid country code gracefully', () => {
    render(<Flag code='INVALID' />);
    const flagElement = screen.queryByRole('img');
    expect(flagElement).not.toBeInTheDocument();
  });

  test('shows emoji fallback for invalid country code', () => {
    render(<Flag code='INVALID' fallback='emoji' />);
    const flagElement = screen.queryByRole('img');
    expect(flagElement).not.toBeInTheDocument();
  });

  test('handles different shapes', () => {
    const shapes = [
      'rectangle',
      'square',
      'circle',
      'rounded',
      'pill',
    ] as const;

    shapes.forEach(shape => {
      const { unmount } = render(<Flag code='US' shape={shape} />);
      const flagElement = screen.getByRole('img');
      expect(flagElement).toHaveClass(`flexi-flag--${shape}`);
      unmount();
    });
  });

  test('handles different aspect ratios', () => {
    const ratios = ['1:1', '3:2', '4:3'] as const;

    ratios.forEach(ratio => {
      const { unmount } = render(<Flag code='US' ratio={ratio} />);
      const flagElement = screen.getByRole('img');
      // Check that the element has the aspect ratio in its style attribute
      expect(flagElement.style.aspectRatio).toBe(ratio);
      unmount();
    });
  });

  test('applies string styles correctly', () => {
    render(<Flag code='JP' style='border: 1px solid red; margin: 10px;' />);
    const flagElement = screen.getByRole('img');
    expect(flagElement).toHaveStyle({
      border: '1px solid red',
      margin: '10px',
    });
  });

  test('applies object styles correctly', () => {
    const customStyle = {
      border: '2px solid blue',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    };
    render(<Flag code='IN' style={customStyle} />);
    const flagElement = screen.getByRole('img');
    expect(flagElement).toHaveStyle(customStyle);
  });
});
