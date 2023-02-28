import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CORE_PATH } from 'src/app/shared/constants/routing.const';
import { CoreComponent } from './pages/core.component';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: CORE_PATH.path,
        loadChildren: () =>
          import('./../current-weather/current-weather.module').then(
            (m) => m.CurrentWeatherModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: CORE_PATH.path,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
