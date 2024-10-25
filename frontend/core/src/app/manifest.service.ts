import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ManifestDefinitionDto } from './.generated/core/generated';
import { buildRoutes } from './app.routes';
import { firstValueFrom } from 'rxjs';
import { ManifestClient } from './.generated/core/generated';

@Injectable()
export class ManifestService {
  constructor(private Router: Router, private ManifestClient: ManifestClient) {}

  init() {
    return new Promise<void>(async (resolve, reject) => {
      this.manifest = await firstValueFrom(this.ManifestClient.get());
      console.log('init', this.manifest);
      const routes = buildRoutes(this.manifest);
      this.Router.resetConfig(routes);

      resolve();
    });
  }

  manifest: { [key: string]: ManifestDefinitionDto } | undefined;
}
