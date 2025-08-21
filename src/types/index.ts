import React from 'react';

/**
 * Available flag shape types for rendering flags in different visual formats.
 *
 * @public
 */
export type FlagShape = 'rectangle' | 'square' | 'circle' | 'rounded' | 'pill';

/**
 * Standard and custom aspect ratios for flag dimensions.
 * Can be standard ratios like '3:2' or custom ratios like '5:3'.
 *
 * @public
 */
export type AspectRatio = '1:1' | '3:2' | '4:3' | string;

/**
 * Fallback options when flag SVG is not available.
 *
 * @public
 */
export type FlagFallback = 'emoji' | 'none';

/**
 * Represents a country with ISO code, name, and optional emoji.
 *
 * @public
 */
export interface Country {
  /** ISO 3166-1 alpha-2 country code (e.g., 'US', 'GB'). */
  iso: string;
  /** Full country name in English. */
  name: string;
  /** Unicode flag emoji if available. */
  emoji?: string;
}

/**
 * Configuration options for the Flag component.
 * Extends standard HTML div attributes for additional flexibility.
 *
 * @public
 */
export interface FlagProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  /** ISO alpha-2 country code (e.g., 'US', 'GB'). Case-insensitive. */
  code: string;
  /** Shape of the flag container. Defaults to 'rectangle'. */
  shape?: FlagShape;
  /** Aspect ratio of the flag. Defaults to '3:2'. */
  ratio?: AspectRatio;
  /** Size of the flag. For rectangles, this sets width. For circles/squares, this sets both dimensions. */
  size?: string;
  /** Explicit width in CSS units. Overrides size if provided. */
  width?: string;
  /** Explicit height in CSS units. Usually not needed when aspect ratio is set. */
  height?: string;
  /** Alt text for screen readers. Defaults to country name if not provided. */
  alt?: string;
  /** Custom styles as CSS object or string. */
  style?: React.CSSProperties | string;
  /** Additional CSS class names. */
  className?: string;
  /** Enable lazy loading using IntersectionObserver. Defaults to false. */
  lazy?: boolean;
  /** Fallback behavior when SVG is not available. Defaults to 'none'. */
  fallback?: FlagFallback;
  /** Tooltip title text. */
  title?: string;
}

/**
 * Internal flag data structure containing SVG and metadata.
 *
 * @internal
 */
export interface FlagData {
  /** Country ISO code. */
  code: string;
  /** Country name. */
  name: string;
  /** SVG markup string. */
  svg: string;
  /** Optional emoji character. */
  emoji?: string;
}

/**
 * Options for searching countries.
 *
 * @public
 */
export interface SearchOptions {
  /** Maximum number of results to return. */
  limit?: number;
  /** Whether to include partial matches. */
  includePartial?: boolean;
  /** Whether search should be case sensitive. */
  caseSensitive?: boolean;
}

/**
 * Result of a country search operation.
 *
 * @public
 */
export interface SearchResult {
  /** Matching countries. */
  countries: Country[];
  /** Total number of matches found. */
  total: number;
  /** Search query that was used. */
  query: string;
}
