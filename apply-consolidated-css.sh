#!/bin/bash

echo "CSS Consolidation Script"
echo "============================================="

# Create timestamp for operations
timestamp=$(date +"%Y%m%d-%H%M")

echo "Creating backup directory: src/css-backup-$timestamp"
mkdir -p src/css-backup-$timestamp

echo "Creating subdirectories to preserve structure..."
mkdir -p src/css-backup-$timestamp/styles
mkdir -p src/css-backup-$timestamp/styles/base
mkdir -p src/css-backup-$timestamp/styles/components
mkdir -p src/css-backup-$timestamp/styles/fixes
mkdir -p src/css-backup-$timestamp/styles/layouts
mkdir -p src/css-backup-$timestamp/styles/pages
mkdir -p src/css-backup-$timestamp/styles/utils
mkdir -p src/css-backup-$timestamp/styles_new
mkdir -p src/css-backup-$timestamp/app
mkdir -p src/css-backup-$timestamp/components
mkdir -p src/css-backup-$timestamp/components/TransactionForm

echo "Backing up CSS files..."
find src -name "*.css" -exec cp --parents {} src/css-backup-$timestamp/ \;

echo "Renaming original CSS files to .bak (except styles.css)..."
find src -name "*.css" | grep -v "styles.css" | grep -v "fix-import.css" | grep -v "inline-fix.css" | grep -v "temp-tailwind-fix.css" | while read file; do
  mv "$file" "$file.bak"
done

echo "Ensuring styles directory exists..."
mkdir -p src/styles

echo "Copying consolidated CSS file..."
cp src/new_consolidated_styles.css.bak src/styles/styles.css

echo "Creating fix-import.css..."
echo "/* CSS Import Fix */" > src/styles/fix-import.css
echo "@import './styles.css';" >> src/styles/fix-import.css

echo "Creating inline-fix.css..."
echo "/* Critical inline styles */" > src/styles/inline-fix.css
echo "body, html { display: block !important; width: 100% !important; height: 100% !important; }" >> src/styles/inline-fix.css

echo "Creating public styles directory..."
mkdir -p public/styles

echo "Copying CSS files to public directory..."
cp src/styles/styles.css public/styles/
cp src/styles/fix-import.css public/styles/
cp src/styles/inline-fix.css public/styles/

echo "Creating temp-tailwind-fix.css..."
echo "@tailwind base;" > src/temp-tailwind-fix.css
echo "@tailwind components;" >> src/temp-tailwind-fix.css
echo "@tailwind utilities;" >> src/temp-tailwind-fix.css
cp src/temp-tailwind-fix.css public/styles/

echo "Updating HTML to include CSS files..."
echo "NOTE: Please manually verify your index.html includes the following links:"
echo '<link rel="stylesheet" href="/styles/temp-tailwind-fix.css">'
echo '<link rel="stylesheet" href="/styles/inline-fix.css">'
echo '<link rel="stylesheet" href="/styles/styles.css">'

echo "Updating postcss.config.cjs..."
cat > postcss.config.cjs << EOL
/** @type {import('postcss-load-config').Config} */
module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
};
EOL

echo
echo "CSS consolidation complete!"
echo
echo "Files backed up to: src/css-backup-$timestamp/"
echo "Consolidated CSS at: src/styles/styles.css"
echo
echo "Run 'npm run dev' to test your changes."
echo

# Make the script executable
chmod +x apply-consolidated-css.sh