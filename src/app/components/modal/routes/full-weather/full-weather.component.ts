import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { BehaviorSubject, Observable, distinctUntilChanged, tap } from 'rxjs';
import { ActiveModalParams, ModalComponent } from 'src/app/interface/components/modal.interface';
import { Weather, WeatherHourlyResponse } from 'src/app/interface/data/weather';
import { AssetService } from 'src/app/services/data/asset/asset.service';
import { WeatherService } from 'src/app/services/data/weather/weather.service';

@Component({
  selector: 'app-full-weather',
  templateUrl: './full-weather.component.html',
  styleUrls: ['./full-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullWeatherComponent implements ModalComponent, OnInit {
  constructor(
    private assetService: AssetService,
    private weatherService: WeatherService
  ) { }
  @Input() public title!: string;

  public currentWeather$!: Observable<Weather>;
  public hourlyWeather$!: Observable<WeatherHourlyResponse[]>;
  public selectedDetailedHourly$!: Observable<WeatherHourlyResponse | null>;

  public currentBackground!: SafeUrl;
  public zipCode: string = '28226' // TODO: make configurable

  public ngOnInit(): void {
    this.currentWeather$ = this.weatherService.getCurrentWeather();
    this.hourlyWeather$ = this.weatherService.getHourlyWeather();

    const weather = this.weatherService.getCurrentWeatherValue();
    this.selectedDetailedHourly$ = this.weatherService.getCurrentSelectedDetailedViewObservable();
    this.currentBackground = this.assetService.getImageUrl(weather.weather[0].main);
  };

  public setSelected(hourlyWeather: any): void {
    this.weatherService.setCurrentSelectedDetailedView(hourlyWeather);
  }
}
