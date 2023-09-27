import { Injectable } from '@angular/core';
import { Initializable, InitializableReturnValue } from 'src/app/interface/data/initializable';

@Injectable({
  providedIn: 'root'
})
export class NewsService implements Initializable {
  constructor() { }

  public async init(): Promise<InitializableReturnValue> {
    return Promise.resolve({
      serviceName: NewsService.name,
      status: true,
    });
  }
}
