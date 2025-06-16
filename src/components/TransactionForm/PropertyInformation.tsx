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
    <div className="tf-property-info">
      {/* Main card container */}
      <div className="tf-glass-card">

        {/* First row - Main property details */}
        <div className="tf-property-row">
          {/* MLS Number */}
          <div className="tf-form-group">
            <label htmlFor="mlsNumber" className="tf-label">
              <Building className="tf-label-icon" />
              MLS Number {isListingOrDual && <span className="tf-label-required">*</span>}
            </label>
            <Input
              id="mlsNumber"
              value={data.mlsNumber}
              onChange={(e) => handleMlsNumberChange(e.target.value)}
              placeholder="Enter MLS number"
              required={isListingOrDual}
              className={`tf-input ${
                data.mlsNumber && !validateMlsNumber(data.mlsNumber) ? "tf-input-error" : ""
              }`}
              aria-invalid={isListingOrDual && !validateMlsNumber(data.mlsNumber) ? "true" : "false"}
            />
            {isListingOrDual && !data.mlsNumber && (
              <p className="tf-error-message">Required</p>
            )}
          </div>

          {/* Property Type */}
          <div className="tf-form-group">
            <label htmlFor="propertyType" className="tf-label">
              <HomeIcon className="tf-label-icon" />
              Property Type <span className="tf-label-required">*</span>
            </label>
            <Select
              value={data.propertyType}
              onValueChange={(value: 'RESIDENTIAL' | 'COMMERCIAL' | 'LAND') => {
                onChange('propertyType', value);
              }}
            >
              <SelectTrigger id="propertyType" className="tf-select">
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
          <div className="tf-form-group">
            <label htmlFor="county" className="tf-label">
              <MapPin className="tf-label-icon" />
              County <span className="tf-label-required">*</span>
            </label>
            <Input
              id="county"
              placeholder="Enter county"
              value={data.county}
              onChange={e => onChange('county', e.target.value)}
              required
              className={`tf-input ${!data.county ? "tf-input-error" : ""}`}
              aria-invalid={!data.county ? "true" : "false"}
            />
            {!data.county && (
              <p className="tf-error-message">Required</p>
            )}
          </div>
        </div>

        {/* Second row - Address and Price */}
        <div className="tf-grid tf-grid-cols-1 md:tf-grid-cols-3 tf-gap-4 tf-mt-4">
          {/* Property Address */}
          <div className="tf-form-group md:col-span-2">
            <label htmlFor="address" className="tf-label">
              <MapPin className="tf-label-icon" />
              Property Address <span className="tf-label-required">*</span>
            </label>
            <AddressInput
              value={data.address}
              onChange={(value: string) => onChange('address', value)}
              required={true}
              placeholder="Enter full property address"
              error={!data.address ? "Required" : ""}
            />
          </div>

          {/* Sale Price */}
          <div className="tf-form-group">
            <label htmlFor="salePrice" className="tf-label">
              <DollarSign className="tf-label-icon" />
              Sale Price <span className="tf-label-required">*</span>
            </label>
            <Input
              id="salePrice"
              placeholder="Enter sale price"
              value={data.salePrice}
              onChange={e => handleSalePriceChange(e.target.value)}
              type="text"
              className={`tf-input ${!data.salePrice ? "tf-input-error" : ""}`}
              aria-invalid={!data.salePrice ? "true" : "false"}
            />
            {!data.salePrice && (
              <p className="tf-error-message">Required</p>
            )}
          </div>
        </div>

        {/* Third row - Status fields */}
        <div className="tf-grid tf-grid-cols-2 md:tf-grid-cols-4 tf-gap-4 tf-mt-4">
          {/* Closing Date */}
          <div className="tf-form-group">
            <label htmlFor="closingDate" className="tf-label">
              <Calendar className="tf-label-icon" />
              Closing Date <span className="tf-label-required">*</span>
            </label>
            <Input
              id="closingDate"
              type="date"
              value={data.closingDate}
              onChange={e => handleClosingDateChange(e.target.value)}
              min={today}
              max={maxDateStr}
              required
              className={`tf-input ${
                !data.closingDate || !isValidClosingDate(data.closingDate) ? "tf-input-error" : ""
              }`}
              aria-invalid={!data.closingDate || !isValidClosingDate(data.closingDate) ? "true" : "false"}
            />
            {!data.closingDate && (
              <p className="tf-error-message">Required</p>
            )}
          </div>

          {/* Property Status - Only for Residential property type */}
          {isResidential && (
            <div className="tf-form-group">
              <label className="tf-label">
                <HomeIcon className="tf-label-icon" />
                Property Status <span className="tf-label-required">*</span>
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
                <SelectTrigger id="status" className="tf-select">
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
            <div className="tf-form-group">
              <label htmlFor="updateMls" className="tf-label">
                <Building className="tf-label-icon" />
                Update MLS Status
              </label>
              <Select
                value={data.updateMls}
                onValueChange={(value: 'YES' | 'NO') => onChange('updateMls', value)}
              >
                <SelectTrigger id="updateMls" className="tf-select">
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
            <div className="tf-form-group">
              <label htmlFor="builtBefore1978" className="tf-label">
                <HomeIcon className="tf-label-icon" />
                Built Before 1978
              </label>
              <Select
                value={data.isBuiltBefore1978}
                onValueChange={(value) => onChange('isBuiltBefore1978', value)}
              >
                <SelectTrigger id="builtBefore1978" className="tf-select">
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
        <div className="tf-grid tf-grid-cols-2 md:tf-grid-cols-4 tf-gap-4 tf-mt-4">
          {/* Property Access Type - Required only for Listing & Dual Agents when property is residential */}
          {isResidential && isListingOrDual && (
            <div className="tf-form-group">
              <label htmlFor="propertyAccessType" className="tf-label">
                <HomeIcon className="tf-label-icon" />
                Access Type <span className="tf-label-required">*</span>
              </label>
              <Select
                value={data.propertyAccessType}
                onValueChange={(value) => onChange('propertyAccessType', value)}
              >
                <SelectTrigger id="propertyAccessType" className="tf-select">
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
            <div className="tf-form-group">
              <label htmlFor="lockboxAccessCode" className="tf-label">
                <HomeIcon className="tf-label-icon" />
                Access Code
              </label>
              <Input
                id="lockboxAccessCode"
                placeholder="Enter code"
                value={data.lockboxAccessCode}
                onChange={e => onChange('lockboxAccessCode', e.target.value)}
                className="tf-input"
              />
            </div>
          )}

          {/* Winterized Status - Show when status is VACANT for Listing/Dual agents */}
          {isVacant && isListingOrDual && (
            <div className="tf-form-group">
              <label htmlFor="isWinterized" className="tf-label">
                <HomeIcon className="tf-label-icon" />
                Is Winterized
              </label>
              <Select
                value={data.isWinterized}
                onValueChange={(value: 'YES' | 'NO') => onChange('isWinterized', value)}
              >
                <SelectTrigger id="isWinterized" className="tf-select">
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
    </div>
  );
};