#!/usr/bin/env node

/**
 * Script to create a separate flags package containing only SVG assets.
 */

const fs = require('fs');
const path = require('path');

const flagsPackageDir = 'flexy-flag-assets';
const sourceDir = 'src/assets/flags';

// Create package directory
if (!fs.existsSync(flagsPackageDir)) {
  fs.mkdirSync(flagsPackageDir, { recursive: true });
}

// Copy all SVG files
const flagsDir = path.join(flagsPackageDir, 'flags');
if (!fs.existsSync(flagsDir)) {
  fs.mkdirSync(flagsDir, { recursive: true });
}

// Copy SVG files
const svgFiles = fs.readdirSync(sourceDir);
svgFiles.forEach(file => {
  if (file.endsWith('.svg')) {
    fs.copyFileSync(path.join(sourceDir, file), path.join(flagsDir, file));
  }
});

// Create package.json for flags package
const flagsPackageJson = {
  name: 'flexy-flag-assets',
  version: '1.0.0',
  description: 'SVG flag assets for flexy-flag library',
  main: 'index.js',
  files: ['flags/*.svg'],
  license: 'MIT',
  keywords: ['flags', 'svg', 'countries', 'assets'],
};

fs.writeFileSync(
  path.join(flagsPackageDir, 'package.json'),
  JSON.stringify(flagsPackageJson, null, 2)
);

console.log(`Created ${flagsPackageDir} with ${svgFiles.length} SVG files`);
console.log('You can now publish this as a separate package');
