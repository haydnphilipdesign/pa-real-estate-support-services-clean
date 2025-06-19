const Airtable = require('airtable');

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
    const { baseId, tableId, formData } = req.body;

    // Configure Airtable
    const base = new Airtable({
      apiKey: process.env.VITE_AIRTABLE_API_KEY
    }).base(baseId);

    // Format data for Airtable
    const airtableData = {
      "Role": formData.agentData?.agentRole || '',
      "Property Address": formData.propertyData?.address || '',
      "MLS Number": formData.propertyData?.mlsNumber || '',
      "Sale Price": formData.propertyData?.salePrice || '',
      "Clients": formData.clients?.map((client) => client.name).join(", ") || '',
      "Commission Total": formData.commissionData?.totalCommission || '',
      "Submission Date": new Date().toISOString(),
    };

    // Create record in Airtable
    const record = await base(tableId).create([
      {
        fields: airtableData
      }
    ]);

    res.status(200).json({
      success: true,
      recordId: record[0].getId(),
      message: 'Transaction submitted successfully'
    });

  } catch (error) {
    console.error('Airtable submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit transaction',
      error: error.message
    });
  }
};