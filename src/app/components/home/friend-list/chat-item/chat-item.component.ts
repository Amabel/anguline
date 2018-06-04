import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, merge, combineLatest, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { User } from '../../../../models/User';
import { Message } from '../../../../models/Message';
import { LoginService } from '../../../../shared/services/login.service';
import { MessageService } from '../../../../shared/services/message.service';

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
  messages: any;
  messages$: Observable<any[]>;
  lastMessage: Message;
  lastTime: Date;

  constructor(
    private loginService: LoginService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.me = this.loginService.user;
    this.messages$ = this.getMessages();
    this.messages = this.messages$
          .pipe(
            switchMap(messages => {
              const [outMessages, inMessages] = messages;
              const combined = outMessages.concat(inMessages);
              return of(combined);
            })
          )
          .pipe(
            map((data) => {
              data.sort((a, b) => {
                  return a.sent_at.seconds - b.sent_at.seconds;
               });
               return data;
            })
          );
    this.messages.subscribe(data => {
      this.lastMessage = (data as Message[]).slice(-1)[0];
      if (this.lastMessage) {
        this.lastTime = new Date(this.lastMessage['sent_at']['seconds'] * 1000);
      }
    });
  }

  select() {
    this.user = {
      username: this.nickname,
      avatarUrl: this.avatarUrl
    }
    this.onSelect.emit(this.user);
  }

  getMessages() {
    return this.messageService.getMessages(this.me.username, this.nickname);
  }
}
