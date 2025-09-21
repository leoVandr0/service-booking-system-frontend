import { Injectable, Inject } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserStorageService} from '../../../basic/services/storage/user-storage.service';
import { ENV, EnvConfig } from '../../../core/env.token';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl: string;
  get_all_ads_url: string;
  search_ad_url: string;
  book_service_url: string;
  get_ad_url: string;
  my_bookings_url: string;
  review_client_url: string;

  constructor(private http: HttpClient,
              @Inject(ENV) private env: EnvConfig) {
    this.baseUrl = this.env.apiUrl;
    this.get_all_ads_url = this.baseUrl + environment.get_all_ads_url;
    this.search_ad_url = this.baseUrl + environment.search_ad_url;
    this.book_service_url = this.baseUrl + environment.book_service_url;
    this.get_ad_url = this.baseUrl + environment.get_ad_url;
    this.my_bookings_url = this.baseUrl + environment.my_bookings_url;
    this.review_client_url = this.baseUrl + environment.review_client_url;
  }

  getAllAds(): Observable<any> {
    const url = `${this.get_all_ads_url}`;
    return this.http.get<any>(url,  {
      headers: this.createAuthorizationHeader()
    })
  }


  searchAdByName(name: any): Observable<any> {
    const url = `${this.search_ad_url}/${name}`;
    return this.http.get<any>(url,
      // {
      // headers: this.createAuthorizationHeader()}
    );
  }

  getAdDetailsByAdId(adId: any): Observable<any> {
    const url = `${this.get_ad_url}/${adId}`;
    return this.http.get<any>(url,
      // {
      // headers: this.createAuthorizationHeader()}
    );
  }

  bookService(bookDTO: any): Observable<any> {

    const url = `${this.book_service_url}`;
    return this.http.post<any>(url, bookDTO,
      // {
      // headers: this.createAuthorizationHeader()}
    );
  }

  getMyBookings(): Observable<any> {
    const userId = UserStorageService.getUserId();

    const url = `${this.my_bookings_url}/${userId}`;
    return this.http.get<any>(url,
      // {
      // headers: this.createAuthorizationHeader()}
    );
  }


  giveReview(reviewDTO: any): Observable<any> {

    const url = `${this.review_client_url}`;
    return this.http.post<any>(url, reviewDTO,


      // {
      // headers: this.createAuthorizationHeader()}
    );
  }



  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    )
  }

}
