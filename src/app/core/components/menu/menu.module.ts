import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MenuComponent } from "./menu.component";
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [MenuComponent],
    exports: [MenuComponent],
    imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
    providers: []
})
export class MenuModule {}
