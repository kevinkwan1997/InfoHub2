import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fahrenheit'
})
export class FahrenheitPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return `${value}º`;
  }

}
