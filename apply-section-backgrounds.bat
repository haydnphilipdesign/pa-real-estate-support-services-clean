@echo off
echo ======================================================
echo Applying Section Background Colors Fix
echo ======================================================
echo.
echo This script will apply background colors to regular sections
echo while preserving specialized sections like heroes, login,
echo and transaction forms.
echo.
echo Press any key to continue or Ctrl+C to cancel...
pause > nul

if not exist "src\styles\fixes\regular-section-backgrounds.css" (
  echo Error: Missing required CSS file.
  echo Please ensure you have the required CSS files before running this script.
  exit /b 1
)

echo.
echo Applying changes...
echo.

echo 1. Ensuring CSS files are properly imported...

:: Create a backup of the current index.css
copy "src\index.css" "src\index.css.bak" /Y

:: Check if the import already exists
findstr /C:"regular-section-backgrounds.css" "src\index.css" > nul
if %errorlevel% neq 0 (
    :: Insert the import statement after the last @import in index.css
    powershell -Command "(Get-Content src\index.css) -replace '@import (.+);', '@import $1; @import ''./styles/fixes/regular-section-backgrounds.css'';' | Set-Content src\index.css.temp"
    move /Y "src\index.css.temp" "src\index.css"
    echo Added import for regular-section-backgrounds.css
) else (
    echo Import for regular-section-backgrounds.css already exists
)

echo.
echo Changes applied successfully!
echo.
echo Please refresh your browser to see the updated section backgrounds.
echo.
echo ======================================================
echo.
echo Press any key to exit...
pause > nul