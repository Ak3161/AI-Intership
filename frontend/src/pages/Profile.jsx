import React, { useState } from 'react';

export default function Profile({ onRecommendationsReceived }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [skills, setSkills] = useState([
    { skill: 'Python', proficiency: 'INTERMEDIATE' },
    { skill: 'Java', proficiency: 'ADVANCED' }
  ]);
  const [interests, setInterests] = useState(['Software Engineering']);
  const [interestInput, setInterestInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddSkill = () => {
    setSkills([...skills, { skill: '', proficiency: 'BEGINNER' }]);
  };

  const handleUpdateSkill = (index, field, value) => {
    const newSkills = [...skills];
    newSkills[index][field] = value;
    setSkills(newSkills);
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleAddInterest = (e) => {
    if (e.key === 'Enter' && interestInput.trim()) {
      e.preventDefault();
      if (!interests.includes(interestInput.trim())) {
        setInterests([...interests, interestInput.trim()]);
      }
      setInterestInput('');
    }
  };

  const handleRemoveInterest = (interestToRemove) => {
    setInterests(interests.filter(i => i !== interestToRemove));
  };

  const handleQuickInterest = (interest) => {
    if (!interests.includes(interest)) {
      setInterests([...interests, interest]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || skills.length === 0 || interests.length === 0) {
      alert("Please fill out all fields.");
      return;
    }
    
    setLoading(true);

    try {
      const payload = {
        name,
        email,
        skills: skills.filter(s => s.skill.trim() !== ''),
        interests
      };

      const res = await fetch('http://localhost:8080/api/v1/recommendations/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to generate recommendations');

      const data = await res.json();
      if(onRecommendationsReceived) onRecommendationsReceived(data);
    } catch (error) {
      console.error(error);
      alert('Failed to generate recommendations. Ensure the Spring Boot backend is running and NVIDIA API key is valid.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-32 pb-xl px-6 relative">
      <div className="max-w-[800px] mx-auto relative">
        <div className="mb-lg text-center">
          <h1 className="font-h1 text-h1 text-primary-container mb-xs">Tailor Your Journey</h1>
          <p className="font-body-lg text-body-lg text-on-primary-container">Tell us about your strengths and interests to unlock high-precision career matches.</p>
        </div>
        
        <div className="glass-card rounded-xl p-xl shadow-[0px_4px_20px_rgba(15,23,42,0.05)] relative overflow-hidden">
          {loading && (
            <div className="absolute inset-0 z-20 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-xl">
              <div className="relative w-24 h-24 mb-lg">
                <div className="absolute inset-0 border-4 border-secondary/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary text-4xl animate-pulse">psychology</span>
                </div>
              </div>
              <h2 className="font-h2 text-h2 text-primary-container mb-sm">AI is analyzing your profile...</h2>
              <p className="font-body-md text-on-primary-container max-w-xs">Connecting your unique skills to thousands of live internship opportunities.</p>
              <div className="mt-xl w-64 h-1.5 bg-surface-container rounded-full overflow-hidden">
                <div className="ai-shimmer h-full w-2/3 rounded-full animate-pulse"></div>
              </div>
            </div>
          )}

          <form className="space-y-lg" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
              <div className="space-y-xs">
                <label className="font-label-caps text-label-caps text-on-surface-variant">FULL NAME</label>
                <input required value={name} onChange={e => setName(e.target.value)} className="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all font-body-md" placeholder="Alex Johnson" type="text"/>
              </div>
              <div className="space-y-xs">
                <label className="font-label-caps text-label-caps text-on-surface-variant">EMAIL ADDRESS</label>
                <input required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all font-body-md" placeholder="alex.j@university.edu" type="email"/>
              </div>
            </div>
            
            <div className="space-y-md">
              <div className="flex items-center justify-between">
                <h3 className="font-h3 text-h3 text-primary-container">Skills & Proficiency</h3>
                <button onClick={handleAddSkill} className="flex items-center gap-xs text-secondary font-tag text-tag hover:underline" type="button">
                  <span className="material-symbols-outlined text-[18px]">add</span> Add Skill
                </button>
              </div>
              <div className="space-y-sm">
                {skills.map((skillObj, idx) => (
                  <div key={idx} className="flex flex-wrap md:flex-nowrap items-end gap-md p-md bg-surface-container-low rounded-lg border border-outline-variant/30">
                    <div className="flex-1 min-w-[200px] space-y-xs">
                      <label className="font-label-caps text-label-caps text-on-surface-variant">SKILL NAME</label>
                      <input required value={skillObj.skill} onChange={(e) => handleUpdateSkill(idx, 'skill', e.target.value)} className="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-secondary outline-none font-body-md" type="text" placeholder="e.g. React" />
                    </div>
                    <div className="w-full md:w-48 space-y-xs">
                      <label className="font-label-caps text-label-caps text-on-surface-variant">LEVEL</label>
                      <select value={skillObj.proficiency} onChange={(e) => handleUpdateSkill(idx, 'proficiency', e.target.value)} className="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-secondary outline-none font-body-md bg-white">
                        <option value="BEGINNER">BEGINNER</option>
                        <option value="INTERMEDIATE">INTERMEDIATE</option>
                        <option value="ADVANCED">ADVANCED</option>
                      </select>
                    </div>
                    <button onClick={() => handleRemoveSkill(idx)} className="p-sm text-error hover:bg-error-container rounded-lg transition-colors" type="button">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-md">
              <h3 className="font-h3 text-h3 text-primary-container">Industry Interests</h3>
              <div className="space-y-sm">
                <div className="w-full px-md py-sm rounded-lg border border-outline-variant flex flex-wrap gap-sm items-center bg-white min-h-[50px]">
                  {interests.map(interest => (
                    <span key={interest} className="flex items-center gap-xs px-sm py-xs bg-secondary/10 text-secondary rounded-full font-tag text-tag">
                      {interest} <span onClick={() => handleRemoveInterest(interest)} className="material-symbols-outlined text-[14px] cursor-pointer">close</span>
                    </span>
                  ))}
                  <input 
                    value={interestInput} 
                    onChange={e => setInterestInput(e.target.value)}
                    onKeyDown={handleAddInterest}
                    className="flex-1 border-none focus:ring-0 outline-none p-0 text-body-md min-w-[150px]" 
                    placeholder="Type and press Enter..." 
                    type="text"
                  />
                </div>
                <div className="flex flex-wrap gap-xs">
                  {['Web3', 'EdTech', 'Cybersecurity'].map(interest => (
                    <span key={interest} onClick={() => handleQuickInterest(interest)} className="px-sm py-xs bg-surface-container border border-outline-variant/30 rounded-full text-on-surface-variant font-tag text-[12px] cursor-pointer hover:bg-secondary/5 transition-colors">
                      + {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-lg">
              <button disabled={loading} className="w-full py-md bg-gradient-to-r from-secondary to-secondary-container text-on-secondary font-h3 text-body-lg rounded-xl shadow-lg hover:shadow-indigo-200 transition-all active:scale-[0.98] flex items-center justify-center gap-md" type="submit">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                Generate My Recommendations
              </button>
            </div>
          </form>
        </div>

        <div className="mt-lg grid grid-cols-1 md:grid-cols-3 gap-md">
          <div className="flex items-center gap-md p-md bg-white border border-slate-200 rounded-lg">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <div>
              <p className="font-tag text-tag text-blue-700">BEGINNER</p>
              <p className="text-[11px] text-slate-500">Foundational knowledge</p>
            </div>
          </div>
          <div className="flex items-center gap-md p-md bg-white border border-slate-200 rounded-lg">
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <div>
              <p className="font-tag text-tag text-yellow-700">INTERMEDIATE</p>
              <p className="text-[11px] text-slate-500">Practical application</p>
            </div>
          </div>
          <div className="flex items-center gap-md p-md bg-white border border-slate-200 rounded-lg">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <div>
              <p className="font-tag text-tag text-green-700">ADVANCED</p>
              <p className="text-[11px] text-slate-500">Strategic expertise</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
