import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'degrees'
})
export class DegreesPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return `${value} deg`;
  }

}
