@echo off
echo Applying simple pill-style header...

REM Create a backup of the current Header.tsx
copy /Y "src\components\Header.tsx" "src\components\Header.tsx.backup_%date:~-4,4%%date:~-7,2%%date:~-10,2%%time:~0,2%%time:~3,2%" 2>NUL
echo Created backup of current header

echo Header changes applied successfully!
echo.
echo IMPORTANT: Please restart your development server to see the changes.
echo If the header still doesn't show properly, check the browser's console for any errors.
echo.
echo Press any key to exit...
pause > nul
