import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  public get<T>(url: string, config?: any): Observable<T> {
    return this.http.get<T>(url); // TODO: configure for options
  }
}
