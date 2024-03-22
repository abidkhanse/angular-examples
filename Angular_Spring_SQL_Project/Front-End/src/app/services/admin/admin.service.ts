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

  getAllCategories() : Observable<any> {

    console.log("URL: " + BASIC_URL + "/admin/categories");
    return this.http.get<[]>(BASIC_URL + "/admin/categories" , {
      headers: this.createAuthHeader()
    })
  }

  postProduct(categoryId: number, productDto: any) : Observable<any> {

    console.log("URL: " + BASIC_URL + "/admin/categories");

    return this.http.post<[]>(BASIC_URL + "/admin/" + categoryId + "/product", productDto,
      {
        headers: this.createAuthHeader()
      }
    )
  }

  getAllProductsByCategory(categoryId: number) : Observable<any> {

    console.log("URL: " + BASIC_URL + "/admin/" + categoryId + "/products");
    return this.http.get<[]>(BASIC_URL + "/admin/" + categoryId + "/products" , {
      headers: this.createAuthHeader()
    })
  }

  getProductById(productId: number) : Observable<any> {

    let url =  BASIC_URL + "/admin/product/" + productId
    console.log("URL", url)
    return this.http.get<[]>(url , {
      headers: this.createAuthHeader()
    })

  }

  updateProduct(productId: number, productDto: any) : Observable<any> {

    let url =  BASIC_URL + "/admin/product/" + productId

    console.log("URL", url)

    return this.http.put<[]>(url, productDto,
      {
        headers: this.createAuthHeader()
      }
    )
  }


  createAuthHeader(): HttpHeaders {
    const token = LocaldbService.getToken();
    console.log("Token", token)
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  deleteProductById(id: any) : Observable<any>  {

    let url =  BASIC_URL + "/admin/product/" + id
    console.log("URL: " , url);
    return this.http.delete<[]>(url , {
      headers: this.createAuthHeader()
    })

  }



}
