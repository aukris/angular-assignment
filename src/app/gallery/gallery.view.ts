import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './gallery.view.html',
  styleUrls: [ './gallery.view.scss' ]
})

export class GalleryComponent {
  public list: [] = [];
  constructor(private api: ApiService) {
    this.getPhotos();
  }

  getPhotos(page = 1): void {
    const url = 'photos';
    const params = {
      page
    };
    this.api.fetch({url, params}).subscribe((data) => {
      this.list = data.result;
    });
  }
}
