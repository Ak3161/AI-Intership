import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-12 border-t border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-bold text-slate-900">CareerPilot AI</span>
          <p className="font-['Inter'] text-xs text-slate-500">© 2024 CareerPilot AI. Empowering the next generation of talent.</p>
        </div>
        <div className="flex gap-6">
          <a className="font-['Inter'] text-xs text-slate-500 hover:text-indigo-600 transition-colors" href="#">Privacy Policy</a>
          <a className="font-['Inter'] text-xs text-slate-500 hover:text-indigo-600 transition-colors" href="#">Terms of Service</a>
          <a className="font-['Inter'] text-xs text-slate-500 hover:text-indigo-600 transition-colors" href="#">Help Center</a>
          <a className="font-['Inter'] text-xs text-slate-500 hover:text-indigo-600 transition-colors" href="#">Contact Support</a>
        </div>
      </div>
    </footer>
  );
}
