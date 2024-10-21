import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CustomManifest } from './app.routes.definition';
import { buildRoutes } from './app.routes';

@Injectable()
export class ManifestService {
  constructor(private Router: Router) {}

  init() {
    return new Promise<void>((resolve, reject) => {
      if (!this.manifest) {
        this.manifest = {
          admin: {
            remoteEntry: 'http://localhost:4201/remoteEntry.js',
            type: 'module',
            id: '35c3a5d1-f0bf-41ef-ab0c-b77296721727',
            ngModuleName: 'EntryModule',
            exposedModule: './Module',
            displayName: 'Admin',
            routePath: 'admin',
            version: '0.0.1-alpha',
            navigationRoutes: [
              {
                path: '/versions',
                display: 'Application Versions',
              },
            ],
          },
        };
      }

      const routes = buildRoutes(this.manifest);
      this.Router.resetConfig(routes);

      resolve();
    });
  }

  manifest: CustomManifest | undefined;
}
