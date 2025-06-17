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

  const validateField = (field: string, value: string, isRequired: boolean = false) => {
    // If field is empty and not required, return no error
    if (value === '' && !isRequired) return '';
    
    // If field is empty and required, return error
    if (value === '' && isRequired) return 'This field is required';

    switch (field) {
      case "warrantyCost":
        const cost = parseFloat(value);
        if (isNaN(cost) || cost < 0) {
          return "Please enter a valid cost amount";
        }
        if (cost > 10000) {
          return "Cost seems unusually high. Please verify.";
        }
        return "";
      case "warrantyCompany":
        return value.trim().length >= 2 ? "" : "Please enter a valid company name";
      case "hoaName":
        return value.trim().length >= 2 ? "" : "Please enter a valid HOA name";
      case "municipality": 
        return value.trim().length >= 2 ? "" : "Please enter a valid municipality";
      case "firstRightName":
        return value.trim().length >= 2 ? "" : "Please enter a valid name";
      case "attorneyName":
        return value.trim().length >= 2 ? "" : "Please enter a valid attorney name";
      default:
        return value.trim() ? "" : "This field is required";
    }
  };

  const handleFieldChange = (field: keyof PropertyDetailsData, value: string | boolean) => {
    // Clear error when field changes
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // For conditional required fields, validate based on parent field state
    if (typeof value === 'string') {
      let isRequired = false;
      
      // Check if field is conditionally required
      if (field === 'warrantyCompany' && data.homeWarranty) isRequired = true;
      if (field === 'warrantyCost' && data.homeWarranty) isRequired = true;
      if (field === 'hoaName' && data.resaleCertRequired) isRequired = true;
      if (field === 'municipality' && data.coRequired) isRequired = true;
      if (field === 'firstRightName' && data.firstRightOfRefusal) isRequired = true;
      if (field === 'attorneyName' && data.attorneyRepresentation) isRequired = true;

      const error = validateField(field, value, isRequired);
      if (error) {
        setErrors(prev => ({ ...prev, [field]: error }));
      }
    }
    
    onChange(field, value);
  };

  // Handle switch changes and clear dependent fields when disabled
  const handleSwitchChange = (field: keyof PropertyDetailsData, checked: boolean) => {
    onChange(field, checked);
    
    // Clear dependent fields when switch is turned off
    if (!checked) {
      switch (field) {
        case 'homeWarranty':
          onChange('warrantyCompany', '');
          onChange('warrantyCost', '');
          onChange('warrantyPaidBy', 'SELLER');
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.warrantyCompany;
            delete newErrors.warrantyCost;
            return newErrors;
          });
          break;
        case 'resaleCertRequired':
          onChange('hoaName', '');
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.hoaName;
            return newErrors;
          });
          break;
        case 'coRequired':
          onChange('municipality', '');
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.municipality;
            return newErrors;
          });
          break;
        case 'firstRightOfRefusal':
          onChange('firstRightName', '');
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.firstRightName;
            return newErrors;
          });
          break;
        case 'attorneyRepresentation':
          onChange('attorneyName', '');
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.attorneyName;
            return newErrors;
          });
          break;
      }
    }
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
                  onCheckedChange={(checked) => handleSwitchChange("resaleCertRequired", checked)}
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
                      onChange={(e) => handleFieldChange("hoaName", e.target.value)}
                      placeholder="Enter HOA name"
                      className={`tf-input ${errors.hoaName ? 'tf-input-error' : ''}`}
                    />
                    {errors.hoaName && (
                      <p className="tf-error-message">{errors.hoaName}</p>
                    )}
                  </div>
                </div>
              )}

              <div className="tf-switch-group tf-mt-4">
                <Switch
                  id="coRequired"
                  checked={data?.coRequired}
                  onCheckedChange={(checked) => handleSwitchChange("coRequired", checked)}
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
                      onChange={(e) => handleFieldChange("municipality", e.target.value)}
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
                  onCheckedChange={(checked) => handleSwitchChange("firstRightOfRefusal", checked)}
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
                      onChange={(e) => handleFieldChange("firstRightName", e.target.value)}
                      placeholder="Enter first right name"
                      className="tf-input"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Title Company Information */}
            <div className="tf-glass-card-light tf-mt-6">
              <div className="tf-flex tf-items-center tf-mb-4">
                <div className="tf-icon-container">
                  <Landmark className="tf-icon" />
                </div>
                <h4 className="tf-heading-tertiary">Title Company</h4>
              </div>

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
                  onCheckedChange={(checked) => handleSwitchChange("attorneyRepresentation", checked)}
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
                      onChange={(e) => handleFieldChange("attorneyName", e.target.value)}
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
                    onCheckedChange={(checked) => handleSwitchChange("homeWarranty", checked)}
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
                          onChange={(e) => handleFieldChange("warrantyCompany", e.target.value)}
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
                            onChange={(e) => handleFieldChange("warrantyCost", e.target.value)}
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
                          onValueChange={(value) => handleFieldChange("warrantyPaidBy", value)}
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
