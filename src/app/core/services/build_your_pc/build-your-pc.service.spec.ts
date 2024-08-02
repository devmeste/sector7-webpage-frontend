import { TestBed } from '@angular/core/testing';

import { BuildYourPcService } from './build-your-pc.service';

describe('BuildYourPcService', () => {
  let service: BuildYourPcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildYourPcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
