import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(timestamp: number, ...args: unknown[]): unknown {
    const date = new Date(timestamp * 1000);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const dateTime = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    
    return dateTime + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  }

}
