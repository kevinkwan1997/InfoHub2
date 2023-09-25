import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WeatherHourlyResponse } from 'src/app/interface/data/weather';

@Component({
  selector: 'full-weather-detailed-view',
  templateUrl: './full-weather-detailed-view.component.html',
  styleUrls: ['./full-weather-detailed-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullWeatherDetailedViewComponent {
  constructor() {
    
  }
  @Input() public hourlyWeather!: WeatherHourlyResponse;
}
