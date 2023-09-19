import { Injectable } from '@angular/core';
import { WeatherService } from '../data/weather/weather.service';
import { NewsService } from '../data/news/news.service';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  constructor(
    private newsService: NewsService,
    private weatherService: WeatherService
  ) {
    this.init();
  }

  private isApplicationLoaded$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public init() {
    const initPromises = [
      this.newsService.init(),
      this.weatherService.init(),
    ];

    Promise.all(initPromises).then(() => {
      this.isApplicationLoaded$.next(true);
    })
  }

  public isApplicationLoaded(): Observable<boolean> {
    return this.isApplicationLoaded$;
  }
}
