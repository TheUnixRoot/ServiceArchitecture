import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ConfigurationComponent } from 'src/app/configuration/configuration.component';
import { ChartComponent } from 'src/app/chart/chart.component';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/chart'
  },
  {
    path: 'configuration',
    pathMatch: 'full',
    component: ConfigurationComponent
  },
  {
    path: 'chart',
    pathMatch: 'full',
    component: ChartComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];