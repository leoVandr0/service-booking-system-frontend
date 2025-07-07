import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import {NzGridModule, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {UserStorageService} from './basic/services/storage/user-storage.service';
import {NgIf} from '@angular/common';
import {NzMenuDirective, NzMenuItemComponent} from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NzLayoutModule, // Includes <nz-header>
    NzGridModule,
    NzButtonComponent,
    NzRowDirective,
    NzButtonComponent,
    RouterLink,
    RouterLinkActive,
    NgIf,
    NzMenuDirective,
    NzMenuItemComponent,
    // Includes nz-row, nzType, nzJustify, nz-col, etc.

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ServicebookingSystemWeb';

  isClientLoggedIn: boolean = UserStorageService.isClientLoggedIn();
  isCompanyLoggedIn: boolean = UserStorageService.isCompanyLoggedIn();

  constructor(private router: Router,) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      this.isClientLoggedIn = UserStorageService.isClientLoggedIn();
      this.isCompanyLoggedIn = UserStorageService.isCompanyLoggedIn();
    })
  }

  logout() {
    UserStorageService.signOut();
    this.router.navigateByUrl('/login');
  }

  // logout() {
  //   localStorage.clear();
  //   this.isClientLoggedIn = false;
  //   this.isCompanyLoggedIn = false;
  //   this.router.navigate(['/login']);
  // }

}
























