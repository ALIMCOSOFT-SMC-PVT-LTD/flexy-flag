#!/bin/bash

# Script to deploy SVG flags to GitHub Pages

# Create a separate repository for flags
echo "Setting up flags repository..."

# Create flags repository structure
mkdir -p ../flexi-flags-cdn
cd ../flexi-flags-cdn

# Initialize git if not exists
if [ ! -d ".git" ]; then
    git init
    git branch -M main
fi

# Copy SVG files
cp -r ../flexi-flags/src/assets/flags ./
cp ../flexi-flags/src/assets/README.md ./

# Create index.html for GitHub Pages
cat > index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Flexi-Flag Assets CDN</title>
    <meta charset="utf-8">
</head>
<body>
    <h1>Flexi-Flag Assets CDN</h1>
    <p>This repository hosts SVG flag assets for @alimcosoft/flexi-flag</p>
    <p>Access flags via: <code>https://alimcosoft-smc-pvt-ltd.github.io/flexi-flags-cdn/flags/{code}.svg</code></p>
</body>
</html>
EOF

# Add CORS headers file for GitHub Pages
cat > _headers << 'EOF'
/flags/*
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Methods: GET
  Cache-Control: public, max-age=31536000
EOF

echo "Repository setup complete!"
echo "Next steps:"
echo "1. Push to GitHub: git add . && git commit -m 'Add flag assets' && git push"
echo "2. Enable GitHub Pages in repository settings"
echo "3. Update CDN_BASE_URL in your package"