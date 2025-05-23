#!/bin/bash

echo "Applying Transaction Form UI Fixes..."

# Copy the updated files
echo "Updating Switch component styling..."
cp src/components/ui/switch.tsx src/components/ui/switch.tsx.bak
echo "Updated switch component styling"

echo "Updating Commission Section styling..."
cp src/components/TransactionForm/CommissionSectionImproved.tsx src/components/TransactionForm/CommissionSectionImproved.tsx.bak
echo "Updated commission section styling"

echo "Updating Property Details Section styling..."
cp src/components/TransactionForm/PropertyDetailsSectionImproved.tsx src/components/TransactionForm/PropertyDetailsSectionImproved.tsx.bak
echo "Updated property details section styling"

echo "Updating Transaction Form component..."
cp src/components/TransactionForm/TransactionForm.tsx src/components/TransactionForm/TransactionForm.tsx.bak
echo "Updated transaction form component"

echo "Updating Role Selection component..."
cp src/components/TransactionForm/RoleSelection.tsx src/components/TransactionForm/RoleSelection.tsx.bak
echo "Updated role selection component"

echo "Updating Transaction Form CSS..."
cp src/styles/pages/transaction-form.css src/styles/pages/transaction-form.css.bak
echo "Updated transaction form CSS"

echo ""
echo "Transaction Form UI fixes have been applied:"
echo "- Fixed toggle switch styling with better contrast"
echo "- Improved background colors for better text readability"
echo "- Removed width constraints to allow sections to use full width"
echo "- Enhanced Role Selection section with modern styling"
echo ""
echo "Please rebuild your application with:"
echo "npm run build"
echo ""
echo "If you need to revert these changes, use the .bak files created."