import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class AppComponent {
  sidebarVisible = signal(false);
  navLinks: { path: string; display: string }[] = [];

  constructor() {}

  toggleSidebar(state: boolean): void {
    this.sidebarVisible.set(!state);
  }
}
