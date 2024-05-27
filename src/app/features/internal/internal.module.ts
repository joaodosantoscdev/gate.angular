import { MenuComponent } from './../../core/components/menu/menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessesComponent } from './accesses/accesses.component';
import { CamsComponent } from './cams/cams.component';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { InternalRoutingModule } from './internal.routing';
import { InternalComponent } from './internal.component';
import { HeaderModule } from 'src/app/core/components/header';
import { MenuModule } from 'src/app/core/components/menu';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';



@NgModule({
  declarations: [InternalComponent, AccessesComponent, CamsComponent, MainComponent],
  imports: [
    CommonModule,
    RouterModule,
    InternalRoutingModule,
    HeaderModule,
    MenuModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule
  ]
})
export class InternalModule { }
