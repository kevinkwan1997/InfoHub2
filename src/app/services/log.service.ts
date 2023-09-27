import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService { // TODO: MOCK LOGGING STRUCTURE
  constructor() { }

  public log(origin: string, message: string, error?: any) {
    console.log(`log: ${origin} ${message}`);
    if (error) {
      console.log('error: ', error);
    }
  }

  public warn(origin: string, message: string, info?: any) {
    console.warn(`log: ${origin} ${message}`);
    if (info) {
      console.log('warn: ', info);
    }
  }

  public info(origin: string, message: string, info?: any) {
    console.info(`log: ${origin} ${message}`);
    if (info) {
      console.log('info: ', info);
    }
  }

  public error(origin: string, message: string, info?: any) {
    console.error(`log: ${origin} ${message}`);
    if (info) {
      console.log('error: ', info);
    }
  }
}
