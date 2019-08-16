import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PhotoService, Photo } from '../../service/photo/photo.service';

import { map, switchMap, scan } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { InfiniteScrollerService } from '../../service/infiniteScroller/infinite-scroller.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotosComponent implements OnInit {
  results$: Observable<Photo[]>;

  constructor(private photoService: PhotoService, private infiniteLoader: InfiniteScrollerService) { 
    this.results$ = this.infiniteLoader.getPageNumberObservable(80, 60)
    .pipe(
      switchMap(page => this.photoService.getPhotos(page)),
      scan((acc: Photo[][], res: {page: number, photos: Photo[]}) => {
        acc[res.page] = res.photos;
        return acc;
      }, []),
      map(itemsMap => itemsMap.reduce((prev, curr) => [...prev, ...(curr || [])], []))
    );
  }

  trackByFn(i, photo: Photo) {
    return photo.id;
  }
  ngOnInit() {
  }

}
