import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    protected http: HttpClient
  ) { }

  // GET API call
  getApi(path: string, headers?: HttpHeaders, params?: HttpParams): Observable<any> {
    return this.http.get<null>(`${path}`, {
      headers,
      params,
      observe: 'response'
    });
  }

  // POST API call
  postApi(path: string, requestObj: any, headers?: any): Observable<any> {
    return this.http.post<null>(`${path}`, requestObj, {
      headers,
      observe: 'response'
    });
  }
}
