import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersSearchComponent } from './providers-search.component';

describe('ProvidersSearchComponent', () => {
  let component: ProvidersSearchComponent;
  let fixture: ComponentFixture<ProvidersSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvidersSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvidersSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
