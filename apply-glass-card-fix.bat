@echo off
echo =======================================
echo Glass Card and Slideshow Fix
echo =======================================
echo This script will fix missing glass card styles, slideshow issues, and service list alignment
echo.

REM Check if styles directory exists
if not exist "src\styles" (
  echo Creating styles directory...
  mkdir "src\styles"
)

REM Create the glass-cards.css file
echo Creating glass-cards.css file...
type nul > src\styles\glass-cards.css

echo /**>> src\styles\glass-cards.css
echo  * Enhanced Glass Card System - 2025 Refresh>> src\styles\glass-cards.css
echo  *>> src\styles\glass-cards.css
echo  * This file implements an elegant, modern glass card system with multiple variants>> src\styles\glass-cards.css
echo  * for use throughout the PA Real Estate Support Services website.>> src\styles\glass-cards.css
echo  *>> src\styles\glass-cards.css
echo  * Improvements:>> src\styles\glass-cards.css
echo  * - Enhanced visual aesthetics with refined blur effects>> src\styles\glass-cards.css
echo  * - Improved text contrast for better readability>> src\styles\glass-cards.css
echo  * - Consistent styling across all variants>> src\styles\glass-cards.css
echo  * - Optimized hover effects>> src\styles\glass-cards.css
echo  * - Better border treatments>> src\styles\glass-cards.css
echo  * - Reduced CSS conflicts>> src\styles\glass-cards.css
echo  */>> src\styles\glass-cards.css
echo.>> src\styles\glass-cards.css
echo.>> src\styles\glass-cards.css
echo /* Base Glass Card - Foundation for all glass card variants */>> src\styles\glass-cards.css
echo.>> src\styles\glass-cards.css
echo .glass-card-base {>> src\styles\glass-cards.css
echo     @apply relative rounded-xl p-6 shadow-lg overflow-hidden transition-all duration-300 ease-in-out;>> src\styles\glass-cards.css
echo     transform: translateZ(0);>> src\styles\glass-cards.css
echo     backdrop-filter: blur(12px) !important;>> src\styles\glass-cards.css
echo     -webkit-backdrop-filter: blur(12px) !important;>> src\styles\glass-cards.css
echo }>> src\styles\glass-cards.css
echo.>> src\styles\glass-cards.css
echo.>> src\styles\glass-cards.css
echo /* ========== Standard Glass Card Variants ========== */>> src\styles\glass-cards.css
echo.>> src\styles\glass-cards.css
echo.>> src\styles\glass-cards.css
echo /* Standard White Glass Card - Default */>> src\styles\glass-cards.css
echo.>> src\styles\glass-cards.css
echo .glass-card {>> src\styles\glass-cards.css
echo     @apply glass-card-base bg-white/75 border border-white/40 text-gray-800;>> src\styles\glass-cards.css
echo     box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.03), 0 0 0 1px rgba(255, 255, 255, 0.5) inset;>> src\styles\glass-cards.css
echo }>> src\styles\glass-cards.css
echo.>> src\styles\glass-cards.css
echo .glass-card:hover {>> src\styles\glass-cards.css
echo     @apply transform -translate-y-1;>> src\styles\glass-cards.css
echo     box-shadow: 0 20px 35px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.6) inset;>> src\styles\glass-cards.css
echo }>> src\styles\glass-cards.css
echo.>> src\styles\glass-cards.css
echo.>> src\styles\glass-cards.css
echo /* Navy Blue Glass Card - Elegant dark blue */>> src\styles\glass-cards.css
echo.>> src\styles\glass-cards.css
echo .glass-card-navy {>> src\styles\glass-cards.css
echo     @apply glass-card-base bg-blue-900/85 border border-blue-700/50 text-white;>> src\styles\glass-cards.css
echo     box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.15) inset;>> src\styles\glass-cards.css
echo }>> src\styles\glass-cards.css
echo.>> src\styles\glass-cards.css
echo .glass-card-navy:hover {>> src\styles\glass-cards.css
echo     @apply transform -translate-y-1;>> src\styles\glass-cards.css
echo     box-shadow: 0 20px 35px -5px rgba(0, 0, 0, 0.2), 0 10px 15px -3px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.25) inset;>> src\styles\glass-cards.css
echo }>> src\styles\glass-cards.css
echo.>> src\styles\glass-cards.css

