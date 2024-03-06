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

    return this.http.post<[]>(BASIC_URL + "/admin/category" , CategoryDto, {

      headers: this.createAuthHeader()
    
    })

  }

  createAuthHeader() : HttpHeaders {

    let header : HttpHeaders = new HttpHeaders();

    header.set("Authorization", "Bearer " + LocaldbService.getToken())

    return header
   
  }

    
}
