import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { provideRouter, RouterModule } from '@angular/router';
import { buildRoutes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { AccordionModule } from 'primeng/accordion';

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
  providers: [provideRouter(buildRoutes())],
  bootstrap: [AppComponent],
})
export class AppModule {}