REM Continue with the rest of the glass card styles...
echo.>> src\styles\glass-cards.css
echo /* Blue Glass Card - Lighter blue for visual variety */>> src\styles\glass-cards.css
echo.>> src\styles\glass-cards.css
echo .glass-card-blue {>> src\styles\glass-cards.css
echo     @apply glass-card-base bg-blue-600/85 border border-blue-400/50 text-white;>> src\styles\glass-cards.css
echo     box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(59, 130, 246, 0.3) inset;>> src\styles\glass-cards.css
echo }>> src\styles\glass-cards.css
echo.>> src\styles\glass-cards.css
echo .glass-card-blue:hover {>> src\styles\glass-cards.css
echo     @apply transform -translate-y-1;>> src\styles\glass-cards.css
echo     box-shadow: 0 20px 35px -5px rgba(0, 0, 0, 0.15), 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(59, 130, 246, 0.4) inset;>> src\styles\glass-cards.css
echo }>> src\styles\glass-cards.css
echo.>> src\styles\glass-cards.css

echo /* Dark Glass Card - Sophisticated dark appearance */>> src\styles\glass-cards.css
echo.>> src\styles\glass-cards.css
echo .glass-card-dark {>> src\styles\glass-cards.css
echo     @apply glass-card-base bg-gray-900/85 border border-gray-700/50 text-white;>> src\styles\glass-cards.css
echo     box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1) inset;>> src\styles\glass-cards.css
echo }>> src\styles\glass-cards.css
echo.>> src\styles\glass-cards.css
echo .glass-card-dark:hover {>> src\styles\glass-cards.css
echo     @apply transform -translate-y-1;>> src\styles\glass-cards.css
echo     box-shadow: 0 20px 35px -5px rgba(0, 0, 0, 0.25), 0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.15) inset;>> src\styles\glass-cards.css
echo }>> src\styles\glass-cards.css
echo.>> src\styles\glass-cards.css

echo /* Glass Card For White Backgrounds */>> src\styles\glass-cards.css
echo.>> src\styles\glass-cards.css
echo .glass-card-on-white {>> src\styles\glass-cards.css
echo     @apply glass-card-base bg-white/80 border border-gray-200/50 text-gray-800;>> src\styles\glass-cards.css
echo     box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.04), 0 8px 10px -6px rgba(0, 0, 0, 0.01), 0 0 0 1px rgba(225, 225, 225, 0.7) inset;>> src\styles\glass-cards.css
echo }>> src\styles\glass-cards.css
echo.>> src\styles\glass-cards.css
echo .glass-card-on-white:hover {>> src\styles\glass-cards.css
echo     @apply transform -translate-y-1;>> src\styles\glass-cards.css
echo     box-shadow: 0 20px 35px -5px rgba(0, 0, 0, 0.06), 0 10px 15px -3px rgba(0, 0, 0, 0.02), 0 0 0 1px rgba(225, 225, 225, 0.8) inset;>> src\styles\glass-cards.css
echo }>> src\styles\glass-cards.css
echo.>> src\styles\glass-cards.css

REM Create service-list-fixes.css file
echo Creating service-list-fixes.css file...
type nul > src\styles\service-list-fixes.css

