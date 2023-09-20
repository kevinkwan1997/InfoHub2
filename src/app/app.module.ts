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
import { MainGridComponent } from './components/views/main-grid/main-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WeatherComponent,
    MenuComponent,
    NewsComponent,
    TaskListComponent,
    MainGridComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    KtdGridModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
