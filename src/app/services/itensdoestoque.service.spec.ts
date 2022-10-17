import { TestBed } from '@angular/core/testing';

import { ItensdoestoqueService } from './itensdoestoque.service';

describe('ItensdoestoqueService', () => {
  let service: ItensdoestoqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItensdoestoqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
