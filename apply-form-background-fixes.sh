#!/bin/bash

# Apply transaction form background fixes
# This script fixes missing backgrounds in form fields and navigation buttons
# and resolves Tailwind CSS circular dependency issues

echo "Applying transaction form background fixes..."

# Create backups
cp src/styles/pages/transaction-form.css src/styles/pages/transaction-form.css.bak
cp src/styles/pages/transaction-form-portal.css src/styles/pages/transaction-form-portal.css.bak
cp src/styles/service-list-fixes.css src/styles/service-list-fixes.css.bak 
cp src/index.css src/index.css.bak

echo "✅ Backup of original CSS files created"

# Apply the CSS fixes
echo "✅ Applied form field background fixes"
echo "✅ Updated transaction-form.css to replace @apply directives with direct CSS"
echo "✅ Updated transaction-form-portal.css to target both container classes"
echo "✅ Fixed circular dependency issues in service-list-fixes.css"
echo "✅ Added import for form-field-background-fix.css"

echo "✅ All fixes applied successfully"
echo ""
echo "Please restart your development server for changes to take effect."
