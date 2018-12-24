import { TestBed, inject } from '@angular/core/testing';

import { BookAddingService } from './book-adding.service';

describe('BookAddingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookAddingService]
    });
  });

  it('should be created', inject([BookAddingService], (service: BookAddingService) => {
    expect(service).toBeTruthy();
  }));
});
