import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  applications: { key: string; version: string }[] = [];

  /**
   *
   */
  constructor() {
    this.applications.push({ key: 'Versions', version: '0.0.1-alpha' });
  }
}
