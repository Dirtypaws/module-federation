import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { CustomManifest } from './app.routes.definition';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const staticRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./entry/entry.module').then((m) => m.EntryModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

export function buildRoutes(manifest: CustomManifest): Routes {
  const lazyRoutes: Routes = Object.keys(manifest).map((key) => {
    const entry = manifest[key];
    return {
      path: entry.routePath,
      loadChildren: () => loadRemoteModule(key, entry.exposedModule).then((m) => m[entry.ngModuleName]),
    };
  });
  return [...lazyRoutes, ...staticRoutes];
}
