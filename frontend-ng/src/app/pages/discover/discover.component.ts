import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-discover',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="pt-16">
      <section class="relative overflow-hidden bg-primary-container py-24 md:py-32">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-0 -left-1/4 w-1/2 h-full bg-secondary blur-[120px] rounded-full"></div>
          <div class="absolute bottom-0 -right-1/4 w-1/2 h-full bg-indigo-400 blur-[120px] rounded-full"></div>
        </div>
        <div class="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div class="space-y-8">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1">auto_awesome</span>
              <span class="text-tag font-tag uppercase tracking-wider">AI-Powered matching engine</span>
            </div>
            <h1 class="font-h1 text-h1 text-white leading-[1.1]">
              Find Your Perfect Internship <span class="text-secondary-fixed">with AI</span>
            </h1>
            <p class="font-body-lg text-body-lg text-on-primary-container max-w-lg">
              Tailored opportunities matched to your skills, interests, and career goals. Stop searching and start discovering your future today.
            </p>
            <div class="flex flex-wrap gap-4">
              <button 
                (click)="goToProfile()"
                class="px-8 py-4 bg-secondary text-white rounded-xl font-semibold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(70,72,212,0.4)] transition-all active:scale-95"
              >
                <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1">rocket_launch</span>
                Get Recommendations
              </button>
              <button 
                (click)="showModal = true"
                class="px-8 py-4 border border-slate-700 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all"
              >
                How it works
              </button>
            </div>
            <div class="flex items-center gap-4 pt-4">
              <div class="flex -space-x-3">
                <img class="w-10 h-10 rounded-full border-2 border-primary-container object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCd9y990kUn5iPpS3FV4C7Nd3vdFsQQaHu0Rlumw-C_1v16ShW_8b_eX8YQZfU82i6olH_qdOtPVj1cQw5GtnZO4DfiyF70ppovJ_AwUMLKEyYSClBgdwt7TXEkz7g7jPpTTZakk8ULvY99LDAlSs3SrrDxy03Wtmf8-2tueWuFw22DhrhINlN0I9vpV6razSlWhI5ITU3FB1rMflmsDVyin3GqpQ1gPn7fUObTHxrFkeEjNEWdiJ4FD6mSZvtFWCo7Q8sPpCW6zFgW" />
                <img class="w-10 h-10 rounded-full border-2 border-primary-container object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjKgCygJi14nzc3MZMViTf5R5gkeu6sb0ggqP9JSWyFi8g-y0eRMwaynQsJ7BqtsfFGwYwn63QuSKXWz5mxQ9LUVRw64jQAirk3zzoe1sfrmwtMwslfHEfIjVsHuOjf74RfIdU5GAxrdg4qTI85wWbFMTE5Nyi3XVJgLUzaS-NopTzV8MteU0kkOEgXRWLykjOx8mPVEA73XJaxs0jkQHtRmcqs3xX_W5URWBfEwc9GKr_f7I-UUdCvLmry0qq-99gKIZ1G-p-sBnx" />
                <img class="w-10 h-10 rounded-full border-2 border-primary-container object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAydzlg8CPoEbY22g3FD8Svt51qwkI4qDd2ukFApfle_KJVuBnhyTCZJt1xxJa7rR3rWhxDsQolglS4GJNelQtNzzb-exuAmoOlD24x8XsXMqEpyXNyJyW0LACHgczmRoj1FBhrr2SJiwxOIzY4kUc7gOP4zfxQoQt0zYaa3Ie7DYoljDjaF1VwMUFAtwxP0jI4WpU7eG37s-RnsOrt6rzrhz4BHA7Sr6NipdFTmbJ91z2bjKg6M4fkXmFi6Os6pfM8fRaCOMwGDnlK" />
              </div>
              <p class="text-sm text-on-primary-container">
                <span class="text-white font-bold">2,400+</span> students matched this week
              </p>
            </div>
          </div>
          <div class="hidden md:block relative">
            <div class="grid grid-cols-2 gap-4">
              <div class="glass-card p-6 rounded-2xl shadow-xl space-y-4 translate-y-8">
                <div class="flex items-center justify-between">
                  <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <span class="material-symbols-outlined text-secondary">apartment</span>
                  </div>
                  <span class="bg-green-100 text-green-700 text-tag font-tag px-2 py-1 rounded">98% Match</span>
                </div>
                <div>
                  <h3 class="font-h3 text-[18px] text-slate-900">UX Design Intern</h3>
                  <p class="text-slate-500 text-sm">TechCorp Global</p>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span class="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded uppercase">Figma</span>
                  <span class="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded uppercase">Research</span>
                </div>
              </div>
              <div class="glass-card p-6 rounded-2xl shadow-xl space-y-4 -translate-y-4">
                <div class="flex items-center justify-between">
                  <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <span class="material-symbols-outlined text-secondary">code</span>
                  </div>
                  <span class="bg-yellow-100 text-yellow-700 text-tag font-tag px-2 py-1 rounded">High Fit</span>
                </div>
                <div>
                  <h3 class="font-h3 text-[18px] text-slate-900">Software Engineer</h3>
                  <p class="text-slate-500 text-sm">Innovate AI</p>
                </div>
                <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div class="bg-secondary h-full w-[85%] ai-shimmer"></div>
                </div>
                <p class="text-[11px] text-slate-400 font-medium">AI Scoring Progress...</p>
              </div>
              <div class="col-span-2 glass-card p-6 rounded-2xl shadow-xl flex items-center gap-6">
                <div class="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center">
                  <span class="material-symbols-outlined text-secondary text-3xl" style="font-variation-settings: 'FILL' 1">psychology</span>
                </div>
                <div class="flex-1">
                  <p class="text-slate-900 font-semibold">Career Insight</p>
                  <p class="text-slate-500 text-sm italic">"Based on your Python projects, we suggest Backend roles."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-24 max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="font-h2 text-h2 text-slate-900 mb-4">Precision-Engineered Career Paths</h2>
          <p class="text-slate-500 max-w-2xl mx-auto font-body-md">Our algorithm analyzes thousands of data points to find roles that don't just match your skills, but fuel your growth.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="group p-8 rounded-2xl border border-slate-200 bg-white hover:border-secondary transition-all hover:shadow-xl hover:-translate-y-1">
            <div class="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
              <span class="material-symbols-outlined text-3xl">person_add</span>
            </div>
            <h3 class="font-h3 text-h3 text-slate-900 mb-3">Submit Profile</h3>
            <p class="text-slate-500 font-body-md">Connect your LinkedIn or upload a resume. Our AI extracts your core competencies and hidden potential.</p>
          </div>
          <div class="group p-8 rounded-2xl border border-slate-200 bg-white hover:border-secondary transition-all hover:shadow-xl hover:-translate-y-1">
            <div class="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
              <span class="material-symbols-outlined text-3xl">analytics</span>
            </div>
            <h3 class="font-h3 text-h3 text-slate-900 mb-3">AI Scoring</h3>
            <p class="text-slate-500 font-body-md">We scan thousands of internship listings to score each opportunity against your unique profile signature.</p>
          </div>
          <div class="group p-8 rounded-2xl border border-slate-200 bg-white hover:border-secondary transition-all hover:shadow-xl hover:-translate-y-1">
            <div class="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
              <span class="material-symbols-outlined text-3xl">verified</span>
            </div>
            <h3 class="font-h3 text-h3 text-slate-900 mb-3">Get Matches</h3>
            <p class="text-slate-500 font-body-md">Receive a curated dashboard of high-fit roles with direct application links and personalized tips.</p>
          </div>
        </div>
      </section>

      <div *ngIf="showModal" class="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6" (click)="showModal = false">
        <div class="bg-white rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden" (click)="$event.stopPropagation()">
          <div class="px-xl py-lg border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <h2 class="font-h2 text-h3 text-on-surface flex items-center gap-sm">
              <span class="material-symbols-outlined text-secondary" style="font-variation-settings: 'FILL' 1">route</span>
              How CareerPilot AI Works
            </h2>
            <button (click)="showModal = false" class="p-2 hover:bg-slate-200 rounded-full transition-colors">
              <span class="material-symbols-outlined text-on-surface-variant">close</span>
            </button>
          </div>
          <div class="p-xl space-y-lg overflow-y-auto max-h-[70vh]">
            <div class="relative border-l-2 border-indigo-100 pl-8 ml-4 space-y-12 py-4">
              
              <div class="relative">
                <div class="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-indigo-100 border-4 border-white flex items-center justify-center text-secondary font-bold shadow-sm">1</div>
                <h3 class="font-h3 text-xl text-slate-900 mb-2">Build Your Profile</h3>
                <p class="text-slate-600 font-body-md mb-4">Go to the <strong class="text-secondary cursor-pointer hover:underline" (click)="showModal = false; goToProfile()">Profile</strong> tab. Input your skills, proficiency levels, and industry interests. The more accurate your skills, the better the AI can match you.</p>
              </div>

              <div class="relative">
                <div class="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-indigo-100 border-4 border-white flex items-center justify-center text-secondary font-bold shadow-sm">2</div>
                <h3 class="font-h3 text-xl text-slate-900 mb-2">Backend AI Processing</h3>
                <p class="text-slate-600 font-body-md mb-4">Your profile is sent to our Spring Boot backend. Our pure-Java deterministic scoring engine compares your profile against active internships, assigning weights to required and preferred skills.</p>
                <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start gap-4">
                  <span class="material-symbols-outlined text-indigo-500" style="font-variation-settings: 'FILL' 1">memory</span>
                  <p class="text-sm text-slate-500 italic">"Matches top 5 roles scoring &gt;= 20 points, then hands off to NVIDIA LLaMA 3.1 to generate human-readable explanations."</p>
                </div>
              </div>

              <div class="relative">
                <div class="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-indigo-100 border-4 border-white flex items-center justify-center text-secondary font-bold shadow-sm">3</div>
                <h3 class="font-h3 text-xl text-slate-900 mb-2">Review Recommendations</h3>
                <p class="text-slate-600 font-body-md mb-4">You are immediately redirected to the <strong class="text-secondary cursor-pointer hover:underline" (click)="showModal = false; goToRecommendations()">Recommendations</strong> tab where you can see your precision match scores, rationale, and apply directly!</p>
              </div>

              <div class="relative">
                <div class="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-indigo-100 border-4 border-white flex items-center justify-center text-secondary font-bold shadow-sm">4</div>
                <h3 class="font-h3 text-xl text-slate-900 mb-2">Manage Opportunities</h3>
                <p class="text-slate-600 font-body-md mb-4">Administrators use the <strong class="text-secondary cursor-pointer hover:underline" (click)="showModal = false; goToDashboard()">Dashboard</strong> to post new roles. New roles become immediately available for the AI matching engine.</p>
              </div>

            </div>
          </div>
          <div class="px-xl py-lg border-t border-slate-100 bg-slate-50 flex justify-end">
            <button (click)="showModal = false; goToProfile()" class="px-lg py-3 bg-secondary text-white rounded-xl font-tag shadow-md hover:opacity-90 active:scale-95 transition-all flex items-center gap-2">
              Get Started
              <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  `
})
export class DiscoverComponent {
  showModal = false;

  constructor(private router: Router) {}

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToRecommendations() {
    this.router.navigate(['/recommendations']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