echo /* >> src\styles\service-list-fixes.css
echo  * Service List and Hero Badge Alignment Fixes>> src\styles\service-list-fixes.css
echo  * >> src\styles\service-list-fixes.css
echo  * This CSS file provides fixes for:>> src\styles\service-list-fixes.css
echo  * 1. Hero badge alignment and styling>> src\styles\service-list-fixes.css
echo  * 2. Service list bullet alignment and spacing>> src\styles\service-list-fixes.css
echo  * 3. Consistent card heights and text alignment>> src\styles\service-list-fixes.css
echo  */>> src\styles\service-list-fixes.css
echo.>> src\styles\service-list-fixes.css
echo /* Hero Badge Fixes */>> src\styles\service-list-fixes.css
echo .hero-badge {>> src\styles\service-list-fixes.css
echo   @apply inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800;>> src\styles\service-list-fixes.css
echo   letter-spacing: 0.05em;>> src\styles\service-list-fixes.css
echo   text-transform: uppercase;>> src\styles\service-list-fixes.css
echo }>> src\styles\service-list-fixes.css
echo.>> src\styles\service-list-fixes.css
echo /* Service List Alignment Fixes */>> src\styles\service-list-fixes.css
echo .glass-card ul,>> src\styles\service-list-fixes.css
echo .glass-card-navy ul,>> src\styles\service-list-fixes.css
echo .glass-card-blue ul,>> src\styles\service-list-fixes.css
echo .glass-card-dark ul,>> src\styles\service-list-fixes.css
echo .glass-card-on-white ul,>> src\styles\service-list-fixes.css
echo .glass-card-base ul,>> src\styles\service-list-fixes.css
echo .card ul,>> src\styles\service-list-fixes.css
echo [class*="content-card"] ul {>> src\styles\service-list-fixes.css
echo   @apply space-y-3 w-full;>> src\styles\service-list-fixes.css
echo   margin-top: 1rem;>> src\styles\service-list-fixes.css
echo   padding-left: 0 !important;>> src\styles\service-list-fixes.css
echo }>> src\styles\service-list-fixes.css
echo.>> src\styles\service-list-fixes.css
echo /* Force consistent alignment for all list items */>> src\styles\service-list-fixes.css
echo .glass-card li,>> src\styles\service-list-fixes.css
echo .glass-card-navy li,>> src\styles\service-list-fixes.css
echo .glass-card-blue li,>> src\styles\service-list-fixes.css
echo .glass-card-dark li,>> src\styles\service-list-fixes.css
echo .glass-card-on-white li,>> src\styles\service-list-fixes.css
echo .glass-card-base li,>> src\styles\service-list-fixes.css
echo .card li,>> src\styles\service-list-fixes.css
echo [class*="content-card"] li,>> src\styles\service-list-fixes.css
echo /* Target service list items specifically */>> src\styles\service-list-fixes.css
echo .grid li.flex.items-start.text-gray-700,>> src\styles\service-list-fixes.css
echo .grid li.flex.items-start {>> src\styles\service-list-fixes.css
echo   display: flex !important;>> src\styles\service-list-fixes.css
echo   align-items: flex-start !important;>> src\styles\service-list-fixes.css
echo   line-height: 1.4;>> src\styles\service-list-fixes.css
echo   margin-bottom: 0.5rem;>> src\styles\service-list-fixes.css
echo   padding-left: 0 !important;>> src\styles\service-list-fixes.css
echo }>> src\styles\service-list-fixes.css
echo.>> src\styles\service-list-fixes.css
echo /* Force consistent bullet appearance and spacing */>> src\styles\service-list-fixes.css
echo .glass-card li > div:first-child,>> src\styles\service-list-fixes.css
echo .glass-card-navy li > div:first-child,>> src\styles\service-list-fixes.css
echo .glass-card-blue li > div:first-child,>> src\styles\service-list-fixes.css
echo .glass-card-dark li > div:first-child,>> src\styles\service-list-fixes.css
echo .glass-card-on-white li > div:first-child,>> src\styles\service-list-fixes.css
echo .glass-card-base li > div:first-child,>> src\styles\service-list-fixes.css
echo .card li > div:first-child,>> src\styles\service-list-fixes.css
echo [class*="content-card"] li > div:first-child,>> src\styles\service-list-fixes.css
echo /* Target exact bullet structure */>> src\styles\service-list-fixes.css
echo .grid li.flex.items-start > div:first-child,>> src\styles\service-list-fixes.css
echo .grid li.flex.items-start.text-gray-700 > div:first-child {>> src\styles\service-list-fixes.css
echo   @apply rounded-full flex-shrink-0;>> src\styles\service-list-fixes.css
echo   width: 6px !important;>> src\styles\service-list-fixes.css
echo   height: 6px !important;>> src\styles\service-list-fixes.css
echo   margin-top: 0.55rem !important;>> src\styles\service-list-fixes.css
echo   margin-right: 0.75rem !important;>> src\styles\service-list-fixes.css
echo   flex-shrink: 0 !important;>> src\styles\service-list-fixes.css
echo }>> src\styles\service-list-fixes.css
echo.>> src\styles\service-list-fixes.css
echo /* Force proper text alignment */>> src\styles\service-list-fixes.css
echo .glass-card li > span,>> src\styles\service-list-fixes.css
echo .glass-card-navy li > span,>> src\styles\service-list-fixes.css
echo .glass-card-blue li > span,>> src\styles\service-list-fixes.css
echo .glass-card-dark li > span,>> src\styles\service-list-fixes.css
echo .glass-card-on-white li > span,>> src\styles\service-list-fixes.css
echo .glass-card-base li > span,>> src\styles\service-list-fixes.css
echo .card li > span,>> src\styles\service-list-fixes.css
echo [class*="content-card"] li > span,>> src\styles\service-list-fixes.css
echo /* Target exact text structure */>> src\styles\service-list-fixes.css
echo .grid li.flex.items-start > span,>> src\styles\service-list-fixes.css
echo .grid li.flex.items-start.text-gray-700 > span {>> src\styles\service-list-fixes.css
echo   @apply flex-1;>> src\styles\service-list-fixes.css
echo   display: block !important;>> src\styles\service-list-fixes.css
echo   padding-left: 0 !important;>> src\styles\service-list-fixes.css
echo   text-indent: 0 !important;>> src\styles\service-list-fixes.css
echo }>> src\styles\service-list-fixes.css
echo.>> src\styles\service-list-fixes.css
echo /* Card height consistency */>> src\styles\service-list-fixes.css
echo [class*="content-card"] {>> src\styles\service-list-fixes.css
echo   @apply flex flex-col;>> src\styles\service-list-fixes.css
echo   height: 100%;>> src\styles\service-list-fixes.css
echo }>> src\styles\service-list-fixes.css
echo.>> src\styles\service-list-fixes.css
echo [class*="content-card"] > div {>> src\styles\service-list-fixes.css
echo   @apply flex-1;>> src\styles\service-list-fixes.css
echo   display: flex;>> src\styles\service-list-fixes.css
echo   flex-direction: column;>> src\styles\service-list-fixes.css
echo }>> src\styles\service-list-fixes.css
echo.>> src\styles\service-list-fixes.css
echo /* Reset all potentially harmful spacing */>> src\styles\service-list-fixes.css
echo .grid li.flex.items-start::before,>> src\styles\service-list-fixes.css
echo .grid li.flex.items-start.text-gray-700::before,>> src\styles\service-list-fixes.css
echo .grid li.flex.items-start > span::before,>> src\styles\service-list-fixes.css
echo .grid li.flex.items-start.text-gray-700 > span::before {>> src\styles\service-list-fixes.css
echo   content: none !important;>> src\styles\service-list-fixes.css
echo   display: none !important;>> src\styles\service-list-fixes.css
echo }>> src\styles\service-list-fixes.css

