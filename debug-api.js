// Debug script to check what fields are available in the API response
// Run this in your browser console

async function debugAPIFields() {
  console.log('🔍 Debugging API fields...');
  
  const API_KEY = '579b464db66ec23bdd00000135805e57744d44fc7e6da9d67141fa4f';
  const RESOURCE_ID = 'ee03643a-ee4c-48c2-ac30-9f2ff26ab722';
  const BASE_URL = 'https://api.data.gov.in/resource';
  
  try {
    // Get sample data
    const url = `${BASE_URL}/${RESOURCE_ID}?api-key=${API_KEY}&format=json&limit=10`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.records && data.records.length > 0) {
      console.log('📊 Sample record fields:', Object.keys(data.records[0]));
      console.log('📋 Full sample record:', data.records[0]);
      
      // Check for Gujarat specifically
      const gujaratRecords = data.records.filter(r => 
        r.state_name && r.state_name.toLowerCase().includes('gujarat')
      );
      
      console.log('🏛️ Gujarat records found:', gujaratRecords.length);
      
      if (gujaratRecords.length > 0) {
        console.log('📍 Gujarat sample record:', gujaratRecords[0]);
        console.log('🏘️ District field value:', gujaratRecords[0].district);
        console.log('🏘️ All district-related fields:', 
          Object.keys(gujaratRecords[0]).filter(key => 
            key.toLowerCase().includes('district') || 
            key.toLowerCase().includes('block') ||
            key.toLowerCase().includes('taluka')
          )
        );
      }
      
      // Check all unique states and their district counts
      const stateStats = {};
      data.records.forEach(record => {
        const state = record.state_name;
        if (!stateStats[state]) {
          stateStats[state] = {
            count: 0,
            districts: new Set()
          };
        }
        stateStats[state].count++;
        if (record.district) {
          stateStats[state].districts.add(record.district);
        }
      });
      
      console.log('📈 State statistics:', stateStats);
      
    } else {
      console.log('❌ No records found');
    }
    
  } catch (error) {
    console.error('❌ Debug failed:', error);
  }
}

// Run the debug
debugAPIFields();

