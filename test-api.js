// Test script for Data.gov.in API integration
import dataGovService from './src/api/dataGovService.js';

async function testAPI() {
  console.log('Testing Data.gov.in API integration...');
  
  try {
    // Test API connection
    console.log('1. Testing API connection...');
    const connected = await dataGovService.testConnection();
    console.log('API Connected:', connected);
    
    if (connected) {
      // Test fetching available states
      console.log('2. Testing available states...');
      const states = await dataGovService.getAvailableStates();
      console.log('Available states:', states.slice(0, 5)); // Show first 5
      
      if (states.length > 0) {
        // Test fetching districts for first state
        console.log('3. Testing districts for state:', states[0]);
        const districts = await dataGovService.getAvailableDistricts(states[0]);
        console.log('Available districts:', districts.slice(0, 5)); // Show first 5
        
        if (districts.length > 0) {
          // Test fetching MGNREGA data
          console.log('4. Testing MGNREGA data for:', states[0], districts[0]);
          const data = await dataGovService.fetchMGNREGAData(states[0], districts[0]);
          console.log('MGNREGA Data:', data);
        }
      }
    }
    
    console.log('✅ API test completed successfully!');
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    console.log('This is expected if the API key or resource ID needs to be updated.');
  }
}

// Run the test
testAPI();
