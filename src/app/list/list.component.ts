import { Component } from '@angular/core';
import { BehaviorSubject, fromEvent, merge } from 'rxjs';
import { takeUntil, map, filter, distinct, debounceTime, tap, flatMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  cache = [];
  pageByManual$ = new BehaviorSubject(1);
  itemHeight = 60;
  numberOfItems = 50;

  /**
   * PageByScroll$ of list component
   */
  pageByScroll$ = fromEvent(window, 'scroll')
    .pipe(
        map(() => window.scrollY),
        filter(current => current >=  document.body.clientHeight - window.innerHeight),
        debounceTime(200),
        distinct(),
        map(y => Math.ceil((y + window.innerHeight) / (this.itemHeight * this.numberOfItems)))
    );

  /**
   * PageByResize$ of list component
   */
  private pageByResize$ = fromEvent(window, 'resize')
    .pipe(
      debounceTime(200),
        map(_ => Math.ceil(
        (window.innerHeight + document.body.scrollTop) /
        (this.itemHeight * this.numberOfItems)
      ))
    );

  /**
   * PageToLoad$ of list component
   */
  private pageToLoad$ = merge(this.pageByManual$, this.pageByScroll$, this.pageByResize$)
    .pipe(
      distinct(),
      filter(page => this.cache[page - 1] === undefined)
    );

  loading = false;

  /**
   * ItemResults$ of list component
   */
  itemResults$ = this.pageToLoad$
    .pipe(
      tap(_ => this.loading = true),
      flatMap((page: number) => {
        return this.httpClient.get(`http://localhost:5000/api/photos?page=${page}`)
          .pipe(
            map((resp: any) => resp.result),
            tap(resp => {
              this.cache[page - 1] = resp;
              if ((this.itemHeight * this.numberOfItems * page) < window.innerHeight) {
                this.pageByManual$.next(page + 1);
              }
            })
          );
      }),
      map(() => _.flatMap(this.cache))
    );

  constructor(private httpClient: HttpClient) {
  }
}

