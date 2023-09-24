import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalComponent } from 'src/app/interface/components/modal.interface';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements ModalComponent {
  constructor() {
  }
  @Input() public title!: string;
}
