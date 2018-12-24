import { TestBed, inject } from '@angular/core/testing';

import { OginRoutGuardService } from './ogin-rout-guard.service';

describe('OginRoutGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OginRoutGuardService]
    });
  });

  it('should be created', inject([OginRoutGuardService], (service: OginRoutGuardService) => {
    expect(service).toBeTruthy();
  }));
});
