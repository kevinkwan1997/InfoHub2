import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable, distinctUntilChanged, tap } from 'rxjs';
import { ModalComponent } from 'src/app/interface/components/modal.interface';
import { Weather, WeatherHourlyResponse } from 'src/app/interface/data/weather';
import { WeatherService } from 'src/app/services/data/weather/weather.service';

@Component({
  selector: 'app-full-weather',
  templateUrl: './full-weather.component.html',
  styleUrls: ['./full-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullWeatherComponent implements ModalComponent, OnInit {
  constructor(
    private weatherService: WeatherService
  ) { }
  @Input() public title!: string;
  public colorMap: { name: string, value: string }[] = [
    { name: 'hourly-gradient-morning', value: '#166B96' },
    { name: 'hourly-gradient-morning-afternoon', value: '#388bb4' },
    { name: 'hourly-gradient-afternoon', value: '#84D6FF' },
    { name: 'hourly-gradient-afternoon-evening', value: '#5e91aa' },
    { name: 'hourly-gradient-evening', value: '#CB6D00' },
    { name: 'hourly-gradient-evening-midnight', value: '#965000' },
    { name: 'hourly-gradient-midnight', value: '#1A1914' },
    { name: 'hourly-gradient-midnight-morning', value: '#242c41' },
  ]

  public currentWeather$!: Observable<Weather>;
  public hourlyWeather$!: Observable<WeatherHourlyResponse[]>;
  public selectedDetailedHourly$!: Observable<WeatherHourlyResponse | null>;
  public zipCode: string = '28226' // TODO: make configurable

  public ngOnInit(): void {
    this.currentWeather$ = this.weatherService.getCurrentWeather()
      .pipe(
        tap((weather) => {
          console.log(weather);
        })
      );
    this.hourlyWeather$ = this.weatherService.getHourlyWeather();
    this.selectedDetailedHourly$ = this.weatherService.getCurrentSelectedDetailedViewObservable()
      .pipe(
        distinctUntilChanged()
      );
  };
}
