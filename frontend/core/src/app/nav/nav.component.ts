import { Component, model } from '@angular/core';
import { CustomRemoteConfig } from '../app.routes.definition';
import { ManifestService } from '../manifest.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  sidebarVisible = model.required<boolean>();
  applications: CustomRemoteConfig[] = [];

  /**
   *
   */
  constructor(private routeService: ManifestService) {
    const manifest = Object.keys(routeService).manifest ?? {};
    for (const route in manifest) {
      this.applications.push({
        displayName = manifest,
      });
    }
  }

  expand($event: any) {
    console.log('evt', $event);
  }

  close(): void {
    this.sidebarVisible.set(false);
  }
}
