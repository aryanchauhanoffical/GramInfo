// Test script to verify the data mapping with correct field names
// Run this in your browser console

async function testDataMapping() {
  console.log('🧪 Testing data mapping with correct field names...');
  
  const API_KEY = '579b464db66ec23bdd00000135805e57744d44fc7e6da9d67141fa4f';
  const RESOURCE_ID = 'ee03643a-ee4c-48c2-ac30-9f2ff26ab722';
  const BASE_URL = 'https://api.data.gov.in/resource';
  
  try {
    const url = `${BASE_URL}/${RESOURCE_ID}?api-key=${API_KEY}&format=json&limit=5`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.records && data.records.length > 0) {
      const record = data.records[0];
      
      console.log('📊 Sample record for testing:');
      console.log(record);
      
      // Test the field mapping
      console.log('\n🔍 Testing field mapping:');
      
      // Person Days
      const personDays = record.Persondays_of_Central_Liability_so_far;
      console.log(`Person Days (Persondays_of_Central_Liability_so_far): ${personDays}`);
      console.log(`Formatted: ${(personDays / 100000).toFixed(1)}L`);
      
      // Expenditure
      const expenditure = record.Total_Exp;
      console.log(`Expenditure (Total_Exp): ${expenditure}`);
      console.log(`Formatted: ₹${expenditure}L`);
      
      // Households
      const households = record.Total_Households_Worked;
      console.log(`Households (Total_Households_Worked): ${households}`);
      console.log(`Formatted: ${households.toLocaleString('en-IN')}`);
      
      // Wage Rate
      const wageRate = record.Average_Wage_rate_per_day_per_person;
      console.log(`Wage Rate (Average_Wage_rate_per_day_per_person): ${wageRate}`);
      console.log(`Formatted: ₹${Math.round(wageRate)}/day`);
      
      console.log('\n✅ Data mapping test completed successfully!');
      
    } else {
      console.log('❌ No records found');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Run the test
testDataMapping();
