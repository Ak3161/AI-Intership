import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="w-full py-12 border-t border-slate-200 bg-slate-50">
      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="flex flex-col items-center md:items-start gap-2">
          <span class="font-bold text-slate-900">CareerPilot AI</span>
          <p class="font-['Inter'] text-xs text-slate-500">© 2024 CareerPilot AI. Empowering the next generation of talent.</p>
        </div>
        <div class="flex gap-6">
          <a class="font-['Inter'] text-xs text-slate-500 hover:text-indigo-600 transition-colors" href="#">Privacy Policy</a>
          <a class="font-['Inter'] text-xs text-slate-500 hover:text-indigo-600 transition-colors" href="#">Terms of Service</a>
          <a class="font-['Inter'] text-xs text-slate-500 hover:text-indigo-600 transition-colors" href="#">Help Center</a>
          <a class="font-['Inter'] text-xs text-slate-500 hover:text-indigo-600 transition-colors" href="#">Contact Support</a>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
