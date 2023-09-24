import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalComponent } from 'src/app/interface/components/modal.interface';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements ModalComponent {
  @Input() public title!: string;
}
