#!/bin/bash

echo "************************************************************"
echo "* Glass Cards and Footer Fixes - May 2025 Comprehensive Fix *"
echo "************************************************************"
echo ""
echo "This script will apply all fixes for glass cards and footer display issues."
echo ""
echo "Press Enter to continue or Ctrl+C to cancel..."
read

echo ""
echo "Step 1: Ensuring CSS Import Paths are correct..."
echo ""

# Check and correct import paths in cards.css
sed -i "s#@import url('../../styles_new/glass-cards.css');#@import url('../../../src/styles_new/glass-cards.css');#g" src/styles/components/cards.css

echo "Step 2: Ensuring proper CSS loading in App.tsx..."
echo ""

# Add explicit imports to App.tsx if they don't exist
if ! grep -q "// Explicitly import all CSS files" src/App.tsx; then
  sed -i "s/import AppProviders from '.\/providers\/AppProviders';/import AppProviders from '.\/providers\/AppProviders';\n\n\/\/ Explicitly import all CSS files\nimport '.\/styles\/index.css';\nimport '.\/styles_new\/index.css';\nimport '.\/styles\/components\/cards.css';\nimport '.\/styles\/components\/enhanced-glass-cards.css';\nimport '.\/styles\/utils\/fixes.css';/g" src/App.tsx
fi

echo "Step 3: Ensuring Footer is visible with proper styling..."
echo ""

# Update Footer component with display:block
if ! grep -q "style={{ display: 'block' }}" src/components/Footer.tsx; then
  sed -i "s/<footer className=\"bg-gray-900 text-white site-footer\" id=\"main-footer\" data-component=\"footer\">/<footer className=\"bg-gray-900 text-white site-footer\" id=\"main-footer\" data-component=\"footer\" style={{ display: \"block\" }}>/g" src/components/Footer.tsx
fi

echo "Step 4: Checking if DiagnosticsHelper component exists..."
echo ""

# Check if the diagnostics component exists
if [ ! -f src/components/DiagnosticsHelper.tsx ]; then
  echo "Creating DiagnosticsHelper component..."
  # Create the file with basic content
  cat > src/components/DiagnosticsHelper.tsx << EOL
import React, { useEffect } from 'react';

/**
 * This is a temporary diagnostic component to help identify CSS conflicts
 * You can add this component to any page to see diagnostic information.
 * Remove after debugging is complete.
 */
const DiagnosticsHelper: React.FC = () => {
  useEffect(() => {
    // Check for CSS conflicts
    console.log('CSS Diagnostics running...');
  }, []);

  return null;
};

export default DiagnosticsHelper;
EOL
fi

echo "Step 5: Creating backup of existing CSS files..."
echo ""

# Create backups of key CSS files
BACKUP_DIR="css_backup_$(date +%Y%m%d)"
mkdir -p "$BACKUP_DIR"
cp src/styles/utils/fixes.css "$BACKUP_DIR/fixes.css.bak"
cp src/styles_new/index.css "$BACKUP_DIR/index.css.bak"

echo "Step 6: Updating CSS_MAINTENANCE_PLAN.md..."
echo ""

# Check if the maintenance plan file exists
if [ ! -f CSS_MAINTENANCE_PLAN.md ]; then
  echo "Creating maintenance plan documentation..."
  cat > CSS_MAINTENANCE_PLAN.md << EOL
# CSS Maintenance Plan

This document outlines the CSS structure and fixes applied to solve glass card and footer issues.

## Latest fixes applied on $(date)
EOL
fi

echo "Step 7: Removing problematic global selectors from styles_new/index.css..."
echo ""

# Comment out problematic global selectors
sed -i "s/p, span, li {/\/* \np, span, li {/g" src/styles_new/index.css
sed -i "s/}/}\n*\//g" src/styles_new/index.css

echo ""
echo "************************************************************"
echo "* All glass card and footer fixes have been applied!        *"
echo "************************************************************"
echo ""
echo "IMPORTANT: You may need to restart your development server"
echo "for all changes to take effect."
echo ""
echo "Press Enter to exit..."
read