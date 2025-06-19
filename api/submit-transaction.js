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
    console.log('Request method:', req.method);
    console.log('Request headers:', JSON.stringify(req.headers, null, 2));
    console.log('Raw request body:', typeof req.body, req.body);
    console.log('Request body keys:', Object.keys(req.body || {}));
    
    const { baseId, tableId, formData } = req.body || {};

    if (!formData) {
      console.error('No form data provided in request');
      return res.status(400).json({
        success: false,
        message: 'No form data provided'
      });
    }

    console.log('Form data structure:', {
      hasAgentData: !!formData.agentData,
      hasPropertyData: !!formData.propertyData,
      hasClients: !!formData.clients,
      clientsLength: formData.clients?.length || 0
    });

    // Check environment variables
    const airtableApiKey = process.env.VITE_AIRTABLE_API_KEY || process.env.AIRTABLE_API_KEY;
    const airtableBaseId = baseId || process.env.VITE_AIRTABLE_BASE_ID || process.env.AIRTABLE_BASE_ID;
    
    console.log('Environment check:', {
      hasApiKey: !!airtableApiKey,
      hasBaseId: !!airtableBaseId,
      receivedBaseId: !!baseId,
      receivedTableId: !!tableId
    });

    if (!airtableApiKey || !airtableBaseId) {
      return res.status(500).json({
        success: false,
        message: 'Missing Airtable configuration'
      });
    }

    // Configure Airtable
    const base = new Airtable({
      apiKey: airtableApiKey
    }).base(airtableBaseId);

    console.log('Processing Airtable submission with direct field mapping...');
    
    // Extract and map form data to Airtable fields
    const { agentData, propertyData, clients, commissionData, propertyDetailsData, titleData } = formData;
    
    const airtableFields = {
      'Agent Name': agentData?.name || '',
      'Agent Email': agentData?.email || '',
      'Agent Phone': agentData?.phone || '',
      'Agent Role': agentData?.role || '',
      'MLS Number': propertyData?.mlsNumber || '',
      'Property Address': propertyData?.address || '',
      'Sale Price': propertyData?.salePrice || '',
      'Property Status': propertyData?.status || '',
      'Property Type': propertyData?.propertyType || '',
      'County': propertyData?.county || '',
      'Closing Date': propertyData?.closingDate || '',
      'Is Winterized': propertyData?.isWinterized || 'NO',
      'Update MLS': propertyData?.updateMls || 'NO',
      'Property Access Type': propertyData?.propertyAccessType || '',
      'Lockbox Access Code': propertyData?.lockboxAccessCode || '',
      'Is Built Before 1978': propertyData?.isBuiltBefore1978 || '',
      'Total Commission Percentage': commissionData?.totalCommissionPercentage || '',
      'Listing Agent Percentage': commissionData?.listingAgentPercentage || '',
      'Buyers Agent Percentage': commissionData?.buyersAgentPercentage || '',
      'Has Broker Fee': commissionData?.hasBrokerFee ? 'YES' : 'NO',
      'Broker Fee Amount': commissionData?.brokerFeeAmount || '',
      'Seller Paid Amount': commissionData?.sellerPaidAmount || '',
      'Buyer Paid Amount': commissionData?.buyerPaidAmount || '',
      'Has Sellers Assist': commissionData?.hasSellersAssist ? 'YES' : 'NO',
      'Sellers Assist': commissionData?.sellersAssist || '',
      'Is Referral': commissionData?.isReferral ? 'YES' : 'NO',
      'Referral Party': commissionData?.referralParty || '',
      'Broker EIN': commissionData?.brokerEin || '',
      'Referral Fee': commissionData?.referralFee || '',
      'Coordinator Fee Paid By': commissionData?.coordinatorFeePaidBy || 'client',
      'Resale Cert Required': propertyDetailsData?.resaleCertRequired ? 'YES' : 'NO',
      'HOA Name': propertyDetailsData?.hoaName || '',
      'CO Required': propertyDetailsData?.coRequired ? 'YES' : 'NO',
      'Municipality': propertyDetailsData?.municipality || '',
      'First Right Of Refusal': propertyDetailsData?.firstRightOfRefusal ? 'YES' : 'NO',
      'First Right Name': propertyDetailsData?.firstRightName || '',
      'Attorney Representation': propertyDetailsData?.attorneyRepresentation ? 'YES' : 'NO',
      'Attorney Name': propertyDetailsData?.attorneyName || '',
      'Home Warranty': propertyDetailsData?.homeWarranty ? 'YES' : 'NO',
      'Warranty Company': propertyDetailsData?.warrantyCompany || '',
      'Warranty Cost': propertyDetailsData?.warrantyCost || '',
      'Warranty Paid By': propertyDetailsData?.warrantyPaidBy || 'SELLER',
      'Title Company': titleData?.titleCompany || '',
      'Title Contact Name': titleData?.contactName || '',
      'Title Contact Phone': titleData?.contactPhone || '',
      'Title Contact Email': titleData?.contactEmail || '',
      'Client Names': clients?.map(c => c.name).join(', ') || '',
      'Client Emails': clients?.map(c => c.email).join(', ') || '',
      'Client Phones': clients?.map(c => c.phone).join(', ') || '',
      'Client Types': clients?.map(c => c.type).join(', ') || '',
      'Submission Date': new Date().toISOString().split('T')[0]
    };

    console.log('Mapped Airtable fields:', Object.keys(airtableFields).length, 'fields');
    
    try {
      console.log('Submitting to Airtable with tableId:', tableId);
      console.log('Sample of fields to submit:', Object.keys(airtableFields).slice(0, 5));
      
      const airtableResult = await base(tableId).create([{
        fields: airtableFields
      }]);
      
      console.log('Airtable submission successful:', airtableResult);
      
      const recordId = airtableResult[0].id;
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

    } catch (airtableError) {
      console.error('Airtable submission failed:', airtableError);
      console.error('Airtable error details:', {
        message: airtableError.message,
        statusCode: airtableError.statusCode,
        error: airtableError.error
      });
      
      return res.status(500).json({
        success: false,
        message: 'Failed to submit to Airtable',
        error: airtableError.message,
        airtableError: true
      });
    }

  } catch (error) {
    console.error('Transaction submission error:', error);
    console.error('Error stack:', error.stack);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      status: error.status
    });
    
    return res.status(500).json({
      success: false,
      message: 'Failed to submit transaction',
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};