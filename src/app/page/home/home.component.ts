import { Component, OnInit } from '@angular/core';
import { LoketService } from '../../services/loket.service';

import * as _dateformat from 'dateformat';
import * as Recta from 'recta';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogErrorComponent } from 'src/app/components/dialog-error/dialog-error.component';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [],
})
export class HomeComponent implements OnInit {
  dataJson: any;
  dataUser: any;
  dataMitra: any;
  dataLoket: any;
  jml_tiketTotal: number = 0;
  jml_tiketBlmDilayani: number = 0;

  currentDate = new Date();
  filterDate = _dateformat(this.currentDate, 'ddmmyyyy');

  printer = new Recta(4228560628, 1811);

  constructor(
    private authService: AuthService,
    private loketService: LoketService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.openPrinter();

    this.dataJson = localStorage.getItem('userData');
    this.dataUser = JSON.parse(this.dataJson);
    this.getMitra(this.dataUser.id);
  }

  getMitra(userId: string) {
    this.loketService.getMitra(userId).subscribe((res: any) => {
      if (res.length) {
        this.dataMitra = res[0];
      }

      this.getLoket(this.dataMitra.id);
    });
  }

  getLoket(mitraId: string) {
    this.loketService.getLoket(mitraId).subscribe((res: any) => {
      if (res.length) {
        this.dataLoket = res;
      }
    });
  }

  getNoAntrean(loketId: string) {
    return new Promise((resolve) => {
      this.loketService.getAntreanNow(loketId).subscribe((res: any) => {
        if (res.length) {
          resolve(res[0]);
        } else {
          let data = {
            total: 0,
          };
          resolve(data);
        }
      });
    });
  }

  getAntrean(loket: any, mitra: any) {
    this.getNoAntrean(loket.id).then((res: any) => {
      console.log(res);
      let kuota = loket.data.kuota_antrian;
      let service_code = loket.data.service_code;
      let no_urut = res.total;

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
          // code_antrean: '123456789012',
          code_antrean: 'ACD-1232',
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
          // code_antrean: '123456789012',
          code_antrean: 'ABC-1234',
        };
        this.print(dataPrint);
      }
    });
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
      .barcode('CODE128', data.code_antrean)
      .text('')
      .mode('A', false, false, false, false)
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

  pad(no_antrian: string, kuota: number, service_code: string) {
    no_antrian = no_antrian.toString();
    while (no_antrian.length < kuota) no_antrian = '0' + no_antrian;
    return service_code + no_antrian;
  }

  logout() {
    this.authService.logout();
  }
}
