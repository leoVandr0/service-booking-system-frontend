import { Component } from '@angular/core';
import {ClientService} from '../../client/services/client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {UserStorageService} from '../../../basic/services/storage/user-storage.service';
import {NzFormDirective, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzDatePickerComponent} from 'ng-zorro-antd/date-picker';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzRateComponent} from 'ng-zorro-antd/rate';

@Component({
  selector: 'app-ad-detail',
  standalone: true,
  imports: [
    NgIf,
    NzColDirective,
    NzRowDirective,
    NzFormDirective,
    ReactiveFormsModule,
    NzFormLabelComponent,
    NzDatePickerComponent,
    NzButtonComponent,
    NgForOf,
    NzCardComponent,
    NzRateComponent,
    FormsModule,
    DatePipe,
  ],
  templateUrl: './ad-detail.component.html',
  styleUrl: './ad-detail.component.css'
})
export class AdDetailComponent {

  adId: any;
  avatarUrl: any;
  ad: any;
  reviews: any;

  validateForm!: FormGroup;



  constructor(private clientService: ClientService,
              private activatedRoute: ActivatedRoute,
              private notification: NzNotificationService,
              private router: Router,
              private fb: FormBuilder,) {
    this.adId = this.activatedRoute.snapshot.params['adId'];
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      bookDate: [null, Validators.required],
    })

    this.getAdDetailsByAdId();
  }
  getAdDetailsByAdId() {
    this.clientService.getAdDetailsByAdId(this.adId).subscribe(res => {
      console.log(res);
      this.avatarUrl = 'data:image/jpeg;base64,' + res.adDTO.returnedImg;
      this.ad = res.adDTO;
      this.reviews = res.reviewDTOList;
    })
  }

  bookService(){
    const bookServiceDTO = {
      bookDate: this.validateForm.get(['bookDate']).value,
      adId: this.adId,
      userId: UserStorageService.getUserId()
    }
    this.clientService.bookService(bookServiceDTO).subscribe(res => {
      this.notification
        .success(
          'SUCCESS',
          `Request posted successfully`,
          {nzDuration: 5000}
        );
      this.router.navigateByUrl('/client/bookings');
    })
  }

}
