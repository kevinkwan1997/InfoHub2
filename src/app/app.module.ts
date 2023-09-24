import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { WeatherComponent } from './components/weather/weather.component';
import { MenuComponent } from './components/menu/menu.component';
import { NewsComponent } from './components/news/news.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { KtdGridModule } from '@katoid/angular-grid-layout';
import { MenuOptionsComponent } from './components/menu/menu-options/menu-options.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './components/main-page/main-page.component';
import { QuickAccessComponent } from './components/main-page/quick-access/quick-access.component';
import { QuickAccessButtonsComponent } from './components/main-page/quick-access/quick-access-buttons/quick-access-buttons.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalComponentComponent } from './components/modal/modal-component/modal-component.component';
import { MusicComponent } from './components/music/music.component';
import { FullWeatherComponent } from './components/weather/full-weather/full-weather.component';
import { ClockComponent } from './components/clock/clock.component';
import { AboutComponent } from './components/about/about.component';
import { ModalDirective } from './directive/modal.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WeatherComponent,
    MenuComponent,
    NewsComponent,
    TaskListComponent,
    MenuOptionsComponent,
    MainPageComponent,
    QuickAccessComponent,
    QuickAccessButtonsComponent,
    ModalComponent,
    ModalComponentComponent,
    MusicComponent,
    FullWeatherComponent,
    ClockComponent,
    AboutComponent,
    ModalDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    KtdGridModule,
    BrowserAnimationsModule,
  ],
  exports: [
    ModalDirective,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
