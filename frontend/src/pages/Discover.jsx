import React, { useState } from 'react';

export default function Discover({ onTabChange }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="pt-16">
        <section className="relative overflow-hidden bg-primary-container py-24 md:py-32">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-secondary blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 -right-1/4 w-1/2 h-full bg-indigo-400 blur-[120px] rounded-full"></div>
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <span className="text-tag font-tag uppercase tracking-wider">AI-Powered matching engine</span>
              </div>
              <h1 className="font-h1 text-h1 text-white leading-[1.1]">
                Find Your Perfect Internship <span className="text-secondary-fixed">with AI</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-primary-container max-w-lg">
                Tailored opportunities matched to your skills, interests, and career goals. Stop searching and start discovering your future today.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => onTabChange('profile')}
                  className="px-8 py-4 bg-secondary text-white rounded-xl font-semibold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(70,72,212,0.4)] transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
                  Get Recommendations
                </button>
                <button 
                  onClick={() => setShowModal(true)}
                  className="px-8 py-4 border border-slate-700 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all"
                >
                  How it works
                </button>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-3">
                  <img className="w-10 h-10 rounded-full border-2 border-primary-container object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCd9y990kUn5iPpS3FV4C7Nd3vdFsQQaHu0Rlumw-C_1v16ShW_8b_eX8YQZfU82i6olH_qdOtPVj1cQw5GtnZO4DfiyF70ppovJ_AwUMLKEyYSClBgdwt7TXEkz7g7jPpTTZakk8ULvY99LDAlSs3SrrDxy03Wtmf8-2tueWuFw22DhrhINlN0I9vpV6razSlWhI5ITU3FB1rMflmsDVyin3GqpQ1gPn7fUObTHxrFkeEjNEWdiJ4FD6mSZvtFWCo7Q8sPpCW6zFgW" />
                  <img className="w-10 h-10 rounded-full border-2 border-primary-container object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjKgCygJi14nzc3MZMViTf5R5gkeu6sb0ggqP9JSWyFi8g-y0eRMwaynQsJ7BqtsfFGwYwn63QuSKXWz5mxQ9LUVRw64jQAirk3zzoe1sfrmwtMwslfHEfIjVsHuOjf74RfIdU5GAxrdg4qTI85wWbFMTE5Nyi3XVJgLUzaS-NopTzV8MteU0kkOEgXRWLykjOx8mPVEA73XJaxs0jkQHtRmcqs3xX_W5URWBfEwc9GKr_f7I-UUdCvLmry0qq-99gKIZ1G-p-sBnx" />
                  <img className="w-10 h-10 rounded-full border-2 border-primary-container object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAydzlg8CPoEbY22g3FD8Svt51qwkI4qDd2ukFApfle_KJVuBnhyTCZJt1xxJa7rR3rWhxDsQolglS4GJNelQtNzzb-exuAmoOlD24x8XsXMqEpyXNyJyW0LACHgczmRoj1FBhrr2SJiwxOIzY4kUc7gOP4zfxQoQt0zYaa3Ie7DYoljDjaF1VwMUFAtwxP0jI4WpU7eG37s-RnsOrt6rzrhz4BHA7Sr6NipdFTmbJ91z2bjKg6M4fkXmFi6Os6pfM8fRaCOMwGDnlK" />
                </div>
                <p className="text-sm text-on-primary-container">
                  <span className="text-white font-bold">2,400+</span> students matched this week
                </p>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-6 rounded-2xl shadow-xl space-y-4 translate-y-8">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <span className="material-symbols-outlined text-secondary">apartment</span>
                    </div>
                    <span className="bg-green-100 text-green-700 text-tag font-tag px-2 py-1 rounded">98% Match</span>
                  </div>
                  <div>
                    <h3 className="font-h3 text-[18px] text-slate-900">UX Design Intern</h3>
                    <p className="text-slate-500 text-sm">TechCorp Global</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded uppercase">Figma</span>
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded uppercase">Research</span>
                  </div>
                </div>
                <div className="glass-card p-6 rounded-2xl shadow-xl space-y-4 -translate-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <span className="material-symbols-outlined text-secondary">code</span>
                    </div>
                    <span className="bg-yellow-100 text-yellow-700 text-tag font-tag px-2 py-1 rounded">High Fit</span>
                  </div>
                  <div>
                    <h3 className="font-h3 text-[18px] text-slate-900">Software Engineer</h3>
                    <p className="text-slate-500 text-sm">Innovate AI</p>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full w-[85%] ai-shimmer"></div>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium">AI Scoring Progress...</p>
                </div>
                <div className="col-span-2 glass-card p-6 rounded-2xl shadow-xl flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-900 font-semibold">Career Insight</p>
                    <p className="text-slate-500 text-sm italic">"Based on your Python projects, we suggest Backend roles."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-h2 text-h2 text-slate-900 mb-4">Precision-Engineered Career Paths</h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-body-md">Our algorithm analyzes thousands of data points to find roles that don't just match your skills, but fuel your growth.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl border border-slate-200 bg-white hover:border-secondary transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">person_add</span>
              </div>
              <h3 className="font-h3 text-h3 text-slate-900 mb-3">Submit Profile</h3>
              <p className="text-slate-500 font-body-md">Connect your LinkedIn or upload a resume. Our AI extracts your core competencies and hidden potential.</p>
            </div>
            <div className="group p-8 rounded-2xl border border-slate-200 bg-white hover:border-secondary transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">analytics</span>
              </div>
              <h3 className="font-h3 text-h3 text-slate-900 mb-3">AI Scoring</h3>
              <p className="text-slate-500 font-body-md">We scan thousands of internship listings to score each opportunity against your unique profile signature.</p>
            </div>
            <div className="group p-8 rounded-2xl border border-slate-200 bg-white hover:border-secondary transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">verified</span>
              </div>
              <h3 className="font-h3 text-h3 text-slate-900 mb-3">Get Matches</h3>
              <p className="text-slate-500 font-body-md">Receive a curated dashboard of high-fit roles with direct application links and personalized tips.</p>
            </div>
          </div>
        </section>

        {showModal && (
          <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6" onClick={() => setShowModal(false)}>
            <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="px-xl py-lg border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h2 className="font-h2 text-h3 text-on-surface flex items-center gap-sm">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>route</span>
                  How CareerPilot AI Works
                </h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                  <span className="material-symbols-outlined text-on-surface-variant">close</span>
                </button>
              </div>
              <div className="p-xl space-y-lg overflow-y-auto max-h-[70vh]">
                <div className="relative border-l-2 border-indigo-100 pl-8 ml-4 space-y-12 py-4">
                  
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-indigo-100 border-4 border-white flex items-center justify-center text-secondary font-bold shadow-sm">1</div>
                    <h3 className="font-h3 text-xl text-slate-900 mb-2">Build Your Profile</h3>
                    <p className="text-slate-600 font-body-md mb-4">Go to the <strong className="text-secondary cursor-pointer hover:underline" onClick={() => {setShowModal(false); onTabChange('profile');}}>Profile</strong> tab. Input your skills, proficiency levels, and industry interests. The more accurate your skills, the better the AI can match you.</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-indigo-100 border-4 border-white flex items-center justify-center text-secondary font-bold shadow-sm">2</div>
                    <h3 className="font-h3 text-xl text-slate-900 mb-2">Backend AI Processing</h3>
                    <p className="text-slate-600 font-body-md mb-4">Your profile is sent to our Spring Boot backend. Our pure-Java deterministic scoring engine compares your profile against active internships, assigning weights to required and preferred skills.</p>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start gap-4">
                      <span className="material-symbols-outlined text-indigo-500" style={{ fontVariationSettings: "'FILL' 1" }}>memory</span>
                      <p className="text-sm text-slate-500 italic">"Matches top 5 roles scoring &gt;= 20 points, then hands off to NVIDIA LLaMA 3.1 to generate human-readable explanations."</p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-indigo-100 border-4 border-white flex items-center justify-center text-secondary font-bold shadow-sm">3</div>
                    <h3 className="font-h3 text-xl text-slate-900 mb-2">Review Recommendations</h3>
                    <p className="text-slate-600 font-body-md mb-4">You are immediately redirected to the <strong className="text-secondary cursor-pointer hover:underline" onClick={() => {setShowModal(false); onTabChange('recommendations');}}>Recommendations</strong> tab where you can see your precision match scores, rationale, and apply directly!</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-indigo-100 border-4 border-white flex items-center justify-center text-secondary font-bold shadow-sm">4</div>
                    <h3 className="font-h3 text-xl text-slate-900 mb-2">Manage Opportunities</h3>
                    <p className="text-slate-600 font-body-md mb-4">Administrators use the <strong className="text-secondary cursor-pointer hover:underline" onClick={() => {setShowModal(false); onTabChange('dashboard');}}>Dashboard</strong> to post new roles. New roles become immediately available for the AI matching engine.</p>
                  </div>

                </div>
              </div>
              <div className="px-xl py-lg border-t border-slate-100 bg-slate-50 flex justify-end">
                <button onClick={() => {setShowModal(false); onTabChange('profile');}} className="px-lg py-3 bg-secondary text-white rounded-xl font-tag shadow-md hover:opacity-90 active:scale-95 transition-all flex items-center gap-2">
                  Get Started
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
  );
}
