import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { WeatherHourlyResponse } from 'src/app/interface/data/weather';
import { WeatherService } from 'src/app/services/data/weather/weather.service';

@Component({
  selector: 'full-weather-hourly',
  templateUrl: './full-weather-hourly.component.html',
  styleUrls: ['./full-weather-hourly.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullWeatherHourlyComponent {
  constructor(private weatherService: WeatherService) {}

  @Input() public hourlyWeather: WeatherHourlyResponse[] = [];
  @Output() public clickEvent: EventEmitter<WeatherHourlyResponse> = new EventEmitter();

  public ngOnInit(): void {
  }

  public getColorMapping() {
  }

  public onClick(hourlyWeather: WeatherHourlyResponse) {
    this.clickEvent.emit(hourlyWeather);
  }

  public getIcon(weather: WeatherHourlyResponse) {
    return this.weatherService.getPreloadedIcon(weather.weather[0].main)
  }
}
