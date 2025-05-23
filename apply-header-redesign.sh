#!/bin/bash
echo "Applying header navigation redesign..."

# Create a backup of the original Header.tsx
cp -f "src/components/Header.tsx" "src/components/Header.tsx.original"
echo "Created backup at src/components/Header.tsx.original"

# Apply the new header design
cp -f "src/components/Header.tsx.updated" "src/components/Header.tsx"
echo "Applied new header design"

echo "Header navigation redesign completed successfully!"
echo "Please restart your development server to see the changes."
