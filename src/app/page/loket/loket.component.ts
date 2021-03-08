import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import * as _dateformat from 'dateformat';
import * as Recta from 'recta';
import { DialogErrorComponent } from 'src/app/components/dialog-error/dialog-error.component';
import { LoketService } from 'src/app/services/loket.service';

@Component({
  selector: 'app-loket',
  templateUrl: './loket.component.html',
  styleUrls: ['./loket.component.scss'],
})
export class LoketComponent implements OnInit {
  @Input() dataLoket: any;
  @Input() dataMitra: any;
  tanggal = new Date();
  dayArray: number = this.tanggal.getDay();
  settingAntrean: any;
  statusBuka: boolean = false;

  currentDate = new Date();
  filterDate = _dateformat(this.currentDate, 'yyyymmdd');

  printer = new Recta(4228560628, 1811);
  constructor(private loketService: LoketService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.openPrinter();
    this.getSettingAntrean(this.dataLoket.id);

    if (this.dataLoket.data.waktu[this.dayArray].status) {
      let data_hour_close = this.dataLoket.data.waktu[this.dayArray].tutup;
      let hour_close = data_hour_close.substring(0, 2);

      // check jam tutup
      if (this.tanggal.getHours() >= hour_close) {
        console.log('tutup');
        this.statusBuka = false;
      } else {
        console.log('buka ges');
        this.statusBuka = true;
      }
    } else {
      this.statusBuka = false;
    }
  }

  getSettingAntrean(loketId: string) {
    this.loketService.getAntreanNow(loketId).subscribe((res: any) => {
      if (res.length) {
        this.settingAntrean = res[0];
      } else {
        this.settingAntrean = {
          total: 0,
          current: 0,
        };
      }
    });
  }

  getAntrean(loket: any, mitra: any, setting: any) {
    // jika memenuhi kuota
    console.log('kuota antrean', parseInt(loket.data.kuota_antrian));
    console.log('total', parseInt(setting.total));

    if (
      parseInt(setting.total) < parseInt(loket.data.kuota_antrian) &&
      this.statusBuka
    ) {
      let kuota = loket.data.kuota_antrian;
      let service_code = loket.data.service_code;
      let code = this.loketService.encryptCodeAntrean(service_code);
      let no_urut = setting.total;
      let no_next = setting.total + 1;

      let dataPost = {
        no_antrean: no_urut + 1,
        nama: '',
        umur: '',
        alamat: '',
        tanggal: _dateformat(this.currentDate, 'dd/mm/yyyy'),
        status: 'antre',
        loket_id: loket.id,
      };

      if (no_urut > 0) {
        let id_antrean = this.pad(
          no_urut + 1,
          kuota.toString().length,
          service_code
        );
        let settingDetail = {
          mitra_id: mitra.id,
          id_antrean: id_antrean,
        };
        // create data
        this.loketService.createNewAntrean(dataPost, settingDetail);

        let dataPrint = {
          nama_loket: loket.data.nama_loket,
          alamat_loket: mitra.data.alamat.alamat_lengkap,
          no_antrean: id_antrean,
          belum_dipanggil: setting.total - setting.current + 1,
          // code_antrean: '2021020600010111', //code 93
          code_antrean: this.filterDate + loket.id + code + no_next,
        };

        this.print(dataPrint);
      } else {
        let id_antrean = this.pad('1', kuota.toString().length, service_code);
        let settingDetail = {
          mitra_id: mitra.id,
          id_antrean: id_antrean,
        };

        // create data
        this.loketService.createNewAntrean(dataPost, settingDetail);

        let dataPrint = {
          nama_loket: loket.data.nama_loket,
          alamat_loket: mitra.data.alamat.alamat_lengkap,
          no_antrean: id_antrean,
          belum_dipanggil: 0,
          // code_antrean: '2021020600010111', //code 93
          code_antrean: this.filterDate + loket.id + code + no_next,
        };
        this.print(dataPrint);
      }
    }
  }

  print(data: any) {
    this.printer
      .align('center')
      .mode('A', false, true, true, false)
      .text(data.nama_loket)
      .mode('A', false, false, false, false)
      .text(data.alamat_loket)
      .text('')
      .mode('A', false, false, false, false)
      .text('No. Antrian anda')
      .mode('A', true, true, true, false)
      .text(data.no_antrean)
      .text('')
      .mode('A', true, false, false, false)
      .barcode('CODE93', data.code_antrean)
      .text('')
      .align('left')
      .mode('A', false, false, false, false)
      .text('   ' + _dateformat(this.currentDate, 'dd/mm/yyyy hh:mm:ss'))
      .text('   Jumlah Antrian belum dipanggil : ' + data.belum_dipanggil)
      .align('center')
      .mode('A', false, false, false, false)
      .text('')
      .text('Scan Barcode untuk pantau antrian anda \n lewat aplikasi')
      .text('** Semoga Lekas Sembuh **')
      .text('')
      .text('')
      .text('')
      .cut(true, 0)
      .print();
  }

  openPrinter() {
    this.printer
      .open()
      .then(() => {
        console.log('print ok');
      })
      .catch((e: any) => {
        // Show Error if get an Error
        this.openDialog(
          'Printer belum terhubung, Periksa kembali koneksi printer anda',
          'printer'
        );
      });
  }

  pad(no_antrian: string, kuota: number, service_code: string) {
    no_antrian = no_antrian.toString();
    while (no_antrian.length < kuota) no_antrian = '0' + no_antrian;
    return service_code + no_antrian;
  }

  openDialog(message: string, mode: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let data = {
      message: message,
      mode: mode,
    };
    dialogConfig.data = data;

    const dialogRef = this.dialog.open(DialogErrorComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
