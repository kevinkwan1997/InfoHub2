import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { WeatherComponent } from './components/weather/weather.component';
import { MenuComponent } from './components/menu/menu.component';
import { KtdGridModule } from '@katoid/angular-grid-layout';
import { MenuOptionsComponent } from './components/menu/menu-options/menu-options.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './components/main-page/main-page.component';
import { QuickAccessComponent } from './components/main-page/quick-access/quick-access.component';
import { QuickAccessButtonsComponent } from './components/main-page/quick-access/quick-access-buttons/quick-access-buttons.component';
import { ModalModule } from './components/modal/modal.module';
import { ApplicationService } from './services/application/application.service';
import { ModalService } from './services/application/modal.service';
import { LogService } from './services/log.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WeatherComponent,
    MenuComponent,
    MenuOptionsComponent,
    MainPageComponent,
    QuickAccessComponent,
    QuickAccessButtonsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    KtdGridModule,
    BrowserAnimationsModule,
    ModalModule,
  ],
  providers: [
    ApplicationService,
    ModalService,
    LogService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
