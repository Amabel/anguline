import { Component, Input, OnInit, OnChanges, SimpleChange, ViewChild, ElementRef } from '@angular/core';
import { Observable, merge, combineLatest, of } from 'rxjs';
import { LoginService } from '../../../shared/services/login.service';
import { UserService } from '../../../shared/services/user.service';
import { MessageService } from '../../../shared/services/message.service';
import { Message } from '../../../models/Message';
import { User } from '../../../models/User';
import { switchMap, map } from 'rxjs/operators';
import { NgxAutoScroll } from "ngx-auto-scroll";

@Component({
  selector: 'app-message-area',
  templateUrl: './message-area.component.html',
  styleUrls: ['./message-area.component.scss']
})
export class MessageAreaComponent implements OnInit {
  @ViewChild(NgxAutoScroll) ngxAutoScroll: NgxAutoScroll;
  @Input() title: string;
  @Input() username: string;
  @Input() avatarUrl: string;
  @Input() target: User;
  messages: any;
  messages$: Observable<any[]>;

  text: string;


  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {

    for (let propName in changes) {
      if (!!this.username && !!this.title && propName === 'title') {
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
      }
    }
  }

  getMessages() {
    return this.messageService.getMessages(this.username, this.title);
  }

  send() {
    if (this.text.trim()) {
      this.messageService.sendMessage(this.username, this.title, this.text);
      this.text = '';
      this.forceScrollDown();
    }
  }
  forceScrollDown() {
    this.ngxAutoScroll.forceScrollDown();
  }
}
