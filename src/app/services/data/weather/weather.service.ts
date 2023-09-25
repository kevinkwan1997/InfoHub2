import { Injectable } from '@angular/core';
import { WeatherDataTypes, WeatherIndication, WeatherQueryParams, WeatherUrlInfo } from 'src/app/enum/weather';
import { TextService } from '../../text/text.service';
import { HttpService } from '../../http.service';
import { getFirstFrom } from 'src/app/helpers/rxjs-helper';

import { Weather, WeatherHourlyResponse, WeatherIcon, WeatherIconResponse } from 'src/app/interface/data/weather';
import { Initializable } from 'src/app/interface/data/initializable';
import { BehaviorSubject, Observable, ReplaySubject, firstValueFrom, take } from 'rxjs';

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
  private currentWeather$!: BehaviorSubject<Weather>;
  private currentHourlyWeather$: ReplaySubject<WeatherHourlyResponse[]> = new ReplaySubject();
  private currentSelectedDetailedView$: ReplaySubject<WeatherHourlyResponse> = new ReplaySubject();
  private preloadedIcons$: BehaviorSubject<Record<string, any>> = new BehaviorSubject({});

  public async init(): Promise<boolean> {
    const weather = await getFirstFrom(this.getCurrentWeatherDataByZip('28226'));
    const currentIcon = await this.getWeatherIcon(weather.weather[0].icon);
    this.setCurrentWeatherIcon(currentIcon);
    this.currentWeather$ = new BehaviorSubject(weather);

    if (weather?.coord) {
      this.latitude = weather.coord.lat;
      this.longitude = weather.coord.lon;
      const hourlyWeatherUrl = (await getFirstFrom(this.getHourlyDataByZip())).url;
      const hourlyWeather = (await getFirstFrom(this.httpService.get<any>(hourlyWeatherUrl))).hourly;
      // const hourlyWeatherWithIcon = await this.getIconsForHourlyWeather(hourlyWeather);
      this.setCurrentWeather(weather);
      this.setCurrentHourlyWeather(hourlyWeather);
      await this.setPreloadedIcons(hourlyWeather, weather);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  public getCurrentWeather(): Observable<Weather> {
    return this.currentWeather$;
  }

  public getCurrentWeatherValue(): Weather {
    return this.currentWeather$.getValue();
  }

  public getHourlyWeather(): Observable<WeatherHourlyResponse[]> {
    return this.currentHourlyWeather$;
  }

  public getCurrentSelectedDetailedViewObservable(): Observable<WeatherHourlyResponse | null> {
    return this.currentSelectedDetailedView$;
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

  public setCurrentWeather(weather: Weather): void {
    this.currentWeather$.next(weather);
  }

  public setCurrentHourlyWeather(weather: any): void {
    this.currentHourlyWeather$.next(weather);
  }

  public setCurrentSelectedDetailedView(selected: WeatherHourlyResponse): void {
    this.currentSelectedDetailedView$.next(selected);
  }

  public getWeatherIndication(weather: Weather) {
    return <WeatherIndication>weather?.weather[0].main;
  }

  public async getIconsForHourlyWeather(weather: WeatherHourlyResponse[]) {
    return weather.map(async (hour) => {
      const icon: Blob = await this.getWeatherIcon(<WeatherIndication>hour.weather[0].main);
      return {
        ...hour,
        icon,
      }
    })
  }

  public getCurrentWeatherDataByZip(zipCode: string): Observable<Weather> {
    const requestUrl = WeatherUrlInfo.URL_BASE
      + WeatherDataTypes.CURRENT_WEATHER
      + this.textService.replace(WeatherQueryParams.ZIP_US, zipCode)
      + WeatherQueryParams.IMPERIAL_UNIT
      + WeatherQueryParams.APP_ID
      + WeatherUrlInfo.API_KEY
    
    const httpRequest = this.httpService.get<Weather>(requestUrl);
    return httpRequest;
  }

  public getHourlyDataByZip(): Observable<any> {
    const requestUrl = WeatherUrlInfo.URL_BASE
      + WeatherDataTypes.FORECAST_HOURLY
      + this.textService.replace(WeatherQueryParams.LAT, this.latitude.toString())
      + this.textService.replace(WeatherQueryParams.LON, this.longitude.toString())
      + WeatherQueryParams.EXCLUDE_CURRENT
      + WeatherQueryParams.IMPERIAL_UNIT
      + WeatherQueryParams.APP_ID
      + WeatherUrlInfo.API_KEY

    const httpRequest = this.httpService.getBlob(requestUrl);
    return httpRequest;
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
      case WeatherIndication.FOG:
        bgUrl += 'fogfoot.jpg';
        break;
    }
  
    return bgUrl;
  }

  public async getWeatherIcon(iconId: string): Promise<any> {
    let requestUrl = WeatherUrlInfo.IMG_URL_BASE.toString() + iconId + '.png';
    const httpRequest = this.httpService.getBlob(requestUrl);
    const result = (await getFirstFrom<WeatherIconResponse>(httpRequest)).body;
    const image = this.httpService.getImageFromBlob(result)

    return image;
  }

  public getPreloadedIcon(indication: WeatherIndication): any {
    const icons = this.preloadedIcons$.getValue();
    return icons[indication];
  }

  private async setPreloadedIcons(hourlyWeather: WeatherHourlyResponse[], currentWeather: Weather): Promise<void> {
    let existing: Record<string, any> = {};
    for (const weather of hourlyWeather) {
      const indication: string = weather.weather[0].main;
      if (!existing[indication]) {
        existing[indication] = await this.getWeatherIcon(weather.weather[0].icon);
      }
    }
    const currentWeatherIndication = currentWeather.weather[0].main
    if (!existing[currentWeatherIndication]) {
      existing[currentWeatherIndication] = await this.getWeatherIcon(currentWeather.weather[0].icon);
    }
    this.preloadedIcons$.next(existing);
  }
}
