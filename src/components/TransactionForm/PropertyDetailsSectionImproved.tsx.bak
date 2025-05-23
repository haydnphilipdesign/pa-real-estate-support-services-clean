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
    <div className="space-y-6 w-full">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Property Information */}
        <div className="space-y-6">
          <div className="rounded-lg border border-white/20 shadow-sm p-6 glass-effect">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center">
              <Building className="h-5 w-5 mr-2 text-blue-300" />
              Property Requirements
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="resaleCertRequired" className="flex items-center text-white">
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
                <div className="space-y-2 mt-2 ml-6 pl-2 border-l-2 border-blue-400/30">
                  <Label htmlFor="hoaName" className="text-white">HOA Name</Label>
                  <Input
                    id="hoaName"
                    value={data?.hoaName}
                    onChange={(e) => onChange?.("hoaName", e.target.value)}
                    placeholder="Enter HOA name"
                    className="border-white/20"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mt-4">
              <Label htmlFor="coRequired" className="flex items-center text-white">
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
              <div className="space-y-2 mt-2 ml-6 pl-2 border-l-2 border-blue-400/30">
                <Label htmlFor="municipality" className="text-white">Municipality</Label>
                <Input
                  id="municipality"
                  value={data?.municipality}
                  onChange={(e) => onChange?.("municipality", e.target.value)}
                  placeholder="Enter municipality"
                  className="border-white/20"
                />
              </div>
            )}

            <div className="flex items-center justify-between mt-4">
              <Label htmlFor="firstRightOfRefusal" className="flex items-center text-white">
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
              <div className="space-y-2 mt-2 ml-6 pl-2 border-l-2 border-blue-400/30">
                <Label htmlFor="firstRightName" className="text-white">First Right Name</Label>
                <Input
                  id="firstRightName"
                  value={data?.firstRightName}
                  onChange={(e) => onChange?.("firstRightName", e.target.value)}
                  placeholder="Enter first right name"
                  className="border-white/20"
                />
              </div>
            )}
          </div>

          {/* Title Company Information */}
          <div className="rounded-lg border border-white/20 shadow-sm p-6 glass-effect">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center">
              <Landmark className="h-5 w-5 mr-2 text-blue-300" />
              Title Company
            </h3>

            <div className="space-y-2">
              <Label htmlFor="titleCompany" className="text-white">Title Company Name</Label>
              <Input
                id="titleCompany"
                value={titleData?.titleCompany}
                onChange={(e) => onTitleChange?.("titleCompany", e.target.value)}
                placeholder="Enter title company name"
                className="border-white/20"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Attorney and Warranty */}
        <div className="space-y-6">
          <div className="rounded-lg border border-white/20 shadow-sm p-6 glass-effect">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-300" />
              Legal Representation
            </h3>

            <div className="flex items-center justify-between">
              <Label htmlFor="attorneyRepresentation" className="flex items-center text-white">
                <FileText className="h-4 w-4 mr-2 text-blue-300" />
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
              <div className="space-y-2 mt-2 ml-6 pl-2 border-l-2 border-blue-400/30">
                <Label htmlFor="attorneyName" className="text-white">Attorney Name</Label>
                <Input
                  id="attorneyName"
                  value={data?.attorneyName}
                  onChange={(e) => onChange?.("attorneyName", e.target.value)}
                  placeholder="Enter attorney name"
                  className="border-white/20"
                />
              </div>
            )}
          </div>

          {/* Home Warranty - Only Shown if role is Listing Agent or Dual Agent */}
          {isListingOrDual && (
            <div className="rounded-lg border border-white/20 shadow-sm p-6 glass-effect">
              <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-300" />
                Home Warranty
              </h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="homeWarranty"
                    checked={data.homeWarranty}
                    onCheckedChange={(checked) => handleWarrantyChange("homeWarranty", checked)}
                    className="data-[state=checked]:bg-blue-600"
                  />
                  <Label htmlFor="homeWarranty" className="text-white">Home Warranty Included</Label>
                </div>

                {data.homeWarranty && (
                  <div className="space-y-4 mt-2 ml-6 pl-2 border-l-2 border-blue-400/30">
                    <div className="space-y-2">
                      <Label htmlFor="warrantyCompany" className="text-white">
                        Warranty Company <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="warrantyCompany"
                        value={data.warrantyCompany}
                        onChange={(e) => handleWarrantyChange("warrantyCompany", e.target.value)}
                        placeholder="Enter company name"
                        required
                        className="border-white/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="warrantyCost" className="text-white">
                        Warranty Cost <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">$</span>
                        <Input
                          id="warrantyCost"
                          value={data.warrantyCost}
                          onChange={(e) => handleWarrantyChange("warrantyCost", e.target.value)}
                          placeholder="Enter cost"
                          required
                          type="text"
                          className={`pl-7 border-white/20 ${errors.warrantyCost ? 'border-red-500' : ''}`}
                          aria-invalid={!!errors.warrantyCost}
                        />
                      </div>
                      {errors.warrantyCost && <p className="text-xs text-red-500 mt-1">{errors.warrantyCost}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="warrantyPaidBy" className="text-white">
                        Warranty Paid By <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={data.warrantyPaidBy}
                        onValueChange={(value) => onChange("warrantyPaidBy", value)}
                      >
                        <SelectTrigger className="border-white/20">
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
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
