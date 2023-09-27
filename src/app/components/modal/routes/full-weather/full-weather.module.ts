import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullWeatherComponent } from './full-weather.component';
import { FullWeatherDetailedViewComponent } from './full-weather-detailed-view/full-weather-detailed-view.component';
import { FullWeatherHourlyComponent } from './full-weather-hourly/full-weather-hourly.component';
import { WeatherService } from 'src/app/services/data/weather/weather.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssetService } from 'src/app/services/data/asset/asset.service';

@NgModule({
  declarations: [
    FullWeatherComponent,
    FullWeatherDetailedViewComponent,
    FullWeatherHourlyComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    FullWeatherComponent,
  ],
  providers: [
    AssetService,
    WeatherService,
  ]
})
export class FullWeatherModule { }
