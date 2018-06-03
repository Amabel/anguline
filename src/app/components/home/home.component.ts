import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginService } from '../../shared/services/login.service';
import { UserService } from '../../shared/services/user.service';
import { MessageService } from '../../shared/services/message.service';
import { User } from '../../models/User';
import { Message } from '../../models/Message';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  me: User;
  users: Observable<User[]>;
  messages: Observable<Message[]>;
  title: string;
  selectedUser = {
    username: '',
    avatarUrl: ''
  };


  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.me = this.loginService.user;
    // this.me = {
    //   username: 'aaa',
    //   avatarUrl: 'https://randomuser.me/api/portraits/thumb/women/30.jpg'
    // };
    this.users = this.userService.getUsers();
  }

  switchUser(user: User) {
    this.selectedUser = user;
    this.title = user.username;
    console.log(user.username);
  }

}
