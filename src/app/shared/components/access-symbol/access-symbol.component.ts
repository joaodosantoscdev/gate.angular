import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-access-symbol',
  templateUrl: './access-symbol.component.html',
  styleUrls: ['./access-symbol.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccessSymbolComponent {
  @Input() accessType!: number;
  @Input() iconSize: string = 'lg';
  @Input() showText: boolean = false;

  get AccessTypeClass(): string {
    return !this.accessType ? `in ${this.iconSize}` : `out ${this.iconSize}`;
  }

  get AccessTypeText(): string {
    return !this.accessType ? 'ENTRADA' : 'SAÍDA'
  }

  get AccessTypeIcon(): string {
    return !this.accessType ? 'arrow_upwards' : 'arrow_downward'
  }
}
