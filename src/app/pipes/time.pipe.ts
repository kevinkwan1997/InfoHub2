import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(timestamp: number, ...args: unknown[]): unknown {
    const date = new Date(timestamp * 1000);

    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    const timeArr: string[] = [hour.toString(), min.toString(), sec.toString()]
      .map((time) => {
        if (time.length === 1) {
          return '0' + time;
        }
        return time;
      })

    return timeArr[0] + ':' + timeArr[1] + ':' + timeArr[2];
  }

}
