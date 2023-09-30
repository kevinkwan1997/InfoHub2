import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ModalComponent } from 'src/app/interface/components/modal.interface';
import { ModalService } from 'src/app/services/application/modal.service';

import { Observable, map } from 'rxjs';
import { NewsService } from 'src/app/services/data/news/news.service';
import { Article, HeadlineResponse } from 'src/app/interface/data/news';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements ModalComponent, OnInit {
  constructor(
    private modalService: ModalService,
    private newsService: NewsService,
  ) {
  }
  @Input() public title!: string;
  public headlineArticles$!: Observable<Article[]>;
  public bannerArticles$!: Observable<Article[]>;

  public ngOnInit(): void {
    this.headlineArticles$ = this.newsService.getHeadlineArticles();
    this.bannerArticles$ = this.newsService.getBannerArticles();
  }
}
