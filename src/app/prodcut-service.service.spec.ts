import { TestBed } from '@angular/core/testing';

import { ProdcutServiceService } from './prodcut-service.service';

describe('ProdcutServiceService', () => {
  let service: ProdcutServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdcutServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
