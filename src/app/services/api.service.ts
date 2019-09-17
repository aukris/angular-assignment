import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  fetch({url, params}: Record<string, any>): Observable<any> {
    const endpoint = `${environment.apiBase}/${url}`;
    return this.http.get(endpoint, { params });
  }
}
