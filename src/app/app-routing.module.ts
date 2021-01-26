import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
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
    loadChildren: () =>
      import('./page/category/category.module').then((m) => m.CategoryModule),
  },
  {
    path: 'detail/:slug',
    loadChildren: () =>
      import('./page/detail-loket/detail-loket.module').then(
        (m) => m.DetailLoketModule
      ),
  },
  {
    path: 'pilih-jadwal/:slug',
    loadChildren: () =>
      import('./page/pilih-jadwal/pilih-jadwal.module').then(
        (m) => m.PilihJadwalModule
      ),
  },
  {
    path: 'my-queue',
    loadChildren: () =>
      import('./page/my-queue/my-queue.module').then((m) => m.MyQueueModule),
  },
  {
    path: 'favorite',
    loadChildren: () =>
      import('./page/favorite/favorite.module').then((m) => m.FavoriteModule),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./page/account/account.module').then((m) => m.AccountModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
