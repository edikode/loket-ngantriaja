import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilihJadwalComponent } from './pilih-jadwal.component';

describe('PilihJadwalComponent', () => {
  let component: PilihJadwalComponent;
  let fixture: ComponentFixture<PilihJadwalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PilihJadwalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PilihJadwalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
