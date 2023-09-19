import { Injectable } from '@angular/core';
import { Initializable } from 'src/app/interface/data/initializable';

@Injectable({
  providedIn: 'root'
})
export class NewsService implements Initializable {
  constructor() { }

  public async init(): Promise<boolean> {
    return Promise.resolve(false);
  }
}
