import { Component, OnInit } from '@angular/core';
import * as _dateformat from 'dateformat';

@Component({
  selector: 'app-pilih-jadwal',
  templateUrl: './pilih-jadwal.component.html',
  styleUrls: ['./pilih-jadwal.component.scss'],
})
export class PilihJadwalComponent implements OnInit {
  dateNow = new Date();
  rangeTanggal: string[] = [];
  rangeBulan: string[] = [];

  constructor() {}

  ngOnInit(): void {
    for (let i = 0; i < 7; i++) {
      let tanggalplus = this.dateNow.setDate(this.dateNow.getDate() + 1);
      let tanggal = _dateformat(tanggalplus, 'dd');
      this.rangeTanggal.push(tanggal);
      let bulan = _dateformat(tanggalplus, 'mmm');
      this.rangeBulan.push(bulan);
    }
  }
}
