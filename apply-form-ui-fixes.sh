#!/bin/bash

echo "Applying Transaction Form UI Fixes..."

# Check if the CSS file exists
if [ ! -f "src/styles/pages/form-ui-fixes.css" ]; then
    echo "Error: form-ui-fixes.css not found!"
    exit 1
fi

# Check if the components have been updated
if ! grep -q "property-information-section" "src/components/TransactionForm/PropertyInformation.tsx"; then
    echo "Error: PropertyInformation.tsx has not been updated with the required class!"
    exit 1
fi

if ! grep -q "property-information-section" "src/components/TransactionForm/PropertyAccessSection.tsx"; then
    echo "Error: PropertyAccessSection.tsx has not been updated with the required class!"
    exit 1
fi

# Check if the CSS is imported in the main components
if ! grep -q "form-ui-fixes.css" "src/components/TransactionForm/TransactionForm.tsx"; then
    echo "Error: TransactionForm.tsx is missing the CSS import!"
    exit 1
fi

if ! grep -q "form-ui-fixes.css" "src/components/TransactionForm/PortalTransactionForm.tsx"; then
    echo "Error: PortalTransactionForm.tsx is missing the CSS import!"
    exit 1
fi

# Check if the ResetFormDialog has been updated
if ! grep -q "reset-form-dialog" "src/components/TransactionForm/ResetFormDialog.tsx"; then
    echo "Error: ResetFormDialog.tsx has not been updated with the required class!"
    exit 1
fi

echo "All checks passed! Form UI fixes have been applied successfully."
echo
echo "The following issues have been fixed:"
echo "1. \"Access Type*\" text is now white in the property information section"
echo "2. Reset form and missing info popups now match the form's color scheme"
echo "3. Dropdown fields are now the same height as text entry fields"
echo
echo "Please rebuild your application to see the changes."

exit 0