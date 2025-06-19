const Airtable = require('airtable');
const fetch = require('node-fetch');

/**
 * Enhanced transaction submission with comprehensive workflow
 * 1. Submits data to Airtable with proper field mapping
 * 2. Generates PDF with transaction data
 * 3. Sends email with PDF attachment
 * 4. Uploads PDF to Supabase
 * 5. Updates Airtable record with PDF attachment
 */
module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Starting comprehensive transaction submission...');
    const { baseId, tableId, formData } = req.body;

    if (!formData) {
      return res.status(400).json({
        success: false,
        message: 'No form data provided'
      });
    }

    // Configure Airtable
    const base = new Airtable({
      apiKey: process.env.VITE_AIRTABLE_API_KEY || process.env.AIRTABLE_API_KEY
    }).base(baseId || process.env.VITE_AIRTABLE_BASE_ID || process.env.AIRTABLE_BASE_ID);

    // Enhanced field mapping with proper Airtable field IDs
    const airtableData = {
      // Core transaction data
      [process.env.FIELD_AGENT_ROLE || 'fldOVyoxz38rWwAFy']: formData.agentData?.role || formData.agentData?.agentRole || '',
      [process.env.FIELD_PROPERTY_ADDRESS || 'fldypnfnHhplWYcCW']: formData.propertyData?.address || '',
      [process.env.FIELD_MLS_NUMBER || 'fld6O2FgIXQU5G27o']: formData.propertyData?.mlsNumber || '',
      [process.env.FIELD_SALE_PRICE || 'fldhHjBZJISmnP8SK']: formData.propertyData?.salePrice || '',
      [process.env.FIELD_CLOSING_DATE || 'fldSY6vbE1zAhJZqd']: formData.propertyData?.closingDate || '',
      
      // Agent information
      [process.env.FIELD_AGENT_NAME || 'fldSqxNOZ9B5PgSab']: formData.agentData?.name || formData.agentData?.agentName || '',
      [process.env.FIELD_AGENT_EMAIL || 'flddP6a8EG6qTJdIi']: formData.agentData?.email || '',
      [process.env.FIELD_AGENT_PHONE || 'fldBnh8W6iGW014yY']: formData.agentData?.phone || '',
      
      // Commission data
      [process.env.FIELD_TOTAL_COMMISSION || 'fldE8INzEorBtx2uN']: formData.commissionData?.totalCommission || '',
      [process.env.FIELD_LISTING_AGENT_COMMISSION || 'flduuQQT7o6XAGlRe']: formData.commissionData?.listingAgentCommission || '',
      [process.env.FIELD_BUYERS_AGENT_COMMISSION || 'fld5KRrToAAt5kOLd']: formData.commissionData?.buyersAgentCommission || '',
      
      // Client information (combined for display)
      "Clients": formData.clients?.map((client) => client.name).join(", ") || '',
      
      // Property details
      "County": formData.propertyData?.county || '',
      "Property Type": formData.propertyData?.propertyType || '',
      "Property Status": formData.propertyData?.status || '',
      
      // Additional fields
      "Municipality": formData.propertyDetails?.municipality || '',
      "HOA Name": formData.propertyDetails?.hoaName || '',
      "Title Company": formData.titleData?.titleCompany || '',
      
      // Submission metadata
      "Submission Date": new Date().toISOString(),
      "Form Version": "2.0"
    };

    // Remove empty fields to avoid Airtable errors
    Object.keys(airtableData).forEach(key => {
      if (!airtableData[key] || airtableData[key] === '') {
        delete airtableData[key];
      }
    });

    console.log('Creating Airtable record with enhanced field mapping...');
    
    // Create record in Airtable
    const record = await base(tableId || 'Transactions').create([
      {
        fields: airtableData
      }
    ]);

    const recordId = record[0].getId();
    console.log('Airtable record created successfully:', recordId);

    // Step 2: Generate PDF and process complete workflow
    console.log('Initiating PDF generation and processing workflow...');
    
    try {
      // Prepare form data with transaction ID for PDF workflow
      const pdfFormData = {
        ...formData,
        transactionId: recordId
      };

      // Call the generate-pdf API for complete workflow
      const generatePdfUrl = process.env.NEXT_PUBLIC_HOST_URL ?
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/generate-pdf` :
        '/api/generate-pdf';

      const pdfResponse = await fetch(generatePdfUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pdfFormData)
      });

      if (pdfResponse.ok) {
        const pdfResult = await pdfResponse.json();
        console.log('PDF workflow completed successfully:', pdfResult);
        
        // Return comprehensive success response
        return res.status(200).json({
          success: true,
          recordId: recordId,
          message: 'Transaction submitted successfully with complete workflow',
          details: {
            airtableRecord: recordId,
            pdfGenerated: pdfResult.success,
            emailSent: pdfResult.emailSent,
            pdfUploaded: pdfResult.attachmentSuccess,
            pdfUrl: pdfResult.pdfUrl
          }
        });
      } else {
        // PDF workflow failed, but Airtable record was created
        console.error('PDF workflow failed:', await pdfResponse.text());
        return res.status(200).json({
          success: true,
          recordId: recordId,
          message: 'Transaction submitted successfully, but PDF processing failed',
          warning: 'PDF generation and email workflow encountered issues'
        });
      }
    } catch (pdfError) {
      console.error('Error in PDF workflow:', pdfError);
      // Return success for Airtable submission even if PDF fails
      return res.status(200).json({
        success: true,
        recordId: recordId,
        message: 'Transaction submitted successfully, but PDF processing failed',
        warning: 'PDF generation workflow encountered errors'
      });
    }

  } catch (error) {
    console.error('Transaction submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit transaction',
      error: error.message
    });
  }
};