import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailLoketComponent } from './detail-loket.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [DetailLoketComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: DetailLoketComponent }]),
    SharedModule,

    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class DetailLoketModule {}
