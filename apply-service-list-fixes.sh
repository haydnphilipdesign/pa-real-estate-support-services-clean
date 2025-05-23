#!/bin/bash

echo "======================================="
echo "Service List and Hero Badge Alignment Fix"
echo "======================================="
echo "This script will fix the hero badge and service list alignment issues"
echo

# Check if styles directory exists
if [ ! -d "src/styles" ]; then
  echo "Creating styles directory..."
  mkdir -p "src/styles"
fi

echo "Creating service-list-fixes.css file..."
cat > src/styles/service-list-fixes.css << 'EOL'
/*
 * Service List and Hero Badge Alignment Fixes
 *
 * This CSS file provides fixes for:
 * 1. Hero badge alignment and styling
 * 2. Service list bullet alignment and spacing
 * 3. Consistent card heights and text alignment
 */

/* Hero Badge Fixes */
.hero-badge {
  @apply inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* Service List Alignment Fixes */
.glass-card ul,
.glass-card-navy ul,
.glass-card-blue ul,
.glass-card-dark ul,
.glass-card-on-white ul,
.glass-card-base ul,
.card ul,
[class*="content-card"] ul {
  @apply space-y-3 w-full;
  margin-top: 1rem;
}

/* Fix bullet alignment */
.glass-card li,
.glass-card-navy li,
.glass-card-blue li,
.glass-card-dark li,
.glass-card-on-white li,
.glass-card-base li,
.card li,
[class*="content-card"] li {
  @apply flex items-start;
  line-height: 1.4;
  margin-bottom: 0.5rem;
}

/* Bullet styling */
.glass-card li > div:first-child,
.glass-card-navy li > div:first-child,
.glass-card-blue li > div:first-child,
.glass-card-dark li > div:first-child,
.glass-card-on-white li > div:first-child,
.glass-card-base li > div:first-child,
.card li > div:first-child,
[class*="content-card"] li > div:first-child {
  @apply rounded-full flex-shrink-0;
  width: 6px;
  height: 6px;
  margin-top: 0.55rem;
  margin-right: 0.75rem;
}

/* Text alignment in list items */
.glass-card li > span,
.glass-card-navy li > span,
.glass-card-blue li > span,
.glass-card-dark li > span,
.glass-card-on-white li > span,
.glass-card-base li > span,
.card li > span,
[class*="content-card"] li > span {
  @apply flex-1;
}

/* Card height consistency */
[class*="content-card"] {
  @apply flex flex-col;
  height: 100%;
}

[class*="content-card"] > div {
  @apply flex-1;
  display: flex;
  flex-direction: column;
}

/* Ensure ul is at the bottom of the card */
[class*="content-card"] ul {
  margin-top: auto;
  padding-top: 1rem;
}
EOL

# Update the index.css file to import the service list fixes
echo "Updating index.css with service list fixes import..."

if ! grep -q "@import './styles/service-list-fixes.css';" src/index.css; then
    sed -i.bak "s|@import './styles/hero-vertical-centering.css';.*|@import './styles/hero-vertical-centering.css'; /* Hero vertical spacing and centering */\n@import './styles/service-list-fixes.css'; /* Fix for hero badge and service list alignment */|" src/index.css
fi

echo
echo "======================================="
echo "Service List and Hero Badge Alignment Fix Complete!"
echo "======================================="
echo "The service list and hero badge alignment styles have been added to the project."
echo "All list bullets and hero badges should now be correctly aligned."
echo