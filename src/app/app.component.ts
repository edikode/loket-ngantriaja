import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogErrorComponent } from './components/dialog-error/dialog-error.component';
import * as Recta from 'recta';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'mobile-ngantriaja';
  printer = new Recta(4228560628, 1811);

  constructor(public dialog: MatDialog) {}
  ngOnInit() {
    // this.openPrinter();
    this.checkConnection();
  }

  checkConnection() {
    console.log('tes');
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
          'Printer belum terhubung, Periksa kembali koneksi printer anda'
        );
      });
  }

  openDialog(message: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = message;

    const dialogRef = this.dialog.open(DialogErrorComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
