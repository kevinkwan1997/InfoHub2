import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ArticlesByCategory } from 'src/app/interface/data/news';

@Component({
  selector: 'news-categorized',
  templateUrl: './news-categorized.component.html',
  styleUrls: ['./news-categorized.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsCategorizedComponent {
  @Input() public articlesByCategory: ArticlesByCategory[] | null = [];
}
