import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8000"

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  signup(signupRequest : any) : Observable<any> {
    return this.http.post<[]>(BASIC_URL + "/auth/signup" , signupRequest)
  }

  
  signin(signinRequest : any) : Observable<any> {
    return this.http.post<[]>(BASIC_URL + "/auth/signin" , signinRequest)
  }
  
  

}
