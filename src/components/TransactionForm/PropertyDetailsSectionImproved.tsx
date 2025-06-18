import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PropertyDetailsData, TitleCompanyData } from "@/types/transaction";
import { Building, Shield, Home, User, FileText, Landmark, CheckCircle, AlertCircle, DollarSign, FileCheck } from "lucide-react";
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
    <div className="form-section">
      {/* Enhanced Section Header */}
      <div className="form-section-header">
        <div className="form-section-icon">
          <Building className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="form-section-title">Property Details</h3>
          <p className="form-section-description">
            Configure property requirements, legal representation, and warranty information
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2 text-sm text-neutral-500">
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Professional Setup</span>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Property Requirements Section */}
        <div className="property-details-section">
          <div className="property-details-section-header">
            <FileCheck className="w-5 h-5 text-blue-600" />
            <h4 className="property-details-section-title">Property Requirements</h4>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* HOA Requirements */}
            <div className="property-requirement-card">
              <div className="property-requirement-header">
                <div className="property-requirement-toggle">
                  <Switch
                    id="resaleCertRequired"
                    checked={data?.resaleCertRequired}
                    onCheckedChange={(checked) => handleSwitchChange("resaleCertRequired", checked)}
                  />
                </div>
                <div className="property-requirement-info">
                  <div className="property-requirement-title">
                    <Home className="w-5 h-5 text-blue-600" />
                    <span>Resale Certificate Required</span>
                  </div>
                  <p className="property-requirement-description">
                    HOA documentation required for sale
                  </p>
                </div>
              </div>

              {data?.resaleCertRequired && (
                <div className="property-requirement-content">
                  <div className="form-group">
                    <label htmlFor="hoaName" className="form-label">
                      <Building className="w-4 h-4" />
                      HOA Name
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <Input
                      id="hoaName"
                      value={data?.hoaName}
                      onChange={(e) => handleFieldChange("hoaName", e.target.value)}
                      placeholder="Enter HOA name"
                      className={`form-input ${errors.hoaName ? 'border-red-500' : ''}`}
                    />
                    {errors.hoaName && (
                      <p className="text-sm text-red-600 flex items-center mt-1">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.hoaName}
                      </p>
                    )}
                    <div className="text-sm text-neutral-500 mt-1">
                      Name of the homeowners association
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Certificate of Occupancy */}
            <div className="property-requirement-card">
              <div className="property-requirement-header">
                <div className="property-requirement-toggle">
                  <Switch
                    id="coRequired"
                    checked={data?.coRequired}
                    onCheckedChange={(checked) => handleSwitchChange("coRequired", checked)}
                  />
                </div>
                <div className="property-requirement-info">
                  <div className="property-requirement-title">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span>Certificate of Occupancy Required</span>
                  </div>
                  <p className="property-requirement-description">
                    Municipal CO documentation needed
                  </p>
                </div>
              </div>

              {data?.coRequired && (
                <div className="property-requirement-content">
                  <div className="form-group">
                    <label htmlFor="municipality" className="form-label">
                      <Building className="w-4 h-4" />
                      Municipality
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <Input
                      id="municipality"
                      value={data?.municipality}
                      onChange={(e) => handleFieldChange("municipality", e.target.value)}
                      placeholder="Enter municipality name"
                      className={`form-input ${errors.municipality ? 'border-red-500' : ''}`}
                    />
                    {errors.municipality && (
                      <p className="text-sm text-red-600 flex items-center mt-1">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.municipality}
                      </p>
                    )}
                    <div className="text-sm text-neutral-500 mt-1">
                      Local municipality issuing the CO
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* First Right of Refusal */}
            <div className="property-requirement-card">
              <div className="property-requirement-header">
                <div className="property-requirement-toggle">
                  <Switch
                    id="firstRightOfRefusal"
                    checked={data?.firstRightOfRefusal}
                    onCheckedChange={(checked) => handleSwitchChange("firstRightOfRefusal", checked)}
                  />
                </div>
                <div className="property-requirement-info">
                  <div className="property-requirement-title">
                    <User className="w-5 h-5 text-blue-600" />
                    <span>First Right of Refusal</span>
                  </div>
                  <p className="property-requirement-description">
                    Special rights held by third parties
                  </p>
                </div>
              </div>

              {data?.firstRightOfRefusal && (
                <div className="property-requirement-content">
                  <div className="form-group">
                    <label htmlFor="firstRightName" className="form-label">
                      <User className="w-4 h-4" />
                      First Right Holder Name
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <Input
                      id="firstRightName"
                      value={data?.firstRightName}
                      onChange={(e) => handleFieldChange("firstRightName", e.target.value)}
                      placeholder="Enter name of entity with first right"
                      className={`form-input ${errors.firstRightName ? 'border-red-500' : ''}`}
                    />
                    {errors.firstRightName && (
                      <p className="text-sm text-red-600 flex items-center mt-1">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.firstRightName}
                      </p>
                    )}
                    <div className="text-sm text-neutral-500 mt-1">
                      Name of person/entity with first right of refusal
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Attorney Representation */}
            <div className="property-requirement-card">
              <div className="property-requirement-header">
                <div className="property-requirement-toggle">
                  <Switch
                    id="attorneyRepresentation"
                    checked={data?.attorneyRepresentation}
                    onCheckedChange={(checked) => handleSwitchChange("attorneyRepresentation", checked)}
                  />
                </div>
                <div className="property-requirement-info">
                  <div className="property-requirement-title">
                    <FileText className="w-5 h-5 text-purple-600" />
                    <span>Attorney Representation</span>
                  </div>
                  <p className="property-requirement-description">
                    Legal representation required for transaction
                  </p>
                </div>
              </div>

              {data?.attorneyRepresentation && (
                <div className="property-requirement-content">
                  <div className="form-group">
                    <label htmlFor="attorneyName" className="form-label">
                      <User className="w-4 h-4" />
                      Attorney Name
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <Input
                      id="attorneyName"
                      value={data?.attorneyName}
                      onChange={(e) => handleFieldChange("attorneyName", e.target.value)}
                      placeholder="Enter attorney name"
                      className={`form-input ${errors.attorneyName ? 'border-red-500' : ''}`}
                    />
                    {errors.attorneyName && (
                      <p className="text-sm text-red-600 flex items-center mt-1">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.attorneyName}
                      </p>
                    )}
                    <div className="text-sm text-neutral-500 mt-1">
                      Name of the representing attorney
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Service Providers Section */}
        <div className="property-details-section">
          <div className="property-details-section-header">
            <Landmark className="w-5 h-5 text-green-600" />
            <h4 className="property-details-section-title">Service Providers</h4>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Title Company */}
            <div className="service-provider-card">
              <div className="service-provider-header">
                <div className="service-provider-icon">
                  <Landmark className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h5 className="service-provider-title">Title Company</h5>
                  <p className="service-provider-description">Primary title company for this transaction</p>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="titleCompany" className="form-label">
                  <Landmark className="w-4 h-4" />
                  Company Name
                </label>
                <Input
                  id="titleCompany"
                  value={titleData?.titleCompany}
                  onChange={(e) => onTitleChange?.("titleCompany", e.target.value)}
                  placeholder="Enter title company name"
                  className="form-input"
                />
                <div className="text-sm text-neutral-500 mt-1">
                  Full name of the title insurance company
                </div>
              </div>
            </div>

            {/* Home Warranty */}
            <div className="service-provider-card">
              <div className="service-provider-header">
                <div className="service-provider-icon">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h5 className="service-provider-title">Home Warranty</h5>
                  <p className="service-provider-description">Protection plan for home systems and appliances</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="warranty-toggle">
                  <Switch
                    id="homeWarranty"
                    checked={data.homeWarranty}
                    onCheckedChange={(checked) => handleSwitchChange("homeWarranty", checked)}
                  />
                  <label htmlFor="homeWarranty" className="warranty-toggle-label">
                    Include Home Warranty
                  </label>
                </div>

                {data.homeWarranty && (
                  <div className="warranty-details">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="form-group">
                        <label htmlFor="warrantyCompany" className="form-label">
                          <Shield className="w-4 h-4" />
                          Warranty Company
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <Input
                          id="warrantyCompany"
                          value={data.warrantyCompany}
                          onChange={(e) => handleFieldChange("warrantyCompany", e.target.value)}
                          placeholder="e.g. American Home Shield"
                          className={`form-input ${errors.warrantyCompany ? 'border-red-500' : ''}`}
                        />
                        {errors.warrantyCompany && (
                          <p className="text-sm text-red-600 flex items-center mt-1">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.warrantyCompany}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-group">
                          <label htmlFor="warrantyCost" className="form-label">
                            <DollarSign className="w-4 h-4" />
                            Annual Cost
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 text-sm">$</span>
                            <Input
                              id="warrantyCost"
                              value={data.warrantyCost}
                              onChange={(e) => handleFieldChange("warrantyCost", e.target.value)}
                              placeholder="500"
                              type="text"
                              className={`form-input pl-8 ${errors.warrantyCost ? 'border-red-500' : ''}`}
                            />
                          </div>
                          {errors.warrantyCost && (
                            <p className="text-sm text-red-600 flex items-center mt-1">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.warrantyCost}
                            </p>
                          )}
                        </div>

                        <div className="form-group">
                          <label htmlFor="warrantyPaidBy" className="form-label">
                            <User className="w-4 h-4" />
                            Paid By
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <Select
                            value={data.warrantyPaidBy}
                            onValueChange={(value) => handleFieldChange("warrantyPaidBy", value)}
                          >
                            <SelectTrigger className="form-select">
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
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
