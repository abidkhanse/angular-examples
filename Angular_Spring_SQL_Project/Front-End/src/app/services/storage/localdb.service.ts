import { Injectable } from '@angular/core';

const TOKEN = "token"
const ROLE = "role"

@Injectable({
  providedIn: 'root'
})

export class LocaldbService {

  static saveToken(token: string) {
    window.localStorage.removeItem(TOKEN)
    window.localStorage.setItem(TOKEN, token)
  }

  static getToken() {
    return window.localStorage.getItem(TOKEN)
  }

  static saveRole(role: string) {
    window.localStorage.removeItem(ROLE)
    window.localStorage.setItem(ROLE, role)
  }

  static getRole() : string{
    return window.localStorage.getItem(ROLE)
  }

  static reset() {
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
