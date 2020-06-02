import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(private http: HttpClient) { }

  get(url){
    return this.http.get(environment.serverURI + url);
  }

  post(url, params){
    return this.http.post(environment.serverURI + url, params);
  }
}
