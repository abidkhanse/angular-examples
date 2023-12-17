import { Component, OnInit, inject } from '@angular/core';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {
  
  userService = inject(UserService)
  selectedUser!: User; 

  
  ngOnInit(): void {

    this.userService.OnUserDetailsClicked.subscribe((data: User) => {
      this.selectedUser = data
    })

 
    
  }


}
