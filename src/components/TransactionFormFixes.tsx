import React, { useEffect } from 'react';

/**
 * Transaction Form Fixes Component
 * Handles dropdown positioning and form validation issues
 */
const TransactionFormFixes: React.FC = () => {
  useEffect(() => {
    // Improved dropdown positioning with better reliability
    const fixDropdownPositioning = () => {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as HTMLElement;
                
                // Check if this is a dropdown content element
                if (element.hasAttribute('data-radix-select-content') || 
                    element.querySelector('[data-radix-select-content]')) {
                  
                  const dropdown = element.hasAttribute('data-radix-select-content') 
                    ? element 
                    : element.querySelector('[data-radix-select-content]') as HTMLElement;
                  
                  if (dropdown) {
                    // Find the corresponding trigger
                    const trigger = document.querySelector('[data-radix-select-trigger][aria-expanded="true"]') as HTMLElement;
                    
                    if (trigger) {
                      const triggerRect = trigger.getBoundingClientRect();
                      const viewport = {
                        width: window.innerWidth,
                        height: window.innerHeight
                      };
                      
                      // Calculate optimal position
                      let top = triggerRect.bottom + 4;
                      let left = triggerRect.left;
                      
                      // Ensure dropdown doesn't go off-screen
                      if (left + triggerRect.width > viewport.width) {
                        left = viewport.width - triggerRect.width - 10;
                      }
                      if (left < 10) {
                        left = 10;
                      }
                      
                      // If dropdown would go below viewport, position above trigger
                      if (top + 200 > viewport.height && triggerRect.top > 200) {
                        top = triggerRect.top - 204; // dropdown height + margin
                      }
                      
                      // Apply positioning
                      dropdown.style.position = 'fixed';
                      dropdown.style.top = `${top}px`;
                      dropdown.style.left = `${left}px`;
                      dropdown.style.width = `${Math.max(triggerRect.width, 120)}px`;
                      dropdown.style.zIndex = '50';
                      dropdown.style.transform = 'none';
                      dropdown.style.margin = '0';
                      dropdown.style.maxHeight = '200px';
                      dropdown.style.overflowY = 'auto';
                    }
                  }
                }
              }
            });
          }
        });
      });

      // Observe for dropdown additions
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      // Handle trigger clicks
      const handleTriggerClick = (e: Event) => {
        const target = e.target as HTMLElement;
        const trigger = target.closest('[data-radix-select-trigger]');
        if (trigger) {
          // Small delay to allow Radix to create the dropdown
          setTimeout(() => {
            const dropdown = document.querySelector('[data-radix-select-content]') as HTMLElement;
            if (dropdown && trigger) {
              // Re-apply positioning after Radix sets its own
              const triggerRect = trigger.getBoundingClientRect();
              dropdown.style.position = 'fixed';
              dropdown.style.top = `${triggerRect.bottom + 4}px`;
              dropdown.style.left = `${triggerRect.left}px`;
              dropdown.style.width = `${Math.max(triggerRect.width, 120)}px`;
              dropdown.style.zIndex = '50';
              dropdown.style.transform = 'none';
            }
          }, 50);
        }
      };

      document.addEventListener('click', handleTriggerClick);
      
      return () => {
        observer.disconnect();
        document.removeEventListener('click', handleTriggerClick);
      };
    };

    // Fix form validation clearing
    const fixFormValidation = () => {
      // Listen for input changes to clear validation errors
      document.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement;
        
        if (target && (target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.tagName === 'TEXTAREA')) {
          // Clear error state when user starts typing/selecting
          if (target.value.trim() !== '') {
            // Remove error classes
            target.classList.remove('tf-input-error', 'tf-field-error');
            
            // Hide error messages
            const errorElements = target.parentElement?.querySelectorAll('.tf-error-message, .error-message');
            errorElements?.forEach(error => {
              (error as HTMLElement).style.display = 'none';
            });
            
            // Clear validation error from form state (if using React Hook Form or similar)
            const fieldName = target.name || target.id;
            if (fieldName) {
              // Dispatch a custom event to notify form validation to clear this field
              target.dispatchEvent(new CustomEvent('clearValidationError', {
                detail: { fieldName },
                bubbles: true
              }));
            }
          }
        }
      });

      // Listen for select changes specifically
      document.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;
        
        if (target && target.closest('[data-radix-select-trigger]')) {
          // For Radix Select components, clear errors
          const trigger = target.closest('[data-radix-select-trigger]') as HTMLElement;
          if (trigger) {
            trigger.classList.remove('tf-input-error', 'tf-field-error');
            
            const formGroup = trigger.closest('.tf-form-group');
            const errorElements = formGroup?.querySelectorAll('.tf-error-message, .error-message');
            errorElements?.forEach(error => {
              (error as HTMLElement).style.display = 'none';
            });
          }
        }
      });
    };

    // Initialize fixes
    const cleanupDropdownFix = fixDropdownPositioning();
    fixFormValidation();

    // Cleanup
    return () => {
      if (cleanupDropdownFix) cleanupDropdownFix();
    };
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default TransactionFormFixes;