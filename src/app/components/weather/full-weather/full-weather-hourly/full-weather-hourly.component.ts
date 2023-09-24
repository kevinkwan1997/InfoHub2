import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WeatherHourlyResponse } from 'src/app/interface/data/weather';

@Component({
  selector: 'full-weather-hourly',
  templateUrl: './full-weather-hourly.component.html',
  styleUrls: ['./full-weather-hourly.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullWeatherHourlyComponent {
  @Input() public hourlyWeather: WeatherHourlyResponse[] = [];
}
