import { Injectable } from '@angular/core';
import { Initializable, InitializableReturnValue } from 'src/app/interface/data/initializable';
import { LogService } from '../../log.service';
import { Article, ArticleConfig, NewsResponse } from 'src/app/interface/data/news';
import { HttpService } from '../../http.service';
import { NewsBaseCategories, NewsQueryParams, NewsUrlInfo } from 'src/app/enum/news';
import { TextService } from '../../text/text.service';

import { BehaviorSubject, Observable, map } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';
import { getValue } from 'src/app/helpers/rxjs-helper';

@Injectable({
  providedIn: 'root'
})
export class NewsService implements Initializable {
  constructor(
    private httpService: HttpService,
    private logService: LogService,
    private textService: TextService,
  ) { }

  public headline$!: BehaviorSubject<NewsResponse>;
  public bannerConfigs$!: BehaviorSubject<ArticleConfig[]>;
  public loadedArticles$!: BehaviorSubject<ArticleConfig[]>;

  public async init(): Promise<InitializableReturnValue> {
    return this.requestHeadlines()
      .then((headline: NewsResponse) => this.initHeadline(headline))
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

  public async requestHeadlines(): Promise<NewsResponse> {
      try {
        const requestUrl = NewsUrlInfo.BASE_URL
          + NewsQueryParams.HEADLINES
          + this.textService.replace(NewsQueryParams.COUNTRY, 'us')
          + NewsQueryParams.KEY;

        const result = this.httpService.get<NewsResponse>(requestUrl);
        return result;
      } catch(error) {
        this.logService.log(NewsService.name, 'Failed to fetch headlines', error);
        throw error;
      }
  }

  public getImageUrls(articles: Article[]): Promise<ArticleConfig[]> {
    let urls: Promise<ArticleConfig>[] = [];
    articles.forEach((article) => {
      try {
        const urlPromise = this.getImage(article.urlToImage)
          .then((imageUrl) => {
            if (!imageUrl) {
              return <ArticleConfig>{
                article
              };
            }
            return <ArticleConfig>{
              article,
              imageUrl
            }
          })
        urls.push(urlPromise);
      } catch(error) {
        this.logService.error(NewsService.name, 'Failed to fetch banner image', error);
      }
    })
    return Promise.all(urls).then((urls) => urls);
  }

  public getRandomBannerArticles(articles: Article[]): Promise<Article[]> {
      const output: Article[] = [];
      const maxArticles = 6;
      for (let i = 0; i < maxArticles; i++) {
        let random = Math.floor(Math.random() * articles.length);
        output.push(articles[random]);
      }
      return Promise.resolve(output);
  }

  public initHeadline(headline: NewsResponse): Promise<Article[]> {
      this.headline$ = new BehaviorSubject(headline);
      return Promise.resolve(headline.articles);
  }

  public getHeadlineArticles(): Observable<Article[]> {
    return this.headline$.asObservable()
      .pipe(
        map((headline: NewsResponse) => {
          return headline.articles
        })
      );
  }

  public getBannerConfigs(): Observable<ArticleConfig[]> {
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

  public async sortArticleCategories(): Promise<NewsResponse[]> {
    const articles: NewsResponse[] = [];
    for (const category of Object.keys(NewsBaseCategories)) {
      let queryArticles;
      try {
        queryArticles = await this.searchArticles(category);
      } catch(error) {
        this.logService.error(NewsService.name, `Failed to query for articles with query ${category}`, error);
      }
      if (queryArticles) {
        articles.push(queryArticles);
      }
    }
    console.log('sorted articles: ', articles);
    return Promise.resolve(articles);
  }

  public async searchArticles(query: string): Promise<NewsResponse> {
    const requestUrl = NewsUrlInfo.BASE_URL
      + NewsQueryParams.EVERYTHING
      + this.textService.replace(NewsQueryParams.QUERY, query)
      + NewsQueryParams.KEY;
    
    const response = await this.httpService.get<NewsResponse>(requestUrl);
    return response;
  }
}
