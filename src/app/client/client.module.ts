import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ClientComponent} from './client/client.component';
import {ClientDashboardComponent} from './pages/client-dashboard/client-dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DemoNgZorroAntdModule} from '../DemoNgZorroAntdModule';
import {AdDetailComponent} from './pages/ad-detail/ad-detail.component';
import {MyBookingsComponent} from './pages/my-bookings/my-bookings.component';
import {ReviewComponent} from './pages/review/review.component';

const routes: Routes = [
  {path: '', component: ClientComponent},
  { path: 'dashboard', component: ClientDashboardComponent},
  { path: 'bookings', component: MyBookingsComponent},
  { path: 'ad/:adId', component: AdDetailComponent},
  { path: 'review/:Id', component: ReviewComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    DemoNgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [RouterModule]
})
export class ClientModule { }
