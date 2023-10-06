import { Injectable } from '@angular/core';
import { WeatherService } from '../data/weather/weather.service';
import { NewsService } from '../data/news/news.service';

import { BehaviorSubject, Observable } from 'rxjs';
import { AssetService } from '../data/asset/asset.service';
import { LogService } from '../log.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  constructor(
    private newsService: NewsService,
    private weatherService: WeatherService,
    private assetService: AssetService,
    private logService: LogService,
  ) {
    this.init();
  }

  private isApplicationLoaded$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private documentClickedTarget$: BehaviorSubject<any> = new BehaviorSubject(null);

  public async init() {
    const initPromises = [
      this.newsService,
      this.weatherService,
      this.assetService,
    ];

    for (const service of initPromises) {
      const result = await service.init();
      this.logService.info(result.serviceName, ' Finished initializing');
    }
    this.isApplicationLoaded$.next(true);
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
