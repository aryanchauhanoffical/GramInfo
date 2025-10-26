# GramInfo - MGNREGA District Dashboard

A comprehensive dashboard for tracking MGNREGA (Mahatma Gandhi National Rural Employment Guarantee Act) performance across Indian districts with real-time data from Data.gov.in API.

## 🚀 Features

### 📊 Real-Time Data Integration
- **Live API Integration**: Fetches real MGNREGA data from Data.gov.in
- **33+ States**: Complete coverage of Indian states
- **1000+ Districts**: Dynamic district loading based on selected state
- **Real MGNREGA Metrics**: Person-days, expenditure, households, wage rates

### 🌐 Multi-Language Support
- **English**: Full interface in English
- **Hindi**: Complete Hindi translation (हिंदी)
- **Marathi**: Full Marathi translation (मराठी)

### 📱 Modern UI/UX
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Government Theme**: Professional green and blue color scheme
- **Interactive Charts**: Monthly performance trends with Recharts
- **Live Data Indicators**: Shows when using real vs demo data
- **Loading States**: Smooth loading animations
- **Error Handling**: Comprehensive error management with fallbacks

### 🔧 Technical Features
- **API Fallback**: Gracefully falls back to simulated data if API fails
- **Timeout Management**: 30-second timeout with retry mechanisms
- **Field Mapping**: Intelligent mapping of API fields to dashboard metrics
- **Performance Optimized**: Efficient data loading and processing

## 🛠️ Tech Stack

- **Frontend**: React 18.2.0
- **Styling**: Tailwind CSS 4.1.16
- **Charts**: Recharts 3.3.0
- **Icons**: Lucide React 0.548.0
- **HTTP Client**: Axios 1.12.2
- **Build Tool**: React Scripts 5.0.1

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aryanchauhanoffical/GramInfo.git
   cd GramInfo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 API Integration

### Data.gov.in API
- **API Key**: `579b464db66ec23bdd00000135805e57744d44fc7e6da9d67141fa4f`
- **Resource ID**: `ee03643a-ee4c-48c2-ac30-9f2ff26ab722`
- **Dataset**: District-wise MGNREGA Data at a Glance
- **Format**: JSON with real-time updates

### API Endpoints
```
https://api.data.gov.in/resource/ee03643a-ee4c-48c2-ac30-9f2ff26ab722?api-key=YOUR_API_KEY&format=json&limit=500
```

### Data Fields Mapped
- **Person Days**: `Persondays_of_Central_Liability_so_far`
- **Expenditure**: `Total_Exp` (in lakhs)
- **Households**: `Total_Households_Worked`
- **Wage Rate**: `Average_Wage_rate_per_day_per_person`

## 📊 Dashboard Components

### State & District Selector
- Dynamic loading of states from API
- District dropdown populated based on selected state
- Real-time data indicators

### Key Metrics Cards
- **Person-Days Generated**: Employment days created
- **Total Expenditure**: Government spending in lakhs
- **Households Worked**: Number of beneficiary households
- **Wage Rate**: Daily wage rate per person

### Monthly Performance Chart
- Interactive bar chart showing monthly trends
- Person-days and expenditure visualization
- Responsive design for all screen sizes

### Summary Banner
- Comprehensive data summary
- Location-specific insights
- Government contact information

## 🔧 Configuration

### API Service (`src/api/dataGovService.js`)
- Configurable API endpoints
- Timeout and retry settings
- Field mapping for different data sources
- Error handling and fallback mechanisms

### Language Support
- Translation files in `src/App.js`
- Easy to add new languages
- Consistent terminology across all languages

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to GitHub Pages
```bash
npm install -g gh-pages
npm run build
npm run deploy
```

### Deploy to Netlify/Vercel
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy automatically on push

## 📈 Performance

- **Fast Loading**: Optimized API calls with smaller data limits
- **Caching**: Efficient data caching and state management
- **Responsive**: Works seamlessly across all devices
- **Accessibility**: WCAG compliant interface

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Aryan Chauhan**
- GitHub: [@aryanchauhanoffical](https://github.com/aryanchauhanoffical)
- Project: Build For Bharat Fellowship - 2026 Cohort (Engineering)

## 🙏 Acknowledgments

- **Data.gov.in**: For providing the MGNREGA dataset API
- **Build For Bharat**: For the fellowship program
- **React Community**: For the amazing ecosystem
- **Tailwind CSS**: For the utility-first CSS framework

## 📞 Support

For support, email aryanchauhanoffical@gmail.com or create an issue in the repository.

---

**Made with ❤️ for India's rural development through transparent MGNREGA data access.**