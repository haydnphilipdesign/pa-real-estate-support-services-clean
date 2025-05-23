import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { SignatureData } from "@/types/transaction";

interface SignatureSectionProps {
  data: SignatureData;
  onChange: (field: keyof SignatureData, value: any) => void;
  role?: string;
  onSubmit?: () => void;
  skippedFields?: string[];
  onFieldFix?: (field: string) => void;
}

export const SignatureSection: React.FC<SignatureSectionProps> = ({ 
  data, 
  onChange
}: SignatureSectionProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof SignatureData, value: any) => {
    // Clear error when field is changed
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    onChange(field, value);
    
    // If signature field changes, also update agentName field
    if (field === 'signature') {
      onChange('agentName', value);
    }
  };
  
  // Set the date and sync agent name when the component loads
  useEffect(() => {
    if (!data.dateSubmitted) {
      onChange('dateSubmitted', new Date().toISOString().split('T')[0]);
    }
    
    // If signature exists but agentName is not set, update it
    if (data.signature && !data.agentName) {
      onChange('agentName', data.signature);
    }
  }, []);

  // Removed unused functions

  return (
    <div className="max-w-5xl mx-auto bg-transparent rounded-xl shadow-lg border border-blue-700/50 p-8">
      {/* Signature Section */}
      <div className="field-group">
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="signature" className="text-white font-medium">
                Your Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="signature"
                type="text"
                value={data.signature || ''}
                onChange={(e) => handleChange("signature", e.target.value)}
                placeholder="Type your full legal name"
                className="bg-slate-800 text-white placeholder:text-slate-500 border-slate-700 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                required
              />
              {errors.signature && (
                <p className="text-sm text-red-500">{errors.signature}</p>
              )}
              
              {/* Hidden field for agentName */}
              <input 
                type="hidden" 
                id="agentName" 
                value={data.agentName || ''} 
              />
              
              <p className="text-xs text-slate-300 mt-1">
                Your typed name above constitutes your electronic signature for this transaction.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-[#102042]/70 rounded-lg border border-blue-700/50" data-override-contrast="true" style={{ "--sign-text-color": "white" } as React.CSSProperties}>
              <h5 
                className="text-white font-medium mb-4 acknowledgements-heading" 
                style={{ 
                  color: 'white !important',
                  textShadow: '0 0 0 #fff'
                }}
                id="acknowledgements-heading"
                data-signature-heading="true"
              >
                Acknowledgements
              </h5>
              <div className="space-y-4" id="signature-checkbox-container" data-form-signature="true">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="termsAccepted"
                    checked={data.termsAccepted || false}
                    onCheckedChange={(checked) => 
                      handleChange("termsAccepted", checked === true)}
                    className="mt-1 border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label htmlFor="termsAccepted" className="text-white font-medium text-sm signature-label" style={{ color: 'white !important' }}>
                    I accept the <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline mx-1">terms and conditions</a> and understand my legal obligations related to this transaction.
                  </Label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="infoConfirmed"
                    checked={data.infoConfirmed || false}
                    onCheckedChange={(checked) => 
                      handleChange("infoConfirmed", checked === true)}
                    className="mt-1 border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label htmlFor="infoConfirmed" className="text-white font-medium text-sm signature-label" style={{ color: 'white !important' }}>
                    I confirm all information provided in this transaction form is accurate, complete, and truthful to the best of my knowledge.
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}