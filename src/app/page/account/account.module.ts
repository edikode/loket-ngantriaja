import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { AccountComponent } from './account.component';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
  declarations: [AccountComponent, AccountEditComponent],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    SharedModule,
  ],
})
export class AccountModule {}
