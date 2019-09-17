import { Component, ViewChild, ElementRef } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';
import {distinct, filter, map, debounceTime, tap, flatMap} from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './gallery.view.html',
  styleUrls: [ './gallery.view.scss' ]
})

export class GalleryComponent {
  @ViewChild('ele') block: ElementRef;
  public list: [] = [];
  private cache = [];
  private pgByManual$ = new BehaviorSubject(1);
  private itemHeight = 100;
  private numberOfItems = 50;
  private pgByScroll$ = fromEvent(window, 'scroll')
    .pipe(
      map(() => {
        // console.log('test scroll');
        return window.scrollY;

        }),
        filter(current =>
      current >=  document.body.clientHeight - window.innerHeight),
        debounceTime(200),
        distinct(),
        map(y => Math.ceil(
      (y + window.innerHeight) / (this.itemHeight * this.numberOfItems)
      )
    )
    );

  private pgByResize$ = fromEvent(window, 'resize')
    .pipe(
      debounceTime(500),
          map(() => {
            return Math.ceil(
              (window.innerHeight + document.body.scrollTop) /
              (this.block.nativeElement.clientHeight * this.numberOfItems / 4)
            );
          })
    );

  private pgToLoad$ = merge(
    this.pgByManual$,
    this.pgByScroll$,
    this.pgByResize$)
    .pipe(
      distinct(),
      filter(page => this.cache[page - 1] === undefined)
    );

  loading = false;

  itemResults$ = this.pgToLoad$
    .pipe(
      tap(() => this.loading = true),
      flatMap((page: number) => {
        return this.api.fetch({url: 'photos', params: {page}})
          .pipe(
            map((resp: any) => {
              return resp.result;
            }),
            tap(resp => {
              this.cache[page - 1] = resp;
              if ( (this.itemHeight * this.numberOfItems * page) < window.innerHeight) {
                this.pgByManual$.next(page + 1);
              }
            })
          );
      }),
      map(() => _.flatMap(this.cache))
    );

  constructor(private api: ApiService) {
  }
}