REM Update the index.css file to import the glass card styles and service list fixes
echo Updating index.css with glass card and service list fixes imports...

REM Create a temporary file for the glass cards import
echo /* Import glass cards styles */ > glass-cards-import.tmp
echo @import './styles/glass-cards.css'; >> glass-cards-import.tmp

REM Check if the import already exists, if not append it after @tailwind utilities;
powershell -Command "$content = Get-Content src\index.css -Raw; if (-not ($content -match '@import ''./styles/glass-cards.css''')) { $content = $content -replace '@tailwind utilities;', '@tailwind utilities;`r`n`r`n' + (Get-Content -Path 'glass-cards-import.tmp' -Raw); Set-Content src\index.css -Value $content }"

REM Create a temporary file for the service list fixes import
echo /* Import service list fixes */ > service-list-import.tmp
echo @import './styles/service-list-fixes.css'; >> service-list-import.tmp

REM Check if the service list import already exists, if not append it after glass cards import
powershell -Command "$content = Get-Content src\index.css -Raw; if (-not ($content -match '@import ''./styles/service-list-fixes.css''')) { $content = $content -replace '/* Import glass cards styles */', '/* Import glass cards and service list fixes */'; $content = $content -replace '@import ''./styles/glass-cards.css'';', '@import ''./styles/glass-cards.css'';`r`n@import ''./styles/service-list-fixes.css'';'; Set-Content src\index.css -Value $content }"

