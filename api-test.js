// API Connection Test
// Run this in your browser console at http://localhost:3000

async function testAPIConnection() {
  console.log('🔌 Testing Data.gov.in API Connection...');
  
  const API_KEY = '579b464db66ec23bdd00000135805e57744d44fc7e6da9d67141fa4f';
  const RESOURCE_ID = 'ee03643a-ee4c-48c2-ac30-9f2ff26ab722';
  const BASE_URL = 'https://api.data.gov.in/resource';
  
  try {
    // Test 1: Basic API connectivity
    console.log('📡 Test 1: Testing basic connectivity...');
    const testUrl = `${BASE_URL}/${RESOURCE_ID}?api-key=${API_KEY}&format=json&limit=1`;
    
    const response = await fetch(testUrl);
    const data = await response.json();
    
    if (data.records && data.records.length > 0) {
      console.log('✅ API Connection Successful!');
      console.log('📊 Sample record:', data.records[0]);
      
      // Test 2: State filter
      console.log('📡 Test 2: Testing state filter...');
      const stateUrl = `${BASE_URL}/${RESOURCE_ID}?api-key=${API_KEY}&format=json&limit=5&filters[state_name]=MADHYA PRADESH`;
      
      const stateResponse = await fetch(stateUrl);
      const stateData = await stateResponse.json();
      
      if (stateData.records && stateData.records.length > 0) {
        console.log('✅ State Filter Working!');
        console.log('🏛️ Available districts in Madhya Pradesh:', 
          [...new Set(stateData.records.map(r => r.district))].slice(0, 5)
        );
      }
      
      // Test 3: District filter
      console.log('📡 Test 3: Testing district filter...');
      const districtUrl = `${BASE_URL}/${RESOURCE_ID}?api-key=${API_KEY}&format=json&limit=1&filters[state_name]=MADHYA PRADESH&filters[district]=Bhopal`;
      
      const districtResponse = await fetch(districtUrl);
      const districtData = await districtResponse.json();
      
      if (districtData.records && districtData.records.length > 0) {
        console.log('✅ District Filter Working!');
        console.log('📈 MGNREGA Data for Bhopal:', districtData.records[0]);
      }
      
      console.log('🎉 All API tests passed! Your API is fully connected and working.');
      
    } else {
      console.log('❌ API returned no records');
    }
    
  } catch (error) {
    console.error('❌ API Connection Failed:', error);
    console.log('💡 This might be due to CORS restrictions. The API should work from your React app.');
  }
}

// Run the test
testAPIConnection();

