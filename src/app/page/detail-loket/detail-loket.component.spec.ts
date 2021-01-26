import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLoketComponent } from './detail-loket.component';

describe('DetailLoketComponent', () => {
  let component: DetailLoketComponent;
  let fixture: ComponentFixture<DetailLoketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailLoketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailLoketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
