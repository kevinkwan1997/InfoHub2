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

  public async getWeatherIcon(weather: WeatherIndication): Promise<any> {
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
      case WeatherIndication.FOG:
        requestUrl += '50d.png';
        break;
    }
    const httpRequest = this.httpService.getBlob(requestUrl);
    const result = (await getFirstFrom<WeatherIconResponse>(httpRequest)).body;
    const image = this.httpService.getImageFromBlob(result)

    return image;
  }

  public async init(): Promise<boolean> {
    const weather = await getFirstFrom(this.getCurrentWeatherDataByZip('28226'));
    const weatherIndication = this.getWeatherIndication(weather);
    const currentIcon = await this.getWeatherIcon(weatherIndication);
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
      await this.preloadIcons();
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  private async preloadIcons(): Promise<void> {
    const indications = [
      WeatherIndication.FOG,
      WeatherIndication.CLEAR,
      WeatherIndication.CLOUDS,
      WeatherIndication.DRIZZLE,
      WeatherIndication.RAIN,
      WeatherIndication.SNOW,
      WeatherIndication.THUNDERSTORM
    ];
    const icons = {...this.preloadedIcons$.getValue()};
    const promise = new Promise((resolve, reject) => {
      indications.forEach(async (indication) => {
        const icon: any = await this.getWeatherIcon(indication);
        icons[indication] = {
          id: <WeatherIndication>indication,
          image: icon,
        };
        if(Object.keys(icons).length === indications.length) {
          resolve(icons);
        }
      });
    });
    await promise;
    this.preloadedIcons$.next(icons);
  }

  public getPreloadedIcon(indication: WeatherIndication): any {
    const icons = this.preloadedIcons$.getValue();
    return icons[indication].image;
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

  public getWeatherIndication(weather: Weather) {
    return <WeatherIndication>weather?.weather[0].main;
  }
}
