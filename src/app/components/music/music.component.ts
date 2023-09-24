import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalComponent } from 'src/app/interface/components/modal.interface';

@Component({
  selector: 'music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MusicComponent implements ModalComponent {
  @Input() public set title(title: string) {
    console.log(title);
  };
}
