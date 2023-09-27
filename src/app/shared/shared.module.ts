import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MilesPerHourPipe } from './pipes/miles-per-hour.pipe';
import { RoundToWholePipe } from './pipes/round-to-whole.pipe';
import { TimePipe } from './pipes/time.pipe';
import { DatePipe } from './pipes/date.pipe';
import { FahrenheitPipe } from './pipes/fahrenheit.pipe';

@NgModule({
  declarations: [
    DatePipe,
    MilesPerHourPipe,
    RoundToWholePipe,
    TimePipe,
    FahrenheitPipe, 
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DatePipe,
    MilesPerHourPipe,
    RoundToWholePipe,
    TimePipe,
    FahrenheitPipe
  ]
})
export class SharedModule { }
