import { Component } from '@angular/core';
import {CompanyService} from '../../services/company.service';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-company-dashboard',
  standalone: true,
  imports: [
    NzTableComponent,
    NgForOf,
    DatePipe,
    NgIf,
    NzButtonComponent
  ],
  templateUrl: './company-dashboard.component.html',
  styleUrl: './company-dashboard.component.css'
})
export class CompanyDashboardComponent {

  bookings: any;

constructor(private companyService: CompanyService,
           private notification: NzNotificationService) {}

ngOnInit() {
  this.getAllAdBookings()
}

getAllAdBookings() {
  this.companyService.getAllAdBookings().subscribe(res => {
    console.log(res);
    this.bookings = res;
  })
}

changeBookingStatus(bookingId: number, status: string) {
  this.companyService.changeBookingStatus(bookingId, status).subscribe(res => {
    this.notification
      .success(
        'SUCCESS',
        `Booking status changed successfully`,
        {nzDuration: 5000}
      );
    this.getAllAdBookings();
  }, error => {
    this.notification
      .error(
        'ERROR',
        `${error.message}`,
        {nzDuration: 5000}
      )
  })
}

}
