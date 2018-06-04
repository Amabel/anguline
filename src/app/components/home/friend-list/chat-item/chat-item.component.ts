import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../../../models/User';
import { LoginService } from '../../../../shared/services/login.service';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss']
})
export class ChatItemComponent implements OnInit {

  @Input() nickname: string;
  @Input() avatarUrl: string;
  @Input() message: string;
  @Input() selected: boolean;

  @Output() onSelect = new EventEmitter<User>();

  user: User;
  me: User;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.me = this.loginService.user;
  }

  select() {
    this.user = {
      username: this.nickname,
      avatarUrl: this.avatarUrl
    }
    this.onSelect.emit(this.user);
  }
}
