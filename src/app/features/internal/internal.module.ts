import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { InternalRoutingModule } from './internal.routing';
import { InternalComponent } from './internal.component';
import { HeaderModule } from 'src/app/core/components/header';
import { MenuModule } from 'src/app/core/components/menu';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { AccessSymbolModule, SharedModule } from 'src/app/shared';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMaskPipe } from 'ngx-mask';
import { MoreInfoDialogComponent } from './main/more-info/more-info.dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { SpinnerModule } from 'src/app/shared/components/spinner/spinner.module';



@NgModule({
  declarations: [InternalComponent, MainComponent, MoreInfoDialogComponent],
  imports: [
    CommonModule,
    RouterModule,
    InternalRoutingModule,
    HeaderModule,
    MenuModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatTableModule,
    MatButtonModule,
    AccessSymbolModule,
    NgxMaskPipe,
    MatDialogModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    SharedModule,
    ReactiveFormsModule,
    MatInputModule,
    SpinnerModule
  ],
  providers: [DatePipe, NgxMaskPipe]
})
export class InternalModule { }
