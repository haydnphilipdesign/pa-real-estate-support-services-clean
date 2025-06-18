import React from 'react';
import { Input } from "@/components/ui/input";
import { Building } from "lucide-react";
import type { PropertyData } from '@/types/transaction';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AddressInput } from "@/components/ui/AddressInput";

interface PropertyInformationProps {
  data: PropertyData;
  onChange: (field: keyof PropertyData, value: any) => void;
  role: 'LISTING AGENT' | 'BUYERS AGENT' | 'DUAL AGENT';
}

export const PropertyInformation: React.FC<PropertyInformationProps> = ({
  data,
  onChange,
  role
}) => {
  const isListingOrDual = role === 'LISTING AGENT' || role === 'DUAL AGENT';

  function handleMlsNumberChange(value: string): void {
    if (value === '' ||
        /^P(M)?(-)?$/.test(value) ||
        /^PM-[0-9]{0,6}$/.test(value) ||
        /^[0-9]{0,6}$/.test(value)) {
      onChange('mlsNumber', value);
    }
  }

  function validateMlsNumber(mls: string): boolean {
    return /^(PM-)?[0-9]{6}$/.test(mls);
  }

  return (
    <div className="form-section">
      <div className="form-section-header">
        <div className="form-section-icon">
          <Building className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="form-section-title">Property Information</h3>
          <p className="form-section-description">Enter the basic property details for this transaction</p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="form-grid form-grid-3">
          <div className="form-group">
            <label htmlFor="mlsNumber" className="form-label">
              MLS Number
              {isListingOrDual && <span className="text-red-500 ml-1">*</span>}
            </label>
            <Input
              id="mlsNumber"
              value={data.mlsNumber}
              onChange={(e) => handleMlsNumberChange(e.target.value)}
              placeholder="PM-123456 or 123456"
              required={isListingOrDual}
              className={`form-input ${
                data.mlsNumber && !validateMlsNumber(data.mlsNumber) ? "border-red-500" : ""
              }`}
            />
            <div className="text-sm text-neutral-500 mt-1">
              Format: PM-123456 or 6-digit number
            </div>
            {isListingOrDual && !data.mlsNumber && (
              <div className="text-sm text-red-600 flex items-center mt-1">
                <span className="mr-1">⚠</span>
                MLS number is required
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="propertyType" className="form-label">
              Property Type
              <span className="text-red-500 ml-1">*</span>
            </label>
            <Select
              value={data.propertyType}
              onValueChange={(value: 'RESIDENTIAL' | 'COMMERCIAL' | 'LAND') => {
                onChange('propertyType', value);
              }}
            >
              <SelectTrigger id="propertyType" className="form-select">
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="RESIDENTIAL">Residential</SelectItem>
                <SelectItem value="COMMERCIAL">Commercial</SelectItem>
                <SelectItem value="LAND">Land</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-sm text-neutral-500 mt-1">
              Choose the primary property classification
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="county" className="form-label">
              County
              <span className="text-red-500 ml-1">*</span>
            </label>
            <Input
              id="county"
              placeholder="e.g. Philadelphia"
              value={data.county}
              onChange={e => onChange('county', e.target.value)}
              required
              className={`form-input ${!data.county ? "border-red-500" : ""}`}
            />
            <div className="text-sm text-neutral-500 mt-1">
              Pennsylvania county where property is located
            </div>
            {!data.county && (
              <div className="text-sm text-red-600 flex items-center mt-1">
                <span className="mr-1">⚠</span>
                County is required
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};