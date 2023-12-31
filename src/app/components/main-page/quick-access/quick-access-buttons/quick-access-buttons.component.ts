import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { QuickAccessButtonConfig } from 'src/app/interface/components/quick-access-button.config';
import { ModalService } from 'src/app/services/application/modal.service';

@Component({
  selector: 'quick-access-button',
  templateUrl: './quick-access-buttons.component.html',
  styleUrls: ['./quick-access-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickAccessButtonsComponent {
  constructor(
    private modalService: ModalService,
  ) {}

  @Input() public config!: QuickAccessButtonConfig;

  public open(): void {
    this.modalService.openModal({
      title: this.config.subtext,
      icon: this.config.icon,
    });
  }
}
