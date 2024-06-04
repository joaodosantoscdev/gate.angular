import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { InternalComponent } from './internal.component';

const routes: Routes = [
  {
    path: '',
    component: InternalComponent,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full'},
      { path: 'main', component: MainComponent },
      {
        path: 'accesses',
        loadChildren: () => import('./accesses/accesses.module').then(m => m.AccessesModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalRoutingModule { }
