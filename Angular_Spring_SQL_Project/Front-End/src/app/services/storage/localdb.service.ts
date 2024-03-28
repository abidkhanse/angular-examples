import { Injectable } from '@angular/core';

const TOKEN = "token"
const USERID = "userid"
const ROLE = "role"

@Injectable({
  providedIn: 'root'
})

export class LocaldbService {

  static saveToken(token: string){
    window.localStorage.removeItem(TOKEN)
    window.localStorage.setItem(TOKEN, token)
  }

  static getToken(){
    return window.localStorage.getItem(TOKEN)
  }

  static saveRole(role: string){
    window.localStorage.removeItem(ROLE)
    window.localStorage.setItem(ROLE, role)
  }

  static getRole() : string {
    return window.localStorage.getItem(ROLE)
  }

  static saveUserId(userId: any) {
    window.localStorage.removeItem(USERID)
    window.localStorage.setItem(USERID, userId)
  }

  // implement without user ID
  static getUserId() : string {
    return window.localStorage.getItem(USERID);
  }

  static reset(){
    window.localStorage.removeItem(TOKEN)
    window.localStorage.removeItem(ROLE)
  }

  static isSessionActive() : boolean {
    return this.getToken() !== null
  }

  static isAdminLoggedIn() : boolean {
    return this.getRole() !== null && this.getRole().toLowerCase() === "admin"
  }

  static isCustomerLoggedIn() : boolean {
    return this.getRole() !== null && this.getRole().toLowerCase() !== "admin"
  }


}
