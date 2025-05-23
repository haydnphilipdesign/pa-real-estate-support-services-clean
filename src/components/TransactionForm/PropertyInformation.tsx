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

  // Debug log to check role and conditional values
  useEffect(() => {
    console.log('Property Information Component:', {
      role,
      isListingOrDual,
      propertyType: data.propertyType,
      isResidential,
      status: data.status,
      isVacant
    });
  }, [role, data.propertyType, data.status]);

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
    <div className="space-y-2 max-w-5xl mx-auto property-information-section">
      {/* First row - Main property details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2">
        {/* MLS Number */}
        <div className="space-y-1">
          <Label htmlFor="mlsNumber" className="flex items-center text-gray-800 text-sm">
            <Building className="h-3 w-3 mr-1 text-blue-600" />
            MLS Number {isListingOrDual && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <Input
            id="mlsNumber"
            value={data.mlsNumber}
            onChange={(e) => handleMlsNumberChange(e.target.value)}
            placeholder="Enter MLS number"
            required={isListingOrDual}
            className={`bg-white border-gray-300 placeholder:text-gray-400 h-8 text-sm ${
              data.mlsNumber && !validateMlsNumber(data.mlsNumber) ? "border-red-500" : ""
            }`}
            aria-invalid={isListingOrDual && !validateMlsNumber(data.mlsNumber) ? "true" : "false"}
          />
          {isListingOrDual && !data.mlsNumber && (
            <p className="text-xs text-red-500">Required</p>
          )}
        </div>

        {/* Property Type */}
        <div className="space-y-1">
          <Label htmlFor="propertyType" className="flex items-center text-gray-800 text-sm">
            <HomeIcon className="h-3 w-3 mr-1 text-blue-600" />
            Property Type <span className="text-red-500 ml-1">*</span>
          </Label>
          <Select
            value={data.propertyType}
            onValueChange={(value: 'RESIDENTIAL' | 'COMMERCIAL' | 'LAND') => {
              onChange('propertyType', value);
            }}
          >
            <SelectTrigger id="propertyType" style={{ backgroundColor: 'white', color: '#1e3a8a', height: '2rem' }} className="bg-white h-8 text-sm">
              <SelectValue placeholder="Select type..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="RESIDENTIAL">Residential</SelectItem>
              <SelectItem value="COMMERCIAL">Commercial</SelectItem>
              <SelectItem value="LAND">Land</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* County */}
        <div className="space-y-1">
          <Label htmlFor="county" className="flex items-center text-gray-800 text-sm">
            <MapPin className="h-3 w-3 mr-1 text-blue-600" />
            County <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="county"
            placeholder="Enter county"
            value={data.county}
            onChange={e => onChange('county', e.target.value)}
            required
            className={`bg-white border-gray-300 placeholder:text-gray-400 h-8 text-sm ${
              !data.county ? "border-red-500" : ""
            }`}
            aria-invalid={!data.county ? "true" : "false"}
          />
          {!data.county && (
            <p className="text-xs text-red-500">Required</p>
          )}
        </div>
      </div>

      {/* Second row - Address and Price */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2 mt-1">
        {/* Property Address */}
        <div className="space-y-1 md:col-span-2">
          <Label htmlFor="address" className="flex items-center text-gray-800 text-sm">
            <MapPin className="h-3 w-3 mr-1 text-blue-600" />
            Property Address <span className="text-red-500 ml-1">*</span>
          </Label>
          <AddressInput
            value={data.address}
            onChange={(value: string) => onChange('address', value)}
            required={true}
            placeholder="Enter full property address"
            error={!data.address ? "Required" : ""}
          />
        </div>

        {/* Sale Price */}
        <div className="space-y-1">
          <Label htmlFor="salePrice" className="flex items-center text-gray-800 text-sm">
            <DollarSign className="h-3 w-3 mr-1 text-blue-600" />
            Sale Price <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="salePrice"
            placeholder="Enter sale price"
            value={data.salePrice}
            onChange={e => handleSalePriceChange(e.target.value)}
            type="text"
            className="bg-white border-gray-300 placeholder:text-gray-400 h-8 text-sm"
            aria-invalid={!data.salePrice ? "true" : "false"}
          />
          {!data.salePrice && (
            <p className="text-xs text-red-500">Required</p>
          )}
        </div>
      </div>

      {/* Third row - Status fields */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 mt-1">
        {/* Closing Date */}
        <div className="space-y-1">
          <Label htmlFor="closingDate" className="flex items-center text-gray-800 text-sm">
            <Calendar className="h-3 w-3 mr-1 text-blue-600" />
            Closing Date <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="closingDate"
            type="date"
            value={data.closingDate}
            onChange={e => handleClosingDateChange(e.target.value)}
            min={today}
            max={maxDateStr}
            required
            className={`bg-white border-gray-300 placeholder:text-gray-400 h-8 text-sm ${
              !data.closingDate || !isValidClosingDate(data.closingDate) ? "border-red-500" : ""
            }`}
            aria-invalid={!data.closingDate || !isValidClosingDate(data.closingDate) ? "true" : "false"}
          />
          {!data.closingDate && (
            <p className="text-xs text-red-500">Required</p>
          )}
        </div>

        {/* Property Status - Only for Residential property type */}
        {isResidential && (
          <div className="space-y-1">
            <Label className="flex items-center text-gray-800 text-sm">
              <HomeIcon className="h-3 w-3 mr-1 text-blue-600" />
              Property Status <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              value={data.status}
              onValueChange={(value: 'OCCUPIED' | 'VACANT') => {
                onChange('status', value);
                if (value !== 'VACANT') {
                  onChange('isWinterized', "NO");
                }
              }}
            >
              <SelectTrigger id="status" style={{ backgroundColor: 'white', color: '#1e3a8a', height: '2rem' }} className="bg-white h-8 text-sm">
                <SelectValue placeholder="Select status..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="OCCUPIED">Occupied</SelectItem>
                <SelectItem value="VACANT">Vacant</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Update MLS Status - Only required for Listing Agent and Dual Agent */}
        {isListingOrDual && (
          <div className="space-y-1">
            <Label htmlFor="updateMls" className="flex items-center text-gray-800 text-sm">
              <Building className="h-3 w-3 mr-1 text-blue-600" />
              Update MLS Status
            </Label>
            <Select
              value={data.updateMls}
              onValueChange={(value: 'YES' | 'NO') => onChange('updateMls', value)}
            >
              <SelectTrigger id="updateMls" style={{ backgroundColor: 'white', color: '#1e3a8a', height: '2rem' }} className="bg-white h-8 text-sm">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="YES">Yes</SelectItem>
                <SelectItem value="NO">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Built Before 1978 - Only for Residential */}
        {isResidential && (
          <div className="space-y-1">
            <Label htmlFor="builtBefore1978" className="flex items-center text-gray-800 text-sm">
              <HomeIcon className="h-3 w-3 mr-1 text-blue-600" />
              Built Before 1978
            </Label>
            <Select
              value={data.isBuiltBefore1978}
              onValueChange={(value) => onChange('isBuiltBefore1978', value)}
            >
              <SelectTrigger id="builtBefore1978" style={{ backgroundColor: 'white', color: '#1e3a8a', height: '2rem' }} className="bg-white h-8 text-sm">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="YES">Yes</SelectItem>
                <SelectItem value="NO">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Fourth row - Access information */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 mt-1">
        {/* Property Access Type - Required only for Listing & Dual Agents when property is residential */}
        {isResidential && isListingOrDual && (
          <div className="space-y-1">
            <Label htmlFor="propertyAccessType" className="flex items-center text-gray-800 text-sm">
              <HomeIcon className="h-3 w-3 mr-1 text-blue-600" />
              Access Type <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              value={data.propertyAccessType}
              onValueChange={(value) => onChange('propertyAccessType', value)}
            >
              <SelectTrigger id="propertyAccessType" style={{ backgroundColor: 'white', color: '#1e3a8a', height: '2rem' }} className="bg-white h-8 text-sm">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ELECTRONIC LOCKBOX">Electronic Lockbox</SelectItem>
                <SelectItem value="COMBO LOCKBOX">Combo Lockbox</SelectItem>
                <SelectItem value="KEYPAD">Keypad</SelectItem>
                <SelectItem value="APPOINTMENT ONLY">Appointment Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Lockbox Access Code */}
        {isResidential && isListingOrDual && data.propertyAccessType && data.propertyAccessType !== "APPOINTMENT ONLY" && (
          <div className="space-y-1">
            <Label htmlFor="lockboxAccessCode" className="flex items-center text-gray-800 text-sm">
              <HomeIcon className="h-3 w-3 mr-1 text-blue-600" />
              Access Code
            </Label>
            <Input
              id="lockboxAccessCode"
              placeholder="Enter code"
              value={data.lockboxAccessCode}
              onChange={e => onChange('lockboxAccessCode', e.target.value)}
              className="bg-white border-gray-300 placeholder:text-gray-400 h-8 text-sm"
            />
          </div>
        )}

        {/* Winterized Status - Show when status is VACANT for Listing/Dual agents */}
        {isVacant && isListingOrDual && (
          <div className="space-y-1">
            <Label htmlFor="isWinterized" className="flex items-center text-gray-800 text-sm">
              <HomeIcon className="h-3 w-3 mr-1 text-blue-600" />
              Is Winterized
            </Label>
            <Select
              value={data.isWinterized}
              onValueChange={(value: 'YES' | 'NO') => onChange('isWinterized', value)}
            >
              <SelectTrigger id="isWinterized" style={{ backgroundColor: 'white', color: '#1e3a8a', height: '2rem' }} className="bg-white h-8 text-sm">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="YES">Yes</SelectItem>
                <SelectItem value="NO">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
};