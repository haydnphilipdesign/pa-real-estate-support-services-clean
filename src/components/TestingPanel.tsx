import React, { useState } from 'react';
import { Button } from '@/components/ui';
import { Play, FileText, Mail, Database, Download, Bug } from 'lucide-react';
import { mockTransactionData, fillFormWithTestData } from '@/utils/testFormData';
import { submitToAirtable } from '@/utils/airtable';

interface TestingPanelProps {
  formActions?: any;
  formData?: any;
  isVisible?: boolean;
  onToggle?: () => void;
}

export const TestingPanel: React.FC<TestingPanelProps> = ({
  formActions,
  formData,
  isVisible = false,
  onToggle
}) => {
  const [testResults, setTestResults] = useState<Record<string, any>>({});
  const [isRunning, setIsRunning] = useState<Record<string, boolean>>({});

  const runTest = async (testName: string, testFunction: () => Promise<any>) => {
    setIsRunning(prev => ({ ...prev, [testName]: true }));
    try {
      const result = await testFunction();
      setTestResults(prev => ({ 
        ...prev, 
        [testName]: { success: true, data: result, timestamp: new Date().toISOString() }
      }));
      console.log(`✅ ${testName} completed:`, result);
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        [testName]: { success: false, error: error.message, timestamp: new Date().toISOString() }
      }));
      console.error(`❌ ${testName} failed:`, error);
    } finally {
      setIsRunning(prev => ({ ...prev, [testName]: false }));
    }
  };

  const testFillForm = async () => {
    if (!formActions) throw new Error('Form actions not available');
    fillFormWithTestData(formActions);
    return 'Form filled with test data';
  };

  const testAirtableSubmission = async () => {
    const result = await submitToAirtable(mockTransactionData);
    return result;
  };

  const testPDFGeneration = async () => {
    const response = await fetch('/api/generateCoverSheet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        agentRole: mockTransactionData.agentData.role,
        sendEmail: false,
        data: mockTransactionData
      })
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`PDF generation failed: ${response.status} - ${errorData}`);
    }
    
    return await response.json();
  };

  const testEmailFunctionality = async () => {
    const response = await fetch('/api/generateCoverSheet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        agentRole: mockTransactionData.agentData.role,
        sendEmail: true,
        data: mockTransactionData
      })
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Email test failed: ${response.status} - ${errorData}`);
    }
    
    return await response.json();
  };

  const testSupabasePDFUpload = async () => {
    // Generate a test PDF first
    const pdfResponse = await fetch('/api/generateCoverSheet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        agentRole: mockTransactionData.agentData.role,
        sendEmail: false,
        data: mockTransactionData
      })
    });
    
    if (!pdfResponse.ok) {
      throw new Error('Failed to generate PDF for upload test');
    }
    
    // Test Supabase upload
    const uploadResponse = await fetch('/api/supabase-pdf-upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pdfData: 'test-pdf-data',
        filename: 'test-transaction.pdf',
        transactionId: 'test-123'
      })
    });
    
    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.text();
      throw new Error(`Supabase upload failed: ${uploadResponse.status} - ${errorData}`);
    }
    
    return await uploadResponse.json();
  };

  const testCompleteWorkflow = async () => {
    console.log('🔄 Testing complete workflow...');
    
    // Step 1: Fill form
    if (formActions) {
      fillFormWithTestData(formActions);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for form state to update
    }
    
    // Step 2: Submit to Airtable
    const airtableResult = await submitToAirtable(mockTransactionData);
    console.log('✅ Airtable submission:', airtableResult);
    
    // Step 3: Generate PDF
    const pdfResult = await testPDFGeneration();
    console.log('✅ PDF generation:', pdfResult);
    
    // Step 4: Test email (optional)
    try {
      const emailResult = await testEmailFunctionality();
      console.log('✅ Email test:', emailResult);
    } catch (error) {
      console.warn('⚠️ Email test failed (expected if not configured):', error.message);
    }
    
    return {
      airtable: airtableResult,
      pdf: pdfResult,
      completed: true
    };
  };

  if (!isVisible) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-50"
        title="Open Testing Panel"
      >
        <Bug className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-xl border p-4 w-80 z-50 max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Testing Panel</h3>
        <button
          onClick={onToggle}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      <div className="space-y-2">
        <Button
          onClick={() => runTest('fillForm', testFillForm)}
          disabled={isRunning.fillForm || !formActions}
          className="w-full text-left justify-start"
          variant="outline"
          size="sm"
        >
          <Play className="w-4 h-4 mr-2" />
          {isRunning.fillForm ? 'Filling...' : 'Fill Form with Test Data'}
        </Button>

        <Button
          onClick={() => runTest('airtable', testAirtableSubmission)}
          disabled={isRunning.airtable}
          className="w-full text-left justify-start"
          variant="outline"
          size="sm"
        >
          <Database className="w-4 h-4 mr-2" />
          {isRunning.airtable ? 'Testing...' : 'Test Airtable Submission'}
        </Button>

        <Button
          onClick={() => runTest('pdf', testPDFGeneration)}
          disabled={isRunning.pdf}
          className="w-full text-left justify-start"
          variant="outline"
          size="sm"
        >
          <FileText className="w-4 h-4 mr-2" />
          {isRunning.pdf ? 'Generating...' : 'Test PDF Generation'}
        </Button>

        <Button
          onClick={() => runTest('email', testEmailFunctionality)}
          disabled={isRunning.email}
          className="w-full text-left justify-start"
          variant="outline"
          size="sm"
        >
          <Mail className="w-4 h-4 mr-2" />
          {isRunning.email ? 'Sending...' : 'Test Email Functionality'}
        </Button>

        <Button
          onClick={() => runTest('supabase', testSupabasePDFUpload)}
          disabled={isRunning.supabase}
          className="w-full text-left justify-start"
          variant="outline"
          size="sm"
        >
          <Download className="w-4 h-4 mr-2" />
          {isRunning.supabase ? 'Uploading...' : 'Test Supabase Upload'}
        </Button>

        <Button
          onClick={() => runTest('complete', testCompleteWorkflow)}
          disabled={isRunning.complete}
          className="w-full text-left justify-start"
          variant="default"
          size="sm"
        >
          <Bug className="w-4 h-4 mr-2" />
          {isRunning.complete ? 'Running...' : 'Test Complete Workflow'}
        </Button>
      </div>

      {/* Test Results */}
      <div className="mt-4 space-y-2 max-h-40 overflow-y-auto">
        <h4 className="text-sm font-semibold text-gray-700">Results:</h4>
        {Object.entries(testResults).map(([testName, result]) => (
          <div key={testName} className="text-xs p-2 rounded bg-gray-50">
            <div className="flex items-center justify-between">
              <span className="font-medium">{testName}</span>
              <span className={result.success ? 'text-green-600' : 'text-red-600'}>
                {result.success ? '✅' : '❌'}
              </span>
            </div>
            {result.error && (
              <div className="text-red-600 mt-1">{result.error}</div>
            )}
            <div className="text-gray-500 text-xs mt-1">
              {new Date(result.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};