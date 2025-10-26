// Debug script to find the actual field names in the API response
// Run this in your browser console

async function findActualFieldNames() {
  console.log('🔍 Finding actual field names in API response...');
  
  const API_KEY = '579b464db66ec23bdd00000135805e57744d44fc7e6da9d67141fa4f';
  const RESOURCE_ID = 'ee03643a-ee4c-48c2-ac30-9f2ff26ab722';
  const BASE_URL = 'https://api.data.gov.in/resource';
  
  try {
    const url = `${BASE_URL}/${RESOURCE_ID}?api-key=${API_KEY}&format=json&limit=5`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.records && data.records.length > 0) {
      console.log('📊 Sample record with ALL fields:');
      console.log(data.records[0]);
      
      console.log('\n🔍 All field names in the record:');
      const allFields = Object.keys(data.records[0]);
      allFields.forEach(field => {
        console.log(`- ${field}: ${data.records[0][field]}`);
      });
      
      // Look for fields that might contain our data
      console.log('\n🎯 Looking for MGNREGA-related fields:');
      const mgnregaFields = allFields.filter(field => 
        field.toLowerCase().includes('person') ||
        field.toLowerCase().includes('expenditure') ||
        field.toLowerCase().includes('household') ||
        field.toLowerCase().includes('wage') ||
        field.toLowerCase().includes('days') ||
        field.toLowerCase().includes('work')
      );
      
      console.log('Found MGNREGA-related fields:', mgnregaFields);
      
      // Show values for these fields
      mgnregaFields.forEach(field => {
        console.log(`${field}: ${data.records[0][field]}`);
      });
      
    } else {
      console.log('❌ No records found');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Run the debug
findActualFieldNames();
