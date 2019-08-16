import { TestBed } from '@angular/core/testing';

import { InfiniteScrollerService } from './infinite-scroller.service';

describe('InfiniteScrollerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InfiniteScrollerService = TestBed.get(InfiniteScrollerService);
    expect(service).toBeTruthy();
  });
});
