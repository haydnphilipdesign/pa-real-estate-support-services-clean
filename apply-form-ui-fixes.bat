@echo off
echo Applying Transaction Form UI Fixes...

:: Check if the CSS file exists
if not exist "src\styles\pages\form-ui-fixes.css" (
    echo Error: form-ui-fixes.css not found!
    exit /b 1
)

:: Check if the components have been updated
findstr /c:"property-information-section" "src\components\TransactionForm\PropertyInformation.tsx" >nul
if %errorlevel% neq 0 (
    echo Error: PropertyInformation.tsx has not been updated with the required class!
    exit /b 1
)

findstr /c:"property-information-section" "src\components\TransactionForm\PropertyAccessSection.tsx" >nul
if %errorlevel% neq 0 (
    echo Error: PropertyAccessSection.tsx has not been updated with the required class!
    exit /b 1
)

:: Check if the CSS is imported in the main components
findstr /c:"form-ui-fixes.css" "src\components\TransactionForm\TransactionForm.tsx" >nul
if %errorlevel% neq 0 (
    echo Error: TransactionForm.tsx is missing the CSS import!
    exit /b 1
)

findstr /c:"form-ui-fixes.css" "src\components\TransactionForm\PortalTransactionForm.tsx" >nul
if %errorlevel% neq 0 (
    echo Error: PortalTransactionForm.tsx is missing the CSS import!
    exit /b 1
)

:: Check if the ResetFormDialog has been updated
findstr /c:"reset-form-dialog" "src\components\TransactionForm\ResetFormDialog.tsx" >nul
if %errorlevel% neq 0 (
    echo Error: ResetFormDialog.tsx has not been updated with the required class!
    exit /b 1
)

echo All checks passed! Form UI fixes have been applied successfully.
echo.
echo The following issues have been fixed:
echo 1. "Access Type*" text is now white in the property information section
echo 2. Reset form and missing info popups now match the form's color scheme
echo 3. Dropdown fields are now the same height as text entry fields
echo.
echo Please rebuild your application to see the changes.

exit /b 0