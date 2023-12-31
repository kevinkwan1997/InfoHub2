import { Injectable } from '@angular/core';
import { WeatherDataTypes, WeatherIndication, WeatherQueryParams, WeatherUrlInfo } from 'src/app/enum/weather';
import { TextService } from '../../text/text.service';
import { HttpService } from '../../http.service';

import { BaseWeatherData, Hourly, Weather } from 'src/app/interface/data/weather';
import { Initializable, InitializableReturnValue } from 'src/app/interface/data/initializable';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { LogService } from '../../log.service';
import { SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class WeatherService implements Initializable {
  constructor(
    private logService: LogService,
    private httpService: HttpService,
    private textService: TextService,
  ) {}

  private latitude!: number;
  private longitude!: number;
  // private sunriseAndsunsetCalculation!: { sunrise: string, sunset: string };

  private currentWeatherIcon$: ReplaySubject<any> = new ReplaySubject();
  private currentWeather$!: BehaviorSubject<BaseWeatherData>;
  private currentHourlyWeather$!: BehaviorSubject<Hourly[]>;
  private currentSelectedDetailedView$: ReplaySubject<Hourly> = new ReplaySubject();
  private preloadedIcons$: BehaviorSubject<Record<string, any>> = new BehaviorSubject({});

  public async init(): Promise<InitializableReturnValue> {
    let weather;
    let status = false;
    try {
      weather = await this.getCurrentWeatherDataByZip('28226');
      this.currentWeather$ = new BehaviorSubject(weather);
      if (weather?.coord) {
        this.latitude = weather.coord.lat;
        this.longitude = weather.coord.lon;
      }
    } catch(error) {
      this.logService.error(WeatherService.name, 'Failed to fetch currently weather', error);
      throw error;
    }

    if (weather) {
      try {
        const currentIcon = await this.getWeatherIcon(weather.weather[0].icon);
        this.setCurrentWeatherIcon(currentIcon);
      } catch(error) {
        this.logService.error(WeatherService.name, 'Failed to fetch icon', error);
        throw error;
      }
  
      try {
        const fullWeather = await this.getFullWeatherData();
        this.currentHourlyWeather$ = new BehaviorSubject(fullWeather.hourly);
        this.setCurrentSelectedDetailedView(fullWeather.hourly[0]);
        await this.setPreloadedIcons(fullWeather.hourly, weather);
        status = false;
      } catch(error) {
        this.logService.error(WeatherService.name, 'Failed to fetch icon', error);
        throw error;
      }
    }
    return Promise.resolve({
      serviceName: WeatherService.name,
      status: true,
    });
  }

  public getCurrentWeather(): Observable<BaseWeatherData> {
    return this.currentWeather$;
  }

  public getCurrentWeatherValue(): BaseWeatherData {
    return this.currentWeather$.getValue();
  }

  public getHourlyWeather(): Observable<Hourly[]> {
    return this.currentHourlyWeather$;
  }

  public getHourlyWeatherValue(): Hourly[] {
    return this.currentHourlyWeather$.getValue();
  }

  public getCurrentSelectedDetailedViewObservable(): Observable<Hourly> {
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

  public setCurrentWeather(weather: BaseWeatherData): void {
    this.currentWeather$.next(weather);
  }

  public setCurrentHourlyWeather(weather: any): void {
    this.currentHourlyWeather$.next(weather);
  }

  public setCurrentSelectedDetailedView(selected: Hourly): void {
    this.currentSelectedDetailedView$.next(selected);
  }

  public getWeatherIndication(weather: BaseWeatherData) {
    return weather?.weather[0].main;
  }

  public async getIconsForHourlyWeather(weather: Hourly[]) {
    return weather.map(async (hour) => {
      const icon: SafeUrl = await this.getWeatherIcon(<WeatherIndication>hour.weather[0].main);
      return {
        ...hour,
        icon,
      }
    })
  }

  public async getCurrentWeatherDataByZip(zipCode: string): Promise<BaseWeatherData> {
    const requestUrl = WeatherUrlInfo.URL_BASE_OLD
      + WeatherDataTypes.CURRENT_WEATHER
      + this.textService.replace(WeatherQueryParams.ZIP_US, zipCode)
      + WeatherQueryParams.IMPERIAL_UNIT
      + WeatherQueryParams.APP_ID
      + WeatherUrlInfo.API_KEY
    
    const httpRequest = await this.httpService.get<BaseWeatherData>(requestUrl);
    return httpRequest;
  }

  public async getFullWeatherData(): Promise<Weather> {
    const requestUrl = WeatherUrlInfo.URL_BASE
      + this.textService.replace(WeatherQueryParams.LAT, this.latitude.toString())
      + this.textService.replace(WeatherQueryParams.LON, this.longitude.toString())
      + WeatherQueryParams.IMPERIAL_UNIT
      + WeatherQueryParams.APP_ID
      + WeatherUrlInfo.API_KEY

    const httpRequest = await this.httpService.get<Weather>(requestUrl);
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

  public async getWeatherIcon(iconId: string): Promise<SafeUrl> {
    let requestUrl = WeatherUrlInfo.IMG_URL_BASE.toString() + iconId + '.png';
    const result = await this.httpService.getBlob(requestUrl);
    return result;
  }


  public getPreloadedIcon(indication: WeatherIndication): any {
    const icons = this.preloadedIcons$.getValue();
    return icons[indication];
  }

  private async setPreloadedIcons(hourlyWeather: Hourly[], currentWeather: BaseWeatherData): Promise<void> {
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
