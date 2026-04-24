import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecommendationService } from '../../services/recommendation.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="pt-24 pb-xl max-w-7xl mx-auto px-6 relative">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-md mb-xl">
        <div>
          <h1 class="font-h1 text-h2 text-on-surface mb-xs">Internship Management</h1>
          <p class="text-on-surface-variant font-body-md">Manage active listings, track candidate flow, and update program requirements.</p>
        </div>
        <button (click)="showAddModal = true" class="flex items-center gap-sm bg-gradient-to-r from-secondary to-[#8b5cf6] text-white px-lg py-md rounded-xl font-tag shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
          <span class="material-symbols-outlined">add</span>
          Add New Internship
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-lg mb-xl">
        <div class="glass-card p-lg rounded-xl flex items-center gap-md">
          <div class="w-12 h-12 rounded-lg bg-secondary-fixed flex items-center justify-center">
            <span class="material-symbols-outlined text-secondary">assignment</span>
          </div>
          <div>
            <p class="text-label-caps text-on-surface-variant font-label-caps">TOTAL LISTINGS</p>
            <p class="text-h3 font-h3 text-on-surface">{{internships.length}}</p>
          </div>
        </div>
        <div class="glass-card p-lg rounded-xl flex items-center gap-md">
          <div class="w-12 h-12 rounded-lg bg-tertiary-fixed flex items-center justify-center">
            <span class="material-symbols-outlined text-on-tertiary-fixed-variant">trending_up</span>
          </div>
          <div>
            <p class="text-label-caps text-on-surface-variant font-label-caps">ACTIVE NOW</p>
            <p class="text-h3 font-h3 text-on-surface">{{getActiveCount()}}</p>
          </div>
        </div>
        <div class="glass-card p-lg rounded-xl flex items-center gap-md">
          <div class="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center">
            <span class="material-symbols-outlined text-primary-container">group</span>
          </div>
          <div>
            <p class="text-label-caps text-on-surface-variant font-label-caps">APPLICATIONS</p>
            <p class="text-h3 font-h3 text-on-surface">1,248</p>
          </div>
        </div>
      </div>

      <div class="glass-card rounded-xl overflow-hidden">
        <div class="p-lg border-b border-slate-200 bg-surface-container-lowest flex items-center justify-between">
          <h3 class="font-h3 text-body-lg text-on-surface">All Internships</h3>
          <div class="flex items-center gap-md">
            <div class="relative">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input class="pl-10 pr-4 py-2 border border-outline-variant rounded-lg font-body-md text-sm w-64 bg-white" placeholder="Search internships..." type="text"/>
            </div>
            <button class="p-2 border border-outline-variant rounded-lg hover:bg-slate-50">
              <span class="material-symbols-outlined text-on-surface-variant">filter_list</span>
            </button>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <div *ngIf="loading" class="p-8 text-center text-slate-500">Loading internships...</div>
          <div *ngIf="!loading && internships.length === 0" class="p-8 text-center text-slate-500">
            No active internships found. Click "Add New Internship" to create one!
          </div>
          <table *ngIf="!loading && internships.length > 0" class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50/50">
                <th class="px-lg py-md text-label-caps font-label-caps text-on-surface-variant border-b border-slate-200">Title</th>
                <th class="px-lg py-md text-label-caps font-label-caps text-on-surface-variant border-b border-slate-200">Company</th>
                <th class="px-lg py-md text-label-caps font-label-caps text-on-surface-variant border-b border-slate-200">Domain</th>
                <th class="px-lg py-md text-label-caps font-label-caps text-on-surface-variant border-b border-slate-200">Duration</th>
                <th class="px-lg py-md text-label-caps font-label-caps text-on-surface-variant border-b border-slate-200">Status</th>
                <th class="px-lg py-md text-label-caps font-label-caps text-on-surface-variant border-b border-slate-200">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              <tr *ngFor="let internship of internships" class="hover:bg-slate-50 transition-colors">
                <td class="px-lg py-md font-h3 text-body-md text-slate-900">{{internship.title}}</td>
                <td class="px-lg py-md">
                  <div class="flex items-center gap-sm">
                    <div class="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center overflow-hidden text-slate-400">
                      <span class="material-symbols-outlined text-[20px]">apartment</span>
                    </div>
                    <span class="font-body-md">{{internship.company}}</span>
                  </div>
                </td>
                <td class="px-lg py-md">
                  <span class="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-tag text-xs capitalize">{{internship.domain}}</span>
                </td>
                <td class="px-lg py-md font-body-md text-on-surface-variant">{{internship.durationWeeks}} Weeks</td>
                <td class="px-lg py-md">
                  <div class="flex items-center gap-2">
                    <div class="relative inline-flex items-center">
                      <div class="w-11 h-6 rounded-full transition-all" [ngClass]="internship.isActive ? 'bg-secondary' : 'bg-slate-200'">
                        <div class="absolute top-[2px] left-[2px] bg-white border border-gray-300 rounded-full h-5 w-5 transition-all" [ngClass]="internship.isActive ? 'translate-x-full border-white' : ''"></div>
                      </div>
                    </div>
                    <span class="text-xs font-tag" [ngClass]="internship.isActive ? 'text-secondary' : 'text-on-surface-variant'">{{internship.isActive ? 'Active' : 'Inactive'}}</span>
                  </div>
                </td>
                <td class="px-lg py-md">
                  <div class="flex items-center gap-2">
                    <button class="p-2 text-on-surface-variant hover:text-secondary hover:bg-secondary-fixed rounded-lg transition-all">
                      <span class="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                    <button class="p-2 text-on-surface-variant hover:text-error hover:bg-error-container rounded-lg transition-all">
                      <span class="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div *ngIf="showAddModal" class="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-6">
        <div class="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden border border-white/20">
          <div class="px-xl py-lg border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h2 class="font-h2 text-h3 text-on-surface">Add New Internship</h2>
            <button (click)="showAddModal = false" class="p-2 hover:bg-slate-200 rounded-full transition-colors">
              <span class="material-symbols-outlined text-on-surface-variant">close</span>
            </button>
          </div>
          
          <div class="p-xl overflow-y-auto max-h-[70vh]">
            <form id="add-internship-form" (submit)="handleSubmit($event)" class="space-y-lg">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-lg">
                <div class="space-y-sm">
                  <label class="block text-label-caps font-label-caps text-on-surface-variant">INTERNSHIP TITLE</label>
                  <input required [(ngModel)]="newInternship.title" name="title" class="w-full px-4 py-3 border border-outline-variant rounded-xl font-body-md" placeholder="e.g. Frontend Developer" type="text"/>
                </div>
                <div class="space-y-sm">
                  <label class="block text-label-caps font-label-caps text-on-surface-variant">COMPANY NAME</label>
                  <input required [(ngModel)]="newInternship.company" name="company" class="w-full px-4 py-3 border border-outline-variant rounded-xl font-body-md" placeholder="e.g. TechCorp Inc." type="text"/>
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-lg">
                <div class="space-y-sm">
                  <label class="block text-label-caps font-label-caps text-on-surface-variant">DOMAIN</label>
                  <select [(ngModel)]="newInternship.domain" name="domain" class="w-full px-4 py-3 border border-outline-variant rounded-xl font-body-md bg-white">
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Product">Product</option>
                    <option value="Data Science">Data Science</option>
                  </select>
                </div>
                <div class="space-y-sm">
                  <label class="block text-label-caps font-label-caps text-on-surface-variant">DURATION (WEEKS)</label>
                  <input required [(ngModel)]="newInternship.durationWeeks" name="durationWeeks" class="w-full px-4 py-3 border border-outline-variant rounded-xl font-body-md" placeholder="e.g. 12" type="number" min="1"/>
                </div>
              </div>
              
              <div class="space-y-sm">
                <label class="block text-label-caps font-label-caps text-on-surface-variant">DESCRIPTION</label>
                <textarea required [(ngModel)]="newInternship.description" name="description" class="w-full px-4 py-3 border border-outline-variant rounded-xl font-body-md" placeholder="Detailed role description and responsibilities..." rows="4"></textarea>
              </div>
              
              <div class="space-y-sm">
                <label class="block text-label-caps font-label-caps text-on-surface-variant">REQUIRED SKILLS</label>
                <div class="p-3 border border-outline-variant rounded-xl flex flex-wrap gap-2">
                  <span *ngFor="let skill of newInternship.requiredSkills" class="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-tag text-xs">
                    {{skill}} <span (click)="removeSkill(skill)" class="material-symbols-outlined text-[14px] cursor-pointer">close</span>
                  </span>
                  <input 
                    [(ngModel)]="skillInput" 
                    name="skillInput"
                    (keydown)="handleAddSkill($event)" 
                    class="border-none focus:ring-0 text-sm p-0 ml-2 w-32 outline-none" 
                    placeholder="Type & Enter..." 
                    type="text"
                  />
                </div>
              </div>
              
              <div class="flex items-center justify-between p-lg bg-slate-50 rounded-xl">
                <div class="flex items-center gap-md">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" [(ngModel)]="newInternship.isActive" name="isActive" class="sr-only peer" />
                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                  </label>
                  <div>
                    <p class="text-sm font-h3 text-on-surface">Publish Immediately</p>
                    <p class="text-xs text-on-surface-variant">Listing will be visible to all students.</p>
                  </div>
                </div>
              </div>
            </form>
          </div>
          
          <div class="px-xl py-lg border-t border-slate-100 flex justify-end gap-md">
            <button (click)="showAddModal = false" class="px-lg py-md border border-outline-variant rounded-xl font-tag text-on-surface-variant hover:bg-slate-50 transition-colors">Cancel</button>
            <button type="submit" form="add-internship-form" class="px-lg py-md bg-secondary text-white rounded-xl font-tag shadow-md hover:opacity-90 active:scale-95 transition-all">Create Listing</button>
          </div>
        </div>
      </div>
    </main>
  `
})
export class DashboardComponent implements OnInit {
  internships: any[] = [];
  loading = true;
  showAddModal = false;
  skillInput = '';
  
  newInternship = {
    title: '', company: '', domain: 'Engineering', durationWeeks: 12, description: '', requiredSkills: [] as string[], isActive: true
  };

  constructor(private recommendationService: RecommendationService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchInternships();
  }

  fetchInternships() {
    this.recommendationService.getInternships().subscribe({
      next: (data) => {
        this.internships = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getActiveCount() {
    return this.internships.filter(i => i.isActive).length;
  }

  handleAddSkill(e: any) {
    if (e.key === 'Enter' && this.skillInput.trim() !== '') {
      e.preventDefault();
      if (!this.newInternship.requiredSkills.includes(this.skillInput.trim())) {
        this.newInternship.requiredSkills.push(this.skillInput.trim());
      }
      this.skillInput = '';
    }
  }

  removeSkill(skillToRemove: string) {
    this.newInternship.requiredSkills = this.newInternship.requiredSkills.filter(s => s !== skillToRemove);
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    const payload = { ...this.newInternship, durationWeeks: parseInt(this.newInternship.durationWeeks as any) };
    this.recommendationService.createInternship(payload).subscribe({
      next: () => {
        this.showAddModal = false;
        this.fetchInternships();
        this.newInternship = {
          title: '', company: '', domain: 'Engineering', durationWeeks: 12, description: '', requiredSkills: [], isActive: true
        };
      },
      error: (err) => {
        console.error(err);
        alert("Failed to create internship");
      }
    });
  }
}
