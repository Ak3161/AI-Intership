import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  
  const [newInternship, setNewInternship] = useState({
    title: '', company: '', domain: 'Engineering', durationWeeks: 12, description: '', requiredSkills: [], isActive: true
  });

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/v1/internships');
      if (res.ok) {
        const data = await res.json();
        setInternships(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && skillInput.trim() !== '') {
      e.preventDefault();
      if (!newInternship.requiredSkills.includes(skillInput.trim())) {
        setNewInternship({
          ...newInternship,
          requiredSkills: [...newInternship.requiredSkills, skillInput.trim()]
        });
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setNewInternship({
      ...newInternship,
      requiredSkills: newInternship.requiredSkills.filter(s => s !== skillToRemove)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...newInternship, durationWeeks: parseInt(newInternship.durationWeeks) };
      const res = await fetch('http://localhost:8080/api/v1/internships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setShowAddModal(false);
        fetchInternships();
        setNewInternship({
          title: '', company: '', domain: 'Engineering', durationWeeks: 12, description: '', requiredSkills: [], isActive: true
        });
      } else {
        alert("Failed to create internship");
      }
    } catch (e) {
      console.error(e);
      alert("Error connecting to server");
    }
  };

  return (
    <main className="pt-24 pb-xl max-w-7xl mx-auto px-6 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-md mb-xl">
        <div>
          <h1 className="font-h1 text-h2 text-on-surface mb-xs">Internship Management</h1>
          <p className="text-on-surface-variant font-body-md">Manage active listings, track candidate flow, and update program requirements.</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="flex items-center gap-sm bg-gradient-to-r from-secondary to-[#8b5cf6] text-white px-lg py-md rounded-xl font-tag shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
          <span className="material-symbols-outlined">add</span>
          Add New Internship
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-xl">
        <div className="glass-card p-lg rounded-xl flex items-center gap-md">
          <div className="w-12 h-12 rounded-lg bg-secondary-fixed flex items-center justify-center">
            <span className="material-symbols-outlined text-secondary">assignment</span>
          </div>
          <div>
            <p className="text-label-caps text-on-surface-variant font-label-caps">TOTAL LISTINGS</p>
            <p className="text-h3 font-h3 text-on-surface">{internships.length}</p>
          </div>
        </div>
        <div className="glass-card p-lg rounded-xl flex items-center gap-md">
          <div className="w-12 h-12 rounded-lg bg-tertiary-fixed flex items-center justify-center">
            <span className="material-symbols-outlined text-on-tertiary-fixed-variant">trending_up</span>
          </div>
          <div>
            <p className="text-label-caps text-on-surface-variant font-label-caps">ACTIVE NOW</p>
            <p className="text-h3 font-h3 text-on-surface">{internships.filter(i => i.isActive).length}</p>
          </div>
        </div>
        <div className="glass-card p-lg rounded-xl flex items-center gap-md">
          <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center">
            <span className="material-symbols-outlined text-primary-container">group</span>
          </div>
          <div>
            <p className="text-label-caps text-on-surface-variant font-label-caps">APPLICATIONS</p>
            <p className="text-h3 font-h3 text-on-surface">1,248</p>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-xl overflow-hidden">
        <div className="p-lg border-b border-slate-200 bg-surface-container-lowest flex items-center justify-between">
          <h3 className="font-h3 text-body-lg text-on-surface">All Internships</h3>
          <div className="flex items-center gap-md">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input className="pl-10 pr-4 py-2 border border-outline-variant rounded-lg font-body-md text-sm w-64 bg-white" placeholder="Search internships..." type="text"/>
            </div>
            <button className="p-2 border border-outline-variant rounded-lg hover:bg-slate-50">
              <span className="material-symbols-outlined text-on-surface-variant">filter_list</span>
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-slate-500">Loading internships...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-lg py-md text-label-caps font-label-caps text-on-surface-variant border-b border-slate-200">Title</th>
                  <th className="px-lg py-md text-label-caps font-label-caps text-on-surface-variant border-b border-slate-200">Company</th>
                  <th className="px-lg py-md text-label-caps font-label-caps text-on-surface-variant border-b border-slate-200">Domain</th>
                  <th className="px-lg py-md text-label-caps font-label-caps text-on-surface-variant border-b border-slate-200">Duration</th>
                  <th className="px-lg py-md text-label-caps font-label-caps text-on-surface-variant border-b border-slate-200">Status</th>
                  <th className="px-lg py-md text-label-caps font-label-caps text-on-surface-variant border-b border-slate-200">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {internships.map(internship => (
                  <tr key={internship.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-lg py-md font-h3 text-body-md text-slate-900">{internship.title}</td>
                    <td className="px-lg py-md">
                      <div className="flex items-center gap-sm">
                        <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center overflow-hidden text-slate-400">
                          <span className="material-symbols-outlined text-[20px]">apartment</span>
                        </div>
                        <span className="font-body-md">{internship.company}</span>
                      </div>
                    </td>
                    <td className="px-lg py-md">
                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-tag text-xs capitalize">{internship.domain}</span>
                    </td>
                    <td className="px-lg py-md font-body-md text-on-surface-variant">{internship.durationWeeks} Weeks</td>
                    <td className="px-lg py-md">
                      <div className="flex items-center gap-2">
                        <div className="relative inline-flex items-center">
                          <div className={`w-11 h-6 rounded-full transition-all ${internship.isActive ? 'bg-secondary' : 'bg-slate-200'}`}>
                            <div className={`absolute top-[2px] left-[2px] bg-white border border-gray-300 rounded-full h-5 w-5 transition-all ${internship.isActive ? 'translate-x-full border-white' : ''}`}></div>
                          </div>
                        </div>
                        <span className={`text-xs font-tag ${internship.isActive ? 'text-secondary' : 'text-on-surface-variant'}`}>{internship.isActive ? 'Active' : 'Inactive'}</span>
                      </div>
                    </td>
                    <td className="px-lg py-md">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-on-surface-variant hover:text-secondary hover:bg-secondary-fixed rounded-lg transition-all">
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container rounded-lg transition-all">
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden border border-white/20">
            <div className="px-xl py-lg border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="font-h2 text-h3 text-on-surface">Add New Internship</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant">close</span>
              </button>
            </div>
            
            <div className="p-xl overflow-y-auto max-h-[70vh]">
              <form id="add-internship-form" onSubmit={handleSubmit} className="space-y-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                  <div className="space-y-sm">
                    <label className="block text-label-caps font-label-caps text-on-surface-variant">INTERNSHIP TITLE</label>
                    <input required value={newInternship.title} onChange={e => setNewInternship({...newInternship, title: e.target.value})} className="w-full px-4 py-3 border border-outline-variant rounded-xl font-body-md" placeholder="e.g. Frontend Developer" type="text"/>
                  </div>
                  <div className="space-y-sm">
                    <label className="block text-label-caps font-label-caps text-on-surface-variant">COMPANY NAME</label>
                    <input required value={newInternship.company} onChange={e => setNewInternship({...newInternship, company: e.target.value})} className="w-full px-4 py-3 border border-outline-variant rounded-xl font-body-md" placeholder="e.g. TechCorp Inc." type="text"/>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                  <div className="space-y-sm">
                    <label className="block text-label-caps font-label-caps text-on-surface-variant">DOMAIN</label>
                    <select value={newInternship.domain} onChange={e => setNewInternship({...newInternship, domain: e.target.value})} className="w-full px-4 py-3 border border-outline-variant rounded-xl font-body-md bg-white">
                      <option value="Engineering">Engineering</option>
                      <option value="Design">Design</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Product">Product</option>
                      <option value="Data Science">Data Science</option>
                    </select>
                  </div>
                  <div className="space-y-sm">
                    <label className="block text-label-caps font-label-caps text-on-surface-variant">DURATION (WEEKS)</label>
                    <input required value={newInternship.durationWeeks} onChange={e => setNewInternship({...newInternship, durationWeeks: e.target.value})} className="w-full px-4 py-3 border border-outline-variant rounded-xl font-body-md" placeholder="e.g. 12" type="number" min="1"/>
                  </div>
                </div>
                
                <div className="space-y-sm">
                  <label className="block text-label-caps font-label-caps text-on-surface-variant">DESCRIPTION</label>
                  <textarea required value={newInternship.description} onChange={e => setNewInternship({...newInternship, description: e.target.value})} className="w-full px-4 py-3 border border-outline-variant rounded-xl font-body-md" placeholder="Detailed role description and responsibilities..." rows="4"></textarea>
                </div>
                
                <div className="space-y-sm">
                  <label className="block text-label-caps font-label-caps text-on-surface-variant">REQUIRED SKILLS</label>
                  <div className="p-3 border border-outline-variant rounded-xl flex flex-wrap gap-2">
                    {newInternship.requiredSkills.map(skill => (
                      <span key={skill} className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-tag text-xs">
                        {skill} <span onClick={() => removeSkill(skill)} className="material-symbols-outlined text-[14px] cursor-pointer">close</span>
                      </span>
                    ))}
                    <input 
                      value={skillInput} 
                      onChange={e => setSkillInput(e.target.value)} 
                      onKeyDown={handleAddSkill} 
                      className="border-none focus:ring-0 text-sm p-0 ml-2 w-32 outline-none" 
                      placeholder="Type & Enter..." 
                      type="text"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-lg bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-md">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={newInternship.isActive} onChange={e => setNewInternship({...newInternship, isActive: e.target.checked})} className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                    </label>
                    <div>
                      <p className="text-sm font-h3 text-on-surface">Publish Immediately</p>
                      <p className="text-xs text-on-surface-variant">Listing will be visible to all students.</p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="px-xl py-lg border-t border-slate-100 flex justify-end gap-md">
              <button onClick={() => setShowAddModal(false)} className="px-lg py-md border border-outline-variant rounded-xl font-tag text-on-surface-variant hover:bg-slate-50 transition-colors">Cancel</button>
              <button type="submit" form="add-internship-form" className="px-lg py-md bg-secondary text-white rounded-xl font-tag shadow-md hover:opacity-90 active:scale-95 transition-all">Create Listing</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
