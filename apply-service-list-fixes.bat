@echo off
echo =======================================
echo Service List and Hero Badge Alignment Fix
echo =======================================
echo This script will fix the hero badge and service list alignment issues
echo.

REM Check if styles directory exists
if not exist "src\styles" (
  echo Creating styles directory...
  mkdir "src\styles"
)

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
echo }>> src\styles\service-list-fixes.css
echo.>> src\styles\service-list-fixes.css
echo /* Fix bullet alignment */>> src\styles\service-list-fixes.css
echo .glass-card li,>> src\styles\service-list-fixes.css
echo .glass-card-navy li,>> src\styles\service-list-fixes.css
echo .glass-card-blue li,>> src\styles\service-list-fixes.css
echo .glass-card-dark li,>> src\styles\service-list-fixes.css
echo .glass-card-on-white li,>> src\styles\service-list-fixes.css
echo .glass-card-base li,>> src\styles\service-list-fixes.css
echo .card li,>> src\styles\service-list-fixes.css
echo [class*="content-card"] li {>> src\styles\service-list-fixes.css
echo   @apply flex items-start;>> src\styles\service-list-fixes.css
echo   line-height: 1.4;>> src\styles\service-list-fixes.css
echo   margin-bottom: 0.5rem;>> src\styles\service-list-fixes.css
echo }>> src\styles\service-list-fixes.css
echo.>> src\styles\service-list-fixes.css
echo /* Bullet styling */>> src\styles\service-list-fixes.css
echo .glass-card li ^> div:first-child,>> src\styles\service-list-fixes.css
echo .glass-card-navy li ^> div:first-child,>> src\styles\service-list-fixes.css
echo .glass-card-blue li ^> div:first-child,>> src\styles\service-list-fixes.css
echo .glass-card-dark li ^> div:first-child,>> src\styles\service-list-fixes.css
echo .glass-card-on-white li ^> div:first-child,>> src\styles\service-list-fixes.css
echo .glass-card-base li ^> div:first-child,>> src\styles\service-list-fixes.css
echo .card li ^> div:first-child,>> src\styles\service-list-fixes.css
echo [class*="content-card"] li ^> div:first-child {>> src\styles\service-list-fixes.css
echo   @apply rounded-full flex-shrink-0;>> src\styles\service-list-fixes.css
echo   width: 6px;>> src\styles\service-list-fixes.css
echo   height: 6px;>> src\styles\service-list-fixes.css
echo   margin-top: 0.55rem;>> src\styles\service-list-fixes.css
echo   margin-right: 0.75rem;>> src\styles\service-list-fixes.css
echo }>> src\styles\service-list-fixes.css
echo.>> src\styles\service-list-fixes.css
echo /* Text alignment in list items */>> src\styles\service-list-fixes.css
echo .glass-card li ^> span,>> src\styles\service-list-fixes.css
echo .glass-card-navy li ^> span,>> src\styles\service-list-fixes.css
echo .glass-card-blue li ^> span,>> src\styles\service-list-fixes.css
echo .glass-card-dark li ^> span,>> src\styles\service-list-fixes.css
echo .glass-card-on-white li ^> span,>> src\styles\service-list-fixes.css
echo .glass-card-base li ^> span,>> src\styles\service-list-fixes.css
echo .card li ^> span,>> src\styles\service-list-fixes.css
echo [class*="content-card"] li ^> span {>> src\styles\service-list-fixes.css
echo   @apply flex-1;>> src\styles\service-list-fixes.css
echo }>> src\styles\service-list-fixes.css
echo.>> src\styles\service-list-fixes.css
echo /* Card height consistency */>> src\styles\service-list-fixes.css
echo [class*="content-card"] {>> src\styles\service-list-fixes.css
echo   @apply flex flex-col;>> src\styles\service-list-fixes.css
echo   height: 100%%;>> src\styles\service-list-fixes.css
echo }>> src\styles\service-list-fixes.css
echo.>> src\styles\service-list-fixes.css
echo [class*="content-card"] ^> div {>> src\styles\service-list-fixes.css
echo   @apply flex-1;>> src\styles\service-list-fixes.css
echo   display: flex;>> src\styles\service-list-fixes.css
echo   flex-direction: column;>> src\styles\service-list-fixes.css
echo }>> src\styles\service-list-fixes.css
echo.>> src\styles\service-list-fixes.css
echo /* Ensure ul is at the bottom of the card */>> src\styles\service-list-fixes.css
echo [class*="content-card"] ul {>> src\styles\service-list-fixes.css
echo   margin-top: auto;>> src\styles\service-list-fixes.css
echo   padding-top: 1rem;>> src\styles\service-list-fixes.css
echo }>> src\styles\service-list-fixes.css

REM Update the index.css file to import the service list fixes
echo Updating index.css with service list fixes import...

powershell -Command "$content = Get-Content src\index.css -Raw; if (-not ($content -match '@import ''./styles/service-list-fixes.css'';')) { $content = $content -replace '@import ''./styles/hero-vertical-centering.css'';([^\n]*)', '@import ''./styles/hero-vertical-centering.css'';$1\n@import ''./styles/service-list-fixes.css''; /* Fix for hero badge and service list alignment */'; Set-Content src\index.css -Value $content }"

echo.
echo =======================================
echo Service List and Hero Badge Alignment Fix Complete!
echo =======================================
echo The service list and hero badge alignment styles have been added to the project.
echo All list bullets and hero badges should now be correctly aligned.
echo.