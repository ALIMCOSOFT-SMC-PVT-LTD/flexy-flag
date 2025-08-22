#!/bin/bash

# Script to set up Vercel CDN for flag SVGs

echo "🚀 Setting up Vercel CDN for flexy-flag..."

# Create separate directory for Vercel deployment
mkdir -p ../flexy-flag-vercel-cdn
cd ../flexy-flag-vercel-cdn

# Initialize if not exists
if [ ! -d ".git" ]; then
    git init
    git branch -M main
fi

# Create public directory for Vercel
mkdir -p public/flags

# Copy SVG files to public directory
echo "📁 Copying SVG flags..."
cp -r ../flexi-flags/src/assets/flags/* ./public/flags/

# Create vercel.json for configuration
cat > vercel.json << 'EOF'
{
  "version": 2,
  "public": true,
  "functions": {},
  "routes": [
    {
      "src": "/flags/(.*)",
      "headers": {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Cache-Control": "public, max-age=31536000, immutable"
      },
      "dest": "/flags/$1"
    }
  ]
}
EOF

# Create package.json for Vercel
cat > package.json << 'EOF'
{
  "name": "flexy-flag-vercel-cdn",
  "version": "1.0.0",
  "description": "Vercel CDN for @alimcosoft/flexy-flag SVG assets",
  "scripts": {
    "build": "echo 'Static assets ready'",
    "dev": "vercel dev"
  },
  "keywords": ["flags", "svg", "cdn", "vercel"],
  "author": "ALIMCOSOFT",
  "license": "MIT"
}
EOF

# Create index.html for the root
cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Flexi-Flag Assets CDN</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body { font-family: system-ui, sans-serif; max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
        code { background: #f5f5f5; padding: 0.2rem 0.4rem; border-radius: 3px; }
        .flag-demo { display: inline-block; width: 32px; height: 24px; margin: 0.2rem; border: 1px solid #ddd; }
    </style>
</head>
<body>
    <h1>🏁 Flexy-Flag Assets CDN</h1>
    <p>High-performance CDN for <strong>@alimcosoft/flexy-flag</strong> SVG assets, powered by Vercel.</p>
    
    <h2>📋 Usage</h2>
    <p>Access flags via: <code>https://your-domain.vercel.app/flags/{code}.svg</code></p>
    
    <h3>Examples:</h3>
    <ul>
        <li><code>https://your-domain.vercel.app/flags/us.svg</code> - United States</li>
        <li><code>https://your-domain.vercel.app/flags/gb.svg</code> - United Kingdom</li>
        <li><code>https://your-domain.vercel.app/flags/de.svg</code> - Germany</li>
    </ul>

    <h3>🎯 Sample Flags:</h3>
    <div>
        <img src="/flags/us.svg" class="flag-demo" alt="US" title="United States">
        <img src="/flags/gb.svg" class="flag-demo" alt="GB" title="United Kingdom">  
        <img src="/flags/de.svg" class="flag-demo" alt="DE" title="Germany">
        <img src="/flags/fr.svg" class="flag-demo" alt="FR" title="France">
        <img src="/flags/jp.svg" class="flag-demo" alt="JP" title="Japan">
        <img src="/flags/ca.svg" class="flag-demo" alt="CA" title="Canada">
    </div>

    <h2>⚡ Features</h2>
    <ul>
        <li>Global CDN with edge caching</li>
        <li>CORS enabled for cross-origin requests</li>
        <li>Immutable caching for optimal performance</li>
        <li>270+ high-quality SVG flags</li>
    </ul>

    <p><small>Powered by <a href="https://vercel.com">Vercel</a> • Built for <a href="https://npmjs.com/package/@alimcosoft/flexi-flag">@alimcosoft/flexi-flag</a></small></p>
</body>
</html>
EOF

# Create README for the CDN project
cat > README.md << 'EOF'
# Flexy-Flag Vercel CDN

High-performance CDN for [@alimcosoft/flexy-flag](https://npmjs.com/package/@alimcosoft/flexy-flag) SVG assets.

## 🚀 Deployment

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial CDN setup"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import this GitHub repository
   - Deploy automatically

## 📋 Usage

Access flags via: `https://your-domain.vercel.app/flags/{code}.svg`

## 🎯 Examples

- US Flag: `https://your-domain.vercel.app/flags/us.svg`
- UK Flag: `https://your-domain.vercel.app/flags/gb.svg`
- Germany Flag: `https://your-domain.vercel.app/flags/de.svg`

## ⚡ Features

- Global CDN with edge caching
- CORS enabled for cross-origin requests  
- Immutable caching (1 year)
- 270+ high-quality SVG flags
EOF

echo "✅ Vercel CDN setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. cd ../flexy-flag-vercel-cdn"
echo "2. git add . && git commit -m 'Add flag assets for Vercel CDN'"
echo "3. Create GitHub repository: flexy-flag-vercel-cdn"
echo "4. git remote add origin https://github.com/ALIMCOSOFT-SMC-PVT-LTD/flexy-flag-vercel-cdn.git"
echo "5. git push -u origin main"
echo "6. Go to vercel.com and import the repository"
echo "7. Update CDN_BASE_URL in your main package"
echo ""
echo "🎉 Your CDN will be available at: https://flexy-flag-vercel-cdn.vercel.app/flags/"