REM Add slideshow and glass card visibility fixes using direct appends instead of string literals
echo Adding slideshow and glass card visibility fixes to index.css...

REM Create temporary slideshow fix file
echo /* 4) Slideshow and persistent background fixes */ > slideshow-fix.tmp
echo [data-persistent-background="true"] { >> slideshow-fix.tmp
echo   visibility: visible !important; >> slideshow-fix.tmp
echo   opacity: 1 !important; >> slideshow-fix.tmp
echo   z-index: -1 !important; >> slideshow-fix.tmp
echo   display: block !important; >> slideshow-fix.tmp
echo } >> slideshow-fix.tmp
echo. >> slideshow-fix.tmp
echo .persistent-background img { >> slideshow-fix.tmp
echo   display: block !important; >> slideshow-fix.tmp
echo   opacity: 1 !important; >> slideshow-fix.tmp
echo   visibility: visible !important; >> slideshow-fix.tmp
echo } >> slideshow-fix.tmp
echo. >> slideshow-fix.tmp
echo /* 5) Glass Card visibility fixes */ >> slideshow-fix.tmp
echo .glass-card, >> slideshow-fix.tmp
echo .glass-card-navy, >> slideshow-fix.tmp
echo .glass-card-blue, >> slideshow-fix.tmp
echo .glass-card-dark, >> slideshow-fix.tmp
echo .glass-card-on-white { >> slideshow-fix.tmp
echo   visibility: visible !important; >> slideshow-fix.tmp
echo   opacity: 1 !important; >> slideshow-fix.tmp
echo   display: block !important; >> slideshow-fix.tmp
echo } >> slideshow-fix.tmp
echo. >> slideshow-fix.tmp
echo /* Ensure content appears above the background */ >> slideshow-fix.tmp
echo .app-root, main, header, footer { >> slideshow-fix.tmp
echo   position: relative; >> slideshow-fix.tmp
echo   z-index: 1; >> slideshow-fix.tmp
echo } >> slideshow-fix.tmp

REM Check if the slideshow fixes are already in the file
powershell -Command "$content = Get-Content src\index.css -Raw; if (-not ($content -match 'Slideshow and persistent background fixes')) { Add-Content -Path 'src\index.css' -Value (Get-Content -Path 'slideshow-fix.tmp' -Raw) }"

REM Delete the temporary files
del slideshow-fix.tmp
del glass-cards-import.tmp
del service-list-import.tmp

echo.
echo =======================================
echo Glass Card, Slideshow, and Service List Fixes Complete!
echo =======================================
echo The glass card styles, slideshow fixes, and service list alignment fixes have been added to the project.
echo All glass card components, slideshow, and service lists should now render correctly.
echo.