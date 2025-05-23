import React, { useEffect } from 'react';

/**
 * This is a temporary diagnostic component to help identify CSS conflicts
 * You can add this component to any page to see diagnostic information.
 * Remove after debugging is complete.
 */
const DiagnosticsHelper: React.FC = () => {
  useEffect(() => {
    // Check for inline styles that might be conflicting
    const paragraphs = document.querySelectorAll('p');
    const spans = document.querySelectorAll('span');
    const footer = document.querySelector('footer');
    const glassCards = document.querySelectorAll('[class*="glass-card"]');
    const serviceCards = document.querySelectorAll('.service-card');
    const darkSections = document.querySelectorAll('.dark-section, .statistics-section, .services-hero-section');

    console.log('=== CSS DIAGNOSTICS ===');

    // Check if footer exists and its styles
    console.log('Footer element check:');
    if (footer) {
      console.log('✅ Footer element exists');
      console.log(`Footer computed display: ${window.getComputedStyle(footer).display}`);
      console.log(`Footer computed background-color: ${window.getComputedStyle(footer).backgroundColor}`);
      console.log(`Footer computed visibility: ${window.getComputedStyle(footer).visibility}`);
      console.log(`Footer classes: ${footer.className}`);
    } else {
      console.log('❌ Footer element missing');
    }

    // Check glass cards
    console.log('\nGlass Card Check:');
    console.log(`Found ${glassCards.length} glass cards`);

    glassCards.forEach((card, index) => {
      const cardStyle = window.getComputedStyle(card);
      console.log(`Card ${index + 1}:`);
      console.log(`- Class: ${card.className}`);
      console.log(`- Background: ${cardStyle.backgroundColor}`);
      console.log(`- Text color sample: ${cardStyle.color}`);

      // Check if card is in a dark section
      const inDarkSection = Array.from(darkSections).some(section => section.contains(card));
      if (inDarkSection) {
        console.log(`- Card is in dark section: ${inDarkSection ? 'YES' : 'NO'}`);
        // If in dark section but has light background, flag as issue
        const bgColor = cardStyle.backgroundColor;
        const opacity = parseFloat(bgColor.split(',')[3] || '1');
        const isLight = bgColor.includes('255') && opacity > 0.5;
        if (isLight) {
          console.log('⚠️ ISSUE: Light background card in dark section');
          console.log(`- Card selector: ${getSelector(card as HTMLElement)}`);

          // Apply fix directly if needed
          (card as HTMLElement).style.backgroundColor = 'rgba(30, 58, 138, 0.9)';
          (card as HTMLElement).style.color = 'white';

          // Find paragraphs and fix text color
          card.querySelectorAll('p, span:not(.icon)').forEach(element => {
            (element as HTMLElement).style.color = 'white';
          });

          console.log('🔧 Applied emergency fix to card');
        }
      }
    });

    // Check service cards specifically
    console.log('\nService Card Check:');
    console.log(`Found ${serviceCards.length} service cards`);

    serviceCards.forEach((card, index) => {
      const cardStyle = window.getComputedStyle(card);
      console.log(`Service Card ${index + 1}:`);
      console.log(`- Background: ${cardStyle.backgroundColor}`);

      // Check if card has light background
      const bgColor = cardStyle.backgroundColor;
      const opacity = parseFloat(bgColor.split(',')[3] || '1');
      const isLight = bgColor.includes('255') && opacity > 0.5;

      if (isLight) {
        console.log('⚠️ ISSUE: Light background service card');
        // Apply fix directly if needed
        (card as HTMLElement).style.backgroundColor = 'rgba(30, 58, 138, 0.9)';
        (card as HTMLElement).style.color = 'white';

        // Find paragraphs and fix text color
        card.querySelectorAll('p, span:not(.icon)').forEach(element => {
          (element as HTMLElement).style.color = 'white';
        });

        console.log('🔧 Applied emergency fix to service card');
      }
    });

    // Check text content in dark sections
    console.log('\nDark Section Text Check:');
    darkSections.forEach((section, index) => {
      console.log(`Dark Section ${index + 1} (${section.className}):`);

      const paragraphs = section.querySelectorAll('p');
      console.log(`- Found ${paragraphs.length} paragraphs`);

      let darkTextCount = 0;
      paragraphs.forEach(p => {
        const style = window.getComputedStyle(p);
        const color = style.color;
        // Check if color is dark (approximate)
        const isDark = !color.includes('255') || color.includes('0, 0, 0');
        if (isDark) {
          darkTextCount++;
          // Fix dark text in dark section
          (p as HTMLElement).style.color = 'white';
        }
      });

      if (darkTextCount > 0) {
        console.log(`⚠️ ISSUE: Found ${darkTextCount} paragraphs with dark text in dark section`);
        console.log('🔧 Applied emergency fixes to text elements');
      }
    });
  }, []);

  // Helper function to get a useful selector for debugging
  function getSelector(element: HTMLElement): string {
    let selector = element.tagName.toLowerCase();
    if (element.id) {
      selector += `#${element.id}`;
    }
    if (element.className) {
      const classes = element.className.split(' ').map(c => `.${c}`).join('');
      selector += classes;
    }
    return selector;
  }

  return null;
};

export default DiagnosticsHelper;