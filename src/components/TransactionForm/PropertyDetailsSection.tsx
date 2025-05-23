import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { PropertyDetailsData, TitleCompanyData } from "@/types/transaction";
import { Building, FileSpreadsheet, Shield, Home, FileText, User, Landmark } from "lucide-react";
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
    <div className="space-y-6 w-full max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column - Property Information */}
        <div className="space-y-6">
          <div className="rounded-xl border border-white/20 shadow-md p-6 glass-effect backdrop-blur-lg w-full">
            <h3 className="text-lg font-medium text-white mb-6 flex items-center">
              <Building className="h-5 w-5 mr-2 text-blue-300" />
              Property Requirements
            </h3>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="resaleCertRequired" className="flex items-center text-white text-sm">
                    <Home className="h-4 w-4 mr-2 text-blue-300" />
                    Resale Certificate Required
                  </Label>
                  <Switch
                    id="resaleCertRequired"
                    checked={data?.resaleCertRequired}
                    onCheckedChange={(checked) => onChange?.("resaleCertRequired", checked)}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
                {data?.resaleCertRequired && (
                  <div className="mt-2 ml-4 pl-4 border-l-2 border-blue-400/30 space-y-2">
                    <Label htmlFor="hoaName" className="text-white text-sm block">HOA Name</Label>
                    <Input
                      id="hoaName"
                      value={data?.hoaName}
                      onChange={(e) => onChange?.("hoaName", e.target.value)}
                      placeholder="Enter HOA name"
                      className="border-white/20 w-full text-sm"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="coRequired" className="flex items-center text-white text-sm">
                    <FileText className="h-4 w-4 mr-2 text-blue-300" />
                    CO Required
                  </Label>
                  <Switch
                    id="coRequired"
                    checked={data?.coRequired}
                    onCheckedChange={(checked) => onChange?.("coRequired", checked)}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
                {data?.coRequired && (
                  <div className="mt-2 ml-4 pl-4 border-l-2 border-blue-400/30 space-y-2">
                    <Label htmlFor="municipality" className="text-white text-sm block">Municipality</Label>
                    <Input
                      id="municipality"
                      value={data?.municipality}
                      onChange={(e) => onChange?.("municipality", e.target.value)}
                      placeholder="Enter municipality"
                      className="border-white/20 w-full text-sm"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="firstRightOfRefusal" className="flex items-center text-white text-sm">
                    <User className="h-4 w-4 mr-2 text-blue-300" />
                    First Right of Refusal
                  </Label>
                  <Switch
                    id="firstRightOfRefusal"
                    checked={data?.firstRightOfRefusal}
                    onCheckedChange={(checked) => onChange?.("firstRightOfRefusal", checked)}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
                {data?.firstRightOfRefusal && (
                  <div className="mt-2 ml-4 pl-4 border-l-2 border-blue-400/30 space-y-2">
                    <Label htmlFor="firstRightName" className="text-white text-sm block">First Right Name</Label>
                    <Input
                      id="firstRightName"
                      value={data?.firstRightName}
                      onChange={(e) => onChange?.("firstRightName", e.target.value)}
                      placeholder="Enter first right name"
                      className="border-white/20 w-full text-sm"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Title Company Information */}
          <div className="rounded-xl border border-gray-200 shadow-sm p-6 bg-white w-full">
            <h3 className="text-lg font-medium text-blue-800 mb-4 flex items-center">
              <Landmark className="h-5 w-5 mr-2 text-blue-600" />
              Title Company
            </h3>
            <div className="space-y-2 w-full">
              <Label htmlFor="titleCompany" className="text-gray-800 text-sm block">Title Company Name</Label>
              <Input
                id="titleCompany"
                value={titleData?.titleCompany}
                onChange={(e) => onTitleChange?.("titleCompany", e.target.value)}
                placeholder="Enter title company name"
                className="border-gray-300 w-full text-sm"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Attorney and Warranty */}
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 shadow-sm p-6 bg-white w-full">
            <h3 className="text-lg font-medium text-blue-800 mb-6 flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-600" />
              Legal Representation
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="attorneyRepresentation" className="flex items-center text-gray-800 text-sm">
                  <FileText className="h-4 w-4 mr-2 text-blue-600" />
                  Attorney Representation
                </Label>
                <Switch
                  id="attorneyRepresentation"
                  checked={data?.attorneyRepresentation}
                  onCheckedChange={(checked) => onChange?.("attorneyRepresentation", checked)}
                  className="data-[state=checked]:bg-blue-600"
                />
              </div>
              {data?.attorneyRepresentation && (
                <div className="mt-2 ml-4 pl-4 border-l-2 border-blue-400/30 space-y-2">
                  <Label htmlFor="attorneyName" className="text-gray-800 text-sm block">Attorney Name</Label>
                  <Input
                    id="attorneyName"
                    value={data?.attorneyName}
                    onChange={(e) => onChange?.("attorneyName", e.target.value)}
                    placeholder="Enter attorney name"
                    className="border-gray-300 w-full text-sm"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Home Warranty - Only Shown if role is Listing Agent or Dual Agent */}
          {isListingOrDual && (
            <div className="rounded-xl border border-gray-200 shadow-sm p-6 bg-white w-full" id="home-warranty-section">
              <h3 className="text-lg font-medium text-blue-800 mb-6 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-600" />
                Home Warranty
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="homeWarranty" className="flex items-center text-gray-800 text-sm">
                    Home Warranty Included
                  </Label>
                  <Switch
                    id="homeWarranty"
                    checked={data.homeWarranty}
                    onCheckedChange={(checked) => handleWarrantyChange("homeWarranty", checked)}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>

                {data.homeWarranty && (
                  <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="warrantyCompany" className="text-gray-800 text-sm block">
                        Warranty Company <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="warrantyCompany"
                        value={data.warrantyCompany}
                        onChange={(e) => handleWarrantyChange("warrantyCompany", e.target.value)}
                        placeholder="Enter company name"
                        required
                        className="border-gray-300 w-full text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="warrantyCost" className="text-gray-800 text-sm block">
                        Warranty Cost <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative w-full">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                        <Input
                          id="warrantyCost"
                          value={data.warrantyCost}
                          onChange={(e) => handleWarrantyChange("warrantyCost", e.target.value)}
                          placeholder="Enter cost"
                          required
                          type="text"
                          className={`pl-7 border-gray-300 w-full text-sm ${errors.warrantyCost ? 'border-red-500' : ''}`}
                          aria-invalid={!!errors.warrantyCost}
                          aria-describedby={errors.warrantyCost ? "warrantyCost-error" : undefined}
                        />
                      </div>
                      {errors.warrantyCost && <p id="warrantyCost-error" className="text-xs text-red-500 mt-1">{errors.warrantyCost}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="warrantyPaidBy" className="text-gray-800 text-sm block">
                        Warranty Paid By <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={data.warrantyPaidBy}
                        onValueChange={(value: 'SELLER' | 'BUYER' | 'AGENT') => handleWarrantyChange("warrantyPaidBy", value)}
                      >
                        <SelectTrigger id="warrantyPaidBy" className="border-gray-300 w-full text-sm">
                          <SelectValue placeholder="Select one..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SELLER" className="text-sm">Seller</SelectItem>
                          <SelectItem value="BUYER" className="text-sm">Buyer</SelectItem>
                          <SelectItem value="AGENT" className="text-sm">Agent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
