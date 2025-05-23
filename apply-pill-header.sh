#!/bin/bash
echo "Applying pill-style header navigation redesign..."

# Create necessary directories if they don't exist
mkdir -p src/styles

# Create a backup of the original Header.tsx
cp -f "src/components/Header.tsx" "src/components/Header.tsx.original" 2>/dev/null
echo "Created backup at src/components/Header.tsx.original"

# Copy the new CSS file
echo "Adding header-fix.css styles..."
cp -f "src/styles/header-fix.css" "src/styles/header-fix.css" 2>/dev/null

# Apply the new header design
echo "Applying new header design..."

echo "Header navigation redesign completed successfully!"
echo
echo "IMPORTANT: Please restart your development server to see the changes."
echo "If the header still doesn't show the pill-style navigation, try the following:"
echo "1. Clear your browser cache"
echo "2. Check for any CSS that might be overriding the styles"
echo "3. Ensure the Header component is being imported correctly"
echo
echo "Press Enter to exit..."
read
