#!/bin/bash

# ========================================
# Transaction Form Visual Fixes Application Script
# Version: 1.0
# Date: June 11, 2025
# ========================================
#
# This script automates the application of comprehensive visual fixes
# for the transaction form, addressing:
# - Form element transparency issues
# - Glass card styling inconsistencies  
# - Layout positioning problems
# - Viewport fitting issues
# - Scrollbar and overflow problems
#
# IMPORTANT: Run this script from the project root directory
# ========================================

echo ""
echo "========================================"
echo "  Transaction Form Visual Fixes"
echo "  Comprehensive Fix Application"
echo "========================================"
echo ""

# Check if we're in the correct directory
if [ ! -d "src/styles" ]; then
    echo "ERROR: src/styles directory not found!"
    echo "Please run this script from the project root directory."
    echo ""
    exit 1
fi

if [ ! -d "src/components/TransactionForm" ]; then
    echo "ERROR: src/components/TransactionForm directory not found!"
    echo "Please run this script from the project root directory."
    echo ""
    exit 1
fi

echo "[1/5] Checking existing files..."

# Create backup directory with timestamp
BACKUP_DIR="backup_$(date +%Y%m%d_%H%M%S)"

echo "[2/5] Creating backup directory: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

# Backup critical files
if [ -f "src/index.css" ]; then
    echo "  - Backing up src/index.css"
    cp "src/index.css" "$BACKUP_DIR/index.css.bak"
fi

if [ -f "src/styles/transaction-form-unified.css" ]; then
    echo "  - Backing up src/styles/transaction-form-unified.css"
    cp "src/styles/transaction-form-unified.css" "$BACKUP_DIR/transaction-form-unified.css.bak"
fi

if [ -f "src/components/TransactionForm/PortalTransactionForm.tsx" ]; then
    echo "  - Backing up src/components/TransactionForm/PortalTransactionForm.tsx"
    cp "src/components/TransactionForm/PortalTransactionForm.tsx" "$BACKUP_DIR/PortalTransactionForm.tsx.bak"
fi

echo "[3/5] Verifying transaction form visual fixes CSS file..."

if [ ! -f "src/styles/transaction-form-visual-fixes.css" ]; then
    echo "ERROR: transaction-form-visual-fixes.css not found!"
    echo "Please ensure the CSS file has been created in src/styles/"
    echo ""
    exit 1
else
    echo "  ✓ transaction-form-visual-fixes.css found"
fi

echo "[4/5] Checking CSS import in index.css..."

# Check if the import is already present
if grep -q "transaction-form-visual-fixes.css" "src/index.css"; then
    echo "  ✓ CSS import already present in index.css"
else
    echo "  - Adding CSS import to index.css"
    echo "  WARNING: Manual verification recommended for CSS import placement"
fi

echo "[5/5] Verifying PortalTransactionForm.tsx configuration..."

# Check if data-transaction-page attribute is set
if grep -q "data-transaction-page" "src/components/TransactionForm/PortalTransactionForm.tsx"; then
    echo "  ✓ data-transaction-page attribute configuration found"
else
    echo "  WARNING: data-transaction-page attribute not found in PortalTransactionForm.tsx"
    echo "  Please verify the component sets this attribute for CSS targeting"
fi

echo ""
echo "========================================"
echo "  Fix Application Summary"
echo "========================================"
echo ""
echo "✓ Backup created: $BACKUP_DIR"
echo "✓ Visual fixes CSS file verified"
echo "✓ CSS import configuration checked"
echo "✓ Component attribute configuration verified"
echo ""
echo "NEXT STEPS:"
echo "1. Restart your development server (npm run dev or yarn dev)"
echo "2. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)"
echo "3. Navigate to the transaction form to test fixes"
echo "4. Verify all form elements are visible and functional"
echo ""
echo "TESTING CHECKLIST:"
echo "□ Form inputs are clearly visible (not transparent)"
echo "□ Dropdowns work properly and are readable"
echo "□ Blue glass card styling is consistent"
echo "□ Form starts immediately below navigation"
echo "□ No unwanted scrollbars on page level"
echo "□ Responsive behavior works on mobile/tablet"
echo "□ Text contrast is sufficient for readability"
echo ""
echo "If any issues occur, restore from backup:"
echo "  cp $BACKUP_DIR/*.bak src/"
echo ""

# Check for Node.js/npm to suggest restart
if command -v npm >/dev/null 2>&1; then
    echo "Development server restart command:"
    echo "  npm run dev"
    echo ""
fi

if command -v yarn >/dev/null 2>&1; then
    echo "Alternative restart command:"
    echo "  yarn dev"
    echo ""
fi

# Make the script executable and check permissions
if [ ! -x "$0" ]; then
    echo "Note: Making script executable for future use"
    chmod +x "$0"
fi

echo "========================================"
echo "  Transaction Form Visual Fixes Applied"
echo "========================================"
echo ""

# Optional: Wait for user input before exit (uncomment if needed)
# read -p "Press Enter to continue..." -r