import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AccessSymbolComponent } from './access-symbol.component';



@NgModule({
  declarations: [ AccessSymbolComponent ],
  exports: [ AccessSymbolComponent ],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class AccessSymbolModule { }
