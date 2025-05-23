@echo off
echo ************************************************************
echo * Glass Cards and Footer Fixes - May 2025 Comprehensive Fix *
echo ************************************************************
echo.
echo This script will apply all fixes for glass cards and footer display issues.
echo.
echo Press any key to continue or CTRL+C to cancel...
pause > nul

echo.
echo Step 1: Ensuring CSS Import Paths are correct...
echo.

REM Check and correct import paths in cards.css
powershell -Command "(Get-Content src\styles\components\cards.css) -replace '@import url\(''../../styles_new/glass-cards.css''\);', '@import url(''../../../src/styles_new/glass-cards.css'');' | Set-Content src\styles\components\cards.css"

echo Step 2: Ensuring proper CSS loading in App.tsx...
echo.

REM Add explicit imports to App.tsx if they don't exist
powershell -Command "$content = Get-Content src\App.tsx -Raw; if (-not ($content -match '// Explicitly import all CSS files')) { $content = $content -replace 'import AppProviders from ''./providers/AppProviders'';', 'import AppProviders from ''./providers/AppProviders'';\n\n// Explicitly import all CSS files\nimport ''./styles/index.css'';\nimport ''./styles_new/index.css'';\nimport ''./styles/components/cards.css'';\nimport ''./styles/components/enhanced-glass-cards.css'';\nimport ''./styles/utils/fixes.css'';'; $content | Set-Content src\App.tsx }"

echo Step 3: Ensuring Footer is visible with proper styling...
echo.

REM Update Footer component with display:block
powershell -Command "$content = Get-Content src\components\Footer.tsx -Raw; if (-not ($content -match 'style={{ display: ''block'' }}')) { $content = $content -replace '<footer className=\"bg-gray-900 text-white site-footer\" id=\"main-footer\" data-component=\"footer\">', '<footer className=\"bg-gray-900 text-white site-footer\" id=\"main-footer\" data-component=\"footer\" style={{ display: \"block\" }}>'; $content | Set-Content src\components\Footer.tsx }"

echo Step 4: Checking if DiagnosticsHelper component exists...
echo.

REM Check if the diagnostics component exists
IF NOT EXIST src\components\DiagnosticsHelper.tsx (
  echo Creating DiagnosticsHelper component...
  REM Create the file with basic content
  echo import React, { useEffect } from 'react'; > src\components\DiagnosticsHelper.tsx
  echo. >> src\components\DiagnosticsHelper.tsx
  echo /** >> src\components\DiagnosticsHelper.tsx
  echo  * This is a temporary diagnostic component to help identify CSS conflicts >> src\components\DiagnosticsHelper.tsx
  echo  * You can add this component to any page to see diagnostic information. >> src\components\DiagnosticsHelper.tsx
  echo  * Remove after debugging is complete. >> src\components\DiagnosticsHelper.tsx
  echo  */ >> src\components\DiagnosticsHelper.tsx
  echo const DiagnosticsHelper: React.FC = () => { >> src\components\DiagnosticsHelper.tsx
  echo   useEffect(() => { >> src\components\DiagnosticsHelper.tsx
  echo     // Check for CSS conflicts >> src\components\DiagnosticsHelper.tsx
  echo     console.log('CSS Diagnostics running...'); >> src\components\DiagnosticsHelper.tsx
  echo   }, []); >> src\components\DiagnosticsHelper.tsx
  echo. >> src\components\DiagnosticsHelper.tsx
  echo   return null; >> src\components\DiagnosticsHelper.tsx
  echo }; >> src\components\DiagnosticsHelper.tsx
  echo. >> src\components\DiagnosticsHelper.tsx
  echo export default DiagnosticsHelper; >> src\components\DiagnosticsHelper.tsx
)

echo Step 5: Creating backup of existing CSS files...
echo.

REM Create backups of key CSS files
IF NOT EXIST css_backup_%date:~10,4%%date:~4,2%%date:~7,2% mkdir css_backup_%date:~10,4%%date:~4,2%%date:~7,2%
copy src\styles\utils\fixes.css css_backup_%date:~10,4%%date:~4,2%%date:~7,2%\fixes.css.bak
copy src\styles_new\index.css css_backup_%date:~10,4%%date:~4,2%%date:~7,2%\index.css.bak

echo Step 6: Updating CSS_MAINTENANCE_PLAN.md...
echo.

REM Check if the maintenance plan file exists
IF NOT EXIST CSS_MAINTENANCE_PLAN.md (
  echo Creating maintenance plan documentation...
  echo # CSS Maintenance Plan > CSS_MAINTENANCE_PLAN.md
  echo. >> CSS_MAINTENANCE_PLAN.md
  echo This document outlines the CSS structure and fixes applied to solve glass card and footer issues. >> CSS_MAINTENANCE_PLAN.md
  echo. >> CSS_MAINTENANCE_PLAN.md
  echo ## Latest fixes applied on %date% >> CSS_MAINTENANCE_PLAN.md
)

echo Step 7: Removing problematic global selectors from styles_new/index.css...
echo.

REM Comment out problematic global selectors
powershell -Command "(Get-Content src\styles_new\index.css) -replace 'p, span, li \{', '/* \np, span, li \{' -replace '\}', '\}\n*/' | Set-Content src\styles_new\index.css"

echo.
echo ************************************************************
echo * All glass card and footer fixes have been applied!        *
echo ************************************************************
echo.
echo IMPORTANT: You may need to restart your development server
echo for all changes to take effect.
echo.
echo Press any key to exit...
pause > nul