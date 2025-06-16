import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PropertyDetailsData, TitleCompanyData } from "@/types/transaction";
import { Building, FileSpreadsheet, Shield, Home, User, FileText, Landmark } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { AgentRole } from "@/types/transaction";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PropertyDetailsSectionProps {
  data: PropertyDetailsData;
  onChange: (field: keyof PropertyDetailsData, value: any) => void;
  role: AgentRole;
  titleData?: TitleCompanyData;
  onTitleChange?: (field: string, value: any) => void;
}

export const PropertyDetailsSection: React.FC<PropertyDetailsSectionProps> = ({
  data,
  onChange,
  role,
  titleData,
  onTitleChange
}) => {
  // isListingOrDual is kept for home warranty section but not used for resale certificate
  const isListingOrDual = role === 'LISTING AGENT' || role === 'DUAL AGENT';
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string) => {
    switch (field) {
      case "warrantyCost":
        if (value === '') return '';
        const cost = parseFloat(value);
        return !isNaN(cost) && cost >= 0 ? "" : "Invalid cost amount";
      default:
        return value.trim() ? "" : "This field is required";
    }
  };

  const handleWarrantyChange = (field: keyof PropertyDetailsData, value: string | boolean) => {
    if (typeof value === 'string') {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
    onChange(field, value);
  };

  return (
    <div className="tf-property-details">
      <div className="tf-glass-card">
        <div className="tf-flex tf-items-center tf-mb-4">
          <div className="tf-icon-container">
            <Building className="tf-icon" />
          </div>
          <div>
            <h3 className="tf-heading-secondary">Property Details</h3>
            <p className="tf-text-subtitle">Configure property requirements and additional details</p>
          </div>
        </div>

        <div className="tf-grid tf-grid-cols-1 md:tf-grid-cols-2 tf-gap-6">
          {/* Left Column - Property Requirements */}
          <div className="tf-property-requirements">
            <div className="tf-glass-card-light">
              <h4 className="tf-heading-tertiary tf-mb-4">Property Requirements</h4>

              <div className="tf-switch-group">
                <Switch
                  id="resaleCertRequired"
                  checked={data?.resaleCertRequired}
                  onCheckedChange={(checked) => onChange?.("resaleCertRequired", checked)}
                />
                <label htmlFor="resaleCertRequired" className="tf-switch-label">
                  <Home className="tf-label-icon" />
                  Resale Certificate Required
                </label>
              </div>

              {data?.resaleCertRequired && (
                <div className="tf-glass-card tf-mt-4">
                  <div className="tf-form-group">
                    <label htmlFor="hoaName" className="tf-label">
                      <Building className="tf-label-icon" />
                      HOA Name
                    </label>
                    <input
                      id="hoaName"
                      value={data?.hoaName}
                      onChange={(e) => onChange?.("hoaName", e.target.value)}
                      placeholder="Enter HOA name"
                      className="tf-input"
                    />
                  </div>
                </div>
              )}

              <div className="tf-switch-group tf-mt-4">
                <Switch
                  id="coRequired"
                  checked={data?.coRequired}
                  onCheckedChange={(checked) => onChange?.("coRequired", checked)}
                />
                <label htmlFor="coRequired" className="tf-switch-label">
                  <FileText className="tf-label-icon" />
                  CO Required
                </label>
              </div>

              {data?.coRequired && (
                <div className="tf-glass-card tf-mt-4">
                  <div className="tf-form-group">
                    <label htmlFor="municipality" className="tf-label">
                      <Building className="tf-label-icon" />
                      Municipality
                    </label>
                    <input
                      id="municipality"
                      value={data?.municipality}
                      onChange={(e) => onChange?.("municipality", e.target.value)}
                      placeholder="Enter municipality"
                      className="tf-input"
                    />
                  </div>
                </div>
              )}

              <div className="tf-switch-group tf-mt-4">
                <Switch
                  id="firstRightOfRefusal"
                  checked={data?.firstRightOfRefusal}
                  onCheckedChange={(checked) => onChange?.("firstRightOfRefusal", checked)}
                />
                <label htmlFor="firstRightOfRefusal" className="tf-switch-label">
                  <User className="tf-label-icon" />
                  First Right of Refusal
                </label>
              </div>

              {data?.firstRightOfRefusal && (
                <div className="tf-glass-card tf-mt-4">
                  <div className="tf-form-group">
                    <label htmlFor="firstRightName" className="tf-label">
                      <User className="tf-label-icon" />
                      First Right Name
                    </label>
                    <input
                      id="firstRightName"
                      value={data?.firstRightName}
                      onChange={(e) => onChange?.("firstRightName", e.target.value)}
                      placeholder="Enter first right name"
                      className="tf-input"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Title Company Information */}
            <div className="tf-glass-card-light tf-mt-6">
              <h4 className="tf-heading-tertiary tf-mb-4">
                <Landmark className="tf-label-icon" />
                Title Company
              </h4>

              <div className="tf-form-group">
                <label htmlFor="titleCompany" className="tf-label">
                  <Landmark className="tf-label-icon" />
                  Title Company Name
                </label>
                <input
                  id="titleCompany"
                  value={titleData?.titleCompany}
                  onChange={(e) => onTitleChange?.("titleCompany", e.target.value)}
                  placeholder="Enter title company name"
                  className="tf-input"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Attorney and Warranty */}
          <div className="tf-legal-warranty">
            <div className="tf-glass-card-light">
              <h4 className="tf-heading-tertiary tf-mb-4">Legal Representation</h4>

              <div className="tf-switch-group">
                <Switch
                  id="attorneyRepresentation"
                  checked={data?.attorneyRepresentation}
                  onCheckedChange={(checked) => onChange?.("attorneyRepresentation", checked)}
                />
                <label htmlFor="attorneyRepresentation" className="tf-switch-label">
                  <FileText className="tf-label-icon" />
                  Attorney Representation
                </label>
              </div>

              {data?.attorneyRepresentation && (
                <div className="tf-glass-card tf-mt-4">
                  <div className="tf-form-group">
                    <label htmlFor="attorneyName" className="tf-label">
                      <User className="tf-label-icon" />
                      Attorney Name
                    </label>
                    <input
                      id="attorneyName"
                      value={data?.attorneyName}
                      onChange={(e) => onChange?.("attorneyName", e.target.value)}
                      placeholder="Enter attorney name"
                      className="tf-input"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Home Warranty - Only Shown if role is Listing Agent or Dual Agent */}
            {isListingOrDual && (
              <div className="tf-glass-card-light tf-mt-6">
                <h4 className="tf-heading-tertiary tf-mb-4">
                  <Shield className="tf-label-icon" />
                  Home Warranty
                </h4>

                <div className="tf-switch-group">
                  <Switch
                    id="homeWarranty"
                    checked={data.homeWarranty}
                    onCheckedChange={(checked) => handleWarrantyChange("homeWarranty", checked)}
                  />
                  <label htmlFor="homeWarranty" className="tf-switch-label">
                    Home Warranty Included
                  </label>
                </div>

                {data.homeWarranty && (
                  <div className="tf-glass-card tf-mt-4">
                    <div className="tf-grid tf-grid-cols-1 tf-gap-4">
                      <div className="tf-form-group">
                        <label htmlFor="warrantyCompany" className="tf-label">
                          <Shield className="tf-label-icon" />
                          Warranty Company <span className="tf-label-required">*</span>
                        </label>
                        <input
                          id="warrantyCompany"
                          value={data.warrantyCompany}
                          onChange={(e) => handleWarrantyChange("warrantyCompany", e.target.value)}
                          placeholder="Enter company name"
                          required
                          className="tf-input"
                        />
                      </div>

                      <div className="tf-form-group">
                        <label htmlFor="warrantyCost" className="tf-label">
                          <Shield className="tf-label-icon" />
                          Warranty Cost <span className="tf-label-required">*</span>
                        </label>
                        <div className="tf-input-wrapper">
                          <span className="tf-input-prefix">$</span>
                          <input
                            id="warrantyCost"
                            value={data.warrantyCost}
                            onChange={(e) => handleWarrantyChange("warrantyCost", e.target.value)}
                            placeholder="Enter cost"
                            required
                            type="text"
                            className={`tf-input tf-input-currency ${errors.warrantyCost ? 'tf-input-error' : ''}`}
                            aria-invalid={!!errors.warrantyCost}
                          />
                        </div>
                        {errors.warrantyCost && <p className="tf-error-message">{errors.warrantyCost}</p>}
                      </div>

                      <div className="tf-form-group">
                        <label htmlFor="warrantyPaidBy" className="tf-label">
                          <Shield className="tf-label-icon" />
                          Warranty Paid By <span className="tf-label-required">*</span>
                        </label>
                        <Select
                          value={data.warrantyPaidBy}
                          onValueChange={(value) => onChange("warrantyPaidBy", value)}
                        >
                          <SelectTrigger className="tf-select">
                            <SelectValue placeholder="Select who pays" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SELLER">Seller</SelectItem>
                            <SelectItem value="BUYER">Buyer</SelectItem>
                            <SelectItem value="AGENT">Agent</SelectItem>
                            <SelectItem value="SPLIT">Split</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
