import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ngIfFadeIn, swapRight } from 'src/app/animations/animations';
import { WeatherHourlyResponse } from 'src/app/interface/data/weather';
import { AssetService } from 'src/app/services/data/asset/asset.service';

@Component({
  selector: 'full-weather-detailed-view',
  templateUrl: './full-weather-detailed-view.component.html',
  styleUrls: ['./full-weather-detailed-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    swapRight,
    ngIfFadeIn
  ]
})
export class FullWeatherDetailedViewComponent {
  constructor(
    private assetService: AssetService,
  ) {
    
  }
  @Input() public set hourlyWeather(hourlyWeather: WeatherHourlyResponse) {
    this.currentBackground = this.assetService.getImageUrl(hourlyWeather.weather[0].main);
    this.weather = hourlyWeather;
  };

  public weather!: WeatherHourlyResponse;

  public currentBackground!: string;

}
