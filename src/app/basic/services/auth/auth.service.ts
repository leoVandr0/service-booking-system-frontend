import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {map, Observable} from 'rxjs';
import {UserStorageService} from '../storage/user-storage.service';

export const AUTH_HEADER = 'authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.apiUrl || environment.baseHref;
  signup_client_url: string = this.baseUrl + environment.signup_client_url;
  signup_company_url: string = this.baseUrl + environment.signup_company_url;
  authenticate_url: string = this.baseUrl + environment.authenticate_url;

  constructor(private http: HttpClient,
              private userStorageService: UserStorageService) {
  }

  registerClient(signupRequestDTO: any): Observable<any> {

    const data ={
      email: signupRequestDTO.email,
      password: signupRequestDTO.password,
      name: signupRequestDTO.name,
      lastname: signupRequestDTO.lastname,
      phone: signupRequestDTO.phone,

    }

    const url = `${this.signup_client_url}`;
    return this.http.post<any>(url, data, {})
  }

  registerCompany(signupRequestDTO: any): Observable<any> {

    const data ={
      email: signupRequestDTO.email,
      password: signupRequestDTO.password,
      name: signupRequestDTO.name,
      lastname: signupRequestDTO.lastname,
      phone: signupRequestDTO.phone,

    }

    const url = `${this.signup_company_url}`;
    return this.http.post<any>(url, data, {})
  }

  login(username: string, password: string): Observable<any> {
    const data ={ username, password}
    const url = `${this.authenticate_url}`;
    // Backend returns JSON as a string; request text and parse
    return this.http.post(url, data, { responseType: 'text' })
      .pipe(
        map((resText: string) => {
          let body: any = {};
          try { body = JSON.parse(resText); } catch {}
          if (body) {
            this.userStorageService.saveUser(body);
            const token = body.token;
            if (token) {
              this.userStorageService.saveToken(token);
            }
          }
          return body;
        })
      );
  }

}
