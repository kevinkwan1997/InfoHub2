import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ModalTabComponent } from './modal-tab/modal-tab.component';
import { ModalComponentComponent } from './modal-component/modal-component.component';
import { AboutComponent } from './routes/about/about.component';
import { MusicComponent } from './routes/music/music.component';
import { NewsComponent } from './routes/news/news.component';
import { TaskListComponent } from './routes/task-list/task-list.component';
import { ModalDirective } from 'src/app/shared/directive/modal.directive';
import { ModalService } from 'src/app/services/application/modal.service';
import { FullWeatherModule } from './routes/full-weather/full-weather.module';
import { RouterModule } from '@angular/router';
import { modalRoutes } from './routes/modal.routes';
import { NewsCategorizedComponent } from './routes/news/news-categorized/news-categorized.component';

@NgModule({
  declarations: [
    AboutComponent,
    ModalComponent,
    ModalTabComponent,
    ModalComponentComponent,
    MusicComponent,
    NewsComponent,
    TaskListComponent,
    ModalDirective,
    NewsCategorizedComponent,
  ],
  imports: [
    CommonModule,
    FullWeatherModule,
    RouterModule.forRoot(modalRoutes),
  ],
  exports: [
    ModalComponent,
  ],
  providers: [
    Location,
    ModalService,
  ]
})
export class ModalModule { }
