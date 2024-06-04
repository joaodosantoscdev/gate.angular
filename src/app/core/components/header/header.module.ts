import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { HeaderComponent } from './header.component';

@NgModule({
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
    providers: [],
    imports: [
      RouterModule,
      CommonModule,
      ReactiveFormsModule,
      MatMenuModule,
      MatButtonModule,
      MatIconModule,
      MatTooltipModule,
      MatBadgeModule,
    ],
})
export class HeaderModule { }
