import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(url); // TODO: configure for options
  }

  public getBlob(url: string): Observable<any> {
    return this.http.get(url, { observe: 'response', responseType: 'blob' });
  }
}
