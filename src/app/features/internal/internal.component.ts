import { Component } from '@angular/core';
import { menuOptions } from 'src/app/core/menu';

@Component({
  selector: 'app-internal',
  templateUrl: './internal.component.html',
  styleUrls: ['./internal.component.scss']
})
export class InternalComponent {
  menuOptions = menuOptions;
}
