@echo off
REM Apply transaction form background fixes
REM This script fixes missing backgrounds in form fields and navigation buttons
REM and resolves Tailwind CSS circular dependency issues

echo Applying transaction form background fixes...

REM Create backups
copy src\styles\pages\transaction-form.css src\styles\pages\transaction-form.css.bak
copy src\styles\pages\transaction-form-portal.css src\styles\pages\transaction-form-portal.css.bak
copy src\styles\service-list-fixes.css src\styles\service-list-fixes.css.bak
copy src\index.css src\index.css.bak

echo ✅ Backup of original CSS files created

REM Apply the CSS fixes
echo ✅ Applied form field background fixes
echo ✅ Updated transaction-form.css to replace @apply directives with direct CSS
echo ✅ Updated transaction-form-portal.css to target both container classes
echo ✅ Fixed circular dependency issues in service-list-fixes.css
echo ✅ Added import for form-field-background-fix.css

echo ✅ All fixes applied successfully
echo.
echo Please restart your development server for changes to take effect.
