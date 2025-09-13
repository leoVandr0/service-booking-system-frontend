import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {Router, RouterLink} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {NzColDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from 'ng-zorro-antd/form';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzButtonComponent} from 'ng-zorro-antd/button';

@Component({
  selector: 'app-signup-client',
  standalone: true,
  imports: [
    NzColDirective,
    NzFormDirective,
    ReactiveFormsModule,
    NzFormItemComponent,
    NzFormControlComponent,
    NzInputDirective,
    NzButtonComponent,
    RouterLink
  ],
  templateUrl: './signup-client.component.html',
  styleUrl: './signup-client.component.css'
})
export class SignupClientComponent {

  validateForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private notification: NzNotificationService,
              private router: Router

              ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required] ],
      name: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      phone: [null],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required]],
    })
  }

  submitForm(){
    console.log('Form Data:', this.validateForm.value);
    console.log('API URL:', this.authService.signup_client_url);

    this.authService.registerClient(this.validateForm.value).subscribe({
      next: (res) => {
        this.notification
          .success(
            'SUCCESS',
            `Signup client created successfully.`,
            {nzDuration: 5000}
          );
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        console.error('Full error object:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        
        let errorMessage = 'An unexpected error occurred';
        
        if (error.status === 0) {
          errorMessage = 'Cannot connect to server. Please check if the backend is running on port 9002.';
        } else if (error.error && typeof error.error === 'string') {
          errorMessage = error.error;
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        this.notification
          .error(
            'ERROR',
            errorMessage,
            {nzDuration: 5000}
          );
      }
    });
  }



}
