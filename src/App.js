import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, DollarSign, Briefcase, TrendingUp, AlertCircle, Loader, Globe, Info } from 'lucide-react';
import dataGovService from './api/dataGovService';

// Language translations
const translations = {
  en: {
    title: "GramInfo",
    subtitle: "MGNREGA District Dashboard",
    welcomeTitle: "Welcome to GramInfo",
    welcomeText: "This dashboard helps you track MGNREGA (Mahatma Gandhi National Rural Employment Guarantee Act) performance in your district. View employment data, expenditure, wage rates, and monthly trends. Select your district to see real-time information about rural employment schemes in your area.",
    state: "State",
    district: "District",
    selectState: "Select State",
    selectDistrict: "Select District",
    personDays: "Person-Days Generated",
    expenditure: "Total Expenditure",
    households: "Households Worked",
    wageRate: "Wage Rate",
    monthlyTrend: "Monthly Performance Trend",
    personDaysChart: "Person-Days (in thousands)",
    expenditureChart: "Expenditure (in lakhs)",
    keyHighlights: "Key Highlights",
    highlight1: "Average employment provided: 48 days per household",
    highlight2: "Wage payments: 95% completed within 15 days",
    highlight3: "Active job cards: 85% of total registered households",
    summaryTitle: "Summary of Your Search",
    districtSummary: "You searched for MGNREGA data for the following district",
    location: "Location",
    summaryText: "This data helps ensure transparency and accountability in rural employment programs. For complaints or queries, contact your local Gram Panchayat or visit the official MGNREGA website at nrega.nic.in.",
    loading: "Loading MGNREGA data...",
    dataUnavailable: "Data Temporarily Unavailable",
    pleaseRetry: "Please try again later or select a different district.",
    retry: "Retry",
    selectPrompt: "Please select a state and district to view MGNREGA performance data.",
    footer: "Build For Bharat Fellowship - 2026 Cohort (Engineering)",
    footerSubtext: "MVP By Aryan Chauhan",
    note: "Note:",
    noteText: "This dashboard now integrates with Data.gov.in Open API for real MGNREGA data. When API is unavailable, simulated data is used as fallback. Data is fetched in real-time from government sources."
  },
  hi: {
    title: "ग्रामइन्फो",
    subtitle: "मनरेगा जिला डैशबोर्ड",
    welcomeTitle: "ग्रामइन्फो में आपका स्वागत है",
    welcomeText: "यह डैशबोर्ड आपको अपने जिले में मनरेगा (महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी अधिनियम) के प्रदर्शन को ट्रैक करने में मदद करता है। रोजगार डेटा, व्यय, मजदूरी दर और मासिक रुझान देखें। अपने क्षेत्र में ग्रामीण रोजगार योजनाओं के बारे में वास्तविक समय की जानकारी देखने के लिए अपना जिला चुनें।",
    state: "राज्य",
    district: "जिला",
    selectState: "राज्य चुनें",
    selectDistrict: "जिला चुनें",
    personDays: "व्यक्ति-दिवस उत्पन्न",
    expenditure: "कुल व्यय",
    households: "कार्यरत परिवार",
    wageRate: "मजदूरी दर",
    monthlyTrend: "मासिक प्रदर्शन रुझान",
    personDaysChart: "व्यक्ति-दिवस (हजारों में)",
    expenditureChart: "व्यय (लाखों में)",
    keyHighlights: "मुख्य विशेषताएं",
    highlight1: "प्रदान किया गया औसत रोजगार: प्रति परिवार 48 दिन",
    highlight2: "मजदूरी भुगतान: 95% 15 दिनों के भीतर पूर्ण",
    highlight3: "सक्रिय जॉब कार्ड: कुल पंजीकृत परिवारों का 85%",
    summaryTitle: "आपकी खोज का सारांश",
    districtSummary: "आपने निम्नलिखित जिले के लिए मनरेगा डेटा खोजा",
    location: "स्थान",
    summaryText: "यह डेटा ग्रामीण रोजगार कार्यक्रमों में पारदर्शिता और जवाबदेही सुनिश्चित करने में मदद करता है। शिकायतों या प्रश्नों के लिए, अपने स्थानीय ग्राम पंचायत से संपर्क करें या nrega.nic.in पर आधिकारिक मनरेगा वेबसाइट पर जाएं।",
    loading: "मनरेगा डेटा लोड हो रहा है...",
    dataUnavailable: "डेटा अस्थायी रूप से अनुपलब्ध",
    pleaseRetry: "कृपया बाद में पुनः प्रयास करें या दूसरा जिला चुनें।",
    retry: "पुनः प्रयास करें",
    selectPrompt: "कृपया मनरेगा प्रदर्शन डेटा देखने के लिए राज्य और जिला चुनें।",
    footer: "Build For Bharat Fellowship - 2026 Cohort (Engineering)",
    footerSubtext: "MVP By Aryan Chauhan",
    note: "नोट:",
    noteText: "यह डैशबोर्ड अब वास्तविक मनरेगा डेटा के लिए Data.gov.in ओपन एपीआई के साथ एकीकृत है। जब एपीआई अनुपलब्ध होता है, तो सिम्युलेटेड डेटा का उपयोग फॉलबैक के रूप में किया जाता है। डेटा सरकारी स्रोतों से वास्तविक समय में प्राप्त किया जाता है।"
  },
  mr: {
    title: "ग्रामइन्फो",
    subtitle: "मनरेगा जिल्हा डॅशबोर्ड",
    welcomeTitle: "ग्रामइन्फो मध्ये आपले स्वागत आहे",
    welcomeText: "हे डॅशबोर्ड तुम्हाला तुमच्या जिल्ह्यातील मनरेगा (महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार हमी कायदा) कामगिरी ट्रॅक करण्यात मदत करते। रोजगार डेटा, खर्च, मजुरी दर आणि मासिक ट्रेंड पहा. तुमच्या क्षेत्रातील ग्रामीण रोजगार योजनांबद्दल रिअल-टाइम माहिती पाहण्यासाठी तुमचा जिल्हा निवडा.",
    state: "राज्य",
    district: "जिल्हा",
    selectState: "राज्य निवडा",
    selectDistrict: "जिल्हा निवडा",
    personDays: "व्यक्ती-दिवस निर्माण",
    expenditure: "एकूण खर्च",
    households: "कार्यरत कुटुंबे",
    wageRate: "मजुरी दर",
    monthlyTrend: "मासिक कामगिरी ट्रेंड",
    personDaysChart: "व्यक्ती-दिवस (हजारांमध्ये)",
    expenditureChart: "खर्च (लाखांमध्ये)",
    keyHighlights: "मुख्य वैशिष्ट्ये",
    highlight1: "प्रदान केलेला सरासरी रोजगार: प्रति कुटुंब 48 दिवस",
    highlight2: "मजुरी देयके: 95% 15 दिवसांत पूर्ण",
    highlight3: "सक्रिय जॉब कार्ड: एकूण नोंदणीकृत कुटुंबांपैकी 85%",
    summaryTitle: "तुमच्या शोधाचा सारांश",
    districtSummary: "तुम्ही खालील जिल्ह्यासाठी मनरेगा डेटा शोधला",
    location: "स्थान",
    summaryText: "हा डेटा ग्रामीण रोजगार कार्यक्रमांमध्ये पारदर्शकता आणि जबाबदारी सुनिश्चित करण्यास मदत करतो. तक्रारी किंवा प्रश्नांसाठी, तुमच्या स्थानिक ग्राम पंचायतीशी संपर्क साधा किंवा nrega.nic.in वर अधिकृत मनरेगा वेबसाइटला भेट द्या.",
    loading: "मनरेगा डेटा लोड होत आहे...",
    dataUnavailable: "डेटा तात्पुरता अनुपलब्ध",
    pleaseRetry: "कृपया नंतर पुन्हा प्रयत्न करा किंवा दुसरा जिल्हा निवडा.",
    retry: "पुन्हा प्रयत्न करा",
    selectPrompt: "कृपया मनरेगा कामगिरी डेटा पाहण्यासाठी राज्य आणि जिल्हा निवडा.",
    footer: "Build For Bharat Fellowship - 2026 Cohort (Engineering)",
    footerSubtext: "MVP By Aryan Chauhan",
    note: "टीप:",
    noteText: "हे डॅशबोर्ड आता वास्तविक मनरेगा डेटासाठी Data.gov.in ओपन API सह एकत्रित केले आहे. जेव्हा API अनुपलब्ध असते, तेव्हा सिम्युलेटेड डेटा फॉलबॅक म्हणून वापरला जातो. डेटा सरकारी स्त्रोतांकडून रिअल-टाइममध्ये मिळवला जातो."
  }
};

