@echo off
echo ===================================================
echo      Comprehensive CSS Fix Application Script
echo ===================================================
echo This script will apply all CSS fixes to resolve styling issues.
echo.

REM Create backup timestamp
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "timestamp=%dt:~0,8%-%dt:~8,6%"
set "backup_dir=src\css-backup-%timestamp%"

echo Creating backup directory: %backup_dir%
mkdir %backup_dir%

REM Back up critical files
echo Backing up critical CSS files...
xcopy /E /I /Y src\styles %backup_dir%\styles
xcopy /E /I /Y src\styles_new %backup_dir%\styles_new
copy src\index.css %backup_dir%\index.css 2>nul
copy src\App.css %backup_dir%\App.css 2>nul
copy src\global-styles.css %backup_dir%\global-styles.css 2>nul
copy src\critical-fixes.css %backup_dir%\critical-fixes.css 2>nul
copy src\new_consolidated_styles.css %backup_dir%\new_consolidated_styles.css 2>nul

REM Ensure directories exist
echo Creating necessary directories...
mkdir src\styles 2>nul
mkdir public\styles 2>nul

REM Fix file copying
echo Copying CSS fixes to appropriate locations...
copy src\new_consolidated_styles.css src\styles\styles.css
copy src\critical-fixes.css src\styles\critical-fixes.css
copy src\styles\page-hero-fixes.css src\styles\page-hero-fixes.css 2>nul

REM Copy to public directory
echo Copying CSS fixes to public directory...
copy src\new_consolidated_styles.css public\styles\styles.css
copy src\critical-fixes.css public\styles\critical-fixes.css
copy src\styles\page-hero-fixes.css public\styles\page-hero-fixes.css 2>nul

REM Update index.html with direct references
echo Creating backup of index.html...
copy index.html %backup_dir%\index.html

REM Apply comprehensive fix to ensure critical CSS is loaded
echo Updating application files...

REM Update HTML with direct references
echo Ensuring direct CSS references in HTML...
type index.html | findstr /v "critical-fixes.css" | findstr /v "styles.css" | findstr /v "page-hero-fixes.css" > temp-index.html
powershell -Command "(Get-Content temp-index.html) -replace '(<head>[^<]*)', '$1\n    <!-- Ensure critical CSS is loaded directly -->\n    <link rel=\"stylesheet\" href=\"/styles/critical-fixes.css\">\n    <link rel=\"stylesheet\" href=\"/styles/styles.css\">\n    <link rel=\"stylesheet\" href=\"/styles/page-hero-fixes.css\">' | Set-Content index.html"
del temp-index.html

echo.
echo CSS fix application completed successfully.
echo Remember to restart your development server if running.
echo.

REM Optional: Automatically restart development server
REM npm run dev