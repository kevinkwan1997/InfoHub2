import { ChangeDetectionStrategy, Component, EventEmitter, Input } from '@angular/core';
import { WeatherIndication } from 'src/app/enum/weather';
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

  public ngOnInit(): void {
  }

  public getColorMapping() {
  }

  public async onClick(hourlyWeather: WeatherHourlyResponse) {
    this.weatherService.setCurrentSelectedDetailedView(hourlyWeather);
  }

  public getIcon(weather: WeatherHourlyResponse) {
    return this.weatherService.getPreloadedIcon(<WeatherIndication>weather.weather[0].main)
  }
}
