# GramInfo Dashboard 1.0

A comprehensive MGNREGA (Mahatma Gandhi National Rural Employment Guarantee Act) District Dashboard built for the Build For Bharat Fellowship 2026 Cohort.

## 🎯 Project Overview

GramInfo is a modern, responsive web application that provides citizens, government officials, and researchers with real-time insights into MGNREGA performance across different districts in India. The dashboard promotes transparency and accountability in one of India's most important social welfare programs.

## ✨ Key Features

### 🌐 Multi-Language Support

- **English** - Complete interface in English
- **हिंदी (Hindi)** - Full Hindi translation for Hindi-speaking regions
- **मराठी (Marathi)** - Complete Marathi translation for Maharashtra

### 📊 Data Visualization

- **Interactive Charts** - Monthly performance trends using Recharts
- **Key Metrics Cards** - Person-days, expenditure, households, and wage rates
- **Responsive Design** - Works seamlessly across all devices

### 🗺️ Location-Based Analytics

- **State & District Selection** - Easy dropdown selection
- **District-Specific Data** - Unique metrics for each location
- **Geographic Coverage** - Major states including Madhya Pradesh, Maharashtra, and Gujarat

### 📈 Performance Insights

- **Monthly Trends** - Visual representation of person-days and expenditure
- **Key Highlights** - Important statistics and achievements
- **Summary Reports** - Comprehensive district-wise summaries

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.2.0
- **Styling**: Tailwind CSS 3.3.3
- **Charts**: Recharts 3.3.0
- **Icons**: Lucide React 0.548.0
- **Build Tool**: Create React App
- **PostCSS**: Autoprefixer for cross-browser compatibility

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd graminfo-dashboard1.0
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
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 📱 Available Scripts

### `npm start`

Runs the app in development mode. The page will reload when you make changes.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder. Optimized for best performance.

### `npm run eject`

**Note: This is a one-way operation!** Ejects from Create React App for full control over configuration.

## 🏗️ Project Structure

```
src/
├── App.js              # Main application component
├── App.css             # Application styles
├── index.js            # Application entry point
├── index.css           # Global styles with Tailwind imports
└── components/         # Reusable components (if any)
```

## 🎨 Design Features

- **Government Theme**: Professional green and blue color scheme
- **Responsive Layout**: Mobile-first design approach
- **Accessibility**: WCAG compliant interface
- **Modern UI**: Clean, intuitive user experience
- **Loading States**: Smooth loading animations
- **Error Handling**: Comprehensive error management

## 📊 Data Sources

Currently uses simulated data for demonstration purposes. In production, the dashboard would integrate with:

- **Data.gov.in Open API** - Official government data portal
- **MGNREGA Official APIs** - Real-time program data
- **Server-side Integration** - Required due to CORS restrictions

## 🌟 Key Components

### DistrictSelector

- State and district dropdown selection
- Responsive grid layout
- Form validation

### StatCard

- Metric display with icons
- Trend indicators
- Hover effects

### ChartView

- Interactive bar charts
- Monthly trend visualization
- Responsive container

### SummaryBanner

- Comprehensive data summary
- Location-specific insights
- Action-oriented information

## 🔧 Configuration

### Tailwind CSS

The project uses Tailwind CSS for styling. Configuration is available in `tailwind.config.js`.

### PostCSS

PostCSS configuration is set up in `postcss.config.js` for CSS processing.

## 🚀 Deployment

The application is ready for deployment on various platforms:

- **Vercel** - Recommended for React applications
- **Netlify** - Easy deployment with continuous integration
- **AWS S3 + CloudFront** - Scalable hosting solution
- **GitHub Pages** - Free hosting for public repositories

## 🤝 Contributing

This project is part of the Build For Bharat Fellowship 2026 Cohort. For contributions or questions, please contact the development team.

## 📄 License

This project is developed for educational and social impact purposes as part of the Build For Bharat Fellowship program.

## 👥 Team

**Build For Bharat Fellowship - 2026 Cohort (Engineering)**  
**MVP By Aryan Chauhan**

## 🔗 Links

- [MGNREGA Official Website](https://nrega.nic.in)
- [Data.gov.in](https://data.gov.in)
- [Build For Bharat Fellowship](https://buildforbharat.org)

---

_Empowering citizens with transparent MGNREGA data through technology_
