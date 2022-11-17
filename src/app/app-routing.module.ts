import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CORE_PATH } from './shared/constants/routing.const';

const routes: Routes = [
  {
    path: CORE_PATH.path,
    loadChildren: () =>
      import('./modules/core/core.module').then((m) => m.CoreModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
