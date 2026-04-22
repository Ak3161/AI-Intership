import React from 'react';

export default function Navbar({ activeTab, onTabChange }) {
  const getTabClass = (tabName) => {
    if (activeTab === tabName) {
      return "font-body-md text-sm font-medium tracking-tight text-indigo-600 border-b-2 border-indigo-600 pb-1";
    }
    return "font-body-md text-sm font-medium tracking-tight text-slate-600 hover:text-slate-900 transition-colors duration-200";
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b bg-white/80 backdrop-blur-md border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <span 
            className="text-xl font-bold tracking-tighter text-slate-900 cursor-pointer"
            onClick={() => onTabChange('discover')}
          >
            CareerPilot AI
          </span>
          <div className="hidden md:flex items-center space-gap-lg gap-8">
            <button onClick={() => onTabChange('discover')} className={getTabClass('discover')}>Discover</button>
            <button onClick={() => onTabChange('profile')} className={getTabClass('profile')}>Profile</button>
            <button onClick={() => onTabChange('recommendations')} className={getTabClass('recommendations')}>Recommendations</button>
            <button onClick={() => onTabChange('dashboard')} className={getTabClass('dashboard')}>Dashboard</button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <span className="material-symbols-outlined text-on-surface-variant hover:bg-slate-50 p-2 rounded-full cursor-pointer transition-colors" style={{ fontVariationSettings: "'FILL' 0" }}>notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant hover:bg-slate-50 p-2 rounded-full cursor-pointer transition-colors" style={{ fontVariationSettings: "'FILL' 0" }}>settings</span>
          <div className="h-8 w-8 rounded-full bg-primary-fixed-dim flex items-center justify-center overflow-hidden border border-outline-variant">
            <img alt="User profile avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCE62mqgy86jiWYBBH2dVa-Su8sSINT_LsVg96QG0wJH7c9hRbe19TQ21eTRc8_GI3shf8xqt6-gZMHfoviJUnDSQiz0yfitEPqdmTLEuBKBo-uBvkkEgb3947e6YYXSb9aPfECDMw6nidSPQfcc7V2b6ZoZ-6v4deud5UlyUDCa7R0nysyZxBX_eCie_BayJRPMyw_qQkVtpTPgzFS3TJ_Vijp-zHoK5IMnMO2YOLbG8iQTNeZbBb4EhftIIcM3QQTAQjZB8aYmI2B"/>
          </div>
        </div>
      </div>
    </nav>
  );
}
