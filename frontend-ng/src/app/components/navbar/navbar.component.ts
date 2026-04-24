import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="fixed top-0 w-full z-50 border-b bg-white/80 backdrop-blur-md border-slate-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-8">
          <span 
            class="text-xl font-bold tracking-tighter text-slate-900 cursor-pointer"
            routerLink="/"
          >
            CareerPilot AI
          </span>
          <div class="hidden md:flex items-center space-gap-lg gap-8">
            <a routerLink="/" routerLinkActive="text-indigo-600 border-indigo-600 pb-1" [routerLinkActiveOptions]="{exact: true}" class="font-body-md text-sm font-medium tracking-tight border-b-2 border-transparent text-slate-600 hover:text-slate-900 transition-colors duration-200">Discover</a>
            <a routerLink="/profile" routerLinkActive="text-indigo-600 border-indigo-600 pb-1" class="font-body-md text-sm font-medium tracking-tight border-b-2 border-transparent text-slate-600 hover:text-slate-900 transition-colors duration-200">Profile</a>
            <a routerLink="/recommendations" routerLinkActive="text-indigo-600 border-indigo-600 pb-1" class="font-body-md text-sm font-medium tracking-tight border-b-2 border-transparent text-slate-600 hover:text-slate-900 transition-colors duration-200">Recommendations</a>
            <a routerLink="/dashboard" routerLinkActive="text-indigo-600 border-indigo-600 pb-1" class="font-body-md text-sm font-medium tracking-tight border-b-2 border-transparent text-slate-600 hover:text-slate-900 transition-colors duration-200">Dashboard</a>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="relative group">
            <span class="material-symbols-outlined text-on-surface-variant hover:bg-slate-50 p-2 rounded-full cursor-pointer transition-colors" style="font-variation-settings: 'FILL' 0">notifications</span>
            <span class="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
          </div>
          <span class="material-symbols-outlined text-on-surface-variant hover:bg-slate-50 p-2 rounded-full cursor-pointer transition-colors" style="font-variation-settings: 'FILL' 0">settings</span>
          <div class="h-8 w-8 rounded-full bg-primary-fixed-dim flex items-center justify-center overflow-hidden border border-outline-variant">
            <img alt="User profile avatar" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCE62mqgy86jiWYBBH2dVa-Su8sSINT_LsVg96QG0wJH7c9hRbe19TQ21eTRc8_GI3shf8xqt6-gZMHfoviJUnDSQiz0yfitEPqdmTLEuBKBo-uBvkkEgb3947e6YYXSb9aPfECDMw6nidSPQfcc7V2b6ZoZ-6v4deud5UlyUDCa7R0nysyZxBX_eCie_BayJRPMyw_qQkVtpTPgzFS3TJ_Vijp-zHoK5IMnMO2YOLbG8iQTNeZbBb4EhftIIcM3QQTAQjZB8aYmI2B"/>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {}
