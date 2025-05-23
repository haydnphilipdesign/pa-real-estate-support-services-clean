@echo off
echo =======================================
echo CSS Import Path Fixer
echo =======================================
echo This script will fix CSS import issues across the project
echo.

REM Check if component directory exists
if not exist "src\components" (
  echo ERROR: src\components directory not found
  exit /b 1
)

REM Create a comprehensive helper for CSS imports
echo Creating CSS import helper...
powershell -Command "if (Test-Path src\components\FixedCssImport.js) { Clear-Content src\components\FixedCssImport.js } else { New-Item -Path src\components\FixedCssImport.js -ItemType File -Force | Out-Null }"

echo /**> src\components\FixedCssImport.js
echo  * FixedCssImport.js>> src\components\FixedCssImport.js
echo  * >> src\components\FixedCssImport.js
echo  * This file centralizes CSS imports to avoid path resolution issues.>> src\components\FixedCssImport.js
echo  * Import this file instead of directly importing CSS files to ensure>> src\components\FixedCssImport.js
echo  * proper path resolution throughout the application.>> src\components\FixedCssImport.js
echo  */>> src\components\FixedCssImport.js
echo.>> src\components\FixedCssImport.js
echo // Import the main index.css (this path is relative to this file)>> src\components\FixedCssImport.js
echo import '../index.css';>> src\components\FixedCssImport.js
echo.>> src\components\FixedCssImport.js
echo // Export a dummy function to make this a valid module>> src\components\FixedCssImport.js
echo export const ensureCssImported = () => {>> src\components\FixedCssImport.js
echo   // This function doesn't need to do anything,>> src\components\FixedCssImport.js
echo   // it's just to make the import work properly>> src\components\FixedCssImport.js
echo   return true;>> src\components\FixedCssImport.js
echo };>> src\components\FixedCssImport.js
echo.>> src\components\FixedCssImport.js
echo export default ensureCssImported;>> src\components\FixedCssImport.js

echo.
echo Fixing CSS imports in components...

REM Function to fix imports in a file
powershell -Command "$fixImport = { param($file) try { $content = Get-Content $file -Raw -ErrorAction Stop; if ($content -match 'import.*[''|\"]\.\/index\.css[''|\"]\s*;') { Write-Host \"Fixing CSS import in $file\"; $content = $content -replace '(import.*)[''|\"]\.\/index\.css[''|\"]\s*;', '$1''./FixedCssImport''; ensureCssImported();'; Set-Content -Path $file -Value $content -Encoding UTF8 } } catch { Write-Host \"Error processing $file: $_\" } }"

REM Fix imports in components directory
powershell -Command "Get-ChildItem -Path 'src\components\*.tsx', 'src\components\*.jsx', 'src\components\*.js' -Recurse -ErrorAction SilentlyContinue | ForEach-Object { & $fixImport $_.FullName }"

REM Fix imports in nested components directories
powershell -Command "Get-ChildItem -Path 'src\components\*\*.tsx', 'src\components\*\*.jsx', 'src\components\*\*.js', 'src\components\TransactionForm\*.tsx' -ErrorAction SilentlyContinue | ForEach-Object { & $fixImport $_.FullName }"

REM Fix imports in pages directory (using relative path to FixedCssImport)
powershell -Command "$fixPageImport = { param($file) try { $content = Get-Content $file -Raw -ErrorAction Stop; if ($content -match 'import.*[''|\"]\.\/index\.css[''|\"]\s*;') { Write-Host \"Fixing CSS import in $file\"; $content = $content -replace '(import.*)[''|\"]\.\/index\.css[''|\"]\s*;', '$1''../components/FixedCssImport''; ensureCssImported();'; Set-Content -Path $file -Value $content -Encoding UTF8 } } catch { Write-Host \"Error processing $file: $_\" } }; Get-ChildItem -Path 'src\pages\*.tsx', 'src\pages\*.jsx', 'src\pages\*.js' -Recurse -ErrorAction SilentlyContinue | ForEach-Object { & $fixPageImport $_.FullName }"

REM Fix imports in utils directory
powershell -Command "$fixUtilsImport = { param($file) try { $content = Get-Content $file -Raw -ErrorAction Stop; if ($content -match 'import.*[''|\"]\.\/index\.css[''|\"]\s*;') { Write-Host \"Fixing CSS import in $file\"; $content = $content -replace '(import.*)[''|\"]\.\/index\.css[''|\"]\s*;', '$1''../components/FixedCssImport''; ensureCssImported();'; Set-Content -Path $file -Value $content -Encoding UTF8 } } catch { Write-Host \"Error processing $file: $_\" } }; Get-ChildItem -Path 'src\utils\*.tsx', 'src\utils\*.jsx', 'src\utils\*.js', 'src\utils\*.ts' -Recurse -ErrorAction SilentlyContinue | ForEach-Object { & $fixUtilsImport $_.FullName }"

echo.
echo Fix completed! Please rebuild the application.