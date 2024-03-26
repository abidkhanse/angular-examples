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


  postReservation(reservationDto : any) : Observable<any> {
    let url = BASIC_URL + "/customer/reservation"
    console.log("URL: " ,url);
    reservationDto.customerId = LocaldbService.getUserId()
    return this.http.post<[]>(url , reservationDto, {
      headers: this.createAuthHeader()
    })
  }

  getAllReservations() : Observable<any> {

    let url = BASIC_URL + "/customer/reservations/" + LocaldbService.getUserId()
    console.log("URL:", url);
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
