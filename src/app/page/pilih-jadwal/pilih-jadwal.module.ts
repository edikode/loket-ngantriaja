import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PilihJadwalComponent } from './pilih-jadwal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [PilihJadwalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PilihJadwalComponent }]),
    SharedModule,

    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class PilihJadwalModule {}
