import { TestBed } from '@angular/core/testing';

import { ProductRequestServiceService } from './product-request-service.service';

describe('ProductRequestServiceService', () => {
  let service: ProductRequestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductRequestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
