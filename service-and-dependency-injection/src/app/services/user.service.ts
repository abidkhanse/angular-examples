import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/User';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  OnUserDetailsClicked: EventEmitter<User> = new EventEmitter<User>()

  onShowUserDetails(user: User) {
    this.OnUserDetailsClicked.emit(user)
  }

  users: User[] = [
    new User('Steve Smith', 'Male', 'Monthly','Active'),
    new User('Abid Khan', 'Male', 'Yearly','Active'),
    new User('Mary Jhon', 'Female', 'Weekly','Active')    
  ]

  constructor(private loggerService: LoggerService) {

  }

  GetAllUsers() {
    return this.users
  }

  CreateUser(name: string, gender: string, subtype: string, status: string) {
    
    let user = new User(name, gender, subtype, status);
    this.users.push(user)
    this.loggerService.log("User", user.toString())
    
  }


}
