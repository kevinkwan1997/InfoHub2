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

  public currentWeather$!: Observable<Weather>;
  public hourlyWeather$!: Observable<WeatherHourlyResponse[]>;
  public selectedDetailedHourly$!: Observable<WeatherHourlyResponse | null>;
  public zipCode: string = '28226' // TODO: make configurable

  public ngOnInit(): void {
    this.currentWeather$ = this.weatherService.getCurrentWeather();
    this.hourlyWeather$ = this.weatherService.getHourlyWeather();
    this.selectedDetailedHourly$ = this.weatherService.getCurrentSelectedDetailedViewObservable()
      .pipe(
        distinctUntilChanged()
      );
  };
}
