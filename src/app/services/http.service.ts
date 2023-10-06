import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { Observable, of } from 'rxjs';
import { getValue } from '../helpers/rxjs-helper';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private logService: LogService,
    private sanitizer: DomSanitizer
    ) {}

  public async get<T>(url: string): Promise<T> { // TODO: CONFIGURE FOR OPTIONS
      return await getValue(this.http.get<T>(url));
  }

  public async getBlob(url: string): Promise<SafeUrl> {
    const responseObservable = this.http.get(url, { observe: 'response', responseType: 'blob' });
    const observableValue = await getValue(responseObservable);
    const response = this.getImageFromBlob(observableValue.body);
    if (!response) {
      this.logService.error(HttpService.name, 'Failed to get safeUrl from image');
      throw response;
    }
    return response;
  }

  public getImageFromBlob(image: Blob | null): SafeUrl | null {
    if (!image) {
      return null;
    }
    const unsafeImageUrl = URL.createObjectURL(image);
    const imageUrl = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
    return imageUrl;
  }

  public getDataFromBlob(blob: Blob) {
    const unsafeImageUrl = URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustHtml(unsafeImageUrl);
  }

  public async getImageUrl(url: string): Promise<SafeUrl> {
    return this.getBlob(url)
      .then((url) => url)
      .catch((error) => {
        throw new Error('Failed to fetch image url...');
      })
  }

  public handleHttpError(error: any, caught: Observable<any>) {
    console.log(error);
    return of(null);
  }
}
