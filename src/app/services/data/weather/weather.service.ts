import { Injectable } from '@angular/core';
import { WeatherDataTypes, WeatherIndication, WeatherQueryParams, WeatherUrlInfo } from 'src/app/enum/weather';
import { TextService } from '../../text/text.service';
import { HttpService } from '../../http.service';
import { getFirstFrom } from 'src/app/helpers/rxjs-helper';

import { Weather, WeatherIconResponse } from 'src/app/interface/data/weather';
import { Initializable } from 'src/app/interface/data/initializable';
import { Observable, ReplaySubject } from 'rxjs';

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

  private currentWeatherIcon$: ReplaySubject<any> = new ReplaySubject();

  public async getCurrentWeatherDataByZip(zipCode: string): Promise<Weather> {
    const requestUrl = WeatherUrlInfo.URL_BASE
      + WeatherDataTypes.CURRENT_WEATHER
      + this.textService.replace(WeatherQueryParams.ZIP_US, zipCode)
      + WeatherQueryParams.IMPERIAL_UNIT
      + WeatherQueryParams.APP_ID
      + WeatherUrlInfo.API_KEY
    
    const httpRequest = this.httpService.get<Weather>(requestUrl);
    return await getFirstFrom(httpRequest);
  }

  public async getHourlyDataByZip(): Promise<any> {
    const requestUrl = WeatherUrlInfo.URL_BASE
      + WeatherDataTypes.FORECAST_HOURLY
      + this.textService.replace(WeatherQueryParams.LAT, this.latitude.toString())
      + this.textService.replace(WeatherQueryParams.LON, this.longitude.toString())
      + WeatherQueryParams.EXCLUDE_CURRENT
      + WeatherQueryParams.APP_ID
      + WeatherUrlInfo.API_KEY

    const httpRequest = this.httpService.getBlob(requestUrl);
    return await getFirstFrom(httpRequest);
  }

  public getLatitude(): number {
    return this.latitude;
  }

  public getLongitude(): number {
    return this.longitude;
  }

  public getCurrentWeatherIcon(): Observable<any> {
    return this.currentWeatherIcon$;
  }

  public setCurrentWeatherIcon(icon: any): void {
    this.currentWeatherIcon$.next(icon);
  }

  public async initializeWeatherIcon(weather: WeatherIndication) {
    let requestUrl = WeatherUrlInfo.IMG_URL_BASE.toString();
    switch(weather) {
      case WeatherIndication.CLOUDS:
        requestUrl += '04d.png';
        break;
      case WeatherIndication.CLEAR:
        requestUrl += '01d.png';
        break;
      case WeatherIndication.SNOW:
        requestUrl += '13d.png';
        break;
      case WeatherIndication.RAIN:
        requestUrl += '10d.png';
        break;
      case WeatherIndication.DRIZZLE:
        requestUrl += '09d.png';
        break;
      case WeatherIndication.THUNDERSTORM:
        requestUrl += '11d.png';
        break;
      case WeatherIndication.Fog:
        requestUrl += '50d.png';
        break;
    }

    const httpRequest = this.httpService.getBlob(requestUrl);
    const result = (await getFirstFrom<WeatherIconResponse>(httpRequest)).body;
    this.setCurrentWeatherIcon(this.httpService.getImageFromBlob(result));
  }

  public getBackgroundImage(weather: WeatherIndication) {
    let bgUrl = '/assets/'
    switch(weather) {
      case WeatherIndication.CLOUDS:
        bgUrl += 'cloudfoot.jpg';
        break;
      case WeatherIndication.CLEAR:
        bgUrl += 'sunnybg.jpg';
        break;
      case WeatherIndication.SNOW:
        bgUrl += 'snow.jpg';
        break;
      case WeatherIndication.RAIN:
        bgUrl += 'rainfoot.jpg';
        break;
      case WeatherIndication.DRIZZLE:
        bgUrl += 'rainfoot.jpg';
        break;
      case WeatherIndication.THUNDERSTORM:
        bgUrl += 'thunderfoot.jpg';
        break;
      case WeatherIndication.Fog:
        bgUrl += 'fogfoot.jpg';
        break;
    }
  
    return bgUrl;
  }

  public async init(): Promise<boolean> {
    const weather = await this.getCurrentWeatherDataByZip('28226');
    await this.initializeWeatherIcon(<WeatherIndication>weather.weather[0].main);

    if (weather?.coord) {
      this.latitude = weather.coord.lat;
      this.longitude = weather.coord.lon;
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }
}
