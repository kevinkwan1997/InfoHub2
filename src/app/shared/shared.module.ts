import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MilesPerHourPipe } from './pipes/miles-per-hour.pipe';
import { RoundToWholePipe } from './pipes/round-to-whole.pipe';
import { TimePipe } from './pipes/time.pipe';
import { DatePipe } from './pipes/date.pipe';
import { FahrenheitPipe } from './pipes/fahrenheit.pipe';
import { DegreesPipe } from './pipes/degrees.pipe';
import { PercentPipe } from './pipes/percent.pipe';

@NgModule({
  declarations: [
    DatePipe,
    MilesPerHourPipe,
    RoundToWholePipe,
    TimePipe,
    FahrenheitPipe,
    DegreesPipe,
    PercentPipe, 
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DatePipe,
    MilesPerHourPipe,
    RoundToWholePipe,
    TimePipe,
    FahrenheitPipe,
    DegreesPipe,
    PercentPipe,
  ]
})
export class SharedModule { }
