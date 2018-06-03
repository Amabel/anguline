import { Component, Input, OnInit, OnChanges, SimpleChange, ViewChild, ElementRef } from '@angular/core';
import { Observable, merge, combineLatest, of } from 'rxjs';
import { LoginService } from '../../../shared/services/login.service';
import { UserService } from '../../../shared/services/user.service';
import { MessageService } from '../../../shared/services/message.service';
import { Message } from '../../../models/Message';
import { User } from '../../../models/User';
import { Timestamp } from '../../../models/Timestamp';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-message-area',
  templateUrl: './message-area.component.html',
  styleUrls: ['./message-area.component.scss']
})
export class MessageAreaComponent implements OnInit {

  @ViewChild('chatPanel') chatPanel: ElementRef;

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
        // this.messages = [];
        // this.getMessages().subscribe(data => {
        //   console.log('in sub');
        //   for (var key in data) {
        //     let message = data[key];
        //     this.messages.push(message);
        //   }
        //   console.log(this.messages);
        // });
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
        // this.messages = this.messages
        // .pipe(
        //   map((data) => {
        //       data.sort((a, b) => {
        //           return a.sent_at.seconds - b.sent_at.seconds;
        //        });
        //       return data;
        //   })
        // );

        this.messages.subscribe(data => {
          console.log(data);
          this.scrollToBottom();
        });
        // this.scrollToBottom();
      }
      // let changedProp = changes[propName];
      // let to = JSON.stringify(changedProp.currentValue);
      //   console.log(`Initial value of ${propName} set to ${to}`);
    }
  }

  getMessages() {
    return this.messageService.getMessages(this.username, this.title);
  }

  send() {
    this.messageService.sendMessage(this.username, this.title, this.text);
    this.text = '';
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.chatPanel.nativeElement.scrollTop = this.chatPanel.nativeElement.scrollHeight + 10000;
  }
}
