import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Hourly } from 'src/app/interface/data/weather';
import { WeatherService } from 'src/app/services/data/weather/weather.service';

@Component({
  selector: 'full-weather-hourly',
  templateUrl: './full-weather-hourly.component.html',
  styleUrls: ['./full-weather-hourly.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullWeatherHourlyComponent {
  constructor(private weatherService: WeatherService) {}

  @Input() public hourlyWeather: Hourly[] = [];
  @Output() public clickEvent: EventEmitter<Hourly> = new EventEmitter();

  public ngOnInit(): void {
  }

  public getColorMapping() {
  }

  public onClick(hourlyWeather: Hourly) {
    this.clickEvent.emit(hourlyWeather);
  }

  public getIcon(weather: Hourly) {
    return this.weatherService.getPreloadedIcon(weather.weather[0].main)
  }
}
