import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { apiEndpoints } from "@env/environment";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  getPhotos(page: number) {
    return this.http.get<{success: boolean, result: Photo[]}>(apiEndpoints.photos, {params: {page: page.toString()}})
      .pipe(
        map(res => ({page, photos: res.success ? res.result : []}))
      );
  }
}

export interface Photo {
  albumId: number;
  id: number;
  url: string;
  thumbnailUrl: string;
  title: string;
}
