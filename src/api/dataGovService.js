import axios from 'axios';

// Data.gov.in API configuration
const API_KEY = '579b464db66ec23bdd00000135805e57744d44fc7e6da9d67141fa4f';
const BASE_URL = 'https://api.data.gov.in/resource';

// MGNREGA dataset resource IDs from Data.gov.in API documentation
const MGNREGA_RESOURCE_IDS = {
  // District-wise MGNREGA Data at a Glance - Main dataset
  MAIN_DATASET: 'ee03643a-ee4c-48c2-ac30-9f2ff26ab722',
  // Using the main dataset for all data types since it contains comprehensive MGNREGA data
  PERSON_DAYS: 'ee03643a-ee4c-48c2-ac30-9f2ff26ab722',
  EXPENDITURE: 'ee03643a-ee4c-48c2-ac30-9f2ff26ab722',
  HOUSEHOLDS: 'ee03643a-ee4c-48c2-ac30-9f2ff26ab722',
  WAGE_RATES: 'ee03643a-ee4c-48c2-ac30-9f2ff26ab722'
};

class DataGovService {
  constructor() {
    this.apiKey = API_KEY;
    this.baseURL = BASE_URL;
  }

  /**
   * Generic method to fetch data from Data.gov.in API
   * @param {string} resourceId - The resource ID for the dataset
   * @param {Object} filters - Filters to apply (e.g., {state: 'Madhya Pradesh', district: 'Bhopal'})
   * @param {number} limit - Number of records to fetch (default: 100)
   * @returns {Promise<Object>} API response data
   */
  async fetchData(resourceId, filters = {}, limit = 100) {
    try {
      const params = {
        'api-key': this.apiKey,
        format: 'json',
        limit: limit
      };

      // Add filters to params
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params[`filters[${key}]`] = filters[key];
        }
      });

      const response = await axios.get(`${this.baseURL}/${resourceId}`, {
        params: params,
        timeout: 30000, // 30 second timeout
        headers: {
          'Accept': 'application/json'
        }
      });

      // Check if we got metadata instead of records
      if (response.data && !response.data.records && response.data.title) {
        console.log('Received metadata instead of records. This might be a dataset info response.');
        // Try to fetch actual data with different approach
        return await this.fetchActualData(resourceId, filters, limit);
      }

      return response.data;
    } catch (error) {
      console.error('Data.gov.in API Error:', error);
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  }

  /**
   * Fetch actual data records (fallback method)
   */
  async fetchActualData(resourceId, filters = {}, limit = 100) {
    try {
      // Try without filters first to get sample data
      const sampleUrl = `${this.baseURL}/${resourceId}?api-key=${this.apiKey}&format=json&limit=${limit}`;
      
      const response = await axios.get(sampleUrl, {
        timeout: 10000,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.data && response.data.records) {
        // If we have records, filter them manually
        let records = response.data.records;
        
        // Apply filters manually
        if (filters.state_name) {
          records = records.filter(record => 
            record.state_name && record.state_name.toLowerCase().includes(filters.state_name.toLowerCase())
          );
        }
        
        if (filters.district) {
          records = records.filter(record => 
            record.district && record.district.toLowerCase().includes(filters.district.toLowerCase())
          );
        }

        return {
          ...response.data,
          records: records.slice(0, limit)
        };
      }

      return response.data;
    } catch (error) {
      console.error('Error fetching actual data:', error);
      throw error;
    }
  }

  /**
   * Fetch MGNREGA data for a specific state and district
   * @param {string} state - State name
   * @param {string} district - District name
   * @param {string} financialYear - Financial year (optional, defaults to current year)
   * @returns {Promise<Object>} Processed MGNREGA data
   */
  async fetchMGNREGAData(state, district, financialYear = null) {
    try {
      console.log(`Fetching MGNREGA data for state: ${state}, district: ${district}`);
      
      // First, try to get data with a smaller limit to avoid timeouts
      const allData = await this.fetchData(MGNREGA_RESOURCE_IDS.PERSON_DAYS, {}, 500); // Reduced limit
      
      if (!allData || !allData.records || allData.records.length === 0) {
        throw new Error('No data available from API');
      }
      
      console.log(`API returned ${allData.records.length} total records`);
      
      // Process the data to match our dashboard format
      return this.processMGNREGAData(allData, state, district);
    } catch (error) {
      console.error('Error fetching MGNREGA data:', error);
      
      // If it's a timeout error, try with even smaller limit
      if (error.message.includes('timeout')) {
        console.log('Timeout occurred, trying with smaller limit...');
        try {
          const smallData = await this.fetchData(MGNREGA_RESOURCE_IDS.PERSON_DAYS, {}, 100);
          if (smallData && smallData.records && smallData.records.length > 0) {
            console.log(`Retry successful with ${smallData.records.length} records`);
            return this.processMGNREGAData(smallData, state, district);
          }
        } catch (retryError) {
          console.error('Retry also failed:', retryError);
        }
      }
      
      throw error;
    }
  }

  /**
   * Process raw API data into dashboard format
   * @param {Object} rawData - Raw data from API
   * @param {string} state - State name
   * @param {string} district - District name
   * @returns {Object} Processed data for dashboard
   */
  processMGNREGAData(rawData, state, district) {
    try {
      // Extract records from API response
      const records = rawData.records || [];
      
      if (records.length === 0) {
        console.log('No records in API response');
        throw new Error('No data found for the selected state and district');
      }

      console.log(`Processing data for state: ${state}, district: ${district}`);
      console.log(`Total records available: ${records.length}`);

      // Filter records for the specific state
      let stateRecords = records;
      if (state) {
        stateRecords = records.filter(record => 
          record.state_name && record.state_name.toLowerCase().includes(state.toLowerCase())
        );
        console.log(`Records for state ${state}: ${stateRecords.length}`);
      }

      // Try to find records for the specific district
      let filteredRecords = stateRecords;
      
      if (district && district !== 'Select District' && district !== 'District Data Not Available') {
        // Try different possible district field names
        const possibleDistrictFields = ['district', 'district_name', 'block', 'taluka', 'tehsil'];
        
        for (const field of possibleDistrictFields) {
          const districtRecords = stateRecords.filter(record => {
            const fieldValue = record[field];
            return fieldValue && fieldValue.toLowerCase().includes(district.toLowerCase());
          });
          
          if (districtRecords.length > 0) {
            console.log(`Found ${districtRecords.length} records using field '${field}' for district '${district}'`);
            filteredRecords = districtRecords;
            break;
          }
        }
        
        // If no exact district match, try partial matching
        if (filteredRecords.length === 0) {
          console.log(`No exact match for district '${district}', trying partial matching...`);
          for (const field of possibleDistrictFields) {
            const partialMatches = stateRecords.filter(record => {
              const fieldValue = record[field];
              if (fieldValue) {
                const words = district.toLowerCase().split(' ');
                return words.some(word => fieldValue.toLowerCase().includes(word));
              }
              return false;
            });
            
            if (partialMatches.length > 0) {
              console.log(`Found ${partialMatches.length} partial matches using field '${field}'`);
              filteredRecords = partialMatches;
              break;
            }
          }
        }
      }

      // If still no matches, use state-level data
      if (filteredRecords.length === 0) {
        console.log('No district-specific data found, using state-level data');
        filteredRecords = stateRecords;
      }

      // If still no matches, use any available data
      if (filteredRecords.length === 0) {
        console.log('No state-specific data found, using any available data');
        filteredRecords = records.slice(0, 1);
      }

      // Final safety check - if we still have no records, create a fallback
      if (filteredRecords.length === 0) {
        console.log('No records found at all, creating fallback data');
        // Create a minimal record structure
        const fallbackRecord = {
          state_name: state || 'Unknown',
          district_name: district || 'Unknown',
          person_days_generated: '0',
          total_expenditure: '0',
          households_worked: '0',
          wage_rate: '209'
        };
        filteredRecords = [fallbackRecord];
      }

      // Debug: Show what we found
      console.log(`Final filtered records: ${filteredRecords.length}`);
      if (filteredRecords.length > 0) {
        console.log('Sample filtered record:', filteredRecords[0]);
      }

      // Process the first matching record
      const record = filteredRecords[0];
      
      console.log('Processing MGNREGA record:', record);
      
      // Map API fields to dashboard fields based on actual API response structure
      // First, let's see what fields are actually available
      console.log('Available fields in record:', Object.keys(record));
      
      // Map to the actual field names from the API response
      const personDaysValue = this.findFieldValue(record, [
        'Persondays_of_Central_Liability_so_far', // Primary field
        'person_days_generated', 'persondays', 'person_days', 'personDays', 
        'total_person_days', 'person_days_created', 'person_days_worked'
      ]);
      
      const expenditureValue = this.findFieldValue(record, [
        'Total_Exp', // Primary field (in lakhs)
        'total_expenditure', 'expenditure', 'expenditure_amount', 'total_exp',
        'expenditure_in_lakhs', 'expenditure_in_crores', 'total_expenditure_amount'
      ]);
      
      const householdsValue = this.findFieldValue(record, [
        'Total_Households_Worked', // Primary field
        'households_worked', 'households', 'total_households', 'households_benefited',
        'households_provided_employment', 'households_completed_100_days'
      ]);
      
      const wageRateValue = this.findFieldValue(record, [
        'Average_Wage_rate_per_day_per_person', // Primary field
        'wage_rate', 'daily_wage', 'wage_per_day', 'average_wage',
        'wage_per_person_day', 'minimum_wage', 'wage_rate_per_day'
      ]);
      
      const processedData = {
        personDays: this.formatPersonDays(personDaysValue),
        expenditure: this.formatExpenditure(expenditureValue),
        households: this.formatHouseholds(householdsValue),
        wageRate: this.formatWageRate(wageRateValue)
      };

      console.log('Processed data:', processedData);
      return processedData;
    } catch (error) {
      console.error('Error processing MGNREGA data:', error);
      throw new Error('Failed to process data from API');
    }
  }

  /**
   * Helper method to find field value from multiple possible field names
   */
  findFieldValue(record, possibleFields) {
    for (const field of possibleFields) {
      if (record[field] !== undefined && record[field] !== null && record[field] !== '') {
        console.log(`Found field '${field}' with value:`, record[field]);
        return record[field];
      }
    }
    console.log(`No field found from: ${possibleFields.join(', ')}`);
    return '0';
  }

  /**
   * Format person days data
   */
  formatPersonDays(value) {
    const num = parseFloat(value) || 0;
    if (num >= 100000) {
      return (num / 100000).toFixed(1) + 'L';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    } else {
      return num.toLocaleString('en-IN');
    }
  }

  /**
   * Format expenditure data (already in lakhs from API)
   */
  formatExpenditure(value) {
    const num = parseFloat(value) || 0;
    return '₹' + num.toFixed(1) + 'L';
  }

  /**
   * Format households data
   */
  formatHouseholds(value) {
    const num = parseInt(value) || 0;
    return num.toLocaleString('en-IN');
  }

  /**
   * Format wage rate data
   */
  formatWageRate(value) {
    const num = parseFloat(value) || 209;
    return '₹' + Math.round(num) + '/day';
  }

  /**
   * Test API connectivity
   * @returns {Promise<boolean>} True if API is accessible
   */
  async testConnection() {
    try {
      // Try to fetch a small amount of data to test connectivity
      const testData = await this.fetchData(MGNREGA_RESOURCE_IDS.PERSON_DAYS, {}, 1);
      return testData && testData.records !== undefined;
    } catch (error) {
      console.error('API connection test failed:', error);
      return false;
    }
  }

  /**
   * Get available states from API (if supported)
   * @returns {Promise<Array>} List of available states
   */
  async getAvailableStates() {
    try {
      const data = await this.fetchData(MGNREGA_RESOURCE_IDS.PERSON_DAYS, {}, 500); // Reduced limit for faster loading
      if (data.records && data.records.length > 0) {
        const states = [...new Set(data.records.map(record => record.state_name))];
        console.log(`Found ${states.length} states:`, states);
        return states.filter(Boolean).sort();
      }
      return [];
    } catch (error) {
      console.error('Error fetching available states:', error);
      return [];
    }
  }

  /**
   * Get available districts for a state
   * @param {string} state - State name
   * @returns {Promise<Array>} List of available districts
   */
  async getAvailableDistricts(state) {
    try {
      const data = await this.fetchData(MGNREGA_RESOURCE_IDS.PERSON_DAYS, {}, 1000); // Reduced limit for faster loading
      if (data.records && data.records.length > 0) {
        // Filter records for the specific state and get unique districts
        const stateRecords = data.records.filter(record => 
          record.state_name && record.state_name.toLowerCase().includes(state.toLowerCase())
        );
        
        console.log(`Found ${stateRecords.length} records for state: ${state}`);
        
        // Try different possible district field names
        const possibleDistrictFields = ['district', 'district_name', 'block', 'taluka', 'tehsil'];
        let districts = [];
        
        for (const field of possibleDistrictFields) {
          const fieldDistricts = stateRecords
            .map(record => record[field])
            .filter(Boolean)
            .filter(district => district.trim() !== '');
          
          if (fieldDistricts.length > 0) {
            console.log(`Found districts using field '${field}':`, fieldDistricts);
            districts = [...new Set(fieldDistricts)];
            break;
          }
        }
        
        // If still no districts found, check if records have any location-related fields
        if (districts.length === 0) {
          console.log('No districts found, checking all fields in first record:');
          if (stateRecords.length > 0) {
            console.log('Available fields:', Object.keys(stateRecords[0]));
            console.log('Sample record:', stateRecords[0]);
          }
          
          // Fallback: return a generic district name
          districts = ['District Data Not Available'];
        }
        
        console.log(`Returning ${districts.length} districts for ${state}:`, districts);
        return districts.sort();
      }
      return [];
    } catch (error) {
      console.error('Error fetching available districts:', error);
      return [];
    }
  }
}

// Export singleton instance
const dataGovServiceInstance = new DataGovService();
export default dataGovServiceInstance;
