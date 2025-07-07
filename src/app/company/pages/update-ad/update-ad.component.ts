import { Component } from '@angular/core';
import {CompanyService} from '../../services/company.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from 'ng-zorro-antd/form';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzWaveDirective} from 'ng-zorro-antd/core/wave';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {DemoNgZorroAntdModule} from '../../../DemoNgZorroAntdModule';

@Component({
  selector: 'app-update-ad',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzInputDirective,
    NzRowDirective,
    NzWaveDirective,
    ReactiveFormsModule,
    NgIf,
    DemoNgZorroAntdModule,
    RouterLink
  ],
  templateUrl: './update-ad.component.html',
  styleUrl: './update-ad.component.css'
})
export class UpdateAdComponent {

  adId:any;


  selectedFile: File | null;
  imagePreview: string | ArrayBuffer| null;
  validateForm!: FormGroup;
  existingImage: string | null = null;


  constructor(private fb: FormBuilder,
              private notification: NzNotificationService,
              private router: Router,
              private companyService: CompanyService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.adId = this.activatedRoute.snapshot.params['id']; // ✅ FIXED
    this.validateForm = this.fb.group({
      serviceName: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
    })
    this.getAdById();
  }


  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }



  updateAd() {
    const formData: FormData = new FormData();

    if (this.selectedFile) {
      formData.append('img', this.selectedFile);
    }

    formData.append('serviceName', this.validateForm.get('serviceName')?.value);
    formData.append('description', this.validateForm.get('description')?.value);
    formData.append('price', this.validateForm.get('price')?.value);

    this.companyService.updateAdById(this.adId, formData).subscribe(
      res => {
        this.notification.success('SUCCESS', `Ad Updated Successfully!`, { nzDuration: 5000 });
        this.router.navigateByUrl("/company/ads");
      },
      error => {
        this.notification.error('ERROR', `${error.error}`, { nzDuration: 5000 });
      }
    );
  }



  // updateAd(){
  //   const formData: FormData = new FormData();
  //
  //   formData.append('img', this.selectedFile);
  //   formData.append('serviceName', this.validateForm.get('serviceName').value);
  //   formData.append('description', this.validateForm.get('description').value);
  //   formData.append('price', this.validateForm.get('price').value);
  //
  //   this.companyService.postAd(formData).subscribe(res => {
  //     this.notification
  //       .success(
  //         'SUCCESS',
  //         `Ad Posted Successfully!`,
  //         {nzDuration: 5000}
  //       );
  //     this.router.navigateByUrl("/company/ads");
  //
  //   }, error => {
  //     this.notification
  //       .error(
  //         'ERROR',
  //         `${error.error}`,
  //         {nzDuration: 5000}
  //       )
  //
  //   })
  // }



  getAdById() {
    this.companyService.getAdById(this.adId).subscribe(res => {
      console.log(res);
      this.validateForm.patchValue(res);
      this.existingImage = 'data:image/jpeg;base64,' + res.returnedImg;
      this.imagePreview = this.existingImage; // ✅ THIS LINE NEEDED
    })
  }

}
