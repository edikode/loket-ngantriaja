import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogErrorComponent } from './components/dialog-error/dialog-error.component';
import * as Recta from 'recta';
import { ConnectionService } from 'ng-connection-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'mobile-ngantriaja';
  printer = new Recta(4228560628, 1811);

  status = 'ONLINE';
  isConnected = true;

  constructor(
    public dialog: MatDialog,
    private connectionService: ConnectionService
  ) {}
  ngOnInit() {
    // check connection internet
    this.checkConnection();
  }

  checkConnection() {
    this.connectionService.monitor().subscribe((isConnected) => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = 'ONLINE';
      } else {
        this.status = 'OFFLINE';
        this.openDialog(
          'Anda sedang Offline. periksa kembali koneksi internet anda',
          'koneksi'
        );
      }
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
}
