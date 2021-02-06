import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoketService } from '../../services/loket.service';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogErrorComponent } from 'src/app/components/dialog-error/dialog-error.component';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [],
})
export class HomeComponent implements OnInit, OnDestroy {
  dataJson: any;
  dataUser: any;
  dataMitra: any;
  dataLoket: any;

  constructor(
    private authService: AuthService,
    private loketService: LoketService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dataJson = localStorage.getItem('userData');
    this.dataUser = JSON.parse(this.dataJson);
    this.getMitra(this.dataUser.id);
  }

  ngOnDestroy(): void {}

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

  logout() {
    this.authService.logout();
  }
}
