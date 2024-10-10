import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryComponent } from './entry.component';
import { VersionsComponent } from '../versions/versions.component';

const routes: Routes = [
  {
    path: '',
    component: EntryComponent,
  },
  {
    path: 'versions',
    component: VersionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntryRoutingModule {}
