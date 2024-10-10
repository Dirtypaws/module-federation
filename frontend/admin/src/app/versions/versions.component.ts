import { Component } from '@angular/core';

@Component({
  selector: 'app-versions',
  standalone: true,
  imports: [],
  templateUrl: './versions.component.html',
  styleUrl: './versions.component.scss',
})
export class VersionsComponent {
  applications: { key: string; version: string }[] = [];

  /**
   *
   */
  constructor() {
    this.applications.push({ key: 'Admin', version: '0.0.1-alpha' });
  }
}
