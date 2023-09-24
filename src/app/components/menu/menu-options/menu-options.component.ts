import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'menu-options',
  templateUrl: './menu-options.component.html',
  styleUrls: ['./menu-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuOptionsComponent {
  @Input() public isOptionsShown!: boolean | null;
}
