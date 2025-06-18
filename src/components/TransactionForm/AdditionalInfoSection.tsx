import React from 'react';
import { AlertTriangle } from "lucide-react";
import type { AdditionalInfoData } from '@/types/transaction';

interface AdditionalInfoSectionProps {
  formData: {
    additionalInfo: AdditionalInfoData;
  };
  onChange: (field: string, value: any) => void;
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
  const handleFieldChange = (field: keyof AdditionalInfoData, value: string) => {
    onChange(`additionalInfo.${field}`, value);
    onFieldTouch?.(`additionalInfo.${field}`);
  };

  return (
    <div className="additional-info-section">
      {/* Single Clear Heading */}
      <div className="additional-info-header">
        <h2 className="additional-info-title">Additional Notes (optional)</h2>
        <p className="additional-info-subtitle">Include any special instructions, urgent matters, or other relevant information</p>
      </div>

      {/* Integrated Callout */}
      <div className="additional-info-callout">
        <div className="additional-info-callout-content">
          <AlertTriangle className="additional-info-callout-icon" />
          <span className="additional-info-callout-text">
            This field is optional but can be helpful for providing context or special instructions for your transaction.
          </span>
        </div>
      </div>

      {/* Form Field */}
      <div className="additional-info-field">
        <textarea
          id="additionalInfo"
          value={formData.additionalInfo?.notes || ''}
          onChange={(e) => handleFieldChange('notes', e.target.value)}
          onBlur={() => onFieldTouch?.('additionalInfo.notes')}
          placeholder="Enter any special instructions, urgent issues, time-sensitive items, general notes, or other relevant information about this transaction..."
          className="additional-info-textarea"
          rows={8}
          aria-label="Additional notes for this transaction"
        />
        {validationErrors['additionalInfo.notes'] && touchedFields.has('additionalInfo.notes') && (
          <p className="additional-info-error">{validationErrors['additionalInfo.notes']}</p>
        )}
      </div>
    </div>
  );
};
