/**
 * TypeScript declarations for SVG file imports.
 *
 * This allows importing SVG files as modules in TypeScript.
 */

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.svg?raw' {
  const content: string;
  export default content;
}

declare module '*.svg?url' {
  const content: string;
  export default content;
}
