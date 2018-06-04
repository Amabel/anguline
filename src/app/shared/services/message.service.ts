import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, BehaviorSubject, combineLatest, of, pipe } from 'rxjs';
import { Message } from '../../models/Message';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messagesCollection: AngularFirestoreCollection<Message>;
  messages: Observable<Message[]>;

  constructor(
    public afs: AngularFirestore
  ) {
    this.messagesCollection = afs.collection<Message>('messages');
    this.messages = this.messagesCollection.valueChanges();
  }

  getMessages(myUsername: string, targetUsername: string) {
    const outMsgRef = this.queryMessages(myUsername, targetUsername);
    const inMsgRef = this.queryMessages(targetUsername, myUsername);
    return combineLatest(outMsgRef.valueChanges(), inMsgRef.valueChanges());
    // return merge(this.queryMessages(myUsername, targetUsername), this.queryMessages(targetUsername, myUsername));
    // return this.queryMessages(myUsername, targetUsername);
  }

  queryMessages(from: string, to: string) {
    // return this.afs.collection<Message>('messages', ref => {
    //   return ref.where('from_username', '==', from).where('to_username', '==', to).orderBy('sent_at');
    // }).valueChanges();
    return this.afs.collection<Message>('messages', ref => {
      return ref.where('from_username', '==', from).where('to_username', '==', to).orderBy('sent_at');
    });
  }

  sendMessage(from: string, to: string, content: string) {
    var message: Message = {
      from_username: from,
      to_username: to,
      content: content,
      sent_at: new Date()
    }
    this.messagesCollection.add(message);
  }
}
