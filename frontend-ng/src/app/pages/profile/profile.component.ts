import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RecommendationService } from '../../services/recommendation.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="pt-32 pb-xl px-6 relative">
      <div class="max-w-[800px] mx-auto relative">
        <div class="mb-lg text-center">
          <h1 class="font-h1 text-h1 text-primary-container mb-xs">Tailor Your Journey</h1>
          <p class="font-body-lg text-body-lg text-on-primary-container">Tell us about your strengths and interests to unlock high-precision career matches.</p>
        </div>
        
        <div class="glass-card rounded-xl p-xl shadow-[0px_4px_20px_rgba(15,23,42,0.05)] relative overflow-hidden">
          <div *ngIf="loading" class="absolute inset-0 z-20 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-xl">
            <div class="relative w-24 h-24 mb-lg">
              <div class="absolute inset-0 border-4 border-secondary/20 rounded-full"></div>
              <div class="absolute inset-0 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="material-symbols-outlined text-secondary text-4xl animate-pulse">psychology</span>
              </div>
            </div>
            <h2 class="font-h2 text-h2 text-primary-container mb-sm">AI is analyzing your profile...</h2>
            <p class="font-body-md text-on-primary-container max-w-xs">Connecting your unique skills to thousands of live internship opportunities.</p>
            <div class="mt-xl w-64 h-1.5 bg-surface-container rounded-full overflow-hidden">
              <div class="ai-shimmer h-full w-2/3 rounded-full animate-pulse"></div>
            </div>
          </div>

          <form class="space-y-lg" (submit)="handleSubmit($event)">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-lg">
              <div class="space-y-xs">
                <label class="font-label-caps text-label-caps text-on-surface-variant">FULL NAME</label>
                <input required [(ngModel)]="name" name="name" class="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all font-body-md" placeholder="Alex Johnson" type="text"/>
              </div>
              <div class="space-y-xs">
                <label class="font-label-caps text-label-caps text-on-surface-variant">EMAIL ADDRESS</label>
                <input required [(ngModel)]="email" name="email" class="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-secondary focus:ring-4 focus:ring-secondary/10 outline-none transition-all font-body-md" placeholder="alex.j@university.edu" type="email"/>
              </div>
            </div>
            
            <div class="space-y-md">
              <div class="flex items-center justify-between">
                <h3 class="font-h3 text-h3 text-primary-container">Skills & Proficiency</h3>
                <button (click)="handleAddSkill()" class="flex items-center gap-xs text-secondary font-tag text-tag hover:underline" type="button">
                  <span class="material-symbols-outlined text-[18px]">add</span> Add Skill
                </button>
              </div>
              <div class="space-y-sm">
                <div *ngFor="let skillObj of skills; let i = index" class="flex flex-wrap md:flex-nowrap items-end gap-md p-md bg-surface-container-low rounded-lg border border-outline-variant/30">
                  <div class="flex-1 min-w-[200px] space-y-xs">
                    <label class="font-label-caps text-label-caps text-on-surface-variant">SKILL NAME</label>
                    <input required [(ngModel)]="skillObj.skill" name="skill_{{i}}" class="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-secondary outline-none font-body-md" type="text" placeholder="e.g. React" />
                  </div>
                  <div class="w-full md:w-48 space-y-xs">
                    <label class="font-label-caps text-label-caps text-on-surface-variant">LEVEL</label>
                    <select [(ngModel)]="skillObj.proficiency" name="proficiency_{{i}}" class="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-secondary outline-none font-body-md bg-white">
                      <option value="BEGINNER">BEGINNER</option>
                      <option value="INTERMEDIATE">INTERMEDIATE</option>
                      <option value="ADVANCED">ADVANCED</option>
                    </select>
                  </div>
                  <button (click)="handleRemoveSkill(i)" class="p-sm text-error hover:bg-error-container rounded-lg transition-colors" type="button">
                    <span class="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            </div>

            <div class="space-y-md">
              <h3 class="font-h3 text-h3 text-primary-container">Industry Interests</h3>
              <div class="space-y-sm">
                <div class="w-full px-md py-sm rounded-lg border border-outline-variant flex flex-wrap gap-sm items-center bg-white min-h-[50px]">
                  <span *ngFor="let interest of interests" class="flex items-center gap-xs px-sm py-xs bg-secondary/10 text-secondary rounded-full font-tag text-tag">
                    {{interest}} <span (click)="handleRemoveInterest(interest)" class="material-symbols-outlined text-[14px] cursor-pointer">close</span>
                  </span>
                  <input 
                    [(ngModel)]="interestInput"
                    name="interestInput"
                    (keydown)="handleAddInterest($event)"
                    class="flex-1 border-none focus:ring-0 outline-none p-0 text-body-md min-w-[150px]" 
                    placeholder="Type and press Enter..." 
                    type="text"
                  />
                </div>
                <div class="flex flex-wrap gap-xs">
                  <span *ngFor="let interest of ['Web3', 'EdTech', 'Cybersecurity']" (click)="handleQuickInterest(interest)" class="px-sm py-xs bg-surface-container border border-outline-variant/30 rounded-full text-on-surface-variant font-tag text-[12px] cursor-pointer hover:bg-secondary/5 transition-colors">
                    + {{interest}}
                  </span>
                </div>
              </div>
            </div>

            <div class="pt-lg">
              <button [disabled]="loading" class="w-full py-md bg-gradient-to-r from-secondary to-secondary-container text-on-secondary font-h3 text-body-lg rounded-xl shadow-lg hover:shadow-indigo-200 transition-all active:scale-[0.98] flex items-center justify-center gap-md" type="submit">
                <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1">auto_awesome</span>
                Generate My Recommendations
              </button>
            </div>
          </form>
        </div>

        <div class="mt-lg grid grid-cols-1 md:grid-cols-3 gap-md">
          <div class="flex items-center gap-md p-md bg-white border border-slate-200 rounded-lg">
            <span class="w-3 h-3 rounded-full bg-blue-500"></span>
            <div>
              <p class="font-tag text-tag text-blue-700">BEGINNER</p>
              <p class="text-[11px] text-slate-500">Foundational knowledge</p>
            </div>
          </div>
          <div class="flex items-center gap-md p-md bg-white border border-slate-200 rounded-lg">
            <span class="w-3 h-3 rounded-full bg-yellow-500"></span>
            <div>
              <p class="font-tag text-tag text-yellow-700">INTERMEDIATE</p>
              <p class="text-[11px] text-slate-500">Practical application</p>
            </div>
          </div>
          <div class="flex items-center gap-md p-md bg-white border border-slate-200 rounded-lg">
            <span class="w-3 h-3 rounded-full bg-green-500"></span>
            <div>
              <p class="font-tag text-tag text-green-700">ADVANCED</p>
              <p class="text-[11px] text-slate-500">Strategic expertise</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  `
})
export class ProfileComponent {
  name = '';
  email = '';
  skills = [
    { skill: 'Python', proficiency: 'INTERMEDIATE' },
    { skill: 'Java', proficiency: 'ADVANCED' }
  ];
  interests: string[] = ['Software Engineering'];
  interestInput = '';
  loading = false;

  constructor(private router: Router, private recommendationService: RecommendationService) {}

  handleAddSkill() {
    this.skills.push({ skill: '', proficiency: 'BEGINNER' });
  }

  handleRemoveSkill(index: number) {
    this.skills.splice(index, 1);
  }

  handleAddInterest(e: any) {
    if (e.key === 'Enter' && this.interestInput.trim()) {
      e.preventDefault();
      if (!this.interests.includes(this.interestInput.trim())) {
        this.interests.push(this.interestInput.trim());
      }
      this.interestInput = '';
    }
  }

  handleRemoveInterest(interestToRemove: string) {
    this.interests = this.interests.filter(i => i !== interestToRemove);
  }

  handleQuickInterest(interest: string) {
    if (!this.interests.includes(interest)) {
      this.interests.push(interest);
    }
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    if (!this.name || !this.email || this.skills.length === 0 || this.interests.length === 0) {
      alert("Please fill out all fields.");
      return;
    }
    
    this.loading = true;

    const payload = {
      name: this.name,
      email: this.email,
      skills: this.skills.filter(s => s.skill.trim() !== ''),
      interests: this.interests
    };

    this.recommendationService.generateRecommendations(payload).subscribe({
      next: (data) => {
        this.recommendationService.setRecommendations(data);
        this.loading = false;
        this.router.navigate(['/recommendations']);
      },
      error: (err) => {
        console.error(err);
        alert('Failed to generate recommendations. Ensure the Spring Boot backend is running and NVIDIA API key is valid.');
        this.loading = false;
      }
    });
  }
}
