@echo off
echo CSS Consolidation Script
echo =============================================

REM Create timestamp for operations
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /format:list') do set datetime=%%I
set timestamp=%datetime:~0,8%-%datetime:~8,4%

echo Creating backup directory: src\css-backup-%timestamp%
mkdir src\css-backup-%timestamp%

echo Creating subdirectories to preserve structure...
mkdir src\css-backup-%timestamp%\styles
mkdir src\css-backup-%timestamp%\styles\base
mkdir src\css-backup-%timestamp%\styles\components
mkdir src\css-backup-%timestamp%\styles\fixes
mkdir src\css-backup-%timestamp%\styles\layouts
mkdir src\css-backup-%timestamp%\styles\pages
mkdir src\css-backup-%timestamp%\styles\utils
mkdir src\css-backup-%timestamp%\styles_new
mkdir src\css-backup-%timestamp%\app
mkdir src\css-backup-%timestamp%\components
mkdir src\css-backup-%timestamp%\components\TransactionForm

echo Backing up CSS files...
xcopy /s /y src\*.css src\css-backup-%timestamp%\

echo Renaming original CSS files to .bak (except styles.css)...
for /r src %%f in (*.css) do (
  if not "%%~nxf"=="styles.css" (
    if not "%%~nxf"=="fix-import.css" (
      if not "%%~nxf"=="inline-fix.css" (
        if not "%%~nxf"=="temp-tailwind-fix.css" (
          ren "%%f" "%%~nxf.bak"
        )
      )
    )
  )
)

echo Ensuring styles directory exists...
if not exist src\styles mkdir src\styles

echo Copying consolidated CSS file...
copy src\new_consolidated_styles.css.bak src\styles\styles.css

echo Creating fix-import.css...
echo /* CSS Import Fix */ > src\styles\fix-import.css
echo @import './styles.css'; >> src\styles\fix-import.css

echo Creating inline-fix.css...
echo /* Critical inline styles */ > src\styles\inline-fix.css
echo body, html { display: block !important; width: 100%% !important; height: 100%% !important; } >> src\styles\inline-fix.css

echo Creating public styles directory...
if not exist public\styles mkdir public\styles

echo Copying CSS files to public directory...
copy src\styles\styles.css public\styles\
copy src\styles\fix-import.css public\styles\
copy src\styles\inline-fix.css public\styles\

echo Creating temp-tailwind-fix.css...
echo @tailwind base; > src\temp-tailwind-fix.css
echo @tailwind components; >> src\temp-tailwind-fix.css
echo @tailwind utilities; >> src\temp-tailwind-fix.css
copy src\temp-tailwind-fix.css public\styles\

echo Updating HTML to include CSS files...
echo NOTE: Please manually verify your index.html includes the following links:
echo ^<link rel="stylesheet" href="/styles/temp-tailwind-fix.css"^>
echo ^<link rel="stylesheet" href="/styles/inline-fix.css"^>
echo ^<link rel="stylesheet" href="/styles/styles.css"^>

echo Updating postcss.config.cjs...
echo /** @type {import('postcss-load-config').Config} */ > postcss.config.cjs.new
echo module.exports = { >> postcss.config.cjs.new
echo     plugins: { >> postcss.config.cjs.new
echo         tailwindcss: {}, >> postcss.config.cjs.new
echo         autoprefixer: {}, >> postcss.config.cjs.new
echo     }, >> postcss.config.cjs.new
echo }; >> postcss.config.cjs.new
move /y postcss.config.cjs.new postcss.config.cjs

echo.
echo CSS consolidation complete!
echo.
echo Files backed up to: src\css-backup-%timestamp%\
echo Consolidated CSS at: src\styles\styles.css
echo.
echo Run 'npm run dev' to test your changes.
echo.

pause
