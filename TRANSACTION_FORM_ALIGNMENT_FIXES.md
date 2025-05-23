# Transaction Form Alignment Fixes

## Issue Description

The transaction form had several alignment issues in responsive layouts:

1. The title "Submit A New File" and the subheading below it were not properly centered when the layout shifted to vertical on smaller screens.
2. The step dots were redundant since the form already has a step wizard at the top.
3. The capitalization in "Submit A New File" needed to be corrected to "Submit a New File".
4. A horizontal line was appearing across the screen near the step wizard numbers.

## Changes Applied

### CSS Fixes

1. **Title and Subtitle Alignment**
   - Ensured proper text alignment in all viewport sizes
   - Fixed text centering on mobile and tablet views
   - Maintained left alignment on desktop views

2. **Removed Redundant Step Dots**
   - Removed the step dots completely since they were redundant with the step wizard
   - Simplified the UI by removing unnecessary elements

3. **Capitalization Fix**
   - Changed "Submit A New File" to "Submit a New File"

4. **Responsive Layout Improvements**
   - Improved container spacing and padding in different viewport sizes
   - Fixed overflow issues in the title and subtitle
   - Ensured proper word wrapping and text display

5. **Removed Horizontal Line**
   - Removed the border and gradient line that was appearing across the screen
   - Eliminated visual separation that was interfering with the step wizard

## Files Modified

1. `src/styles/pages/additional-form-fixes.css` - Updated CSS for proper alignment and removed horizontal line
2. `src/components/TransactionForm/PortalTransactionForm.tsx` - Fixed title capitalization

## How to Apply

### Windows
```
.\apply-transaction-form-fixes.bat
```

### Mac/Linux
```
./apply-transaction-form-fixes.sh
```

## Testing

After applying the changes, test the transaction form on various screen sizes to ensure:

1. The title and subtitle are properly centered on mobile/tablet views
2. The title and subtitle are left-aligned on desktop views
3. The step dots no longer appear
4. The title correctly displays "Submit a New File"
5. The form layout adapts properly to different screen sizes
6. No horizontal line appears across the screen near the step wizard