import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextService {
  constructor() {

  }

  public replace(base: string, string: string): string {
    if (!base) {
      return '';
    }
    return base.replace(/{{.*}}/, string);
  }
}
