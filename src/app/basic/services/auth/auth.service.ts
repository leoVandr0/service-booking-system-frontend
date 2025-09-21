import { Injectable, Inject } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {map, Observable} from 'rxjs';
import {UserStorageService} from '../storage/user-storage.service';
import { ENV, EnvConfig } from '../../../core/env.token';

export const AUTH_HEADER = 'authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string;
  signup_client_url: string;
  signup_company_url: string;
  authenticate_url: string;

  constructor(private http: HttpClient,
              private userStorageService: UserStorageService,
              @Inject(ENV) private env: EnvConfig) {
    this.baseUrl = this.env.apiUrl;
    this.signup_client_url = this.baseUrl + environment.signup_client_url;
    this.signup_company_url = this.baseUrl + environment.signup_company_url;
    this.authenticate_url = this.baseUrl + environment.authenticate_url;
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
    return this.http.post<any>(url, data, {observe: 'response'})
      .pipe(
        map((res: HttpResponse<any>) => {
          console.log(res.body);
          this.userStorageService.saveUser(res.body);

          const tokenLength = res.headers.get(AUTH_HEADER)?.length;
          const bearerToken= res.headers.get(AUTH_HEADER)?.substring(7, tokenLength);

          console.log(bearerToken);
          this.userStorageService.saveToken(bearerToken);

          return res;
        })
      );
  }

}
