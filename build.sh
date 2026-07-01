#!/bin/bash
set -euo pipefail
# Build script for Linux/macOS - creates dist/ folder and copies mod files

echo "🏗️  Creating dist folder..."
rm -rf dist
mkdir -p dist

echo "📋 Copying mod files..."
cp content.xml dist/
cp preview.jpg dist/
cp -r aiscripts dist/

echo "✅ Build complete! Mod files copied to dist/"
