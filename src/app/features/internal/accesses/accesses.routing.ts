import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessesComponent } from './accesses.component';
import { FastAccessComponent } from './fast-access/fast-access.component';

const routes: Routes = [
  {
    path: '',
    component: AccessesComponent,
    children: [
    ]
  },
  {
    path: 'fast-access',
    component: FastAccessComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessesRoutingModule { }
