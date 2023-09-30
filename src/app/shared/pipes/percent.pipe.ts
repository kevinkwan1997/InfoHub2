import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percent'
})
export class PercentPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return `${value}%`;
  }

}
