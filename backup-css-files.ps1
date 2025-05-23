# CSS Backup Script
# This script creates a timestamped backup of all CSS files in the src directory
# while preserving their directory structure

# Create timestamp for backup folder
$timestamp = Get-Date -Format "yyyyMMdd-HHmm"
$backupDir = "src/css-backup-$timestamp"

# Create backup directory
Write-Host "Creating backup directory: $backupDir"
New-Item -Path $backupDir -ItemType Directory -Force | Out-Null

# Get all CSS files recursively
$cssFiles = Get-ChildItem -Path "src" -Filter "*.css" -Recurse

# Copy each file to backup directory with its relative path
foreach ($file in $cssFiles) {
    # Get the relative path from src
    $relativePath = $file.FullName.Substring($file.FullName.IndexOf("src") + 4)
    $relativePath = $relativePath.Substring(0, $relativePath.LastIndexOf("\"))

    # Create target directory
    $targetDir = Join-Path $backupDir $relativePath
    if (-not (Test-Path $targetDir)) {
        New-Item -Path $targetDir -ItemType Directory -Force | Out-Null
    }

    # Copy the file
    $targetPath = Join-Path $backupDir $relativePath
    Copy-Item $file.FullName -Destination $targetPath -Force
    Write-Host "Backed up: $($file.FullName) to $targetPath\$($file.Name)"
}

Write-Host "Backup completed. All CSS files have been copied to $backupDir"
Write-Host "Total files backed up: $($cssFiles.Count)"