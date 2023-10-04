import { Injectable } from '@angular/core';
import { Initializable, InitializableReturnValue } from 'src/app/interface/data/initializable';
import { LogService } from '../../log.service';
import { Article, BannerConfig, HeadlineResponse } from 'src/app/interface/data/news';
import { HttpService } from '../../http.service';
import { NewsQueryParams, NewsUrlInfo } from 'src/app/enum/news';
import { TextService } from '../../text/text.service';

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
  public bannerConfigs$!: BehaviorSubject<BannerConfig[]>;

  public async init(): Promise<InitializableReturnValue> {
    return this.requestHeadlines()
      .then((headline: HeadlineResponse) => this.initHeadline(headline))
      .then((articles: Article[]) => this.getRandomBannerArticles(articles))
      .then((articles: Article[]) => this.getImageUrls(articles))
      .then((bannerConfigs) => {
        this.bannerConfigs$ = new BehaviorSubject(bannerConfigs);
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

        const result = this.httpService.get<HeadlineResponse>(requestUrl);
        resolve(result);
      } catch(error) {
        reject(error);
      }
    })
  }

  public getImageUrls(articles: Article[]): Promise<BannerConfig[]> {
    return new Promise((resolve, reject) => {
      let urls: Promise<BannerConfig>[] = [];
      articles.forEach((article) => {
        try {
          const urlPromise = this.getImage(article.urlToImage)
            .then((imageUrl) => {
              if (!imageUrl) {
                return <BannerConfig>{
                  article
                };
              }
              return <BannerConfig>{
                article,
                imageUrl
              }
            })
          urls.push(urlPromise);
        } catch(error) {
          this.logService.error(NewsService.name, 'Failed to fetch banner image', error);
        }
      })
      Promise.all(urls).then((urls) => resolve(urls));
    })
  }

  public getImages(articles: Article[]): Promise<BannerConfig[]> {
    return new Promise((resolve, reject) => {
      const bannerConfigs: BannerConfig[] = articles.map((article: Article) => {
        const img = this.getImage(article.urlToImage);
        return {
          article,
          imageUrl: img
        }
      })
      resolve(bannerConfigs)
    })
  }

  public getRandomBannerArticles(articles: Article[]): Promise<Article[]> {
    return new Promise((resolve, reject) => {
      const output: Article[] = [];
      const maxArticles = 6;
      for (let i = 0; i < maxArticles; i++) {
        let random = Math.floor(Math.random() * articles.length);
        output.push(articles[random]);
      }
      resolve(output);
    })
  }

  public initHeadline(headline: HeadlineResponse): Promise<Article[]> {
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

  public getBannerConfigs(): Observable<BannerConfig[]> {
    return this.bannerConfigs$.asObservable()
      .pipe(
        map((articles) => {
          return articles.filter((article) => !!article.imageUrl)
        })
      );
  }

  public getImage(urlToImage: string): Promise<SafeUrl | null> {
    if (!urlToImage) {
      return Promise.resolve(null);
    }
    return this.httpService.getImageUrl(urlToImage);
  }

  public getImageUrl(urlToImage: string) {
    return this.httpService.getBlob(urlToImage);
  }
}
