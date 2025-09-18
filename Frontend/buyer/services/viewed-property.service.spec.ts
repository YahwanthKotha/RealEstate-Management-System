import { TestBed } from '@angular/core/testing';

import { ViewedPropertyService } from './viewed-property.service';

describe('ViewedPropertyService', () => {
  let service: ViewedPropertyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewedPropertyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
