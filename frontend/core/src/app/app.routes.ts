import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { CustomManifest } from './app.routes.definition';
import { ManifestDefinitionDto } from './.generated/core/generated';

export const staticRoutes: Routes = [
  {
    path: '**',
    component: NotFoundComponent,
  },
];

export function buildRoutes(manifest: { [key: string]: ManifestDefinitionDto }): Routes {
  const lazyRoutes: Routes = Object.keys(manifest).map((key) => {
    const entry = manifest[key];
    return {
      path: entry.routePath,
      loadChildren: () => loadRemoteModule(key, entry.exposedModule).then((m) => m[entry.ngModuleName]),
    };
  });
  return [...lazyRoutes, ...staticRoutes];
}
