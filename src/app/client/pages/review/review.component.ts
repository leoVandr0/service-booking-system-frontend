import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from '../../client/services/client.service';
import {UserStorageService} from '../../../basic/services/storage/user-storage.service';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormDirective} from 'ng-zorro-antd/form';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzRateComponent} from 'ng-zorro-antd/rate';
import {NzButtonComponent} from 'ng-zorro-antd/button';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    NzRowDirective,
    NzFormDirective,
    ReactiveFormsModule,
    NzColDirective,
    NzFormControlComponent,
    NzInputDirective,
    NzRateComponent,
    NzButtonComponent
  ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {

  bookId: number;
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private notification: NzNotificationService,
              private router: Router,
              private clientService: ClientService,
              private activatedRoute: ActivatedRoute,) {
    this.bookId = activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      rating: [null, Validators.required],
      review: [null, Validators.required]

    })
  }

  giveReview() {
     const reviewDTO = {

       rating: this.validateForm.get("rating")?.value,
       review: this.validateForm.get("review")?.value,
       userId: UserStorageService.getUserId(),
       bookId: this.bookId     // ✅ correctly named
    //   rating: this.validateForm.get("rating").value,
    //   review: this.validateForm.get("review").value,
    //   userId: UserStorageService.getUserId(),
    //   bookId: this.bookId
    };
    console.log('ReviewDTO being sent:', reviewDTO); // ✅ Add this for debugging

    this.clientService.giveReview(reviewDTO).subscribe(res => {
      this.notification
        .success(
          'SUCCESS',
          `Review posted successfully`,
          {nzDuration: 5000}
        );
      this.router.navigateByUrl('/client/bookings');
    }, error =>{
      this.notification
        .error(
          'ERROR',
          `${error.message}`,
          {nzDuration: 5000}
        )
    })
  }
}




















