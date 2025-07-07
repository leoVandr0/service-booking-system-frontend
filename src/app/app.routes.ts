import { Routes } from '@angular/router';
import {SignupClientComponent} from './basic/components/signup-client/signup-client.component';
import {SignupCompanyComponent} from './basic/components/signup-company/signup-company.component';
import {LoginComponent} from './basic/components/login/login.component';
import {SignupComponent} from './basic/components/signup/signup.component';
import {AllAdsComponent} from './company/pages/all-ads/all-ads.component';
import {UpdateAdComponent} from './company/pages/update-ad/update-ad.component';
import {ClientDashboardComponent} from './client/pages/client-dashboard/client-dashboard.component';
import {AdDetailComponent} from './client/pages/ad-detail/ad-detail.component';
import {MyBookingsComponent} from './client/pages/my-bookings/my-bookings.component';
import {ReviewComponent} from './client/pages/review/review.component';


export const routes: Routes = [

  { path: 'ads', component: AllAdsComponent },
  { path: 'ad/:id', component: UpdateAdComponent },
  { path: 'dashboard', component: ClientDashboardComponent},
  { path: 'ad/:adId', component: AdDetailComponent},
  { path: 'bookings', component: MyBookingsComponent},
  {
    path: 'client/review/:id', component: ReviewComponent},

  {
    path: 'company',
    loadChildren: () =>
      import('./company/company.module').then(m => m.CompanyModule)
  },
  {
    path: 'client',
    loadChildren: () =>
      import('./client/client.module').then(m => m.ClientModule)
  },
  { path: 'register_client', component: SignupClientComponent },
  { path: 'register_company', component: SignupCompanyComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
];
