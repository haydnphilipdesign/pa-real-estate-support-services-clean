import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { SignatureData } from "@/types/transaction";
import { PenTool, FileText, CheckCircle } from "lucide-react";

interface SignatureSectionProps {
  data: SignatureData;
  onChange: (field: keyof SignatureData, value: any) => void;
  role?: string;
  onSubmit?: () => void;
  skippedFields?: string[];
  onFieldFix?: (field: string) => void;
}

export const SignatureSection: React.FC<SignatureSectionProps> = ({
  data,
  onChange
}: SignatureSectionProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof SignatureData, value: any) => {
    // Clear error when field is changed
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    onChange(field, value);

    // If signature field changes, also update agentName field
    if (field === 'signature') {
      onChange('agentName', value);
    }
  };

  // Set the date and sync agent name when the component loads
  useEffect(() => {
    if (!data.dateSubmitted) {
      onChange('dateSubmitted', new Date().toISOString().split('T')[0]);
    }

    // If signature exists but agentName is not set, update it
    if (data.signature && !data.agentName) {
      onChange('agentName', data.signature);
    }
  }, []);

  // Removed unused functions

  return (
    <div className="tf-signature-section">
      <div className="tf-glass-card tf-no-hover">
        <div className="tf-flex tf-items-center tf-mb-4">
          <div className="tf-icon-container">
            <PenTool className="tf-icon" />
          </div>
          <div>
            <h3 className="tf-heading-secondary">Electronic Signature</h3>
            <p className="tf-text-subtitle">Complete your electronic signature and acknowledgements</p>
          </div>
        </div>

        <div className="tf-grid tf-grid-cols-1 md:tf-grid-cols-2 tf-gap-6">
          {/* Signature Input */}
          <div className="tf-signature-input">
            <div className="tf-form-group">
              <label htmlFor="signature" className="tf-label">
                <PenTool className="tf-label-icon" />
                Your Full Name <span className="tf-label-required">*</span>
              </label>
              <input
                id="signature"
                type="text"
                value={data.signature || ''}
                onChange={(e) => handleChange("signature", e.target.value)}
                placeholder="Type your full legal name"
                className="tf-input"
                required
              />
              {errors.signature && (
                <p className="tf-error-message">{errors.signature}</p>
              )}

              {/* Hidden field for agentName */}
              <input
                type="hidden"
                id="agentName"
                value={data.agentName || ''}
              />

              <p className="tf-help-text">
                Your typed name above constitutes your electronic signature for this transaction.
              </p>
            </div>
          </div>

          {/* Acknowledgements */}
          <div className="tf-acknowledgements">
            <div className="tf-glass-card-light">
              <div className="tf-flex tf-items-center tf-mb-4">
                <div className="tf-icon-container">
                  <CheckCircle className="tf-icon" />
                </div>
                <h4 className="tf-heading-tertiary">Acknowledgements</h4>
              </div>

              <div className="tf-checkbox-group">
                <Checkbox
                  id="termsAccepted"
                  checked={data.termsAccepted || false}
                  onCheckedChange={(checked) =>
                    handleChange("termsAccepted", checked === true)}
                  className="tf-checkbox"
                />
                <div className="tf-checkbox-content">
                  <label htmlFor="termsAccepted" className="tf-checkbox-label">
                    I accept the <a href="/terms" target="_blank" rel="noopener noreferrer" className="tf-link">terms and conditions</a> and understand my legal obligations related to this transaction.
                  </label>
                </div>
              </div>

              <div className="tf-checkbox-group tf-mt-4">
                <Checkbox
                  id="infoConfirmed"
                  checked={data.infoConfirmed || false}
                  onCheckedChange={(checked) =>
                    handleChange("infoConfirmed", checked === true)}
                  className="tf-checkbox"
                />
                <div className="tf-checkbox-content">
                  <label htmlFor="infoConfirmed" className="tf-checkbox-label">
                    I confirm all information provided in this transaction form is accurate, complete, and truthful to the best of my knowledge.
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}