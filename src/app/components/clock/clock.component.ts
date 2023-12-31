import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalComponent } from 'src/app/interface/components/modal.interface';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClockComponent implements ModalComponent {
  @Input() public title!: string;

  public ngOnInit(): void {

  }
}
