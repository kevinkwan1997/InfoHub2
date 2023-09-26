import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'milesPerHour'
})
export class MilesPerHourPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return value + ' mph';
  }

}
