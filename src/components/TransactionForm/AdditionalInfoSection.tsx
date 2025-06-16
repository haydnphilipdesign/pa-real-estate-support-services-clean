import React from 'react';
import { FileText, AlertTriangle, MessageSquare } from "lucide-react";
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

        <div className="tf-grid tf-grid-cols-1 tf-gap-6">
          {/* Special Instructions */}
          <div className="tf-form-group">
            <label htmlFor="specialInstructions" className="tf-label">
              <MessageSquare className="tf-label-icon" />
              Special Instructions
            </label>
            <textarea
              id="specialInstructions"
              value={formData.additionalInfo?.specialInstructions || ''}
              onChange={(e) => handleFieldChange('specialInstructions', e.target.value)}
              onBlur={() => onFieldTouch?.('additionalInfo.specialInstructions')}
              placeholder="Enter any special handling instructions, scheduling requirements, or procedural notes..."
              className="tf-textarea tf-textarea-md"
              rows={4}
            />
            {validationErrors['additionalInfo.specialInstructions'] && touchedFields.has('additionalInfo.specialInstructions') && (
              <p className="tf-error-message">{validationErrors['additionalInfo.specialInstructions']}</p>
            )}
            <p className="tf-help-text">Optional: Specific instructions for handling this transaction</p>
          </div>

          {/* Urgent Issues */}
          <div className="tf-form-group">
            <label htmlFor="urgentIssues" className="tf-label">
              <AlertTriangle className="tf-label-icon" />
              Urgent Issues or Time-Sensitive Items
            </label>
            <textarea
              id="urgentIssues"
              value={formData.additionalInfo?.urgentIssues || ''}
              onChange={(e) => handleFieldChange('urgentIssues', e.target.value)}
              onBlur={() => onFieldTouch?.('additionalInfo.urgentIssues')}
              placeholder="Describe any urgent issues, critical deadlines, or time-sensitive matters that require immediate attention..."
              className="tf-textarea tf-textarea-md"
              rows={3}
            />
            {validationErrors['additionalInfo.urgentIssues'] && touchedFields.has('additionalInfo.urgentIssues') && (
              <p className="tf-error-message">{validationErrors['additionalInfo.urgentIssues']}</p>
            )}
            <p className="tf-help-text">Optional: Critical or time-sensitive information</p>
          </div>

          {/* General Notes */}
          <div className="tf-form-group">
            <label htmlFor="notes" className="tf-label">
              <FileText className="tf-label-icon" />
              General Notes
            </label>
            <textarea
              id="notes"
              value={formData.additionalInfo?.notes || ''}
              onChange={(e) => handleFieldChange('notes', e.target.value)}
              onBlur={() => onFieldTouch?.('additionalInfo.notes')}
              placeholder="Add any additional comments, observations, or general information about this transaction..."
              className="tf-textarea tf-textarea-lg"
              rows={5}
            />
            {validationErrors['additionalInfo.notes'] && touchedFields.has('additionalInfo.notes') && (
              <p className="tf-error-message">{validationErrors['additionalInfo.notes']}</p>
            )}
            <p className="tf-help-text">Optional: Any other relevant information or comments</p>
          </div>
        </div>
      </div>
    </div>
  );
};
