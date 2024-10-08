import { Component, model, viewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  sidebarVisible = model.required<boolean>();

  /**
   *
   */
  constructor() {}

  expand($event: any) {
    console.log('evt', $event);
  }

  close(): void {
    this.sidebarVisible.set(false);
  }
}
