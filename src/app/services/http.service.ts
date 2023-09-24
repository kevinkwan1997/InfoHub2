import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
    ) {}

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(url); // TODO: configure for options
  }

  public getBlob(url: string): Observable<any> {
    return this.http.get(url, { observe: 'response', responseType: 'blob' });
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
}
