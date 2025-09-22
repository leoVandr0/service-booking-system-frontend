import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserStorageService} from '../../basic/services/storage/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private baseUrl: string = environment.apiUrl || environment.baseHref;
  get_ad_company_url: string = this.baseUrl + environment.get_ad_company_url;
  get_ads_company_url: string = this.baseUrl + environment.get_ads_company_url;
  put_ad_company_url: string = this.baseUrl + environment.put_ad_company_url;
  delete_ad_company_url: string = this.baseUrl + environment.delete_ad_company_url;
  bookings_company_url: string = this.baseUrl + environment.bookings_company_url;
  booking_company_url: string = this.baseUrl + environment.booking_company_url;



  constructor(private http: HttpClient) { }

  postAd(adDTO): Observable<any> {
    const userId = UserStorageService.getUserId();

    const url = `${this.get_ad_company_url}/${userId}`;
    return this.http.post<any>(url, adDTO, {
      headers: this.createAuthorizationHeader()
    })
  }


  getAllAdsByUserId(): Observable<any> {
    const userId = UserStorageService.getUserId();

    const url = `${this.get_ads_company_url}/${userId}`;
    return this.http.get<any>(url,  {
      headers: this.createAuthorizationHeader()
    })
  }

  getAdById(adId: any): Observable<any> {

    const url = `${this.get_ad_company_url}/${adId}`;
    return this.http.get<any>(url,  {
      headers: this.createAuthorizationHeader()
    })
  }


  // updateAdById(id: number, formData: FormData) {
  //   return this.http.put(`put_ad_company_url${id}`, formData);
  // }


  updateAdById(adId: any, adDTO: any): Observable<any> {
    const url = `${this.put_ad_company_url}/${adId}`;
    return this.http.put<any>(url, adDTO, {
      headers: this.createAuthorizationHeader()
    })
  }

  deleteAdById(adId: any): Observable<any> {
    const url = `${this.delete_ad_company_url}/${adId}`;
    return this.http.delete<any>(url, {
      headers: this.createAuthorizationHeader()
    })
  }


  getAllAdBookings(): Observable<any> {
    const companyId = UserStorageService.getUserId();

    const url = `${this.bookings_company_url}/${companyId}`;
    return this.http.get<any>(url,
      {
      headers: this.createAuthorizationHeader()
    }
    )}

  changeBookingStatus(bookingId: number, status: string): Observable<any> {

    const url = `${this.booking_company_url}/${bookingId}/${status}`;
    return this.http.get<any>(url,
      {
        headers: this.createAuthorizationHeader()
      }
    )}


  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    )
  }

}
