import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { BaseWidget } from '../base-widget';
import { WeatherService } from 'src/app/services/data/weather/weather.service';
import { Observable } from 'rxjs';
import { Weather } from 'src/app/interface/data/weather';
import { TextService } from 'src/app/services/text/text.service';
import { getFirstFrom } from 'src/app/helpers/rxjs-helper';

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
    public currentIcon$!: Observable<any>;
    public currentBg!: string;

    public async ngOnInit(){
      this.currentIcon$ = this.weatherService.getCurrentWeatherIcon();
      const currentWeather = await this.weatherService.getCurrentWeatherDataByZip('28226');
      this.currentWeather.set(await getFirstFrom(currentWeather));
      // this.currentBg = this.weatherService.getBackgroundImage(<WeatherIndication>currentWeather.weather[0].main);
    }

    public formatTemperature(temperature: number | undefined): number {
      if (!temperature) {
        return 0;
      }
      return this.textService.formatTemperature(temperature);
    }
}
