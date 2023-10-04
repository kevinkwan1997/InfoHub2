import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ModalComponent } from 'src/app/interface/components/modal.interface';

import { BehaviorSubject, Observable, combineLatest, distinctUntilChanged, map } from 'rxjs';
import { NewsService } from 'src/app/services/data/news/news.service';
import { Article, ArticleConfig } from 'src/app/interface/data/news';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements ModalComponent, OnInit {
  constructor(
    private newsService: NewsService,
  ) {
  }
  @Input() public title!: string;
  public headlineArticles$!: Observable<Article[]>;
  public bannerArticle$!: Observable<ArticleConfig>;
  public bannerIndex$: BehaviorSubject<number> = new BehaviorSubject(0);
  public numberToLoad$: BehaviorSubject<number> = new BehaviorSubject(9);

  public ngOnInit(): void {
    this.headlineArticles$ = combineLatest([this.newsService.getHeadlineArticles(), this.numberToLoad$])
      .pipe(
          distinctUntilChanged(),
          map(([articles, numberToLoad]) => {
            const reduced = articles.sort(() => 0.5 - Math.random()).slice(0, numberToLoad);
            return reduced;
          })
        );
      this.bannerArticle$ = combineLatest([
        this.newsService.getBannerConfigs(),
        this.bannerIndex$
      ])
        .pipe(
          map(([articleConfig, bannerIndex]) => {
            return articleConfig[bannerIndex];
          })
        )
    }

  public forward(): void{
    const current = this.bannerIndex$.getValue();
    if (current === 5) {
      this.bannerIndex$.next(0);
    } else {
      this.bannerIndex$.next(current + 1);
    }

  }

  public back(): void{
    const current = this.bannerIndex$.getValue();
    if (current === 0) {
      this.bannerIndex$.next(5);
    } else {
      this.bannerIndex$.next(current - 1);
    }
  }

  public getImageUrl(urlToImage: string) {
  return this.newsService.getImageUrl(urlToImage);
  }
}
