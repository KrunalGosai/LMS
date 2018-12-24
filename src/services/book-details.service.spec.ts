import { TestBed, inject } from '@angular/core/testing';

import { BookDetailsService } from './book-details.service';

describe('BookDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookDetailsService]
    });
  });

  it('should be created', inject([BookDetailsService], (service: BookDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
