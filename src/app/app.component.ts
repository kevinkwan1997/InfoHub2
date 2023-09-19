import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { WeatherService } from './services/data/weather/weather.service';
import { Observable, tap, filter } from 'rxjs';
import { Weather } from './interface/data/weather';
import { ApplicationService } from './services/application/application.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private applicationService: ApplicationService,
    private weatherService: WeatherService,
    public injector: Injector
  ) {
    // this.currentWeather = toSignal(this.weatherService.getCurrentWeatherDataByZip('28226'), { injector: this.injector });
  }

  public isApplicationLoaded$!: Observable<boolean>;
  public currentWeather$!: Observable<Weather>;
  public hourlyWeather$!: Observable<any>;

  ngOnInit(): void {
    this.isApplicationLoaded$ = this.applicationService.isApplicationLoaded().pipe(
      tap((isLoaded) => {
        if (isLoaded) {
          this.currentWeather$ = this.weatherService.getCurrentWeatherDataByZip('28226')
          .pipe(
            tap((result) => console.log(result))
          )
          this.hourlyWeather$ = this.weatherService.getHourlyDataByZip()
            .pipe(
              tap((result) => console.log(result))
          );
        }
      })
    )
  }
}
