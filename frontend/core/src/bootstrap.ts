import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { buildRoutes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(buildRoutes())],
});