// Sample district data
const stateDistrictData = {
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Ratlam'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar']
};

const LanguageSelector = ({ currentLang, onLanguageChange }) => {
  return (
    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
      <Globe size={20} className="text-green-600" />
      <select
        value={currentLang}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="border-none bg-transparent focus:outline-none cursor-pointer font-medium text-gray-700"
      >
        <option value="en">English</option>
        <option value="hi">हिंदी</option>
        <option value="mr">मराठी</option>
      </select>
    </div>
  );
};

const WelcomeBanner = ({ t }) => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-600 rounded-lg p-6 mb-6 shadow-md">
      <div className="flex items-start gap-3">
        <Info className="text-green-600 flex-shrink-0 mt-1" size={24} />
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">{t.welcomeTitle}</h2>
          <p className="text-gray-700 leading-relaxed">{t.welcomeText}</p>
        </div>
      </div>
    </div>
  );
};

const SummaryBanner = ({ t, district, state, data }) => {
  if (!district || !data) return null;
  
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-600 rounded-lg p-6 mt-6 shadow-md">
      <div className="flex items-start gap-3">
        <Info className="text-blue-600 flex-shrink-0 mt-1" size={24} />
        <div className="w-full">
          <h2 className="text-xl font-bold text-gray-800 mb-3">{t.summaryTitle}</h2>
          <div className="space-y-2 text-gray-700">
            <p className="leading-relaxed font-semibold">
              {t.districtSummary}:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>{t.location}: <strong>{district}, {state}</strong></li>
              <li>{t.personDays}: <strong>{data.personDays}</strong></li>
              <li>{t.expenditure}: <strong>{data.expenditure}</strong></li>
              <li>{t.households}: <strong>{data.households}</strong></li>
              <li>{t.wageRate}: <strong>{data.wageRate}</strong></li>
            </ul>
            <p className="leading-relaxed mt-4">{t.summaryText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const DistrictSelector = ({ selectedState, selectedDistrict, onStateChange, onDistrictChange, availableStates, availableDistricts, apiConnected, t }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.state}
            {apiConnected && <span className="text-green-600 text-xs ml-2">(Live Data)</span>}
            {!apiConnected && <span className="text-orange-600 text-xs ml-2">(Demo Data)</span>}
          </label>
          <select
            value={selectedState}
            onChange={(e) => onStateChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">{t.selectState}</option>
            {availableStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.district}</label>
          <select
            value={selectedDistrict}
            onChange={(e) => onDistrictChange(e.target.value)}
            disabled={!selectedState}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
          >
            <option value="">{t.selectDistrict}</option>
            {availableDistricts.map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value, color, trend }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-green-600">
            <TrendingUp size={16} />
            <span className="text-sm font-medium">{trend}%</span>
          </div>
        )}
      </div>
      <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

const ChartView = ({ data, t }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
        No chart data available
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{t.monthlyTrend}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="personDays" fill="#10b981" name={t.personDaysChart} />
          <Bar dataKey="expenditure" fill="#3b82f6" name={t.expenditureChart} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const Dashboard = ({ data, loading, error, onRetry, district, t }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader className="animate-spin text-green-600 mb-4" size={48} />
        <p className="text-gray-600">{t.loading}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-start gap-3 mb-4">
          <AlertCircle className="text-red-600 flex-shrink-0" size={24} />
          <div>
            <h3 className="font-semibold text-red-800 mb-1">{t.dataUnavailable}</h3>
            <p className="text-red-700">{error}</p>
            <p className="text-red-600 text-sm mt-2">{t.pleaseRetry}</p>
          </div>
        </div>
        <button
          onClick={onRetry}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          {t.retry}
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <p className="text-blue-800">{t.selectPrompt}</p>
      </div>
    );
  }

  const seed = district.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const chartData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, idx) => ({
    month,
    personDays: 40 + ((seed + idx * 7) % 25),
    expenditure: 115 + ((seed + idx * 11) % 40)
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Briefcase}
          title={t.personDays}
          value={data.personDays || '2.5L'}
          color="bg-green-600"
          trend="8"
        />
        <StatCard
          icon={DollarSign}
          title={t.expenditure}
          value={data.expenditure || '₹450L'}
          color="bg-blue-600"
        />
        <StatCard
          icon={Users}
          title={t.households}
          value={data.households || '12,450'}
          color="bg-purple-600"
          trend="5"
        />
        <StatCard
          icon={TrendingUp}
          title={t.wageRate}
          value={data.wageRate || '₹209/day'}
          color="bg-orange-600"
        />
      </div>

      <ChartView data={chartData} t={t} />

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">{t.keyHighlights}</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>{t.highlight1}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>{t.highlight2}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>{t.highlight3}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

const App = () => {
  const [language, setLanguage] = useState('en');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [availableStates, setAvailableStates] = useState([]);
  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [apiConnected, setApiConnected] = useState(false);

  const t = translations[language];

  // Initialize API connection and load available states
  useEffect(() => {
    const initializeAPI = async () => {
      try {
        const connected = await dataGovService.testConnection();
        setApiConnected(connected);
        
        if (connected) {
          const states = await dataGovService.getAvailableStates();
          setAvailableStates(states.length > 0 ? states : Object.keys(stateDistrictData));
        } else {
          // Fallback to hardcoded states if API is not available
          setAvailableStates(Object.keys(stateDistrictData));
        }
      } catch (error) {
        console.error('Failed to initialize API:', error);
        setAvailableStates(Object.keys(stateDistrictData));
      }
    };

    initializeAPI();
  }, []);

  // Load districts when state changes
  useEffect(() => {
    const loadDistricts = async () => {
      if (!selectedState) {
        setAvailableDistricts([]);
        return;
      }

      try {
        if (apiConnected) {
          const districts = await dataGovService.getAvailableDistricts(selectedState);
          setAvailableDistricts(districts.length > 0 ? districts : stateDistrictData[selectedState] || []);
        } else {
          setAvailableDistricts(stateDistrictData[selectedState] || []);
        }
      } catch (error) {
        console.error('Failed to load districts:', error);
        setAvailableDistricts(stateDistrictData[selectedState] || []);
      }
    };

    loadDistricts();
  }, [selectedState, apiConnected]);

  useEffect(() => {
    if (selectedState && selectedDistrict) {
      fetchData();
    }
  }, [selectedState, selectedDistrict]);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Fetch real data from Data.gov.in API
      const districtData = await dataGovService.fetchMGNREGAData(selectedState, selectedDistrict);
      setData(districtData);
      setError('');
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(`Unable to load data: ${err.message}`);
      
      // Fallback to mock data if API fails
      try {
        console.log('Falling back to mock data...');
        const mockData = generateDistrictData(selectedState, selectedDistrict);
        setData(mockData);
        setError('Using simulated data - API temporarily unavailable');
      } catch (mockErr) {
        console.error('Mock data generation failed:', mockErr);
        setError('Unable to load any data. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const generateDistrictData = (state, district) => {
    const seed = (state + district).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const random = (min, max) => Math.floor(min + (seed % (max - min)));
    
    const personDays = random(180000, 350000);
    const households = random(8000, 18000);
    const expenditure = random(35000000, 75000000);
    const wageRate = random(205, 220);
    
    return {
      personDays: (personDays / 100000).toFixed(1) + 'L',
      expenditure: '₹' + (expenditure / 100000).toFixed(0) + 'L',
      households: households.toLocaleString('en-IN'),
      wageRate: '₹' + wageRate + '/day'
    };
  };

  const handleRetry = () => {
    if (selectedState && selectedDistrict) {
      fetchData();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
              <p className="text-green-100 text-lg">{t.subtitle}</p>
            </div>
            <LanguageSelector currentLang={language} onLanguageChange={setLanguage} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <WelcomeBanner t={t} />
        
        <DistrictSelector
          selectedState={selectedState}
          selectedDistrict={selectedDistrict}
          onStateChange={setSelectedState}
          onDistrictChange={setSelectedDistrict}
          availableStates={availableStates}
          availableDistricts={availableDistricts}
          apiConnected={apiConnected}
          t={t}
        />
        
        <Dashboard 
          data={data} 
          loading={loading} 
          error={error}
          onRetry={handleRetry}
          district={selectedDistrict}
          t={t}
        />

        <SummaryBanner t={t} district={selectedDistrict} state={selectedState} data={data} />

      </main>

      <footer className="bg-gray-800 text-white mt-12 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">{t.footer}</p>
          <p className="text-gray-400 text-sm mt-2">{t.footerSubtext}</p>
        </div>
      </footer>
    </div>
  );
};

export default App;