import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { AdditionalInfoData } from "@/types/transaction";
import { FileText } from "lucide-react";

interface AdditionalInfoSectionProps {
  data: AdditionalInfoData;
  onChange: (field: keyof AdditionalInfoData, value: any) => void;
}

export const AdditionalInfoSection: React.FC<AdditionalInfoSectionProps> = ({
  data,
  onChange
}) => {
  return (
    <div className="space-y-8 w-full">
      {/* Section Header */}


      {/* Responsive Grid */}
      <div className="grid md:grid-cols-2 gap-x-8 gap-y-8">
        {/* Left Column: Special Instructions & Urgent Issues */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="specialInstructions" className="text-base text-white font-medium">Special Instructions</Label>
            <Textarea
              id="specialInstructions"
              value={data.specialInstructions}
              onChange={(e) => onChange('specialInstructions', e.target.value)}
              placeholder="e.g. Deliver keys to lockbox, notify client before showings, etc."
              className="min-h-[90px] bg-blue-50 border border-blue-200 text-blue-900 placeholder:text-blue-400 rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="urgentIssues" className="text-base text-white font-medium">Urgent Issues</Label>
            <Textarea
              id="urgentIssues"
              value={data.urgentIssues}
              onChange={(e) => onChange('urgentIssues', e.target.value)}
              placeholder="e.g. Appraisal deadline approaching, missing signatures, etc."
              className="min-h-[90px] bg-blue-50 border border-blue-200 text-blue-900 placeholder:text-blue-400 rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
        {/* Right Column: Additional Notes (prominent) */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="notes" className="text-base text-white font-medium">Additional Notes</Label>
          <Textarea
            id="notes"
            value={data.notes}
            onChange={(e) => onChange('notes', e.target.value)}
            placeholder="Any other comments, reminders, or info for the transaction coordinator."
            className="min-h-[210px] bg-blue-50 border border-blue-200 text-blue-900 placeholder:text-blue-400 rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
    </div>
  );
};
