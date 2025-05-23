@echo off
echo.
echo ===================================================
echo Applying Role Selection Text Color Fix
echo ===================================================
echo.

echo Creating role-selection-text-fix.css...
echo /**> src\styles\role-selection-text-fix.css
echo  * Role Selection Text Color Fix>> src\styles\role-selection-text-fix.css
echo  * >> src\styles\role-selection-text-fix.css
echo  * This CSS file specifically addresses the issue with text color in the role selection>> src\styles\role-selection-text-fix.css
echo  * component of the transaction form. It ensures that text is always visible against>> src\styles\role-selection-text-fix.css
echo  * the light background of the role cards.>> src\styles\role-selection-text-fix.css
echo  */>> src\styles\role-selection-text-fix.css
echo.>> src\styles\role-selection-text-fix.css
echo /* Target all text in role selection cards */>> src\styles\role-selection-text-fix.css
echo .transaction-form-container [style*="roleCard"] {>> src\styles\role-selection-text-fix.css
echo   color: #1e3a8a !important;>> src\styles\role-selection-text-fix.css
echo }>> src\styles\role-selection-text-fix.css
echo.>> src\styles\role-selection-text-fix.css
echo /* Target role titles */>> src\styles\role-selection-text-fix.css
echo .transaction-form-container [style*="roleTitle"] {>> src\styles\role-selection-text-fix.css
echo   color: #1e3a8a !important;>> src\styles\role-selection-text-fix.css
echo }>> src\styles\role-selection-text-fix.css
echo.>> src\styles\role-selection-text-fix.css
echo /* Target role descriptions */>> src\styles\role-selection-text-fix.css
echo .transaction-form-container [style*="roleDescription"] {>> src\styles\role-selection-text-fix.css
echo   color: #3b82f6 !important;>> src\styles\role-selection-text-fix.css
echo }>> src\styles\role-selection-text-fix.css
echo.>> src\styles\role-selection-text-fix.css
echo /* Target feature lists */>> src\styles\role-selection-text-fix.css
echo .transaction-form-container [style*="featuresList"] {>> src\styles\role-selection-text-fix.css
echo   color: #1e3a8a !important;>> src\styles\role-selection-text-fix.css
echo }>> src\styles\role-selection-text-fix.css
echo.>> src\styles\role-selection-text-fix.css
echo /* Target feature items */>> src\styles\role-selection-text-fix.css
echo .transaction-form-container [style*="featureItem"] {>> src\styles\role-selection-text-fix.css
echo   color: #1e3a8a !important;>> src\styles\role-selection-text-fix.css
echo }>> src\styles\role-selection-text-fix.css
echo.>> src\styles\role-selection-text-fix.css
echo /* Target feature bullets */>> src\styles\role-selection-text-fix.css
echo .transaction-form-container [style*="featureBullet"] {>> src\styles\role-selection-text-fix.css
echo   background-color: #3b82f6 !important;>> src\styles\role-selection-text-fix.css
echo }>> src\styles\role-selection-text-fix.css
echo.>> src\styles\role-selection-text-fix.css
echo /* Target all list items within role cards */>> src\styles\role-selection-text-fix.css
echo .transaction-form-container [style*="roleCard"] li {>> src\styles\role-selection-text-fix.css
echo   color: #1e3a8a !important;>> src\styles\role-selection-text-fix.css
echo }>> src\styles\role-selection-text-fix.css
echo.>> src\styles\role-selection-text-fix.css
echo /* Target all list items within selected role section */>> src\styles\role-selection-text-fix.css
echo .transaction-form-container [style*="selectedRoleSection"] li {>> src\styles\role-selection-text-fix.css
echo   color: #1e3a8a !important;>> src\styles\role-selection-text-fix.css
echo }>> src\styles\role-selection-text-fix.css
echo.>> src\styles\role-selection-text-fix.css
echo /* Target info cards */>> src\styles\role-selection-text-fix.css
echo .transaction-form-container [style*="infoCard"] {>> src\styles\role-selection-text-fix.css
echo   color: #1e3a8a !important;>> src\styles\role-selection-text-fix.css
echo }>> src\styles\role-selection-text-fix.css
echo.>> src\styles\role-selection-text-fix.css
echo /* Target info card titles */>> src\styles\role-selection-text-fix.css
echo .transaction-form-container [style*="infoCardTitle"] {>> src\styles\role-selection-text-fix.css
echo   color: #1e3a8a !important;>> src\styles\role-selection-text-fix.css
echo }>> src\styles\role-selection-text-fix.css
echo.>> src\styles\role-selection-text-fix.css
echo /* Target info card text */>> src\styles\role-selection-text-fix.css
echo .transaction-form-container [style*="infoCardText"] {>> src\styles\role-selection-text-fix.css
echo   color: #3b82f6 !important;>> src\styles\role-selection-text-fix.css
echo }>> src\styles\role-selection-text-fix.css
echo.>> src\styles\role-selection-text-fix.css
echo /* Override any global styles that might be causing text to be white */>> src\styles\role-selection-text-fix.css
echo .transaction-form-container li,>> src\styles\role-selection-text-fix.css
echo .transaction-form-container ul {>> src\styles\role-selection-text-fix.css
echo   color: inherit !important;>> src\styles\role-selection-text-fix.css
echo }>> src\styles\role-selection-text-fix.css
echo.>> src\styles\role-selection-text-fix.css
echo /* Ensure role selection cards have proper background */>> src\styles\role-selection-text-fix.css
echo .transaction-form-container [style*="roleCard"] {>> src\styles\role-selection-text-fix.css
echo   background-color: white !important;>> src\styles\role-selection-text-fix.css
echo }>> src\styles\role-selection-text-fix.css
echo.>> src\styles\role-selection-text-fix.css
echo /* Ensure selected role cards have proper background */>> src\styles\role-selection-text-fix.css
echo .transaction-form-container [style*="roleCardSelected"] {>> src\styles\role-selection-text-fix.css
echo   background-color: #eff6ff !important;>> src\styles\role-selection-text-fix.css
echo }>> src\styles\role-selection-text-fix.css

echo Updating FixedCssImport.js to include the new CSS file...
powershell -Command "(Get-Content src\components\FixedCssImport.js) -replace 'import ''../styles/pages/transaction-form-portal.css'';', 'import ''../styles/pages/transaction-form-portal.css'';\nimport ''../styles/role-selection-text-fix.css'';' | Set-Content src\components\FixedCssImport.js"

echo Updating RoleSelection.tsx to ensure feature items have proper color...
powershell -Command "(Get-Content src\components\TransactionForm\RoleSelection.tsx) -replace 'color: ''#1e3a8a'',', 'color: ''#1e3a8a !important'',' | Set-Content src\components\TransactionForm\RoleSelection.tsx"

echo.
echo Role Selection Text Color Fix has been applied successfully!
echo.
echo ===================================================
echo.