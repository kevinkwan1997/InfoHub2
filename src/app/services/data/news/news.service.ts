import { Injectable } from '@angular/core';
import { Initializable, InitializableReturnValue } from 'src/app/interface/data/initializable';
import { LogService } from '../../log.service';
import { Article, BannerConfig, HeadlineResponse } from 'src/app/interface/data/news';
import { HttpService } from '../../http.service';
import { NewsQueryParams, NewsUrlInfo } from 'src/app/enum/news';
import { TextService } from '../../text/text.service';
import { getFirstFrom } from 'src/app/helpers/rxjs-helper';

import { BehaviorSubject, Observable, map } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class NewsService implements Initializable {
  constructor(
    private httpService: HttpService,
    private logService: LogService,
    private textService: TextService,
  ) { }

  public headline$!: BehaviorSubject<HeadlineResponse>;
  public bannerArticles$!: BehaviorSubject<BannerConfig[]>;

  public async init(): Promise<InitializableReturnValue> {
    return this.requestHeadlines()
      .then((headline: HeadlineResponse) => this.initHeadline(headline))
      .then((articles: Article[]) => this.getBannerConfigs(articles))
      .then(() => {
        return Promise.resolve({
          serviceName: NewsService.name,
          status: true,
        });
      })
  }

  public async requestHeadlines(): Promise<HeadlineResponse> {
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

  public async getBannerConfigs(articles: Article[]): Promise<BannerConfig[]> {
    return new Promise((resolve, reject) => {
      const bannerArticles: Article[] = [];
      const maxArticles = 4;
      for (let i = 0; i < maxArticles - 1; i++) {
        let random = Math.floor(Math.random() * articles.length);
        bannerArticles.push(articles[random]);
      }
      const bannerConfig: Promise<SafeUrl>[] = [];
      for(let article of bannerArticles) {
        try {
          const blobPromise = getFirstFrom(this.httpService.getBlob(article.urlToImage))
            .then((blob) => {
              console.log('blob: ', blob.url);
              return this.httpService.getImageFromBlob(blob)
            });
          bannerConfig.push(blobPromise);
        } catch(error) {
          this.logService.error(NewsService.name, 'Failed to fetch banner image', error);
        }
      }

      Promise.all(bannerConfig)
        .then((safeUrls: SafeUrl[]) => {
          console.log(safeUrls);
        });
      resolve([

      ]);
    })
  }

  public async initHeadline(headline: HeadlineResponse): Promise<Article[]> {
    return new Promise((resolve, reject) => {
      this.headline$ = new BehaviorSubject(headline);
      return resolve(headline.articles);
    })
  }

  public getHeadlineArticles(): Observable<Article[]> {
    return this.headline$.asObservable()
      .pipe(
        map((headline: HeadlineResponse) => {
          return headline.articles
        })
      );
  }

  public getBannerArticles(): Observable<Article[]> {
    return this.headline$.asObservable()
      .pipe(
        map((headline: HeadlineResponse) => {
          const output: number[] = [];
          const articles = headline.articles;
          const maxArticles = 4;
          for (let i = 0; i < maxArticles - 1; i++) {
            let random = Math.floor(Math.random() * articles.length);
            if (random in output) {
              random = Math.floor(Math.random() * articles.length);
            }
            output.push(random);
          }
          return [articles[output[0]], articles[output[1]], articles[output[2]], articles[output[3]]]
        })
      )
  }
}
