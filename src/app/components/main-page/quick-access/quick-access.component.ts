import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QuickAccessButtonConfig } from 'src/app/interface/components/quick-access-button.config';
import { ModalService } from 'src/app/services/application/modal.service';

@Component({
  selector: 'quick-access',
  templateUrl: './quick-access.component.html',
  styleUrls: ['./quick-access.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickAccessComponent {
  constructor(
    private modalService: ModalService,
  ) {}

  public quickAccessConfigs: QuickAccessButtonConfig[] = [
    {
      icon: 'newspaper',
      subtext: 'News',
    },
    {
      icon: 'headphones',
      subtext: 'Music'
    },
    {
      icon: 'cloudy_snowing',
      subtext: 'Weather'
    },
    {
      icon: 'punch_clock',
      subtext: 'Clock'
    },
    {
      icon: 'book',
      subtext: 'About'
    },
    {
      icon: 'newspaper',
      subtext: 'Test'
    },
  ]
}
