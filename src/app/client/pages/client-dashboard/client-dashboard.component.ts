import { Component } from '@angular/core';
import {ClientService} from '../../client/services/client.service';
import {NgForOf} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzWaveDirective} from 'ng-zorro-antd/core/wave';
import {RouterLink} from '@angular/router';
import {DemoNgZorroAntdModule} from '../../../DemoNgZorroAntdModule';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [
    NgForOf,
    NzButtonComponent,
    NzColDirective,
    NzRowDirective,
    DemoNgZorroAntdModule,
    NzWaveDirective,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.css'
})
export class ClientDashboardComponent {

  ads: any;
  validateForm!: FormGroup;
  constructor(private clientService: ClientService,
              private fb: FormBuilder,) {
  }


  getAllAds() {
    this.clientService.getAllAds().subscribe(res => {
      this.ads = res;
    })
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      service: [null, [Validators.required]],
    })
    this.getAllAds();
  }

  searchAdByName(){
    this.clientService.searchAdByName(this.validateForm.get(['service']).value).subscribe(res => {
      this.ads = res;
    })
  }


  updateImg(img){
    return 'data:image/jpeg;base64,' + img;
  }

}
