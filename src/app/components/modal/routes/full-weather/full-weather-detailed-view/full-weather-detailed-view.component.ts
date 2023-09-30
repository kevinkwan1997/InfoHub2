import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { routeSlideInLeft, swapRight } from 'src/app/animations/animations';
import { WeatherHourlyResponse } from 'src/app/interface/data/weather';
import { AssetService } from 'src/app/services/data/asset/asset.service';
import { WeatherService } from 'src/app/services/data/weather/weather.service';

@Component({
  selector: 'full-weather-detailed-view',
  templateUrl: './full-weather-detailed-view.component.html',
  styleUrls: ['./full-weather-detailed-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    routeSlideInLeft
  ]
})
export class FullWeatherDetailedViewComponent {
  constructor(
    private assetService: AssetService,
    private weatherService: WeatherService,
  ) {
    
  }
  @Input() public set hourlyWeather(hourlyWeather: WeatherHourlyResponse) {
    this.currentBackground = this.assetService.getImageUrl(hourlyWeather.weather[0].main);
    this.weather = hourlyWeather;
  };

  public weather!: WeatherHourlyResponse;
  public active: boolean = true;

  public currentBackground!: SafeUrl;

  public getIcon(weather: WeatherHourlyResponse) {
    return this.weatherService.getPreloadedIcon(weather.weather[0].main)
  }

}
