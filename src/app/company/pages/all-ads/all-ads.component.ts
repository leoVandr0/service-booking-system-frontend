import { Component } from '@angular/core';
import {CompanyService} from '../../services/company.service';
import {NgForOf} from '@angular/common';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {DemoNgZorroAntdModule} from '../../../DemoNgZorroAntdModule';

@Component({
  selector: 'app-all-ads',
  standalone: true,
  imports: [
    NgForOf,
    NzRowDirective,
    NzColDirective,
    NzButtonComponent,
    RouterLink,
    DemoNgZorroAntdModule
  ],
  templateUrl: './all-ads.component.html',
  styleUrl: './all-ads.component.css'
})
export class AllAdsComponent {


  constructor(private companyService: CompanyService,
              private notification: NzNotificationService,) {
  }

  ads:any;

  ngOnInit() {
    this.getAllAdsByUserId();
  }


  getAllAdsByUserId(){
    this.companyService.getAllAdsByUserId().subscribe(res =>{
      this.ads = res});
  }

  updateImg(img){
    return 'data:image/jpeg;base64,' + img;
  }


  deleteAd(adId: any){
    this.companyService.deleteAdById(adId).subscribe(res =>{
      this.notification
        .success(
          'SUCCESS',
          `Ad Deleted Successfully`,
          {nzDuration: 5000}
        );
      this.getAllAdsByUserId();
    })
  }
}







