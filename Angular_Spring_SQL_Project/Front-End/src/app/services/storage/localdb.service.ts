import { Injectable } from '@angular/core';

const TOKEN = "token"
const ROLE = "role"

@Injectable({
  providedIn: 'root'
})

export class LocaldbService {

  constructor() { }

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

  static getRole() {
    return window.localStorage.getItem(ROLE)
  }

  static reset() {
    window.localStorage.removeItem(TOKEN)
    window.localStorage.removeItem(ROLE)
  }
  
}
