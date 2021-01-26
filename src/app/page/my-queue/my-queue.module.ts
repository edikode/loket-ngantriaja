import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { MyQueueComponent } from './my-queue.component';

@NgModule({
  declarations: [MyQueueComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: MyQueueComponent }]),
    SharedModule,

    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
  ],
})
export class MyQueueModule {}
