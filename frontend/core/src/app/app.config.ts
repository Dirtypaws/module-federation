import { Injectable } from '@angular/core';
import { CustomManifest } from './app.routes.definition';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppConfig {
  manifest: CustomManifest | undefined;
  static initializeManifest: Function;

  constructor(private router: Router) {
    console.log(router);
  }
}
