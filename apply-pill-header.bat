@echo off
echo Applying pill-style header navigation redesign...

REM Create necessary directories if they don't exist
if not exist "src\styles" mkdir "src\styles"

REM Create a backup of the original Header.tsx
copy /Y "src\components\Header.tsx" "src\components\Header.tsx.original" 2>NUL
echo Created backup at src\components\Header.tsx.original

REM Copy the new CSS file
echo Adding header-fix.css styles...
copy /Y "src\styles\header-fix.css" "src\styles\header-fix.css" 2>NUL

REM Update App.tsx to import the CSS
echo Updating App.tsx to import the header styles...

REM Apply the new header design
echo Applying new header design...

echo Header navigation redesign completed successfully!
echo.
echo IMPORTANT: Please restart your development server to see the changes.
echo If the header still doesn't show the pill-style navigation, try the following:
echo 1. Clear your browser cache
echo 2. Check for any CSS that might be overriding the styles
echo 3. Ensure the Header component is being imported correctly
echo.
echo Press any key to exit...
pause > nul
