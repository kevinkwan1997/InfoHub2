import { Injectable } from '@angular/core';
import { Initializable, InitializableReturnValue } from 'src/app/interface/data/initializable';
import { LogService } from '../../log.service';
import { HeadlineResponse } from 'src/app/interface/data/news';
import { HttpService } from '../../http.service';
import { NewsQueryParams, NewsUrlInfo } from 'src/app/enum/news';
import { TextService } from '../../text/text.service';
import { getFirstFrom } from 'src/app/helpers/rxjs-helper';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService implements Initializable {
  constructor(
    private httpService: HttpService,
    private logService: LogService,
    private textService: TextService,
  ) { }

  public headline$!: BehaviorSubject<HeadlineResponse>

  public async init(): Promise<InitializableReturnValue> {
    return this.getHeadlines()
      .then((headline: HeadlineResponse) => {
        this.headline$ = new BehaviorSubject(headline);
        return Promise.resolve({
          serviceName: NewsService.name,
          status: true,
        });
      })
  }

  public getHeadlines(): Promise<HeadlineResponse> {
    return new Promise((resolve, reject) => {
      try {
        const requestUrl = NewsUrlInfo.BASE_URL
          + NewsQueryParams.HEADLINES
          + this.textService.replace(NewsQueryParams.COUNTRY, 'us')
          + NewsQueryParams.KEY;

        const result = getFirstFrom(this.httpService.get<HeadlineResponse>(requestUrl));
        resolve(result);
      } catch(error) {
        reject(error);
      }
    })
  }
}
