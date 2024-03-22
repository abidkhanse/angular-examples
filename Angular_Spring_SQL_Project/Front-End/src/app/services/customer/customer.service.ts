import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LocaldbService} from "../storage/localdb.service";
import {Observable} from "rxjs";

const BASIC_URL = "http://localhost:8000"

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  constructor(private http: HttpClient) { }

  getAllCategories() : Observable<any> {

    let url = BASIC_URL + "/customer/categories"
    console.log("URL:", url);
    return this.http.get<[]>(url , {
      headers: this.createAuthHeader()
    })

  }

  getAllProductsByCategory(categoryId: number) : Observable<any> {

    let url = BASIC_URL + "/customer/" + categoryId + "/products"
    console.log("URL: " ,url);

    return this.http.get<[]>(url , {
      headers: this.createAuthHeader()
    })


  }


  createAuthHeader(): HttpHeaders {
    const token = LocaldbService.getToken();
    console.log("Token", token)
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }




}
