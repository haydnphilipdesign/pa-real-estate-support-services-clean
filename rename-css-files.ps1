# CSS Rename Script
# This script renames all CSS files in the src directory with a .bak extension
# except for the new consolidated styles.css file

# Get all CSS files recursively
$cssFiles = Get-ChildItem -Path "src" -Filter "*.css" -Recurse | Where-Object {
    $_.FullName -notlike "*styles/styles.css" -and
    $_.FullName -notlike "*css-backup*"
}

Write-Host "Renaming CSS files to .bak (except src/styles/styles.css)..."

# Rename each file
foreach ($file in $cssFiles) {
    $newName = $file.FullName + ".bak"
    Rename-Item -Path $file.FullName -NewName $newName -Force
    Write-Host "Renamed: $($file.FullName) to $newName"
}

Write-Host "CSS files renamed. Total files renamed: $($cssFiles.Count)"