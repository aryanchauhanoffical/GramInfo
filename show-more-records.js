// Test script to show more records and available data
// Run this in your browser console

async function showMoreRecords() {
  console.log('🔍 Fetching more records from API...');
  
  const API_KEY = '579b464db66ec23bdd00000135805e57744d44fc7e6da9d67141fa4f';
  const RESOURCE_ID = 'ee03643a-ee4c-48c2-ac30-9f2ff26ab722';
  const BASE_URL = 'https://api.data.gov.in/resource';
  
  try {
    // Get more records (increased limit)
    const url = `${BASE_URL}/${RESOURCE_ID}?api-key=${API_KEY}&format=json&limit=2000`;
    const response = await fetch(url);
    const data = await response.json();
    
    console.log('📊 Total records fetched:', data.records ? data.records.length : 'No records');
    
    if (data.records && data.records.length > 0) {
      // Show all available states
      const allStates = [...new Set(data.records.map(r => r.state_name))];
      console.log('🏛️ All available states:', allStates);
      
      // Show Gujarat districts
      const gujaratRecords = data.records.filter(r => 
        r.state_name && r.state_name.toLowerCase().includes('gujarat')
      );
      
      if (gujaratRecords.length > 0) {
        const gujaratDistricts = [...new Set(gujaratRecords.map(r => r.district_name))];
        console.log('📍 Gujarat districts:', gujaratDistricts);
        
        // Show sample data for each Gujarat district
        console.log('📋 Sample data for each Gujarat district:');
        gujaratDistricts.forEach(district => {
          const districtData = gujaratRecords.find(r => r.district_name === district);
          if (districtData) {
            console.log(`\n🏘️ ${district}:`, {
              person_days_generated: districtData.person_days_generated,
              total_expenditure: districtData.total_expenditure,
              households_worked: districtData.households_worked,
              wage_rate: districtData.wage_rate,
              fin_year: districtData.fin_year,
              month: districtData.month
            });
          }
        });
      }
      
      // Show other states with their district counts
      console.log('\n📈 States with district counts:');
      const stateStats = {};
      data.records.forEach(record => {
        const state = record.state_name;
        if (!stateStats[state]) {
          stateStats[state] = new Set();
        }
        if (record.district_name) {
          stateStats[state].add(record.district_name);
        }
      });
      
      Object.keys(stateStats).sort().forEach(state => {
        console.log(`${state}: ${stateStats[state].size} districts`);
      });
      
    } else {
      console.log('❌ No records found');
    }
    
  } catch (error) {
    console.error('❌ Error fetching records:', error);
  }
}

// Run the test
showMoreRecords();
