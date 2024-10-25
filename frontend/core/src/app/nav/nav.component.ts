import { Component, model } from '@angular/core';
import { CustomRemoteConfig } from '../app.routes.definition';
import { ManifestService } from '../manifest.service';
import { Application, NavLink } from './nav.component.definition';

@Component({
  selector: 'app-sidebar',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  sidebarVisible = model.required<boolean>();
  applications;

  /**
   *
   */
  constructor(manifestService: ManifestService) {
    this.applications = Object.keys(manifestService.manifest ?? {}).map((key) => {
      if (manifestService.manifest && manifestService.manifest[key.toString()]) {
        const entry = manifestService.manifest[key];
        console.log(entry);
        return {
          header: entry.displayName,
          links: entry.navigationRoutes.map((link) => {
            return {
              displayName: link.display,
              routerLink: `/${entry.routePath}${link.path}`,
            };
          }),
        };
      }
      return;
    });
    //   if () {
    //     const entry = routeService.manifest[key];
    //     this.applications.push({
    //       header: entry.displayName,
    //       links: entry.navigationRoutes.map((link) => {
    //         return {
    //           displayName: link.display,
    //           routerLink: `/${entry.routePath}${link.path}`,
    //         };
    //       }),
    //     });
    //   }
    // }
  }

  expand($event: any) {
    console.log('evt', $event);
  }

  close(): void {
    this.sidebarVisible.set(false);
  }
}
