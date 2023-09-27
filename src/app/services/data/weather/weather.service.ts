import { Injectable } from '@angular/core';
import { WeatherDataTypes, WeatherIndication, WeatherQueryParams, WeatherUrlInfo } from 'src/app/enum/weather';
import { TextService } from '../../text/text.service';
import { HttpService } from '../../http.service';
import { getFirstFrom } from 'src/app/helpers/rxjs-helper';

import { Weather, WeatherHourlyResponse, WeatherIconResponse } from 'src/app/interface/data/weather';
import { Initializable, InitializableReturnValue } from 'src/app/interface/data/initializable';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

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
  // private sunriseAndsunsetCalculation!: { sunrise: string, sunset: string };

  private currentWeatherIcon$: ReplaySubject<any> = new ReplaySubject();
  private currentWeather$!: BehaviorSubject<Weather>;
  private currentHourlyWeather$!: BehaviorSubject<WeatherHourlyResponse[]>;
  private currentSelectedDetailedView$: ReplaySubject<WeatherHourlyResponse> = new ReplaySubject();
  private preloadedIcons$: BehaviorSubject<Record<string, any>> = new BehaviorSubject({});

  public async init(): Promise<InitializableReturnValue> {
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
      this.currentHourlyWeather$ = new BehaviorSubject(hourlyWeather);
      this.setCurrentSelectedDetailedView(hourlyWeather[0]);
      // this.createColorMap(weather); // TODO: Color map for hourly weather
      await this.setPreloadedIcons(hourlyWeather, weather);
      return Promise.resolve({
        serviceName: WeatherService.name,
        status: true,
      });
    }
    return Promise.resolve({
      serviceName: WeatherService.name,
      status: false,
    });
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

  public getHourlyWeatherValue(): WeatherHourlyResponse[] {
    return this.currentHourlyWeather$.getValue();
  }

  public getCurrentSelectedDetailedViewObservable(): Observable<WeatherHourlyResponse> {
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
    return weather?.weather[0].main;
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
  // private createColorMap(weather: Weather) {
  //   const colorMapping: { name: string, value: string }[] = [
  //     { name: 'hourly-gradient-morning', value: '#166B96' },
  //     { name: 'hourly-gradient-morning-afternoon', value: '#388bb4' },
  //     { name: 'hourly-gradient-afternoon', value: '#84D6FF' },
  //     { name: 'hourly-gradient-afternoon-evening', value: '#5e91aa' },
  //     { name: 'hourly-gradient-evening', value: '#CB6D00' },
  //     { name: 'hourly-gradient-evening-midnight', value: '#965000' },
  //     { name: 'hourly-gradient-midnight', value: '#1A1914' },
  //     { name: 'hourly-gradient-midnight-morning', value: '#242c41' },
  //   ]
  //   const sunrise =new Date(weather.sys.sunrise * 1000).getHours();
  //   const sunset = new Date(weather.sys.sunset * 1000).getHours();

  //   let colorMap: Record<string, string> = {};
  //   const sunlightPercentageToDay = Math.round(((sunset - sunrise) / 24) * 100) / 100;
  //   console.log(sunlightPercentageToDay);
  //   for (const map of colorMapping) {

  //   }
  // }
}
