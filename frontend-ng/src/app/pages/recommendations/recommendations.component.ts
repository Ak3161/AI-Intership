import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RecommendationService } from '../../services/recommendation.service';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="pt-24 pb-12 px-6 max-w-7xl mx-auto flex flex-col items-center text-center" *ngIf="recommendations.length === 0">
      <h2 class="font-h1 text-h2 text-slate-400 mt-12 mb-4">No Recommendations Yet</h2>
      <p class="text-slate-500 mb-8 max-w-md">Go to your Profile and generate AI matched career options to see them here.</p>
      <div class="w-64 h-64 opacity-20">
          <span class="material-symbols-outlined text-[120px] text-slate-400" style="font-variation-settings: 'FILL' 1">auto_awesome</span>
      </div>
    </main>

    <main class="pt-24 pb-12 px-6 max-w-7xl mx-auto" *ngIf="recommendations.length > 0">
      <header class="mb-12">
        <h1 class="font-h1 text-h1 text-on-surface mb-xs">Your AI Matched Careers</h1>
        <p class="text-body-lg text-on-surface-variant max-w-2xl">We've analyzed active internships to find the perfect fits for your skill set.</p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-lg">
        <aside class="hidden lg:block lg:col-span-3 space-y-lg">
          <div class="bg-gradient-to-br from-secondary-container to-secondary p-md rounded-xl text-white shadow-xl">
            <div class="flex items-center gap-xs mb-sm">
              <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1">auto_awesome</span>
              <span class="font-label-caps text-[10px]">PRO TIP</span>
            </div>
            <p class="text-body-md font-medium leading-tight">Improving your relevant skills could increase your match scores further.</p>
          </div>
        </aside>

        <section class="lg:col-span-9 space-y-md">
          <div *ngFor="let rec of recommendations; let idx = index" class="glass-card p-lg rounded-xl shadow-[0px_4px_20px_rgba(15,23,42,0.08)] relative transition-transform hover:scale-[1.01] active:scale-95 duration-200" [ngClass]="{'border-l-4 border-l-secondary': idx === 0, 'border border-outline-variant': idx !== 0}">
            <div *ngIf="idx === 0" class="absolute -top-3 left-6 bg-secondary text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 uppercase tracking-widest shadow-md">
              <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1">verified</span>
              Best Match
            </div>
            
            <div class="flex flex-col md:flex-row md:items-start justify-between gap-md">
              <div class="flex gap-md">
                <div class="w-16 h-16 rounded-lg bg-surface-container flex items-center justify-center shrink-0 border border-outline-variant overflow-hidden text-slate-400">
                  <span class="material-symbols-outlined text-[32px]">apartment</span>
                </div>
                <div>
                  <h3 class="font-h3 text-h3 text-on-surface">{{rec.title}}</h3>
                  <div class="flex flex-wrap items-center gap-sm mt-xs">
                    <span class="text-body-md font-semibold text-on-surface-variant">{{rec.company}}</span>
                    <span class="w-1 h-1 rounded-full bg-outline-variant hidden sm:block"></span>
                    <span class="bg-blue-100 text-blue-700 px-3 py-0.5 rounded-full font-tag text-tag capitalize">{{rec.domain}}</span>
                    <span class="w-1 h-1 rounded-full bg-outline-variant hidden sm:block"></span>
                    <span class="text-on-surface-variant text-tag font-medium">{{rec.durationWeeks}} weeks</span>
                  </div>
                </div>
              </div>
              
              <div class="flex items-center gap-md bg-surface-container-low px-md py-sm rounded-xl border border-outline-variant/50 self-start md:self-auto">
                <div class="relative w-16 h-16">
                  <svg class="match-ring w-16 h-16">
                    <circle cx="32" cy="32" fill="transparent" r="28" stroke="#E2E8F0" stroke-width="4"></circle>
                    <circle cx="32" cy="32" fill="transparent" r="28" stroke="#4648d4" stroke-dasharray="175.9" [attr.stroke-dashoffset]="175.9 - (175.9 * (rec.matchScore || 0)) / 100" stroke-width="4"></circle>
                  </svg>
                  <div class="absolute inset-0 flex items-center justify-center">
                    <span class="text-body-md font-bold text-secondary">{{ Math.round(rec.matchScore || 0) }}%</span>
                  </div>
                </div>
                <div class="hidden sm:block">
                  <p class="text-label-caps text-on-surface-variant">MATCH SCORE</p>
                  <p class="text-tag font-bold text-secondary">{{ rec.matchScore > 80 ? 'High Precision' : 'Good Fit' }}</p>
                </div>
              </div>
            </div>

            <div class="mt-lg pl-lg border-l-2 border-secondary-fixed-dim bg-secondary-fixed/10 p-md rounded-r-lg">
              <div class="flex items-center gap-sm text-secondary mb-sm">
                <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1">auto_awesome</span>
                <span class="font-bold text-tag">AI RECOMMENDATION</span>
              </div>
              <p class="text-body-md text-on-surface-variant leading-relaxed">
                {{rec.aiExplanation || "This internship strongly aligns with your submitted profile and core skills."}}
              </p>
            </div>
            
            <div class="mt-lg flex justify-end">
              <button class="bg-gradient-to-r from-secondary to-indigo-700 text-white px-lg py-3 rounded-xl font-bold text-body-md flex items-center gap-sm hover:shadow-lg transition-all active:scale-95">
                <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1">bolt</span>
                Quick Apply with AI
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  `
})
export class RecommendationsComponent implements OnInit {
  recommendations: any[] = [];
  Math = Math;

  constructor(private recommendationService: RecommendationService) {}

  ngOnInit() {
    this.recommendations = this.recommendationService.getRecommendations();
  }
}
