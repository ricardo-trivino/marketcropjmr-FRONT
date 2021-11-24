import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposDocComponent } from './tipos-doc.component';

describe('TiposDocComponent', () => {
  let component: TiposDocComponent;
  let fixture: ComponentFixture<TiposDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
