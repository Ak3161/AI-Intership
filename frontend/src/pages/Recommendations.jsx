import React from 'react';

export default function Recommendations({ recommendations = [] }) {
  if (recommendations.length === 0) {
    return (
      <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <h2 className="font-h1 text-h2 text-slate-400 mt-12 mb-4">No Recommendations Yet</h2>
        <p className="text-slate-500 mb-8 max-w-md">Go to your Profile and generate AI matched career options to see them here.</p>
        <div className="w-64 h-64 opacity-20">
            <span className="material-symbols-outlined text-[120px] text-slate-400" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
      <header className="mb-12">
        <h1 className="font-h1 text-h1 text-on-surface mb-xs">Your AI Matched Careers</h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl">We've analyzed active internships to find the perfect fits for your skill set.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
        <aside className="hidden lg:block lg:col-span-3 space-y-lg">
          <div className="bg-gradient-to-br from-secondary-container to-secondary p-md rounded-xl text-white shadow-xl">
            <div className="flex items-center gap-xs mb-sm">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <span className="font-label-caps text-[10px]">PRO TIP</span>
            </div>
            <p className="text-body-md font-medium leading-tight">Improving your relevant skills could increase your match scores further.</p>
          </div>
        </aside>

        <section className="lg:col-span-9 space-y-md">
          {recommendations.map((rec, idx) => (
            <div key={rec.internshipId || idx} className={`glass-card p-lg rounded-xl shadow-[0px_4px_20px_rgba(15,23,42,0.08)] ${idx === 0 ? 'border-l-4 border-l-secondary' : 'border border-outline-variant'} relative transition-transform hover:scale-[1.01] active:scale-95 duration-200`}>
              {idx === 0 && (
                <div className="absolute -top-3 left-6 bg-secondary text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 uppercase tracking-widest shadow-md">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  Best Match
                </div>
              )}
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-md">
                <div className="flex gap-md">
                  <div className="w-16 h-16 rounded-lg bg-surface-container flex items-center justify-center shrink-0 border border-outline-variant overflow-hidden text-slate-400">
                    <span className="material-symbols-outlined text-[32px]">apartment</span>
                  </div>
                  <div>
                    <h3 className="font-h3 text-h3 text-on-surface">{rec.title}</h3>
                    <div className="flex flex-wrap items-center gap-sm mt-xs">
                      <span className="text-body-md font-semibold text-on-surface-variant">{rec.company}</span>
                      <span className="w-1 h-1 rounded-full bg-outline-variant hidden sm:block"></span>
                      <span className="bg-blue-100 text-blue-700 px-3 py-0.5 rounded-full font-tag text-tag capitalize">{rec.domain}</span>
                      <span className="w-1 h-1 rounded-full bg-outline-variant hidden sm:block"></span>
                      <span className="text-on-surface-variant text-tag font-medium">{rec.durationWeeks} weeks</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-md bg-surface-container-low px-md py-sm rounded-xl border border-outline-variant/50 self-start md:self-auto">
                  <div className="relative w-16 h-16">
                    <svg className="match-ring w-16 h-16">
                      <circle cx="32" cy="32" fill="transparent" r="28" stroke="#E2E8F0" strokeWidth="4"></circle>
                      <circle cx="32" cy="32" fill="transparent" r="28" stroke="#4648d4" strokeDasharray="175.9" strokeDashoffset={175.9 - (175.9 * (rec.matchScore || 0)) / 100} strokeWidth="4"></circle>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-body-md font-bold text-secondary">{Math.round(rec.matchScore || 0)}%</span>
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-label-caps text-on-surface-variant">MATCH SCORE</p>
                    <p className="text-tag font-bold text-secondary">{rec.matchScore > 80 ? 'High Precision' : 'Good Fit'}</p>
                  </div>
                </div>
              </div>

              <div className="mt-lg pl-lg border-l-2 border-secondary-fixed-dim bg-secondary-fixed/10 p-md rounded-r-lg">
                <div className="flex items-center gap-sm text-secondary mb-sm">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  <span className="font-bold text-tag">AI RECOMMENDATION</span>
                </div>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  {rec.aiExplanation || "This internship strongly aligns with your submitted profile and core skills."}
                </p>
              </div>
              
              <div className="mt-lg flex justify-end">
                <button className="bg-gradient-to-r from-secondary to-indigo-700 text-white px-lg py-3 rounded-xl font-bold text-body-md flex items-center gap-sm hover:shadow-lg transition-all active:scale-95">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                  Quick Apply with AI
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
