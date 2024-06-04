import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPipe } from './pipes/error.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';



@NgModule({
  declarations: [ ErrorPipe ],
  imports: [CommonModule],
  exports: [ ErrorPipe ],
})
export class SharedModule { }
