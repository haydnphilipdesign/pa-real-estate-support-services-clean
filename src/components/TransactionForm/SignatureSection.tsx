import React, { useState, useEffect } from 'react';
import { SignatureData } from "@/types/transaction";
import { PenTool, CheckCircle, FileText, Shield, Calendar } from "lucide-react";

interface SignatureSectionProps {
  formData: {
    signatureData: SignatureData;
  };
  onChange: (field: string, value: any) => void;
  validationErrors?: Record<string, string>;
  touchedFields?: Set<string>;
  onFieldTouch?: (field: string) => void;
}

export const SignatureSection: React.FC<SignatureSectionProps> = ({
  formData,
  onChange,
  validationErrors = {},
  touchedFields = new Set(),
  onFieldTouch
}: SignatureSectionProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Combine global validation errors with local errors
  const getAllErrors = (field: string) => {
    const globalError = validationErrors?.[field] || validationErrors?.[`signatureData.${field}`];
    const localError = errors[field];
    return globalError || localError || '';
  };

  const handleFieldChange = (field: keyof SignatureData, value: any) => {
    onChange(`signatureData.${field}`, value);
    onFieldTouch?.(`signatureData.${field}`);
    
    // Clear local error for this field when user provides input
    if (value && value !== '') {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  // Set the date when the component loads
  useEffect(() => {
    if (!formData.signatureData.dateSubmitted) {
      handleFieldChange('dateSubmitted', new Date().toISOString().split('T')[0]);
    }
  }, []);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-white">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mr-6">
            <PenTool className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2">Digital Signature</h2>
            <p className="text-slate-300 text-lg">Complete your electronic signature and acknowledgements</p>
          </div>
        </div>
      </div>

      {/* Signature Section */}
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
        <div className="flex items-center mb-6">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mr-4">
            <PenTool className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Electronic Signature</h3>
            <p className="text-gray-600">Your typed name constitutes a legal electronic signature</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Signature Input */}
          <div>
            <label htmlFor="signature" className="block text-sm font-semibold text-gray-900 mb-2">
              Full Legal Name <span className="text-red-500">*</span>
            </label>
            <input
              id="signature"
              type="text"
              value={formData.signatureData.signature || ''}
              onChange={(e) => {
                const value = e.target.value;
                handleFieldChange("signature", value);
                // Also update agentName to match signature
                handleFieldChange("agentName", value);
              }}
              placeholder="Type your full legal name here"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 text-lg font-medium ${
                getAllErrors('signature') 
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }`}
              required
            />
            {getAllErrors('signature') && (
              <p className="mt-1 text-sm text-red-600">
                {getAllErrors('signature')}
              </p>
            )}
            <p className="mt-2 text-sm text-gray-600">
              By typing your name above, you are providing a legal electronic signature for this transaction.
            </p>
          </div>

          {/* Date Display */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Signature Date: </span>
              <span className="text-sm text-gray-900 ml-1">{currentDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Acknowledgements */}
      <div className="bg-gradient-to-br from-emerald-800 to-emerald-900 rounded-2xl p-8 text-white">
        <div className="flex items-center mb-6">
          <div className="flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-xl mr-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Legal Acknowledgements</h3>
            <p className="text-emerald-100">Please confirm your understanding and agreement</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Terms Acceptance */}
          <div className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 border ${
            getAllErrors('termsAccepted') ? 'border-red-300' : 'border-white/20'
          }`}>
            <div className="flex items-start space-x-4">
              <div className="relative mt-1">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  checked={formData.signatureData.termsAccepted || false}
                  onChange={(e) => handleFieldChange("termsAccepted", e.target.checked)}
                  className={`h-5 w-5 rounded border-2 bg-emerald-800/50 focus:ring-2 focus:ring-offset-2 focus:ring-offset-emerald-800 checked:bg-emerald-500 checked:border-emerald-500 ${
                    getAllErrors('termsAccepted') 
                      ? 'border-red-300 focus:ring-red-300' 
                      : 'border-emerald-300 focus:ring-emerald-300'
                  }`}
                />
              </div>
              <div className="flex-1">
                <label htmlFor="termsAccepted" className="text-lg font-semibold text-white cursor-pointer block">
                  Terms and Conditions Agreement {getAllErrors('termsAccepted') && <span className="text-red-300">*</span>}
                </label>
                {getAllErrors('termsAccepted') && (
                  <p className="text-red-300 text-sm mt-1">{getAllErrors('termsAccepted')}</p>
                )}
                <p className="text-emerald-100 mt-2 leading-relaxed">
                  I accept the terms and conditions and understand my legal obligations related to this real estate transaction. 
                  I acknowledge that this electronic signature has the same legal effect as a handwritten signature.
                </p>
              </div>
            </div>
          </div>

          {/* Information Confirmation */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-start space-x-4">
              <div className="relative mt-1">
                <input
                  type="checkbox"
                  id="infoConfirmed"
                  checked={formData.signatureData.infoConfirmed || false}
                  onChange={(e) => handleFieldChange("infoConfirmed", e.target.checked)}
                  className="h-5 w-5 rounded border-2 border-emerald-300 bg-emerald-800/50 focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-emerald-800 checked:bg-emerald-500 checked:border-emerald-500"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="infoConfirmed" className="text-lg font-semibold text-white cursor-pointer block">
                  Information Accuracy Confirmation
                </label>
                <p className="text-emerald-100 mt-2 leading-relaxed">
                  I confirm that all information provided in this transaction form is accurate, complete, and truthful 
                  to the best of my knowledge. I understand that providing false information may have legal consequences.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <div className="flex items-start">
            <FileText className="w-5 h-5 text-emerald-300 mt-0.5 mr-3 flex-shrink-0" />
            <div className="text-sm text-emerald-100 leading-relaxed">
              <strong className="text-white">Legal Notice:</strong> This electronic signature is legally binding and equivalent to a handwritten signature. 
              By completing this form, you are entering into a legal agreement. Please ensure all information is accurate before proceeding.
            </div>
          </div>
        </div>
      </div>

      {/* Signature Summary */}
      {formData.signatureData.signature && (formData.signatureData.termsAccepted && formData.signatureData.infoConfirmed) && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mr-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-green-900">Signature Complete</h4>
              <p className="text-green-700">
                Electronically signed by <strong>{formData.signatureData.signature}</strong> on {currentDate}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};