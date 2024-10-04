import { Component, signal } from '@angular/core';
import { getManifest } from './app.routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  sidebarVisible = signal(false);
  navLinks: { path: string; display: string }[] = [];

  constructor() {
    const manifest = getManifest();
    Object.keys(manifest).map((key) => {
      const entry = manifest[key];
      this.navLinks.push({
        path: entry.routePath,
        display: entry.displayName,
      });
    });
  }
}
