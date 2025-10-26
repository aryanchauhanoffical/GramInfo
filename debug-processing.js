// Debug test for the API data processing issue
// Run this in your browser console

async function debugDataProcessing() {
  console.log('🔍 Debugging data processing issue...');
  
  const API_KEY = '579b464db66ec23bdd00000135805e57744d44fc7e6da9d67141fa4f';
  const RESOURCE_ID = 'ee03643a-ee4c-48c2-ac30-9f2ff26ab722';
  const BASE_URL = 'https://api.data.gov.in/resource';
  
  try {
    // Get all data
    const url = `${BASE_URL}/${RESOURCE_ID}?api-key=${API_KEY}&format=json&limit=100`;
    const response = await fetch(url);
    const data = await response.json();
    
    console.log('📊 API Response:', data);
    console.log('📋 Records count:', data.records ? data.records.length : 'No records');
    
    if (data.records && data.records.length > 0) {
      // Check Gujarat records
      const gujaratRecords = data.records.filter(r => 
        r.state_name && r.state_name.toLowerCase().includes('gujarat')
      );
      
      console.log('🏛️ Gujarat records:', gujaratRecords.length);
      
      if (gujaratRecords.length > 0) {
        console.log('📍 Sample Gujarat record:', gujaratRecords[0]);
        
        // Check district field
        const districts = [...new Set(gujaratRecords.map(r => r.district_name))];
        console.log('🏘️ Districts in Gujarat:', districts);
        
        // Check for BANAS KANTHA specifically
        const bankaRecords = gujaratRecords.filter(r => 
          r.district_name && r.district_name.toLowerCase().includes('banas kantha')
        );
        
        console.log('🎯 BANAS KANTHA records:', bankaRecords.length);
        if (bankaRecords.length > 0) {
          console.log('✅ Found BANAS KANTHA data:', bankaRecords[0]);
        } else {
          console.log('❌ No BANAS KANTHA data found');
          console.log('Available districts:', districts);
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Debug failed:', error);
  }
}

// Run the debug
debugDataProcessing();
