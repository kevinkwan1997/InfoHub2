import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActiveModalParams } from 'src/app/interface/components/modal.interface';

@Component({
  selector: 'modal-tab',
  templateUrl: './modal-tab.component.html',
  styleUrls: ['./modal-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalTabComponent {
  constructor() {

  }
  @Input() public set activeModals(activeModals: Record<string, ActiveModalParams>) {
    this.activeModalsArray = Object.entries(activeModals).map(([k, v]) => ({
      icon: v.icon,
      title: v.title,
      component: v.component
    }))
  };

  public activeModalsArray!: ActiveModalParams[];
}
