import React, { useState } from 'react';
import { TestingPanel } from '@/components/TestingPanel';
import { mockTransactionData } from '@/utils/testFormData';

export const TestingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold mb-2">Transaction Form Testing Suite</h1>
          <p className="text-gray-600 mb-8">
            Test all components of the transaction form workflow without manually filling out forms.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Available Tests</h2>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mr-3 mt-0.5">FORM</span>
                  <div>
                    <strong>Fill Form with Test Data</strong>
                    <p className="text-gray-600">Automatically populates all form fields with realistic test data</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs mr-3 mt-0.5">API</span>
                  <div>
                    <strong>Test Airtable Submission</strong>
                    <p className="text-gray-600">Submits test data to Airtable and validates response</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs mr-3 mt-0.5">PDF</span>
                  <div>
                    <strong>Test PDF Generation</strong>
                    <p className="text-gray-600">Generates cover sheet PDF using test data</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs mr-3 mt-0.5">EMAIL</span>
                  <div>
                    <strong>Test Email Functionality</strong>
                    <p className="text-gray-600">Tests PDF generation with email sending</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs mr-3 mt-0.5">UPLOAD</span>
                  <div>
                    <strong>Test Supabase Upload</strong>
                    <p className="text-gray-600">Tests PDF upload to Supabase storage</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs mr-3 mt-0.5">FULL</span>
                  <div>
                    <strong>Test Complete Workflow</strong>
                    <p className="text-gray-600">Runs all tests in sequence to validate end-to-end functionality</p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Test Data Preview</h2>
              <div className="bg-gray-50 p-4 rounded-lg text-sm">
                <h3 className="font-medium mb-2">Mock Transaction Data:</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• Agent: {mockTransactionData.agentData.name} ({mockTransactionData.agentData.role})</li>
                  <li>• Property: {mockTransactionData.propertyData.address}</li>
                  <li>• MLS: {mockTransactionData.propertyData.mlsNumber}</li>
                  <li>• Sale Price: ${parseInt(mockTransactionData.propertyData.salePrice).toLocaleString()}</li>
                  <li>• Clients: {mockTransactionData.clients.length} ({mockTransactionData.clients.map(c => c.type).join(', ')})</li>
                  <li>• Commission: {mockTransactionData.commissionData.totalCommissionPercentage}%</li>
                  <li>• Title Company: {mockTransactionData.titleData.titleCompany}</li>
                </ul>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">🔧 Debug Information</h3>
                <p className="text-sm text-blue-800">
                  All test results and API responses are logged to the browser console. 
                  Open Developer Tools (F12) to see detailed debugging information.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-medium text-yellow-900 mb-2">⚠️ Testing Notes</h3>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Email tests may fail if SMTP credentials are not configured in Vercel</li>
              <li>• Airtable tests require valid API keys in environment variables</li>
              <li>• PDF generation should work regardless of other service configurations</li>
              <li>• Use these tests to isolate issues in the workflow</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Testing Panel - Always visible on this page */}
      <TestingPanel
        isVisible={true}
        onToggle={() => {}}
      />
    </div>
  );
};