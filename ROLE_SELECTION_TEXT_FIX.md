# Role Selection Text Color Fix

## Issue Summary

There was an issue with the transaction form's role selection component where text in the feature lists was being forced to white color, making it unreadable against the light-colored background of the role cards. This was happening because global styles were overriding the inline styles defined in the RoleSelection component.

## Solution Implemented

We implemented a comprehensive fix that addresses the issue at multiple levels:

1. **Component-Level Fix**: Updated the `RoleSelection.tsx` component to use `!important` for text color styles to prevent them from being overridden.

2. **Dedicated CSS File**: Created a new CSS file `role-selection-text-fix.css` that specifically targets elements in the role selection component using attribute selectors to ensure proper text color.

3. **Global CSS Overrides**: Added specific rules to the existing CSS files to ensure list items in the transaction form have the correct text color.

4. **CSS Import**: Updated the `FixedCssImport.js` file to include the new CSS file.

## Files Modified

- `src/components/TransactionForm/RoleSelection.tsx`
- `src/styles/role-selection-text-fix.css` (new file)
- `src/styles/pages/transaction-form.css`
- `src/styles/form-field-background-fix.css`
- `src/components/FixedCssImport.js`

## How to Apply the Fix

You can apply this fix by running the provided batch script:

```
apply-role-selection-text-fix.bat
```

This script will:
1. Create the new CSS file with all necessary rules
2. Update the `FixedCssImport.js` file to import the new CSS
3. Modify the `RoleSelection.tsx` component to use `!important` for text color

## Technical Details

### CSS Selectors Used

The fix uses attribute selectors to target inline styles, which allows us to override styles without modifying the component structure:

```css
.transaction-form-container [style*="featureItem"] {
  color: #1e3a8a !important;
}
```

This selector targets any element within `.transaction-form-container` that has a style attribute containing the string "featureItem", and forces its text color to be dark blue.

### Specificity Approach

We used multiple approaches to ensure our styles have sufficient specificity to override any conflicting styles:

1. Using `!important` declarations
2. Using highly specific selectors
3. Targeting inline styles via attribute selectors
4. Adding multiple layers of style rules

## Testing

After applying this fix, verify that:

1. Text in the role selection cards is clearly visible against the light background
2. Feature list items display in dark blue text
3. Role titles and descriptions have proper contrast
4. Selected role details section has proper text colors

## Future Considerations

For long-term maintenance, consider:

1. Moving away from inline styles in the `RoleSelection` component
2. Implementing a more consistent styling approach using CSS modules or styled components
3. Conducting a comprehensive review of global styles to identify and resolve other potential conflicts