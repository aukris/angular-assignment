import { Injectable } from '@angular/core';
import { map, filter, debounceTime, distinct, tap, flatMap, startWith } from 'rxjs/operators';
import { fromEvent, merge } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfiniteScrollerService {
  
  /**
   * 
   * @param triggerThreshold percentage of content seen at which next page number will be fired
   * @param itemHeight height of each item
   * @param itemsPerPage num of items per page
   */
  getPageNumberObservable(triggerThreshold: number, itemHeight: number, itemsPerPage: number = 50) {
    const hasReachedThreshold = (scrollTop) => ((scrollTop + window.innerHeight) / document.body.clientHeight) >= (triggerThreshold/100) 
    const pageToLoad$ = merge(fromEvent(window, "scroll"), fromEvent(window, "resize"))
      .pipe(
          debounceTime(200),
          map(() => document.documentElement.scrollTop),
          filter((y) => {
            return hasReachedThreshold(y);
          }),
          map(y => {
            return Math.ceil(document.body.clientHeight / (itemHeight * itemsPerPage)) + 1;
          }),
          startWith(1),
          distinct(),
      );
    return pageToLoad$;
  }
}
