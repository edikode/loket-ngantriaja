import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConnectionService } from 'ng-connection-service';

@Component({
  selector: 'app-dialog-error',
  templateUrl: './dialog-error.component.html',
  styleUrls: ['./dialog-error.component.scss'],
})
export class DialogErrorComponent implements OnInit {
  status = 'ONLINE';
  isConnected = true;

  constructor(
    public dialogRef: MatDialogRef<DialogErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private connectionService: ConnectionService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    if (this.data.mode == 'koneksi') {
      this.checkConnection();
    }
  }

  reload() {
    window.location.reload();
  }

  checkConnection() {
    this.connectionService.monitor().subscribe((isConnected) => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = 'ONLINE';
        this.dialogRef.close();
      }
    });
  }
}
