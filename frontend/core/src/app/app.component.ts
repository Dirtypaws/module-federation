import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { buildRoutes, getManifest } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  navLinks: { path: string; display: string }[] = [];
  constructor(private router: Router) {
    const manifest = getManifest();
    Object.keys(manifest).map((key) => {
      const entry = manifest[key];
      this.navLinks.push({
        path: entry.routePath,
        display: entry.displayName,
      });
    });
  }

  ngOnInit(): void {
    //this.router.resetConfig(buildRoutes());
  }
}
