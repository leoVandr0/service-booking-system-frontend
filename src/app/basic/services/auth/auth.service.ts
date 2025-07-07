import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {map, Observable} from 'rxjs';
import {UserStorageService} from '../storage/user-storage.service';


export const AUTH_HEADER = 'authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseHref;
  signup_client_url = environment.baseHref + environment.signup_client_url;
  signup_company_url = environment.baseHref + environment.signup_company_url;
  authenticate_url = environment.baseHref + environment.authenticate_url



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






















