import { Injectable } from '@angular/core';
import { WeatherDataTypes, WeatherQueryParams, WeatherUrlInfo } from 'src/app/enum/weather';
import { TextService } from '../../text/text.service';
import { HttpService } from '../../http.service';

import { Observable, map, take } from 'rxjs';
import { Weather } from 'src/app/interface/data/weather';
import { Initializable } from 'src/app/interface/data/initializable';

@Injectable({
  providedIn: 'root'
})
export class WeatherService implements Initializable {
  constructor(
    private httpService: HttpService,
    private textService: TextService,
  ) {}

  private latitude!: number;
  private longitude!: number;

  public getCurrentWeatherDataByZip(zipCode: string): Observable<Weather> {
    const requestUrl = WeatherUrlInfo.URL_BASE
      + WeatherDataTypes.CURRENT_WEATHER
      + this.textService.replace(WeatherQueryParams.ZIP_US, zipCode)
      + WeatherQueryParams.APP_ID
      + WeatherUrlInfo.API_KEY
    return this.httpService.get<Weather>(requestUrl);
  }

  public getHourlyDataByZip(): Observable<any> {
    const requestUrl = WeatherUrlInfo.URL_BASE
      + WeatherDataTypes.FORECAST_HOURLY
      + this.textService.replace(WeatherQueryParams.LAT, this.latitude.toString())
      + this.textService.replace(WeatherQueryParams.LON, this.longitude.toString())
      + WeatherQueryParams.EXCLUDE_CURRENT
      + WeatherQueryParams.APP_ID
      + WeatherUrlInfo.API_KEY
    return this.httpService.get(requestUrl);
  }

  public getLatitude(): number {
    return this.latitude;
  }

  public getLongitude(): number {
    return this.longitude;
  }

  public async init(): Promise<boolean> {
    const weather = await this.getCurrentWeatherDataByZip('28226')
      .pipe(take(1))
      .toPromise();

    if (weather?.coord) {
      this.latitude = weather.coord.lat;
      this.longitude = weather.coord.lon;
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }
}
