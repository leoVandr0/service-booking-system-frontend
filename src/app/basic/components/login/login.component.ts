import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Router, RouterLink} from '@angular/router';
import {NzButtonComponent, NzButtonModule} from 'ng-zorro-antd/button';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormModule} from 'ng-zorro-antd/form';
import {NzInputDirective, NzInputGroupComponent, NzInputModule} from 'ng-zorro-antd/input';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {UserStorageService} from '../../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzInputDirective,
    ReactiveFormsModule,
    RouterLink,
    NzRowDirective,
    NzInputGroupComponent,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  validateForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private notification: NzNotificationService,
              private router: Router

  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],

    })
  }


  submitForm(){
    this.authService.login(this.validateForm.get(["userName"])!.value, this.validateForm.get(["password"])!.value)
      .subscribe(res => {
     console.log(res);
     if (UserStorageService.isClientLoggedIn()){
       this.router.navigateByUrl('client/dashboard');

     } else if(UserStorageService.isCompanyLoggedIn()){
       this.router.navigateByUrl('company/dashboard');
     }


    }, error => {
      this.notification
        .error(
          'ERROR',
          `Bad Credentials`,
          {nzDuration: 5000}
        )
    });
  }
}
