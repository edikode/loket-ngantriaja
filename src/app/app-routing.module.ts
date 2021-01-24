import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './page/category/category.component';
import { FavoriteComponent } from './page/favorite/favorite.component';
import { HomeComponent } from './page/home/home.component';
import { MyQueueComponent } from './page/my-queue/my-queue.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'category/:slug',
    component: CategoryComponent,
  },
  {
    path: 'my-queue',
    component: MyQueueComponent,
  },
  {
    path: 'favorite',
    component: FavoriteComponent,
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./page/account/account.module').then((m) => m.AccountModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
