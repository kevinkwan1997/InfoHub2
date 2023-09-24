import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponentComponent {

}
