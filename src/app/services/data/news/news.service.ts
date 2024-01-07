import { Injectable } from '@angular/core';
import { Initializable, InitializableReturnValue } from 'src/app/interface/data/initializable';
import { LogService } from '../../log.service';
import { Article, ArticlesByCategory, ArticleConfig, NewsResponse } from 'src/app/interface/data/news';
import { HttpService } from '../../http.service';
import { NewsBaseCategories, NewsQueryParams, NewsUrlInfo } from 'src/app/enum/news';
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

  public headline$!: BehaviorSubject<NewsResponse>;
  public bannerConfigs$!: BehaviorSubject<ArticleConfig[]>;
  public loadedArticles$!: BehaviorSubject<ArticleConfig[]>;
  public categorizedArticles$: BehaviorSubject<ArticlesByCategory[]> = new BehaviorSubject<ArticlesByCategory[]>([]);

  public observeCategorizedArticles(): Observable<ArticlesByCategory[]> {
    return this.categorizedArticles$.asObservable();
  }

  public previewCategorizedArticles(): Observable<ArticlesByCategory[]> {
    return this.categorizedArticles$.asObservable()
      .pipe(
        map((articles: ArticlesByCategory[]) => {
          return articles.map((articlesByCategory: ArticlesByCategory) => {
            return {
              category: articlesByCategory.category,
              articles: articlesByCategory.articles.slice(0, 10),
            }
          })
        })
      )
  }

  public async init(): Promise<InitializableReturnValue> {
    return this.requestHeadlines()
      .then((headline: NewsResponse) => this.initHeadline(headline))
      .then((articles: Article[]) => this.getRandomBannerArticles(articles))
      .then((articles: ArticleConfig[]) => this.getImageUrls(articles))
      .then((bannerConfigs) => {
        this.bannerConfigs$ = new BehaviorSubject(bannerConfigs);
      })
      .then(() => this.getCategorizedArticles())
      .then((articles: ArticlesByCategory[]) => {
        this.categorizedArticles$.next(articles);
        return Promise.resolve({
          serviceName: NewsService.name,
          status: true,
        });
      })
      .catch((error) => {
        throw new Error(error.message);
      })
  }

  public async requestHeadlines(): Promise<NewsResponse> {
    const requestUrl = NewsUrlInfo.BASE_URL
      + NewsUrlInfo.HEADLINES
      + this.textService.replace(NewsQueryParams.COUNTRY, 'us')
      + NewsQueryParams.KEY;

    return this.httpService.get<NewsResponse>(requestUrl);
  }

  public initHeadline(headline: NewsResponse): Promise<Article[]> {
    this.headline$ = new BehaviorSubject(headline);
    return Promise.resolve(headline.articles);
  }

  public getRandomBannerArticles(articles: Article[]): Promise<ArticleConfig[]> {
    const record: Record<string, Article> = {};
    let maxArticles = 6;
    for (let article of articles) {
      let random = Math.floor(Math.random() * articles.length);
      const articleId = article.source.id;
      if (record[articleId]) {
        maxArticles++;
      } else {
        record[article.source.id] = articles[random];
      }
    }
    const output: ArticleConfig[] = Object.entries(record)
      .map(([id, article]) => ({
        id,
        article,
      }))
    return Promise.resolve(output);
  }

  public async getImageUrls(articleConfigs: ArticleConfig[]): Promise<ArticleConfig[]> {
    const output: ArticleConfig[] = [];
    for (const articleConfig of articleConfigs) {
      const imageUrl = articleConfig.article.urlToImage;
      if (!imageUrl) {
        continue;
      }
      const safeUrl: SafeUrl = await this.httpService.getBlob(imageUrl);
      output.push({
        id: articleConfig.article.source.id,
        article: articleConfig.article,
        imageUrl: safeUrl,
      })
    }
    return output;
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

  public async getCategorizedArticles(): Promise<ArticlesByCategory[]> {
    const articles: ArticlesByCategory[] = [];
    for (const category of Object.keys(NewsBaseCategories)) {
      let queryArticles;
      try {
        queryArticles = (await this.searchArticles(category)).articles;
      } catch(error) {
        this.logService.error(NewsService.name, `Failed to query for articles with query ${category}`, error);
      }
      if (queryArticles) {
        articles.push({
          articles: queryArticles,
          category: category.toLowerCase(),
        });
      }
    }
    console.log(articles);
    return articles;
  }

  public async searchArticles(query: string): Promise<NewsResponse> {
    const requestUrl = NewsUrlInfo.BASE_URL
      + NewsUrlInfo.EVERYTHING
      + this.textService.replace(NewsQueryParams.QUERY, query)
      + NewsQueryParams.KEY;
    
    const response = await this.httpService.get<NewsResponse>(requestUrl);
    return response;
  }
}
