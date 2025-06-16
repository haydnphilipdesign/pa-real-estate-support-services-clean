import React, { forwardRef, useId } from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import { AccessibilityHelpers } from '@/utils/enhancedValidation';

interface EnhancedFieldProps {
  label: string;
  error?: string | string[];
  warning?: string | string[];
  helpText?: string;
  required?: boolean;
  className?: string;
  children: React.ReactElement;
  fieldId?: string;
}

/**
 * Enhanced Field Component
 * Provides comprehensive accessibility features for form fields
 */
export const EnhancedField = forwardRef<HTMLDivElement, EnhancedFieldProps>(
  ({ label, error, warning, helpText, required, className, children, fieldId }, ref) => {
    const id = useId();
    const actualFieldId = fieldId || id;
    
    const hasError = Boolean(error);
    const hasWarning = Boolean(warning);
    const hasHelp = Boolean(helpText);
    
    const errorArray = Array.isArray(error) ? error : error ? [error] : [];
    const warningArray = Array.isArray(warning) ? warning : warning ? [warning] : [];
    
    // Enhanced child element with accessibility attributes
    const enhancedChild = React.cloneElement(children, {
      id: actualFieldId,
      'aria-invalid': hasError ? 'true' : 'false',
      'aria-describedby': AccessibilityHelpers.getAriaDescribedBy(actualFieldId, hasError, hasHelp),
      'aria-required': required ? 'true' : 'false',
      className: cn(
        children.props.className,
        'tf-enhanced-field',
        {
          'tf-field-error': hasError,
          'tf-field-warning': hasWarning,
          'tf-field-valid': !hasError && !hasWarning,
        }
      ),
    });

    return (
      <div ref={ref} className={cn('tf-field-container', className)}>
        {/* Field Label */}
        <label 
          htmlFor={actualFieldId}
          className={cn(
            'tf-label tf-enhanced-label',
            {
              'tf-label-error': hasError,
              'tf-label-warning': hasWarning,
              'tf-label-required': required,
            }
          )}
        >
          <span className="tf-label-text">
            {label}
            {required && (
              <span 
                className="tf-label-required-indicator"
                aria-label="required"
              >
                *
              </span>
            )}
          </span>
        </label>

        {/* Help Text */}
        {hasHelp && (
          <div 
            id={AccessibilityHelpers.getHelpId(actualFieldId)}
            className="tf-help-text"
            role="note"
          >
            <Info className="tf-help-icon" aria-hidden="true" />
            <span>{helpText}</span>
          </div>
        )}

        {/* Form Field */}
        <div className="tf-field-wrapper">
          {enhancedChild}
          
          {/* Field Status Indicator */}
          <div className="tf-field-status" aria-hidden="true">
            {hasError && (
              <AlertCircle className="tf-status-icon tf-status-error" />
            )}
            {!hasError && hasWarning && (
              <AlertCircle className="tf-status-icon tf-status-warning" />
            )}
            {!hasError && !hasWarning && (
              <CheckCircle className="tf-status-icon tf-status-valid" />
            )}
          </div>
        </div>

        {/* Error Messages */}
        {hasError && (
          <div 
            id={AccessibilityHelpers.getErrorId(actualFieldId)}
            className="tf-error-container"
            role="alert"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorArray.map((errorMsg, index) => (
              <div key={index} className="tf-error-message">
                <AlertCircle className="tf-error-icon" aria-hidden="true" />
                <span>{errorMsg}</span>
              </div>
            ))}
          </div>
        )}

        {/* Warning Messages */}
        {hasWarning && !hasError && (
          <div className="tf-warning-container" role="note">
            {warningArray.map((warningMsg, index) => (
              <div key={index} className="tf-warning-message">
                <AlertCircle className="tf-warning-icon" aria-hidden="true" />
                <span>{warningMsg}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

EnhancedField.displayName = 'EnhancedField';

/**
 * Enhanced Input Component
 * Pre-configured input with accessibility features
 */
interface EnhancedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string;
  error?: string | string[];
  warning?: string | string[];
  helpText?: string;
  fieldId?: string;
}

export const EnhancedInput = forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({ label, error, warning, helpText, className, required, fieldId, ...props }, ref) => {
    return (
      <EnhancedField
        label={label}
        error={error}
        warning={warning}
        helpText={helpText}
        required={required}
        fieldId={fieldId}
      >
        <input
          ref={ref}
          className={cn('tf-input', className)}
          required={required}
          {...props}
        />
      </EnhancedField>
    );
  }
);

EnhancedInput.displayName = 'EnhancedInput';

/**
 * Enhanced Select Component
 * Pre-configured select with accessibility features
 */
interface EnhancedSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
  label: string;
  error?: string | string[];
  warning?: string | string[];
  helpText?: string;
  fieldId?: string;
  placeholder?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
}

export const EnhancedSelect = forwardRef<HTMLSelectElement, EnhancedSelectProps>(
  ({ label, error, warning, helpText, className, required, fieldId, placeholder, options, ...props }, ref) => {
    return (
      <EnhancedField
        label={label}
        error={error}
        warning={warning}
        helpText={helpText}
        required={required}
        fieldId={fieldId}
      >
        <select
          ref={ref}
          className={cn('tf-select', className)}
          required={required}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map(option => (
            <option 
              key={option.value} 
              value={option.value} 
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
      </EnhancedField>
    );
  }
);

EnhancedSelect.displayName = 'EnhancedSelect';

/**
 * Enhanced Textarea Component
 * Pre-configured textarea with accessibility features
 */
interface EnhancedTextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  label: string;
  error?: string | string[];
  warning?: string | string[];
  helpText?: string;
  fieldId?: string;
}

export const EnhancedTextarea = forwardRef<HTMLTextAreaElement, EnhancedTextareaProps>(
  ({ label, error, warning, helpText, className, required, fieldId, ...props }, ref) => {
    return (
      <EnhancedField
        label={label}
        error={error}
        warning={warning}
        helpText={helpText}
        required={required}
        fieldId={fieldId}
      >
        <textarea
          ref={ref}
          className={cn('tf-textarea', className)}
          required={required}
          {...props}
        />
      </EnhancedField>
    );
  }
);

EnhancedTextarea.displayName = 'EnhancedTextarea';

/**
 * Enhanced Checkbox Component
 * Pre-configured checkbox with accessibility features
 */
interface EnhancedCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'id'> {
  label: string;
  error?: string | string[];
  warning?: string | string[];
  helpText?: string;
  fieldId?: string;
}

export const EnhancedCheckbox = forwardRef<HTMLInputElement, EnhancedCheckboxProps>(
  ({ label, error, warning, helpText, className, required, fieldId, ...props }, ref) => {
    const id = useId();
    const actualFieldId = fieldId || id;
    
    const hasError = Boolean(error);
    const hasWarning = Boolean(warning);
    const hasHelp = Boolean(helpText);
    
    const errorArray = Array.isArray(error) ? error : error ? [error] : [];
    const warningArray = Array.isArray(warning) ? warning : warning ? [warning] : [];

    return (
      <div className={cn('tf-checkbox-container', className)}>
        <div className="tf-checkbox-wrapper">
          <input
            ref={ref}
            id={actualFieldId}
            type="checkbox"
            className={cn(
              'tf-checkbox',
              {
                'tf-checkbox-error': hasError,
                'tf-checkbox-warning': hasWarning,
              }
            )}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={AccessibilityHelpers.getAriaDescribedBy(actualFieldId, hasError, hasHelp)}
            aria-required={required ? 'true' : 'false'}
            required={required}
            {...props}
          />
          <label 
            htmlFor={actualFieldId}
            className={cn(
              'tf-checkbox-label',
              {
                'tf-checkbox-label-error': hasError,
                'tf-checkbox-label-warning': hasWarning,
              }
            )}
          >
            {label}
            {required && (
              <span 
                className="tf-label-required-indicator"
                aria-label="required"
              >
                *
              </span>
            )}
          </label>
        </div>

        {/* Help Text */}
        {hasHelp && (
          <div 
            id={AccessibilityHelpers.getHelpId(actualFieldId)}
            className="tf-help-text"
            role="note"
          >
            <Info className="tf-help-icon" aria-hidden="true" />
            <span>{helpText}</span>
          </div>
        )}

        {/* Error Messages */}
        {hasError && (
          <div 
            id={AccessibilityHelpers.getErrorId(actualFieldId)}
            className="tf-error-container"
            role="alert"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorArray.map((errorMsg, index) => (
              <div key={index} className="tf-error-message">
                <AlertCircle className="tf-error-icon" aria-hidden="true" />
                <span>{errorMsg}</span>
              </div>
            ))}
          </div>
        )}

        {/* Warning Messages */}
        {hasWarning && !hasError && (
          <div className="tf-warning-container" role="note">
            {warningArray.map((warningMsg, index) => (
              <div key={index} className="tf-warning-message">
                <AlertCircle className="tf-warning-icon" aria-hidden="true" />
                <span>{warningMsg}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

EnhancedCheckbox.displayName = 'EnhancedCheckbox';