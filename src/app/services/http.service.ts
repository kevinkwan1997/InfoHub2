import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { Observable, map, take, of, catchError } from 'rxjs';
import { getValue } from '../helpers/rxjs-helper';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
    ) {}

  public async get<T>(url: string): Promise<T> { // TODO: CONFIGURE FOR OPTIONS
      let result: T;
      try {
        const responseObservable = this.http.get<T>(url);
        result = await getValue(responseObservable);
      } catch(error) {
        throw new Error(`Http request failed fetching data of type ${<T>{}}`);
      }
      return result;
  }

  public async getBlob(url: string): Promise<any> {
    const responseObservable = this.http.get(url, { observe: 'response', responseType: 'blob' });
    let response;
    try {
      response = await getValue(responseObservable);
    } catch(error) {
      throw new Error(`Http request failed fetching Blob`);
    }
    return response;
  }

  public getImageFromBlob(image: Blob) {
    const unsafeImageUrl = URL.createObjectURL(image);
    const imageUrl = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
    return imageUrl;
  }

  public getDataFromBlob(blob: Blob) {
    const unsafeImageUrl = URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustHtml(unsafeImageUrl);
  }

  public async blobToImageUrl(blob: Blob): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!blob) {
        reject();
      }
      try {
        const unsafeImageUrl = URL.createObjectURL(blob);
        if (unsafeImageUrl) {
          resolve(this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl))
        }
      } catch(error) {
        reject();
      }
    })
  }

  public async getImageUrl(url: string): Promise<SafeUrl> {
    return this.getBlob(url)
      .then((response) => this.blobToImageUrl(response?.body))
      .then((url) => url.changingThisBreaksApplicationSecurity)
      .catch((error) => {
        throw new Error('Failed to fetch image url...');
      })
  }

  public handleHttpError(error: any, caught: Observable<any>) {
    console.log(error);
    return of(null);
  }
}
