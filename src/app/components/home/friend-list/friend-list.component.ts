import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginService } from '../../../shared/services/login.service';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../models/User';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent implements OnInit {

  me: User;
  users: Observable<User[]>;
  @Input() selectedName: string;
  @Output() switchUser = new EventEmitter<User>();

  constructor(
    private loginService: LoginService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.me = this.loginService.user;
    // this.me = {
    //   username: 'aaa',
    //   avatarUrl: ''
    // };
    console.log(this.me);
    this.users = this.userService.getUsers();
  }

  onSelect(user: User) {
    if (user.username != this.selectedName) {
      this.switchUser.emit(user);
    }
  }

}
