import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Discover from './pages/Discover';
import Profile from './pages/Profile';
import Recommendations from './pages/Recommendations';
import Dashboard from './pages/Dashboard';

function App() {
  const [activeTab, setActiveTab] = useState('discover');
  const [recommendations, setRecommendations] = useState([]);

  const renderPage = () => {
    switch (activeTab) {
      case 'discover':
        return <Discover onTabChange={setActiveTab} />;
      case 'profile':
        return <Profile onRecommendationsReceived={(data) => {
          setRecommendations(data);
          setActiveTab('recommendations');
        }} />;
      case 'recommendations':
        return <Recommendations recommendations={recommendations} />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <Discover onTabChange={setActiveTab} />;
    }
  };

  return (
    <>
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      {renderPage()}
      <Footer />
    </>
  );
}

export default App;
