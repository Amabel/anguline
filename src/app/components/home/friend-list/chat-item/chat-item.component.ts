import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../../../models/User';

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

  constructor() { }

  ngOnInit() {
  }

  select() {
    this.user = {
      username: this.nickname,
      avatarUrl: this.avatarUrl
    }
    this.onSelect.emit(this.user);
  }



}
