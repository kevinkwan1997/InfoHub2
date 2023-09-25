import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundToWhole'
})
export class RoundToWholePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return Math.round(value);
  }

}
