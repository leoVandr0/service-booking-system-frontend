import { Component } from '@angular/core';
import {ClientService} from '../../client/services/client.service';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [
    NzTableComponent,
    NgForOf,
    DatePipe,
    NgIf,
    NzButtonComponent,
    RouterLink
  ],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent {

  bookedServices: any;

  constructor(private clientService: ClientService) {
  }

  ngOnInit() {
    this.getMyBookings();
  }

  getMyBookings() {
    this.clientService.getMyBookings().subscribe((res) => {
      this.bookedServices = res;
    })
  }

}
