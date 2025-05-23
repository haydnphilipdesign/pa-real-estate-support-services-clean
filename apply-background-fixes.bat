@echo off
echo ===================================
echo Applying comprehensive background fixes
echo ===================================

cd %~dp0
if not exist "css_backup_%date:~-4,4%%date:~-7,2%%date:~-10,2%" (
    mkdir "css_backup_%date:~-4,4%%date:~-7,2%%date:~-10,2%"
)

echo Backing up existing CSS files...
copy "src\index.css" "css_backup_%date:~-4,4%%date:~-7,2%%date:~-10,2%\index.css.bak"
copy "src\styles\card-fixes.css" "css_backup_%date:~-4,4%%date:~-7,2%%date:~-10,2%\card-fixes.css.bak"
copy "src\styles\styles.css" "css_backup_%date:~-4,4%%date:~-7,2%%date:~-10,2%\styles.css.bak"

echo Creating styles directories if they don't exist...
if not exist "src\styles\fixes" (
    mkdir "src\styles\fixes"
)

echo.
echo Running npm build to apply the CSS changes...
npm run build

echo.
echo Fix complete! Restart the site to see the changes.
echo.
echo ===================================

pause
