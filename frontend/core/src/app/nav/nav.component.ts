import { Component, model } from '@angular/core';

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

  close(): void {
    this.sidebarVisible.set(false);
  }
}
