import { Injectable } from '@angular/core';
import { WeatherService } from '../data/weather/weather.service';
import { NewsService } from '../data/news/news.service';

import { BehaviorSubject, Observable } from 'rxjs';
import { AssetService } from '../data/asset/asset.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  constructor(
    private newsService: NewsService,
    private weatherService: WeatherService,
    private assetService: AssetService,
  ) {
    this.init();
  }

  private isApplicationLoaded$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private documentClickedTarget$: BehaviorSubject<any> = new BehaviorSubject(null);

  public init() {
    const initPromises = [
      this.newsService.init(),
      this.weatherService.init(),
      this.assetService.init(),
    ];

    Promise.all(initPromises).then(() => {
      this.isApplicationLoaded$.next(true);
    })
  }

  public isApplicationLoaded(): Observable<boolean> {
    return this.isApplicationLoaded$;
  }

  public getDocumentClickedTarget(): Observable<any> {
    return this.documentClickedTarget$;
  }

  public setDocumentClickedTarget$(event: Event) {
    this.documentClickedTarget$.next(event);
  }
}
