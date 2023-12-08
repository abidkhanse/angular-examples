import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {

  constructor(private userService: UserService) { 

  }

  userList = this.userService.GetAllUsers()

}
