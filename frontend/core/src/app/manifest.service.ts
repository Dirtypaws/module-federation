import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { buildRoutes } from './app.routes';
import { firstValueFrom } from 'rxjs';
import { AppClient, AppRegistrationDto } from './.generated/core/generated';

@Injectable()
export class ManifestService {
  constructor(private Router: Router, @Inject(AppClient) private appCLient: AppClient) {}

  init() {
    return new Promise<void>(async (resolve, reject) => {
      this.manifest = await firstValueFrom(this.appCLient.get());
      console.log('init', this.manifest);
      const routes = buildRoutes(this.manifest);
      this.Router.resetConfig(routes);

      resolve();
    });
  }

  manifest: { [key: string]: AppRegistrationDto } | undefined;
}
