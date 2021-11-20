import { TestBed } from '@angular/core/testing';

import { ServicioMarketService } from './servicio-market.service';

describe('ServicioMarketService', () => {
  let service: ServicioMarketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioMarketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
