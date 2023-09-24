import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent extends ModalComponent {
  constructor(injector: Injector) {
    super(injector);
  }
}
