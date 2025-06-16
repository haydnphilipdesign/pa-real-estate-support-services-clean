import React from 'react';
import { FileText } from "lucide-react";
import type { TransactionFormData } from './hooks/useTransactionFormState';

interface AdditionalInfoSectionProps {
  formData: TransactionFormData;
  onChange: <K extends keyof TransactionFormData>(field: K, value: TransactionFormData[K]) => void;
  validationErrors?: Record<string, string>;
  touchedFields?: Set<string>;
  onFieldTouch?: (field: string) => void;
}

export const AdditionalInfoSection: React.FC<AdditionalInfoSectionProps> = ({
  formData,
  onChange,
  validationErrors = {},
  touchedFields = new Set(),
  onFieldTouch
}) => {
  return (
    <div className="tf-additional-info">
      <div className="tf-glass-card">
        <div className="tf-flex tf-items-center tf-mb-4">
          <div className="tf-icon-container">
            <FileText className="tf-icon" />
          </div>
          <div>
            <h3 className="tf-heading-secondary">Additional Information</h3>
            <p className="tf-text-subtitle">Add any additional information for this transaction</p>
          </div>
        </div>

        {/* Simplified single input */}
        <div className="tf-form-group">
          <label htmlFor="additionalInfo" className="tf-label">
            <FileText className="tf-label-icon" />
            Additional Information
          </label>
          <textarea
            id="additionalInfo"
            value={formData.additionalNotes || ''}
            onChange={(e) => {
              onChange('additionalNotes', e.target.value);
              onFieldTouch?.('additionalNotes');
            }}
            onBlur={() => onFieldTouch?.('additionalNotes')}
            placeholder="Add any additional information, comments, or special instructions for this transaction..."
            className="tf-textarea tf-textarea-lg"
            rows={8}
          />
          {validationErrors.additionalNotes && touchedFields.has('additionalNotes') && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.additionalNotes}</p>
          )}
          <p className="tf-help-text">Optional: Any additional details or comments for this transaction</p>
        </div>
      </div>
    </div>
  );
};
