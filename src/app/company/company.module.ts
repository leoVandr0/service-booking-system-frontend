import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CompanyDashboardComponent} from './pages/company-dashboard/company-dashboard.component';
import {CompanyComponent} from './company/company.component';
import {CreateAdComponent} from './pages/create-ad/create-ad.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DemoNgZorroAntdModule} from '../DemoNgZorroAntdModule';
import {AllAdsComponent} from './pages/all-ads/all-ads.component';
import {UpdateAdComponent} from './pages/update-ad/update-ad.component';


const routes: Routes = [
  {path: '', component: CompanyComponent},
  { path: 'dashboard', component: CompanyDashboardComponent},
  { path: 'ad', component: CreateAdComponent},
  { path: 'ads', component: AllAdsComponent},
  { path: 'ad/:id', component: UpdateAdComponent }



];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule,
  ],
  exports: [RouterModule]
})
export class CompanyModule { }
