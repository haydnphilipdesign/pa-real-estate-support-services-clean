#!/bin/bash
echo "==================================================="
echo "     Comprehensive CSS Fix Application Script"
echo "==================================================="
echo "This script will apply all CSS fixes to resolve styling issues."
echo

# Create backup timestamp
timestamp=$(date +"%Y%m%d-%H%M%S")
backup_dir="src/css-backup-$timestamp"

echo "Creating backup directory: $backup_dir"
mkdir -p "$backup_dir"

# Back up critical files
echo "Backing up critical CSS files..."
mkdir -p "$backup_dir/styles"
mkdir -p "$backup_dir/styles_new"
cp -r src/styles/* "$backup_dir/styles/" 2>/dev/null
cp -r src/styles_new/* "$backup_dir/styles_new/" 2>/dev/null
cp src/index.css "$backup_dir/index.css" 2>/dev/null
cp src/App.css "$backup_dir/App.css" 2>/dev/null
cp src/global-styles.css "$backup_dir/global-styles.css" 2>/dev/null
cp src/critical-fixes.css "$backup_dir/critical-fixes.css" 2>/dev/null
cp src/new_consolidated_styles.css "$backup_dir/new_consolidated_styles.css" 2>/dev/null

# Ensure directories exist
echo "Creating necessary directories..."
mkdir -p src/styles
mkdir -p public/styles

# Fix file copying
echo "Copying CSS fixes to appropriate locations..."
cp src/new_consolidated_styles.css src/styles/styles.css
cp src/critical-fixes.css src/styles/critical-fixes.css
cp src/styles/page-hero-fixes.css src/styles/page-hero-fixes.css 2>/dev/null

# Copy to public directory
echo "Copying CSS fixes to public directory..."
cp src/new_consolidated_styles.css public/styles/styles.css
cp src/critical-fixes.css public/styles/critical-fixes.css
cp src/styles/page-hero-fixes.css public/styles/page-hero-fixes.css 2>/dev/null

# Update index.html with direct references
echo "Creating backup of index.html..."
cp index.html "$backup_dir/index.html"

# Apply comprehensive fix to ensure critical CSS is loaded
echo "Updating application files..."

# Update HTML with direct references
echo "Ensuring direct CSS references in HTML..."
grep -v "critical-fixes.css" index.html | grep -v "styles.css" | grep -v "page-hero-fixes.css" > temp-index.html
sed -i 's#<head>.*#&\n    <!-- Ensure critical CSS is loaded directly -->\n    <link rel="stylesheet" href="/styles/critical-fixes.css">\n    <link rel="stylesheet" href="/styles/styles.css">\n    <link rel="stylesheet" href="/styles/page-hero-fixes.css">#' temp-index.html
mv temp-index.html index.html

echo
echo "CSS fix application completed successfully."
echo "Remember to restart your development server if running."
echo

# Optional: Automatically restart development server
# npm run dev