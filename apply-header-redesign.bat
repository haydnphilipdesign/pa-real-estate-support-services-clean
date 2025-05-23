@echo off
echo Applying header navigation redesign...

REM Create a backup of the original Header.tsx
copy /Y "src\components\Header.tsx" "src\components\Header.tsx.original"
echo Created backup at src\components\Header.tsx.original

REM Apply the new header design
copy /Y "src\components\Header.tsx.updated" "src\components\Header.tsx"
echo Applied new header design 

echo Header navigation redesign completed successfully!
echo Please restart your development server to see the changes.
