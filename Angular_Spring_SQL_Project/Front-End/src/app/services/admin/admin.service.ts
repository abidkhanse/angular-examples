import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocaldbService } from '../storage/localdb.service';

const BASIC_URL = "http://localhost:8000"

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  constructor(private http: HttpClient) { }

  postCategory(CategoryDto: any) : Observable<any> {

    console.log("URL: " + BASIC_URL + "/admin/category");
    return this.http.post<[]>(BASIC_URL + "/admin/category" , CategoryDto, {
      headers: this.createAuthHeader()
    })

  }

  createAuthHeader_() : HttpHeaders {

    let header : HttpHeaders = new HttpHeaders();

    console.log("TOKEN: ", "Bearer " + LocaldbService.getToken())
    header = header.set("Authorization", "Bearer " + LocaldbService.getToken());
    console.log("TOKEN", header.get("Authorization"));

    return header

  }

  createAuthHeader(): HttpHeaders {
    const token = LocaldbService.getToken(); // Ensure this retrieves the token correctly

    console.log("Token", token)
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }


}
