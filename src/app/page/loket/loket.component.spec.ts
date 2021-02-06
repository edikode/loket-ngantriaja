import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoketComponent } from './loket.component';

describe('LoketComponent', () => {
  let component: LoketComponent;
  let fixture: ComponentFixture<LoketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
