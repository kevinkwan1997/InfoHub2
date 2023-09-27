import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActiveModalParams } from 'src/app/interface/components/modal.interface';
import { NavigationService } from 'src/app/services/application/navigation.service';

@Component({
  selector: 'modal-tab',
  templateUrl: './modal-tab.component.html',
  styleUrls: ['./modal-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalTabComponent {
  constructor(
    private navigationService: NavigationService
  ) {

  }
  @Input() public activeModals!: ActiveModalParams[];

  public navigate(activeModal: any) {
    this.navigationService.navigate(activeModal.title);
  }
}
