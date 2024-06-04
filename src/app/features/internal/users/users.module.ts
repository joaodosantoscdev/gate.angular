import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsersRoutingModule } from './users.routing';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { AccessSymbolModule, SharedModule } from 'src/app/shared';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ErrorPipe } from 'src/app/shared/pipes/error.pipe';



@NgModule({
  declarations: [UsersComponent, UserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SharedModule,
    AccessSymbolModule,
    MatIconModule,
    NgxMaskPipe,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatRadioModule,
    NgxMaskPipe,
    NgxMaskDirective,
  ],
  providers: [ NgxMaskPipe ]
})
export class UsersModule { }
