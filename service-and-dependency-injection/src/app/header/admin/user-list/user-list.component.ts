import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User';
import { LoggerService } from '../../../services/logger.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {

  // another way to inject service
  loggerService = inject(LoggerService)

  constructor(private userService: UserService) { }

  userList = this.userService.GetAllUsers()

  showUserDetails(user: User) {

    this.loggerService.log(UserListComponent.name, user.toString())

    this.userService.onShowUserDetails(user)




  
  }

}
