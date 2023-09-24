import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalComponent } from 'src/app/interface/components/modal.interface';

@Component({
  selector: 'app-full-weather',
  templateUrl: './full-weather.component.html',
  styleUrls: ['./full-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullWeatherComponent implements ModalComponent {

}
