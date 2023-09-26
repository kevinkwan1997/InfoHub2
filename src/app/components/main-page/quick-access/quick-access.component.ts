import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QuickAccessButtonConfig } from 'src/app/interface/components/quick-access-button.config';
import { NewsComponent } from '../../modal/routes/news/news.component';
import { MusicComponent } from '../../modal/routes/music/music.component';

import { ClockComponent } from '../../clock/clock.component';
import { AboutComponent } from '../../modal/routes/about/about.component';
import { TaskListComponent } from '../../modal/routes/task-list/task-list.component';
import { FullWeatherComponent } from '../../modal/routes/full-weather/full-weather.component';

@Component({
  selector: 'quick-access',
  templateUrl: './quick-access.component.html',
  styleUrls: ['./quick-access.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickAccessComponent {
  constructor() {}

  public quickAccessConfigs: QuickAccessButtonConfig[] = [
    {
      icon: 'newspaper',
      subtext: 'News',
      component: NewsComponent,
    },
    {
      icon: 'headphones',
      subtext: 'Music',
      component: MusicComponent,
      inputs: {
        title: 'Music',
      }
    },
    {
      icon: 'cloudy_snowing',
      subtext: 'Weather',
      component: FullWeatherComponent,
    },
    {
      icon: 'punch_clock',
      subtext: 'Clock',
      component: ClockComponent,
    },
    {
      icon: 'book',
      subtext: 'About',
      component: AboutComponent,
    },
    {
      icon: 'newspaper',
      subtext: 'Tasks',
      component: TaskListComponent,
    },
  ]
}
