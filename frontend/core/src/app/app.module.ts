import { APP_INITIALIZER, NgModule, provideZoneChangeDetection } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { AccordionModule } from 'primeng/accordion';
import { ManifestService } from './manifest.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

function initializeApp(manifestService: ManifestService) {
  return (): Promise<any> => {
    return manifestService.init();
  };
}

@NgModule({
  declarations: [AppComponent, NavComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    SidebarModule,
    ButtonModule,
    RouterModule,
    AccordionModule,
  ],
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptorsFromDi()),
    ManifestService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [ManifestService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
