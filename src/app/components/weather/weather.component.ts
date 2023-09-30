import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { BaseWidget } from '../base-widget';
import { WeatherService } from 'src/app/services/data/weather/weather.service';
import { BaseWeatherData } from 'src/app/interface/data/weather';
import { TextService } from 'src/app/services/text/text.service';
import { WeatherIndication } from 'src/app/enum/weather';
import { AssetService } from 'src/app/services/data/asset/asset.service';

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherComponent implements OnInit, BaseWidget {
    constructor(
      private assetService: AssetService,
      private textService: TextService,
      private weatherService: WeatherService
    ) {}
    
    public currentWeather = signal<BaseWeatherData | null>(null);
    public hourlyWeather!: any; // TODO: Update
    public currentIcon: any;
    public currentBackground!: string;

    public async ngOnInit(){
      const currentWeather = this.weatherService.getCurrentWeatherValue();
      this.currentIcon = this.weatherService.getPreloadedIcon(<WeatherIndication>currentWeather.weather[0].main);
      this.currentWeather.set(currentWeather);
      this.currentBackground = this.assetService.getNgStyleImageUrl(currentWeather.weather[0].main);
    }

    public formatTemperature(temperature: number | undefined): number {
      if (!temperature) {
        return 0;
      }
      return this.textService.formatTemperature(temperature);
    }
}
