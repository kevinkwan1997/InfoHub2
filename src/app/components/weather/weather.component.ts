import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { BaseWidget } from '../base-widget';
import { WeatherService } from 'src/app/services/data/weather/weather.service';
import { Observable } from 'rxjs';
import { Weather } from 'src/app/interface/data/weather';
import { TextService } from 'src/app/services/text/text.service';
import { getFirstFrom } from 'src/app/helpers/rxjs-helper';
import { WeatherIndication } from 'src/app/enum/weather';

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherComponent implements OnInit, BaseWidget {
    constructor(
      private textService: TextService,
      private weatherService: WeatherService
    ) {}
    
    public currentWeather = signal<Weather | null>(null);
    public hourlyWeather!: any; // TODO: Update
    public currentIcon: any;
    public currentBg!: string;

    public async ngOnInit(){
      const currentWeather = this.weatherService.getCurrentWeatherValue();
      this.currentIcon = this.weatherService.getPreloadedIcon(<WeatherIndication>currentWeather.weather[0].main);
      this.currentWeather.set(currentWeather);
    }

    public formatTemperature(temperature: number | undefined): number {
      if (!temperature) {
        return 0;
      }
      return this.textService.formatTemperature(temperature);
    }
}
