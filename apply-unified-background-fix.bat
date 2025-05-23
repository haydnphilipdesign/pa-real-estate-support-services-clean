@echo off
echo ======================================================
echo Applying Unified Background Fix
echo ======================================================
echo.
echo This script will fix background issues across the site:
echo 1. Fix z-index hierarchy for elements
echo 2. Fix section backgrounds
echo 3. Fix hero and login content overlap issues
echo.
echo Press any key to continue or Ctrl+C to cancel...
pause > nul

if not exist "src\styles\fixes\unified-background-fix.css" (
  echo Error: Missing required CSS file.
  echo Please ensure you have the required CSS files before running this script.
  exit /b 1
)

echo.
echo Applying changes...
echo.

echo 1. Creating backup of current index.css...
copy "src\index.css" "src\index.css.bak" /Y

echo 2. Ensuring the unified background fix is properly imported...
:: Check if the import already exists
findstr /C:"unified-background-fix.css" "src\index.css" > nul
if %errorlevel% neq 0 (
    :: Add the import after the first few imports
    powershell -Command "$content = Get-Content src\index.css; $inserted = $false; $newContent = @(); foreach ($line in $content) { $newContent += $line; if ($line -match '@import' -and -not $inserted) { $newContent += '@import ''./styles/fixes/unified-background-fix.css'';'; $inserted = $true; } }; $newContent | Set-Content src\index.css.temp"
    move /Y "src\index.css.temp" "src\index.css"
    echo Added import for unified-background-fix.css
) else (
    echo Import for unified-background-fix.css already exists
)

echo 3. Ensuring CSS fix is placed at the top of the import order...
powershell -Command "$content = Get-Content src\index.css; $imports = $content | Where-Object { $_ -match '@import' }; $nonImports = $content | Where-Object { $_ -notmatch '@import' }; $priorityImport = $imports | Where-Object { $_ -match 'unified-background-fix.css' }; $otherImports = $imports | Where-Object { $_ -notmatch 'unified-background-fix.css' }; $newImports = @('@import ''./styles/inline-fix.css'';', '@import ''./critical-fixes.css'';', $priorityImport) + $otherImports; $newContent = $newImports + $nonImports; $newContent | Set-Content src\index.css"

echo.
echo Changes applied successfully!
echo.
echo Please refresh your browser to see the fixed backgrounds and layout.
echo.
echo ======================================================
echo.
echo Press any key to exit...
pause > nul