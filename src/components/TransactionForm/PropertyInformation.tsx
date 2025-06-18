import React, { useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building, HomeIcon, DollarSign, Calendar, MapPin } from "lucide-react";
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
  const isResidential = data.propertyType === 'RESIDENTIAL';
  const isVacant = data.status === 'VACANT';

  function handleMlsNumberChange(value: string): void {
    // Allow typing partial MLS numbers during input, including partial typing of PM- prefix
    if (value === '' ||
        /^P(M)?(-)?$/.test(value) || // Allow typing P, PM, PM-
        /^PM-[0-9]{0,6}$/.test(value) || // Allow PM- followed by up to 6 digits
        /^[0-9]{0,6}$/.test(value)) { // Allow up to 6 digits without prefix
      onChange('mlsNumber', value);
    }
  }

  function validateMlsNumber(mls: string): boolean {
    // This matches the validation in utils/validation.ts
    return /^(PM-)?[0-9]{6}$/.test(mls);
  }

  function handleSalePriceChange(value: string): void {
    // Allow emptying the field and valid numeric values
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      onChange('salePrice', value);
    }
  }

  function handleClosingDateChange(value: string): void {
    // Always allow empty input for UX
    if (value === '') {
      onChange('closingDate', value);
      return;
    }

    // Check if it's a valid date before applying
    const selectedDate = new Date(value);
    if (!isNaN(selectedDate.getTime())) {
      // Only allow dates within a reasonable range (current date to 90 days in the future)
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to beginning of day

      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + 90); // Set to 90 days from now

      if (selectedDate <= maxDate) {
        onChange('closingDate', value);
      }
    }
  }

  function isValidClosingDate(dateStr: string): boolean {
    if (!dateStr) return false;

    const selectedDate = new Date(dateStr);
    if (isNaN(selectedDate.getTime())) return false;

    // Check if date is within reasonable range (up to 90 days in the future)
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 90);

    return selectedDate <= maxDate;
  }

  // Calculate min and max dates for the date input
  const today = new Date().toISOString().split('T')[0]; // today in YYYY-MM-DD format
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 90);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return (
    <div className="form-section">
      
      {/* Section Header */}
      <div className="form-section-header">
        <div className="form-section-icon">
          <Building className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="form-section-title">Property Information</h3>
          <p className="form-section-description">Enter the basic property details for this transaction</p>
        </div>
      </div>

      {/* Enhanced Responsive Grid Layout */}
      <div className="space-y-8">
        
        {/* Row 1: Core Property Details - 3 columns on tablet+ */}
        <div className="form-grid form-grid-3">
          {/* MLS Number */}
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
              aria-invalid={isListingOrDual && !validateMlsNumber(data.mlsNumber) ? "true" : "false"}
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

          {/* Property Type */}
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

          {/* County */}
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
              aria-invalid={!data.county ? "true" : "false"}
            />
            <div className="text-sm text-neutral-500 mt-1">
              Pennsylvania county where property is located
            </div>
            {!data.county && (
              <div className="text-sm text-red-600 flex items-center mt-1"><span className="mr-1">⚠</span>County is required</div>
            )}
          </div>
        </div>

        {/* Row 2: Address and Price - 2 columns on tablet+ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Property Address - Takes 2/3 width on large screens */}
          <div className="lg:col-span-2 form-group">
            <label htmlFor="address" className="form-label">
              Property Address
              <span className="text-red-500 ml-1">*</span>
            </label>
            <AddressInput
              value={data.address}
              onChange={(value: string) => onChange('address', value)}
              required={true}
              placeholder="123 Main St, Philadelphia, PA 19103"
              error={!data.address ? "Required" : ""}
              className="form-input"
            />
            <div className="text-sm text-neutral-500 mt-1">
              Format: 123 Main St, Philadelphia, PA 12345
            </div>
            {!data.address && (
              <div className="text-sm text-red-600 flex items-center mt-1"><span className="mr-1">⚠</span>Property address is required</div>
            )}
          </div>

          {/* Sale Price - Takes 1/3 width on large screens */}
          <div className="form-group">
            <label htmlFor="salePrice" className="form-label">
              Sale Price
              <span className="text-red-500 ml-1">*</span>
            </label>
            <Input
              id="salePrice"
              placeholder="450000"
              value={data.salePrice}
              onChange={e => handleSalePriceChange(e.target.value)}
              type="text"
              className={`form-input ${!data.salePrice ? "border-red-500" : ""}`}
              aria-invalid={!data.salePrice ? "true" : "false"}
            />
            <div className="text-sm text-neutral-500 mt-1">
              Enter amount without $ or commas
            </div>
            {!data.salePrice && (
              <div className="text-sm text-red-600 flex items-center mt-1"><span className="mr-1">⚠</span>Sale price is required</div>
            )}
          </div>
        </div>

        {/* Row 3: Status and Date Fields - 2-4 columns responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Closing Date */}
          <div className="form-group">
            <label htmlFor="closingDate" className="form-label">
              Closing Date
              <span className="text-red-500 ml-1">*</span>
            </label>
            <Input
              id="closingDate"
              type="date"
              value={data.closingDate}
              onChange={e => handleClosingDateChange(e.target.value)}
              min={today}
              max={maxDateStr}
              required
              className={`form-input ${
                !data.closingDate || !isValidClosingDate(data.closingDate) ? "border-red-500" : ""
              }`}
              aria-invalid={!data.closingDate || !isValidClosingDate(data.closingDate) ? "true" : "false"}
            />
            <div className="text-sm text-neutral-500 mt-1">
              Must be within 90 days
            </div>
            {!data.closingDate && (
              <div className="text-sm text-red-600 flex items-center mt-1"><span className="mr-1">⚠</span>Closing date is required</div>
            )}
          </div>

          {/* Property Status - Only for Residential */}
          {isResidential && (
            <div className="form-group">
              <label className="form-label">
                Property Status
                <span className="text-red-500 ml-1">*</span>
              </label>
              <Select
                value={data.status}
                onValueChange={(value: 'OCCUPIED' | 'VACANT') => {
                  onChange('status', value);
                  if (value !== 'VACANT') {
                    onChange('isWinterized', "NO");
                  }
                }}
              >
                <SelectTrigger id="status" className="form-input">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OCCUPIED">Occupied</SelectItem>
                  <SelectItem value="VACANT">Vacant</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-sm text-neutral-500 mt-1">
                Current occupancy status
              </div>
            </div>
          )}

          {/* Update MLS Status - Only for Listing/Dual */}
          {isListingOrDual && (
            <div className="form-group">
              <label htmlFor="updateMls" className="form-label">
                Update MLS Status
              </label>
              <Select
                value={data.updateMls}
                onValueChange={(value: 'YES' | 'NO') => onChange('updateMls', value)}
              >
                <SelectTrigger id="updateMls" className="form-input">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="YES">Yes</SelectItem>
                  <SelectItem value="NO">No</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-sm text-neutral-500 mt-1">
                Change to Pending
              </div>
            </div>
          )}

          {/* Built Before 1978 - Only for Residential */}
          {isResidential && (
            <div className="form-group">
              <label htmlFor="builtBefore1978" className="form-label">
                Built Before 1978
              </label>
              <Select
                value={data.isBuiltBefore1978}
                onValueChange={(value) => onChange('isBuiltBefore1978', value)}
              >
                <SelectTrigger id="builtBefore1978" className="form-input">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="YES">Yes</SelectItem>
                  <SelectItem value="NO">No</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-sm text-neutral-500 mt-1">
                Required for lead paint disclosure
              </div>
            </div>
          )}
        </div>

        {/* Row 4: Access Information - Conditional fields */}
        {isResidential && isListingOrDual && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Property Access Type */}
            <div className="form-group">
              <label htmlFor="propertyAccessType" className="form-label">
                Access Type
                <span className="text-red-500 ml-1">*</span>
              </label>
              <Select
                value={data.propertyAccessType}
                onValueChange={(value) => onChange('propertyAccessType', value)}
              >
                <SelectTrigger id="propertyAccessType" className="form-input">
                  <SelectValue placeholder="Select access method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ELECTRONIC LOCKBOX">Electronic Lockbox</SelectItem>
                  <SelectItem value="COMBO LOCKBOX">Combo Lockbox</SelectItem>
                  <SelectItem value="KEYPAD">Keypad</SelectItem>
                  <SelectItem value="APPOINTMENT ONLY">Appointment Only</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-sm text-neutral-500 mt-1">
                How agents can access property
              </div>
            </div>

            {/* Lockbox Access Code */}
            {data.propertyAccessType && data.propertyAccessType !== "APPOINTMENT ONLY" && (
              <div className="form-group">
                <label htmlFor="lockboxAccessCode" className="form-label">
                  Access Code
                </label>
                <Input
                  id="lockboxAccessCode"
                  placeholder="1234 or *1234#"
                  value={data.lockboxAccessCode}
                  onChange={e => onChange('lockboxAccessCode', e.target.value)}
                  className="form-input"
                />
                <div className="text-sm text-neutral-500 mt-1">
                  Code or combination for access
                </div>
              </div>
            )}

            {/* Winterized Status */}
            {isVacant && (
              <div className="form-group">
                <label htmlFor="isWinterized" className="form-label">
                  Is Winterized
                </label>
                <Select
                  value={data.isWinterized}
                  onValueChange={(value: 'YES' | 'NO') => onChange('isWinterized', value)}
                >
                  <SelectTrigger id="isWinterized" className="form-input">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="YES">Yes</SelectItem>
                    <SelectItem value="NO">No</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-sm text-neutral-500 mt-1">
                  Water and utilities shut off
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};