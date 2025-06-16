import React, { useCallback, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DollarSign, Percent, Users, CircleDollarSign } from "lucide-react";
import type { CommissionData, AgentRole } from '@/types/transaction';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CommissionSectionProps {
  data: CommissionData;
  onChange: (field: keyof CommissionData, value: any) => void;
  role: AgentRole;
}

export const CommissionSection: React.FC<CommissionSectionProps> = ({
  data,
  onChange,
  role
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isListingOrDual = role === 'LISTING AGENT' || role === 'DUAL AGENT';

  const validateField = useCallback((field: string, value: string | boolean) => {
    if (typeof value === 'boolean') return '';

    // Allow empty values for optional fields
    if (value === '' && !['totalCommissionPercentage', 'listingAgentPercentage', 'buyersAgentPercentage'].includes(field)) {
      return '';
    }

    switch (field) {
      case 'totalCommissionPercentage':
      case 'listingAgentPercentage':
      case 'buyersAgentPercentage':
      case 'referralFee':
        const percentValue = parseFloat(value);
        if (!value.trim()) {
          return 'This field is required';
        }
        if (isNaN(percentValue) || percentValue < 0 || percentValue > 100) {
          return 'Please enter a valid percentage between 0 and 100';
        }
        // Add commission split validation
        if (field === 'totalCommissionPercentage' && percentValue > 0) {
          const listing = parseFloat(data.listingAgentPercentage || '0');
          const buyers = parseFloat(data.buyersAgentPercentage || '0');
          if (listing + buyers > percentValue + 0.01) { // Allow small floating point tolerance
            return 'Total commission must be at least the sum of listing and buyer agent percentages';
          }
        }
        break;
      case 'sellerPaidAmount':
      case 'buyerPaidAmount':
        // These are percentages, not currency amounts
        const paidPercentValue = parseFloat(value);
        if (value.trim() && (isNaN(paidPercentValue) || paidPercentValue < 0 || paidPercentValue > 100)) {
          return 'Please enter a valid percentage between 0 and 100';
        }
        break;
      case 'sellersAssist':
        if (!value.trim()) {
          return 'This field is required';
        }
        const amount = parseFloat(value);
        if (isNaN(amount) || amount < 0) {
          return 'Please enter a valid amount';
        }
        if (amount > 1000000) { // Reasonable upper limit
          return 'Amount seems unusually high. Please verify.';
        }
        break;
      case 'brokerFeeAmount':
        const brokerFee = parseFloat(value);
        if (value.trim() && (isNaN(brokerFee) || brokerFee < 0)) {
          return 'Please enter a valid fee amount';
        }
        break;
      case 'referralParty':
        if (!value.trim()) {
          return 'This field is required';
        }
        if (value.trim().length < 2) {
          return 'Please enter a valid name';
        }
        break;
      case 'brokerEin':
        if (!value.trim()) {
          return 'This field is required';
        }
        // Validate EIN format (XX-XXXXXXX)
        const einPattern = /^\d{2}-\d{7}$/;
        if (!einPattern.test(value.trim())) {
          return 'Please enter EIN in format: XX-XXXXXXX';
        }
        break;
    }
    return '';
  }, [data]);

  // Safe number parsing with validation
  const safeParseFloat = useCallback((value: string | undefined): number => {
    if (!value || value === '') return 0;
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  }, []);

  // Validate percentage is within acceptable range
  const validatePercentage = useCallback((value: number): number => {
    return Math.max(0, Math.min(100, value));
  }, []);

  // Round to 2 decimal places without floating point errors
  const roundToTwo = useCallback((value: number): string => {
    return (Math.round(value * 100) / 100).toFixed(2);
  }, []);

  // Helper function to calculate automatic commission values with proper bounds checking
  const calculateCommission = useCallback((field: string, value: string, currentData: CommissionData) => {
    // Parse current values safely
    const total = safeParseFloat(currentData.totalCommissionPercentage);
    const listing = safeParseFloat(currentData.listingAgentPercentage);
    const buyers = safeParseFloat(currentData.buyersAgentPercentage);
    const newValue = safeParseFloat(value);

    // Validate input is reasonable
    if (newValue < 0 || newValue > 100) {
      return {}; // Don't auto-calculate for invalid inputs
    }

    // Store the updates we want to make
    let updates: Partial<CommissionData> = {};

    // Auto-calculate commission percentages with bounds checking
    if (field === 'totalCommissionPercentage' || field === 'listingAgentPercentage' || field === 'buyersAgentPercentage') {
      // When total percentage changes, adjust buyer's or listing agent's percentage
      if (field === 'totalCommissionPercentage') {
        if (listing > 0) {
          // If listing is known, adjust buyer's percentage: buyer = total - listing
          const calculatedBuyers = validatePercentage(newValue - listing);
          updates.buyersAgentPercentage = roundToTwo(calculatedBuyers);
        } else if (buyers > 0) {
          // If buyer's is known, adjust listing percentage: listing = total - buyer
          const calculatedListing = validatePercentage(newValue - buyers);
          updates.listingAgentPercentage = roundToTwo(calculatedListing);
        }
      }
      // When listing percentage changes, adjust buyer's or total percentage
      else if (field === 'listingAgentPercentage') {
        if (total > 0) {
          // If total is known, adjust buyer's percentage: buyer = total - listing
          const calculatedBuyers = validatePercentage(total - newValue);
          updates.buyersAgentPercentage = roundToTwo(calculatedBuyers);
        } else if (buyers > 0) {
          // If buyer's is known, calculate total: total = listing + buyer
          const calculatedTotal = validatePercentage(newValue + buyers);
          updates.totalCommissionPercentage = roundToTwo(calculatedTotal);
        }
      }
      // When buyer's percentage changes, adjust listing or total percentage
      else if (field === 'buyersAgentPercentage') {
        if (total > 0) {
          // If total is known, adjust listing percentage: listing = total - buyer
          const calculatedListing = validatePercentage(total - newValue);
          updates.listingAgentPercentage = roundToTwo(calculatedListing);
        } else if (listing > 0) {
          // If listing is known, calculate total: total = listing + buyer
          const calculatedTotal = validatePercentage(listing + newValue);
          updates.totalCommissionPercentage = roundToTwo(calculatedTotal);
        }
      }
    }

    return updates;
  }, [safeParseFloat, validatePercentage, roundToTwo]);

  const handleChange = useCallback((field: keyof CommissionData, value: string | boolean) => {
    if (typeof value === 'string') {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));

      // Calculate auto-fill values
      const updates = calculateCommission(field, value, data);

      // Apply all updates
      onChange(field, value);
      Object.entries(updates).forEach(([updateField, updateValue]) => {
        onChange(updateField as keyof CommissionData, updateValue);
      });
    } else {
      onChange(field, value);
    }

  }, [onChange, validateField, calculateCommission, data]);

  // Handle numeric input with improved validation
  const handleNumericChange = (field: keyof CommissionData, value: string) => {
    // Allow empty value for clearing
    if (value === '') {
      onChange(field, value);
      return;
    }

    // Allow partial typing (e.g., ".", "0.", "5.")
    if (/^\d*\.?\d*$/.test(value)) {
      const numValue = parseFloat(value);
      // Only validate completed numbers
      if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
        onChange(field, value);
      } else if (value.endsWith('.') || value === '0' || /^\d+$/.test(value)) {
        // Allow partial typing
        onChange(field, value);
      }
    }
  };

  return (
    <div className="tf-commission-section">
      <div className="tf-glass-card">
        <div className="tf-flex tf-items-center tf-mb-4">
          <div className="tf-icon-container">
            <DollarSign className="tf-icon" />
          </div>
          <div>
            <h3 className="tf-heading-secondary">Commission Details</h3>
            <p className="tf-text-subtitle">Configure commission structure and fees</p>
          </div>
        </div>

        {/* Combined Commission Percentages and Fee Payments */}
        <div className="tf-grid tf-grid-cols-1 md:tf-grid-cols-3 tf-gap-4 tf-mb-6">
          {isListingOrDual && (
            <>
              <div className="tf-form-group">
                <label htmlFor="totalCommissionPercentage" className="tf-label">
                  <Percent className="tf-label-icon" />
                  Total Commission <span className="tf-label-required">*</span>
                </label>
                <div className="tf-input-wrapper">
                  <Input
                    id="totalCommissionPercentage"
                    value={data.totalCommissionPercentage}
                    onChange={(e) => handleNumericChange('totalCommissionPercentage', e.target.value)}
                    type="text"
                    placeholder="e.g. 6.0"
                    required
                    className={`tf-input tf-input-percentage ${errors.totalCommissionPercentage ? 'tf-input-error' : ''}`}
                  />
                  <span className="tf-input-suffix">%</span>
                </div>
                {errors.totalCommissionPercentage && (
                  <p className="tf-error-message">{errors.totalCommissionPercentage}</p>
                )}
              </div>

              <div className="tf-form-group">
                <label htmlFor="listingAgentPercentage" className="tf-label">
                  <Users className="tf-label-icon" />
                  Listing Agent <span className="tf-label-required">*</span>
                </label>
                <div className="tf-input-wrapper">
                  <Input
                    id="listingAgentPercentage"
                    value={data.listingAgentPercentage}
                    onChange={(e) => handleNumericChange('listingAgentPercentage', e.target.value)}
                    type="text"
                    placeholder="e.g. 3.0"
                    required
                    className={`tf-input tf-input-percentage ${errors.listingAgentPercentage ? 'tf-input-error' : ''}`}
                  />
                  <span className="tf-input-suffix">%</span>
                </div>
                {errors.listingAgentPercentage && (
                  <p className="tf-error-message">{errors.listingAgentPercentage}</p>
                )}
              </div>
            </>
          )}

          <div className="tf-form-group">
            <label htmlFor="buyersAgentPercentage" className="tf-label">
              <Users className="tf-label-icon" />
              Buyer's Agent <span className="tf-label-required">*</span>
            </label>
            <div className="tf-input-wrapper">
              <Input
                id="buyersAgentPercentage"
                value={data.buyersAgentPercentage}
                onChange={(e) => handleNumericChange('buyersAgentPercentage', e.target.value)}
                type="text"
                placeholder="e.g. 3.0"
                required
                className={`tf-input tf-input-percentage ${errors.buyersAgentPercentage ? 'tf-input-error' : ''}`}
              />
              <span className="tf-input-suffix">%</span>
            </div>
            {errors.buyersAgentPercentage && (
              <p className="tf-error-message">{errors.buyersAgentPercentage}</p>
            )}
          </div>
        </div>

        {/* Fee Payment Percentages (now showing as percentages) */}
        {role !== 'BUYERS AGENT' && (
          <div className="tf-section-divider">
            <div className="tf-grid tf-grid-cols-1 md:tf-grid-cols-2 tf-gap-4">
              <div className="tf-form-group">
                <label htmlFor="sellerPaidAmount" className="tf-label">
                  <DollarSign className="tf-label-icon" />
                  Seller Paid Percentage
                </label>
                <div className="tf-input-wrapper">
                  <Input
                    id="sellerPaidAmount"
                    value={data.sellerPaidAmount || ""}
                    onChange={(e) => handleNumericChange('sellerPaidAmount', e.target.value)}
                    type="text"
                    placeholder="e.g. 0.0"
                    className="tf-input tf-input-percentage"
                  />
                  <span className="tf-input-suffix">%</span>
                </div>
              </div>

              <div className="tf-form-group">
                <label htmlFor="buyerPaidAmount" className="tf-label">
                  <DollarSign className="tf-label-icon" />
                  Buyer Paid Percentage
                </label>
                <div className="tf-input-wrapper">
                  <Input
                    id="buyerPaidAmount"
                    value={data.buyerPaidAmount || ""}
                    onChange={(e) => handleNumericChange('buyerPaidAmount', e.target.value)}
                    type="text"
                    placeholder="e.g. 0.0"
                    className="tf-input tf-input-percentage"
                  />
                  <span className="tf-input-suffix">%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Coordinator Fee */}
        <div className="tf-section-divider">
          <div className="tf-form-group">
            <label className="tf-label">
              <CircleDollarSign className="tf-label-icon" />
              Coordinator Fee Paid By <span className="tf-label-required">*</span>
            </label>
            <Select
              value={data.coordinatorFeePaidBy}
              onValueChange={(value: 'client' | 'agent') => handleChange('coordinatorFeePaidBy', value)}
            >
              <SelectTrigger className="tf-select tf-select-md">
                <SelectValue placeholder="Select who pays..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="client">Client</SelectItem>
                <SelectItem value="agent">Agent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Seller's Assist */}
        <div className="tf-section-divider">
          <div className="tf-switch-group">
            <Switch
              id="hasSellersAssist"
              checked={data.hasSellersAssist}
              onCheckedChange={(checked) => handleChange('hasSellersAssist', checked)}
            />
            <label htmlFor="hasSellersAssist" className="tf-switch-label">
              Include Seller's Assist
            </label>
          </div>

          {data.hasSellersAssist && (
            <div className="tf-glass-card-light tf-mt-4">
              <div className="tf-form-group">
                <label htmlFor="sellersAssist" className="tf-label">
                  <DollarSign className="tf-label-icon" />
                  Seller's Assist Amount <span className="tf-label-required">*</span>
                </label>
                <div className="tf-input-wrapper">
                  <span className="tf-input-prefix">$</span>
                  <Input
                    id="sellersAssist"
                    value={data.sellersAssist}
                    onChange={(e) => handleNumericChange('sellersAssist', e.target.value)}
                    type="text"
                    placeholder="Enter amount"
                    required
                    className={`tf-input tf-input-currency ${errors.sellersAssist ? 'tf-input-error' : ''}`}
                  />
                </div>
                {errors.sellersAssist && (
                  <p className="tf-error-message">{errors.sellersAssist}</p>
                )}
              </div>
            </div>
          )}

          {/* Referral toggle moved here */}
          <div className="tf-switch-group tf-mt-4">
            <Switch
              id="isReferral"
              checked={data.isReferral}
              onCheckedChange={(checked) => handleChange('isReferral', checked)}
            />
            <label htmlFor="isReferral" className="tf-switch-label">
              This is a referral
            </label>
          </div>

          {data.isReferral && (
            <div className="tf-glass-card-light tf-mt-4">
              <div className="tf-grid tf-grid-cols-1 md:tf-grid-cols-3 tf-gap-4">
                <div className="tf-form-group">
                  <label htmlFor="referralParty" className="tf-label">
                    <Users className="tf-label-icon" />
                    Referral Party <span className="tf-label-required">*</span>
                  </label>
                  <Input
                    id="referralParty"
                    value={data.referralParty}
                    onChange={(e) => handleChange('referralParty', e.target.value)}
                    placeholder="Enter name"
                    required
                    className={`tf-input ${errors.referralParty ? 'tf-input-error' : ''}`}
                  />
                  {errors.referralParty && (
                    <p className="tf-error-message">{errors.referralParty}</p>
                  )}
                </div>

                <div className="tf-form-group">
                  <label htmlFor="brokerEin" className="tf-label">
                    <DollarSign className="tf-label-icon" />
                    Broker EIN <span className="tf-label-required">*</span>
                  </label>
                  <Input
                    id="brokerEin"
                    value={data.brokerEin}
                    onChange={(e) => handleChange('brokerEin', e.target.value)}
                    placeholder="XX-XXXXXXX"
                    required
                    className={`tf-input ${errors.brokerEin ? 'tf-input-error' : ''}`}
                  />
                  {errors.brokerEin && (
                    <p className="tf-error-message">{errors.brokerEin}</p>
                  )}
                </div>

                <div className="tf-form-group">
                  <label htmlFor="referralFee" className="tf-label">
                    <Percent className="tf-label-icon" />
                    Referral Fee <span className="tf-label-required">*</span>
                  </label>
                  <div className="tf-input-wrapper">
                    <Input
                      id="referralFee"
                      value={data.referralFee}
                      onChange={(e) => handleNumericChange('referralFee', e.target.value)}
                      type="text"
                      placeholder="Enter percentage"
                      required
                      className={`tf-input tf-input-percentage ${errors.referralFee ? 'tf-input-error' : ''}`}
                    />
                    <span className="tf-input-suffix">%</span>
                  </div>
                  {errors.referralFee && (
                    <p className="tf-error-message">{errors.referralFee}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommissionSection;