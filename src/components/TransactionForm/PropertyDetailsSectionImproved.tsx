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
      {/* Enhanced Glass Card with Wider Container - No Hover Effects */}
      <div className="tf-glass-card tf-no-hover">
        
        {/* Section Header */}
        <div className="tf-flex tf-items-center tf-mb-6">
          <div className="tf-icon-container">
            <Building className="tf-icon" />
          </div>
          <div>
            <h3 className="tf-heading-secondary">Property Details</h3>
            <p className="tf-text-subtitle">Configure property requirements and additional details</p>
          </div>
        </div>

        {/* Enhanced Responsive Layout - Better Breakpoints */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 space-y-0">
          {/* Left Column - Property Requirements */}
          <div className="tf-property-requirements">
            <div className="tf-glass-card-light">
              <h4 className="tf-heading-tertiary tf-mb-4">Property Requirements</h4>

              <div className="tf-enhanced-switch-group">
                <div className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200">
                  <Switch
                    id="resaleCertRequired"
                    checked={data?.resaleCertRequired}
                    onCheckedChange={(checked) => handleSwitchChange("resaleCertRequired", checked)}
                  />
                  <label htmlFor="resaleCertRequired" className="flex items-center space-x-2 cursor-pointer text-sm font-medium text-gray-700">
                    <Home className="w-4 h-4 text-blue-600" />
                    <span>Resale Certificate Required</span>
                  </label>
                </div>
              </div>

              {data?.resaleCertRequired && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 mt-4 border border-blue-200">
                  <div className="tf-form-field">
                    <label htmlFor="hoaName" className="tf-form-label">
                      <Building className="w-4 h-4 text-blue-600 mr-2" />
                      HOA Name
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      id="hoaName"
                      value={data?.hoaName}
                      onChange={(e) => handleFieldChange("hoaName", e.target.value)}
                      placeholder="Enter HOA name"
                      className={`tf-form-input ${errors.hoaName ? 'border-red-500' : ''}`}
                    />
                    <div className="tf-form-hint">Name of the homeowners association</div>
                    {errors.hoaName && (
                      <div className="tf-form-error">{errors.hoaName}</div>
                    )}
                  </div>
                </div>
              )}

              <div className="tf-enhanced-switch-group mt-6">
                <div className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200">
                  <Switch
                    id="coRequired"
                    checked={data?.coRequired}
                    onCheckedChange={(checked) => handleSwitchChange("coRequired", checked)}
                  />
                  <label htmlFor="coRequired" className="flex items-center space-x-2 cursor-pointer text-sm font-medium text-gray-700">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>Certificate of Occupancy Required</span>
                  </label>
                </div>
              </div>

              {data?.coRequired && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 mt-4 border border-blue-200">
                  <div className="tf-form-field">
                    <label htmlFor="municipality" className="tf-form-label">
                      <Building className="w-4 h-4 text-blue-600 mr-2" />
                      Municipality
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      id="municipality"
                      value={data?.municipality}
                      onChange={(e) => handleFieldChange("municipality", e.target.value)}
                      placeholder="Enter municipality name"
                      className="tf-form-input"
                    />
                    <div className="tf-form-hint">Local municipality issuing the CO</div>
                  </div>
                </div>
              )}

              <div className="tf-enhanced-switch-group mt-6">
                <div className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200">
                  <Switch
                    id="firstRightOfRefusal"
                    checked={data?.firstRightOfRefusal}
                    onCheckedChange={(checked) => handleSwitchChange("firstRightOfRefusal", checked)}
                  />
                  <label htmlFor="firstRightOfRefusal" className="flex items-center space-x-2 cursor-pointer text-sm font-medium text-gray-700">
                    <User className="w-4 h-4 text-blue-600" />
                    <span>First Right of Refusal</span>
                  </label>
                </div>
              </div>

              {data?.firstRightOfRefusal && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 mt-4 border border-blue-200">
                  <div className="tf-form-field">
                    <label htmlFor="firstRightName" className="tf-form-label">
                      <User className="w-4 h-4 text-blue-600 mr-2" />
                      First Right Holder Name
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      id="firstRightName"
                      value={data?.firstRightName}
                      onChange={(e) => handleFieldChange("firstRightName", e.target.value)}
                      placeholder="Enter name of entity with first right"
                      className="tf-form-input"
                    />
                    <div className="tf-form-hint">Name of person/entity with first right of refusal</div>
                  </div>
                </div>
              )}
            </div>

            {/* Title Company Information */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 mt-6 border border-green-200">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-lg mr-3">
                  <Landmark className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">Title Company</h4>
              </div>

              <div className="tf-form-field">
                <label htmlFor="titleCompany" className="tf-form-label">
                  <Landmark className="w-4 h-4 text-green-600 mr-2" />
                  Title Company Name
                </label>
                <input
                  id="titleCompany"
                  value={titleData?.titleCompany}
                  onChange={(e) => onTitleChange?.("titleCompany", e.target.value)}
                  placeholder="Enter title company name"
                  className="tf-form-input"
                />
                <div className="tf-form-hint">Primary title company for this transaction</div>
              </div>
            </div>
          </div>

          {/* Right Column - Attorney and Warranty */}
          <div className="tf-legal-warranty">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-6">Legal Representation</h4>

              <div className="tf-enhanced-switch-group">
                <div className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200">
                  <Switch
                    id="attorneyRepresentation"
                    checked={data?.attorneyRepresentation}
                    onCheckedChange={(checked) => handleSwitchChange("attorneyRepresentation", checked)}
                  />
                  <label htmlFor="attorneyRepresentation" className="flex items-center space-x-2 cursor-pointer text-sm font-medium text-gray-700">
                    <FileText className="w-4 h-4 text-purple-600" />
                    <span>Attorney Representation Required</span>
                  </label>
                </div>
              </div>

              {data?.attorneyRepresentation && (
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 mt-4 border border-purple-200">
                  <div className="tf-form-field">
                    <label htmlFor="attorneyName" className="tf-form-label">
                      <User className="w-4 h-4 text-purple-600 mr-2" />
                      Attorney Name
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      id="attorneyName"
                      value={data?.attorneyName}
                      onChange={(e) => handleFieldChange("attorneyName", e.target.value)}
                      placeholder="Enter attorney name"
                      className="tf-form-input"
                    />
                    <div className="tf-form-hint">Name of the representing attorney</div>
                  </div>
                </div>
              )}
            </div>

            {/* Home Warranty - Available for All Agent Types */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 mt-6 border border-blue-200">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-lg mr-3">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">Home Warranty</h4>
              </div>

              <div className="tf-enhanced-switch-group">
                <div className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200">
                  <Switch
                    id="homeWarranty"
                    checked={data.homeWarranty}
                    onCheckedChange={(checked) => handleSwitchChange("homeWarranty", checked)}
                  />
                  <label htmlFor="homeWarranty" className="flex items-center space-x-2 cursor-pointer text-sm font-medium text-gray-700">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span>Home Warranty Included</span>
                  </label>
                </div>
              </div>

              {data.homeWarranty && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 mt-4 border border-blue-200">
                  <div className="space-y-6">
                    <div className="tf-form-field">
                      <label htmlFor="warrantyCompany" className="tf-form-label">
                        <Shield className="w-4 h-4 text-blue-600 mr-2" />
                        Warranty Company
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        id="warrantyCompany"
                        value={data.warrantyCompany}
                        onChange={(e) => handleFieldChange("warrantyCompany", e.target.value)}
                        placeholder="e.g. American Home Shield"
                        required
                        className="tf-form-input"
                      />
                      <div className="tf-form-hint">Name of the warranty provider</div>
                    </div>

                    <div className="tf-form-field">
                      <label htmlFor="warrantyCost" className="tf-form-label">
                        <Shield className="w-4 h-4 text-blue-600 mr-2" />
                        Warranty Cost
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                        <input
                          id="warrantyCost"
                          value={data.warrantyCost}
                          onChange={(e) => handleFieldChange("warrantyCost", e.target.value)}
                          placeholder="500"
                          required
                          type="text"
                          className={`tf-form-input pl-8 ${errors.warrantyCost ? 'border-red-500' : ''}`}
                          aria-invalid={!!errors.warrantyCost}
                        />
                      </div>
                      <div className="tf-form-hint">Annual cost of the warranty</div>
                      {errors.warrantyCost && <div className="tf-form-error">{errors.warrantyCost}</div>}
                    </div>

                    <div className="tf-form-field">
                      <label htmlFor="warrantyPaidBy" className="tf-form-label">
                        <Shield className="w-4 h-4 text-blue-600 mr-2" />
                        Warranty Paid By
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <Select
                        value={data.warrantyPaidBy}
                        onValueChange={(value) => handleFieldChange("warrantyPaidBy", value)}
                      >
                        <SelectTrigger className="tf-form-input">
                          <SelectValue placeholder="Select who pays" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SELLER">Seller</SelectItem>
                          <SelectItem value="BUYER">Buyer</SelectItem>
                          <SelectItem value="AGENT">Agent</SelectItem>
                          <SelectItem value="SPLIT">Split</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="tf-form-hint">Who is responsible for warranty payment</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
