import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { Observable, merge } from 'rxjs';
import { LoginService } from '../../../shared/services/login.service';
import { UserService } from '../../../shared/services/user.service';
import { MessageService } from '../../../shared/services/message.service';
import { Message } from '../../../models/Message';
import { User } from '../../../models/User';

@Component({
  selector: 'app-message-area',
  templateUrl: './message-area.component.html',
  styleUrls: ['./message-area.component.scss']
})
export class MessageAreaComponent implements OnInit {

  @Input() title: string;
  @Input() username: string;
  @Input() avatarUrl: string;
  @Input() target: User;
  messages: Message[] = [];


  constructor(private messageService: MessageService) { }

  ngOnInit() {

    console.log(this.username);
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    this.messages = [];
    for (let propName in changes) {
      if (!!this.username && !!this.title && propName === 'title') {
        this.getMessages().subscribe(data => {
          for (var key in data) {
            let message = data[key];
            this.messages.push(message);
          }
          console.log(this.messages);
        });
      }
      // let changedProp = changes[propName];
      // let to = JSON.stringify(changedProp.currentValue);
      //   console.log(`Initial value of ${propName} set to ${to}`);
    }
  }

  getMessages() {
    return this.messageService.getMessages(this.username, this.title);
  }
}
