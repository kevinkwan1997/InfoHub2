import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QuickAccessButtonConfig } from 'src/app/interface/components/quick-access-button.config';
import { ModalService } from 'src/app/services/application/modal.service';
import { NewsComponent } from '../../news/news.component';
import { MusicComponent } from '../../music/music.component';
import { FullWeatherComponent } from '../../weather/full-weather/full-weather.component';
import { ClockComponent } from '../../clock/clock.component';
import { AboutComponent } from '../../about/about.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { ModalComponent } from 'src/app/interface/components/modal.interface';

@Component({
  selector: 'quick-access',
  templateUrl: './quick-access.component.html',
  styleUrls: ['./quick-access.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickAccessComponent {
  constructor(
    private modalService: ModalService,
  ) {}

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
