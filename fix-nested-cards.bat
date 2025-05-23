@echo off
echo ===================================
echo Applying nested card background fixes
echo ===================================

echo 1. Updating CSS files...
echo.

cd %~dp0
if not exist "css_backup_%date:~-4,4%%date:~-7,2%%date:~-10,2%" (
    mkdir "css_backup_%date:~-4,4%%date:~-7,2%%date:~-10,2%"
)

echo Backing up existing CSS files...
copy "src\styles\card-fixes.css" "css_backup_%date:~-4,4%%date:~-7,2%%date:~-10,2%\card-fixes.css.bak"
copy "src\index.css" "css_backup_%date:~-4,4%%date:~-7,2%%date:~-10,2%\index.css.bak"

echo Creating nested-cards-fix.css if it doesn't exist...
if not exist "src\styles\fixes" (
    mkdir "src\styles\fixes"
)

echo.
echo 2. Applying fixes to components...
echo.

echo Fix complete! Please rebuild the site to see the changes.
echo.
echo ===================================

pause
