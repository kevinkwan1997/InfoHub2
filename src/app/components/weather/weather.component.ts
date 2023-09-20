import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseWidget } from '../base-widget';
import { WeatherService } from 'src/app/services/data/weather/weather.service';
import { Observable } from 'rxjs';
import { Weather } from 'src/app/interface/data/weather';
import { WeatherIndication } from 'src/app/enum/weather';

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherComponent implements OnInit, BaseWidget {
    constructor(
      private weatherService: WeatherService
    ) {

    }
    public isApplicationLoaded$!: Observable<boolean>;
    public currentWeather!: Weather;
    public hourlyWeather!: any; // TODO: Update
    public currentIcon!: any;

    async ngOnInit(): Promise<void> {
      this.currentWeather = await this.weatherService.getCurrentWeatherDataByZip('28226');
      this.hourlyWeather = await this.weatherService.getHourlyDataByZip();
      const weather: WeatherIndication = <WeatherIndication>this.currentWeather.weather[0].main;
      this.currentIcon = await this.weatherService.getIcon(weather);
    }
}
