import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { CustomManifest } from './app.routes.definition';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

export function buildRoutes(): Routes {
  const manifest = getManifest();
  const lazyRoutes: Routes = Object.keys(manifest).map((key) => {
    const entry = manifest[key];
    return {
      path: entry.routePath,
      loadChildren: () => loadRemoteModule(key, entry.exposedModule).then((m) => m[entry.ngModuleName]),
    };
  });
  console.log([...lazyRoutes, ...routes]);
  return [...lazyRoutes, ...routes];
}

export function getManifest(): CustomManifest {
  // TODO: Inject db call to retrieve manifest
  return {
    admin: {
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      type: 'module',
      id: '35c3a5d1-f0bf-41ef-ab0c-b77296721727',
      ngModuleName: 'MainModule',
      exposedModule: './Module',
      displayName: 'Admin',
      routePath: 'admin',
      version: '0.0.1-alpha',
    },
  };
}
