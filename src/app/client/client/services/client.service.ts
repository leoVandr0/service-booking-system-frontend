import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserStorageService} from '../../../basic/services/storage/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl: string = environment.apiUrl || environment.baseHref;
  get_all_ads_url: string = this.baseUrl + environment.get_all_ads_url;
  search_ad_url: string = this.baseUrl + environment.search_ad_url;
  book_service_url: string = this.baseUrl + environment.book_service_url;
  get_ad_url: string = this.baseUrl + environment.get_ad_url;
  my_bookings_url: string = this.baseUrl + environment.my_bookings_url;
  review_client_url: string = this.baseUrl + environment.review_client_url;

  constructor(private http: HttpClient) { }

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
